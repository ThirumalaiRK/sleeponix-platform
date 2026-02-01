// ------------------------------------------------------
// ORDERS TABLE — SINGLE MERGED FILE (ERROR-FREE)
// ------------------------------------------------------

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { supabase } from "../../supabaseClient";
import { Order, OrderStatus, OrderItem } from "../../types";
import OrderRow from "./OrderRow";
import GenerateDocumentsModal from "./GenerateDocumentsModal";
import OrderDetailsModal from "./OrderDetailsModal";
import toast from "react-hot-toast";
import { initialEmailTemplates } from "../../emailTemplates";

// ------------------------------------------------------
// PROPS
// ------------------------------------------------------
interface OrdersTableProps {
  limit?: number;
  searchQuery?: string;
}

// ------------------------------------------------------
// TRANSFORM SUPABASE → ORDER TYPE
// ------------------------------------------------------
const transformSupabaseOrder = (o: any): Order => {
  const addressString = o.customer_address || "";

  const cleanedParts = addressString
    .split(",")
    .map((p: string) => p.trim())
    .filter((p: string) => p && p.toLowerCase() !== "undefined");

  const addressDetails = {
    address1: cleanedParts[0] || "",
    city: cleanedParts[1] || "",
    state: cleanedParts[2] || "",
    postalCode: cleanedParts[3] || "",
  };

  if (addressDetails.state) {
    const lastSpace = addressDetails.state.lastIndexOf(" ");
    if (lastSpace !== -1) {
      const maybePin = addressDetails.state.substring(lastSpace + 1);
      if (/^\d{6}$/.test(maybePin)) {
        addressDetails.state = addressDetails.state.substring(0, lastSpace);
        addressDetails.postalCode = maybePin;
      }
    }
  }

  const subtotal = Array.isArray(o.order_items)
    ? o.order_items.reduce(
        (sum: number, item: any) =>
          sum + item.quantity * (item.price || 0),
        0
      )
    : 0;

  const shipping_fee = (o.total_amount || 0) - subtotal;

  return {
    id: o.id,
    order_number: o.order_number,
    order_id: `SPX-ORD-${String(o.order_number).padStart(6, "0")}`,
    created_at: o.created_at,
    customer_details: {
      name: o.customer_name,
      email: o.customer_email,
      phone: o.customer_phone,
      address: cleanedParts.join(", "),
      address1: addressDetails.address1,
      city: addressDetails.city,
      state: addressDetails.state,
      postalCode: addressDetails.postalCode,
    },
    total_amount: o.total_amount,
    subtotal,
    shipping_fee,
    status: o.status,
    order_items: Array.isArray(o.order_items)
      ? o.order_items.map(
          (i: any): OrderItem => ({
            id: i.id || 0,
            product_id: i.product_id || "",
            quantity: i.quantity,
            price: i.price || 0,
            name: i.product_name || "Unknown Product",
          })
        )
      : [],
  };
};

// ------------------------------------------------------
// COMPONENT
// ------------------------------------------------------
const OrdersTable: React.FC<OrdersTableProps> = ({
  limit,
  searchQuery = "",
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedOrderForDocs, setSelectedOrderForDocs] =
    useState<Order | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] =
    useState<Order | null>(null);

  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const pendingOrderUpdatesRef = useRef<string[]>([]);

  // ------------------------------------------------------
  // FETCH ORDERS (ADMIN API)
  // ------------------------------------------------------
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("admin-api", {
        body: { action: "GET_ALL_ORDERS" },
      });

      if (error) throw error;

      const fetched = (data?.orders || []).map(transformSupabaseOrder);
      const limited = limit ? fetched.slice(0, limit) : fetched;

      setOrders(limited);

      const q = searchQuery.toLowerCase();
      setFilteredOrders(
        limited.filter(
          (o) =>
            o.customer_details.name?.toLowerCase().includes(q) ||
            o.order_id?.toLowerCase().includes(q)
        )
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [limit, searchQuery]);

  // ------------------------------------------------------
  // REALTIME SYNC
  // ------------------------------------------------------
  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => setTimeout(fetchOrders, 500)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  // ------------------------------------------------------
  // STATUS UPDATE + EMAIL (FIXED PAYLOAD)
  // ------------------------------------------------------
  const handleStatusChange = useCallback(
    async (orderId: string, newStatus: OrderStatus) => {
      pendingOrderUpdatesRef.current.push(orderId);

      const original = [...orders];
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
      );

      try {
        // ✅ FIXED PAYLOAD (matches Edge Function)
        const { error } = await supabase.functions.invoke("admin-api", {
          body: {
            action: "UPDATE_ORDER_STATUS",
            payload: {
              orderId: orderId,
              status: newStatus,
            },
          },
        });

        if (error) throw error;

        toast.success("Order status updated");

        const order = original.find((o) => o.id === orderId);
        const template =
          initialEmailTemplates[
            newStatus as keyof typeof initialEmailTemplates
          ];

        if (order && template && order.customer_details.email) {
          const templateId = (template as any).id;
          if (templateId) {
            await supabase.functions.invoke("admin-api", {
              body: {
                action: "SEND_EMAIL",
                payload: {
                  orderId: order.id,
                  templateId,
                },
              },
            });
          }
        }
      } catch {
        setOrders(original);
        toast.error("Failed to update order");
      } finally {
        pendingOrderUpdatesRef.current =
          pendingOrderUpdatesRef.current.filter((id) => id !== orderId);
      }
    },
    [orders]
  );

  // ------------------------------------------------------
  // DELETE ORDER
  // ------------------------------------------------------
  const handleDeleteOrder = useCallback(
    async (orderId: string) => {
      const original = [...orders];

      toast((t) => (
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-center">
            Delete this order permanently?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                setOrders((prev) =>
                  prev.filter((o) => o.id !== orderId)
                );

                try {
                  const { error } = await supabase.functions.invoke(
                    "admin-api",
                    {
                      body: {
                        action: "DELETE_ORDER",
                        payload: { orderId },
                      },
                    }
                  );
                  if (error) throw error;
                  toast.success("Order deleted");
                } catch {
                  setOrders(original);
                  toast.error("Delete failed");
                }
              }}
            >
              Delete
            </button>
            <button
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ));
    },
    [orders]
  );

  // ------------------------------------------------------
  // DETAILS VIEW
  // ------------------------------------------------------
  const handleViewDetails = (order: Order) => {
    setSelectedOrderForDetails(order);
    setIsDetailsModalOpen(true);
  };

  // ------------------------------------------------------
  // STATES
  // ------------------------------------------------------
  if (loading && orders.length === 0)
    return <div className="p-8 text-center">Loading orders...</div>;

  if (error)
    return <div className="p-8 text-center text-red-600">{error}</div>;

  if (filteredOrders.length === 0)
    return (
      <div className="p-12 text-center">
        <h3 className="text-xl font-serif">
          {searchQuery ? "No matching orders" : "No orders yet"}
        </h3>
      </div>
    );

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  return (
    <div className="orders-table-container">
      <div className="grid grid-cols-1">
        {filteredOrders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            onViewDetails={() => handleViewDetails(order)}
            onGenerateDocs={() => {
              setSelectedOrderForDocs(order);
              setIsDocsModalOpen(true);
            }}
            onStatusChange={(status) =>
              handleStatusChange(order.id, status)
            }
            onDeleteOrder={() => handleDeleteOrder(order.id)}
          />
        ))}
      </div>

      {isDocsModalOpen && selectedOrderForDocs && (
        <GenerateDocumentsModal
          order={selectedOrderForDocs}
          onClose={() => setIsDocsModalOpen(false)}
        />
      )}

      {isDetailsModalOpen && selectedOrderForDetails && (
        <OrderDetailsModal
          order={selectedOrderForDetails}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrdersTable;