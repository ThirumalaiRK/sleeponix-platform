// ------------------------------------------------------
// ORDERS TABLE — PAGINATED & REFACTORED
// ------------------------------------------------------

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { supabase } from "../../supabaseClient";
// Import from adminTypes to ensure we use the admin-specific or re-exported types
import { Order, OrderStatus } from "../adminTypes";
import { transformSupabaseOrder } from "../utils/orderUtils"; // New Utility
import OrderRow from "./OrderRow";
import GenerateDocumentsModal from "./GenerateDocumentsModal";
import OrderDetailsModal from "./OrderDetailsModal";
import toast from "react-hot-toast";
import { initialEmailTemplates } from "../../emailTemplates";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ------------------------------------------------------
// PROPS
// ------------------------------------------------------
interface OrdersTableProps {
  limit?: number; // Optional override for initial limit
  searchQuery?: string;
}

// ------------------------------------------------------
// COMPONENT
// ------------------------------------------------------
const OrdersTable: React.FC<OrdersTableProps> = ({
  limit: initialLimit = 20,
  searchQuery = "",
}) => {
  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalOrders, setTotalOrders] = useState(0);

  // Modals & Selection
  const [selectedOrderForDocs, setSelectedOrderForDocs] = useState<Order | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);
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
        body: {
          action: "GET_ALL_ORDERS",
          payload: {
            page,
            limit,
            searchQuery
          }
        },
      });

      if (error) throw error;

      // Handle the response structure { orders, total, page, limit }
      const fetchedOrders = (data.orders || []).map(transformSupabaseOrder);

      setOrders(fetchedOrders);
      setTotalOrders(data.total || 0);

      // If we are on a page that has no results but total > 0 (e.g. after search), reset to page 1?
      // Actually, if searchQuery changes, valid useEffect dependency should reset page.

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery]);

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

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
        () => {
          // Debounce fetch slightly to avoid rapid re-fetches
          setTimeout(fetchOrders, 500);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  // ------------------------------------------------------
  // STATUS UPDATE + EMAIL
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
                // Optimistic update
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
                  // Refresh to ensure counts are correct
                  fetchOrders();
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
    [orders, fetchOrders]
  );

  // ------------------------------------------------------
  // DETAILS VIEW
  // ------------------------------------------------------
  const handleViewDetails = (order: Order) => {
    setSelectedOrderForDetails(order);
    setIsDetailsModalOpen(true);
  };

  // ------------------------------------------------------
  // PAGINATION HANDLERS
  // ------------------------------------------------------
  const totalPages = Math.ceil(totalOrders / limit);

  const handleNextPage = () => {
    if (page < totalPages) setPage(p => p + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  if (loading && orders.length === 0)
    return <div className="p-8 text-center text-[#5f4b3b]">Loading orders...</div>;

  if (error)
    return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="orders-table-container pb-4">
      {orders.length === 0 ? (
        <div className="p-12 text-center">
          <h3 className="text-xl font-serif text-[#143d29]">
            {searchQuery ? "No matching orders" : "No orders yet"}
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1">
          {orders.map((order) => (
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
      )}

      {/* PAGINATION CONTROLS */}
      {totalOrders > 0 && (
        <div className="flex items-center justify-between px-4 py-4 mt-4 border-t border-[#eadfcc]">
          <span className="text-sm text-[#5f4b3b]">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalOrders)} of {totalOrders} results
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`p-2 rounded-md border ${page === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-[#eadfcc] text-[#143d29] hover:bg-[#143d29] hover:text-white"
                } transition-colors`}
            >
              <FiChevronLeft />
            </button>

            <span className="text-sm font-medium text-[#143d29]">
              Page {page} of {totalPages || 1}
            </span>

            <button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              className={`p-2 rounded-md border ${page >= totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-[#eadfcc] text-[#143d29] hover:bg-[#143d29] hover:text-white"
                } transition-colors`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

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
          onUpdate={fetchOrders}
        />
      )}
    </div>
  );
};

export default OrdersTable;