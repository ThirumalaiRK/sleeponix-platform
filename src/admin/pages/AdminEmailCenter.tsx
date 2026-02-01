// -------------------------------------------------------
// IMPORTS
// -------------------------------------------------------
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";

import EmailTemplateEditor from "../components/EmailTemplateEditor";
import EmailSendForm from "../components/EmailSendForm";
import { supabase } from "../../supabaseClient";
import { EmailTemplate, Order, OrderItem } from "../adminTypes";

// -------------------------------------------------------
// DEFAULT EMAIL TEMPLATES
// -------------------------------------------------------
const initialEmailTemplates = [
  {
    id: "order-confirmation",
    trigger: "Order Confirmation",
    title: "Your Sleeponix Order is Confirmed",
    description:
      "Sent automatically when a customer completes a purchase. Includes order summary and receipt.",
    subject: "Your Sleeponix Order is Confirmed!",
    content: `Dear {{customer_name}},

Thank you for trusting Sleeponix! Your order has been successfully placed.

**ORDER DETAILS**
- **Order ID:** {{order_id}}
- **Order Date:** {{order_date}}
- **Payment Status:** {{payment_status}}

**ORDER SUMMARY**
---
{{#each items}}
- **Product:** {{this.name}}
- **Quantity:** {{this.quantity}}
- **Price:** \${{this.price}}
---
{{/each}}

- **Subtotal:** \${{subtotal}}
- **Shipping:** \${{shipping_fee}}
- **Total:** \${{total_amount}}

**Expected delivery:** {{delivery_date_estimate}}

[View My Order]({{order_link}})

Warmly,
The Sleeponix Team`,
  },
  {
    id: "order-shipped",
    trigger: "Order Shipped",
    title: "Your Order is on its Way!",
    description: 'Sent when an order\'s status is updated to "Shipping".',
    subject: "Your Sleeponix Order has Shipped!",
    content: `Dear {{customer_name}},

Great news! Your Sleeponix order is on its way.

**Current Order Status:** Shipping
**Order ID:** {{order_id}}

**ORDER SUMMARY**
---
{{#each items}}
- **Product:** {{this.name}}
- **Quantity:** {{this.quantity}}
- **Price:** \${{this.price}}
---
{{/each}}

**Track Your Package**
- **Tracking ID:** {{tracking_id}}
- **Tracking URL:** {{tracking_url}}

**Estimated Delivery:** {{delivery_eta}}

If you have any questions, feel free to contact our support team.

Best,
The Sleeponix Team`,
  },
  {
    id: "order-delivered",
    trigger: "Delivered",
    title: "Your Sleeponix Order Has Arrived",
    description: "Sent when the carrier marks the package as delivered.",
    subject: "Your Order is Delivered!",
    content: `Dear {{customer_name}},

Your Sleeponix order has arrived! We hope you love your new product.

**Order ID:** {{order_id}}
**Status:** Delivered

**ORDER SUMMARY**
---
{{#each items}}
- **Product:** {{this.name}}
- **Quantity:** {{this.quantity}}
- **Price:** \${{this.price}}
---
{{/each}}

[View Order Details]({{order_link}})

For tips on getting the most out of your new product, check out our product guides. If anything isn't perfect, please contact our support team.

Warm Regards,
The Sleeponix Team`,
  },
  {
    id: "return-approved",
    trigger: "Return Approved",
    title: "Return Request Approved",
    description: "Sent when a return request is approved.",
    subject: "Your Return Request is Approved",
    content: `Dear {{customer_name}},

Your return request has been approved. We’re here to help at every step.

- **Order ID:** {{order_id}}
- **Return Request ID:** {{return_id}}
- **Return Status:** Approved

**Next Steps:**
1.  **Pack the item:** Please pack the item securely.
2.  **Send it back:** Details on where to send it will follow.
3.  **Refund:** Expect your refund to be processed within 5-7 business days after we receive the item.

[View Return Details]({{return_link}})

Best,
Sleeponix Support`,
  },
  {
    id: "feedback-request",
    trigger: "Feedback Request",
    title: "How is Your Sleeponix Product?",
    description: "Sent 7 days after delivery for review.",
    subject: "We'd Love Your Feedback!",
    content: `Dear {{customer_name}},

Your order ({{order_id}}) was delivered recently. How was your Sleeponix experience?

Your feedback helps our community and allows us to improve.

[Write a Review]({{review_link}})

Thank you for helping us get better!

Warmly,
The Sleeponix Team`,
  },
  {
    id: "special-offer",
    trigger: "Special Offer",
    title: "A Special Thank You from Sleeponix",
    description: "Coupon or special promotions.",
    subject: "A Special Offer Just for You!",
    content: `Dear {{customer_name}},

Here is an exclusive offer to thank you for being a customer.

- **Coupon Code:** {{coupon_code}}
- **Discount:** {{discount_value}}
- **Expires:** {{coupon_expiry}}

[Redeem Offer Now]({{offer_link}})

Treat yourself to even better sleep.

Warm Wishes,
The Sleeponix Team`,
  },
];

// -------------------------------------------------------
// TYPES (MOVED TO adminTypes.ts)
// -------------------------------------------------------
// Types are imported from ../adminTypes

// -------------------------------------------------------
// TEMPLATE CARD COMPONENT
// -------------------------------------------------------
const EmailTemplateCard: React.FC<{
  template: EmailTemplate;
  onSelect: () => void;
}> = ({ template, onSelect }) => {
  return (
    <motion.div
      className="bg-white/60 p-4 sm:p-6 rounded-2xl shadow-warm-subtle border border-natural-beige/50 flex flex-col justify-between"
      whileHover={{ y: -5, boxShadow: "0 8px 20px rgba(108, 89, 72, 0.12)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="bg-natural-beige/80 text-natural-brown font-semibold px-3 py-1 rounded-full text-xs sm:text-sm">
            {template.trigger}
          </span>
          <FiMail className="text-gold-accent text-xl sm:text-2xl" />
        </div>

        <h3 className="text-lg sm:text-xl font-serif text-forest-green-dark mb-2">
          {template.title}
        </h3>

        <p className="text-natural-brown/80 text-sm sm:text-base">
          {template.description}
        </p>
      </div>

      <button
        onClick={onSelect}
        className="group mt-6 flex items-center justify-end text-gold-accent font-semibold text-sm sm:text-base"
      >
        <span>Edit Template</span>
        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

// -------------------------------------------------------
// MAIN PAGE
// -------------------------------------------------------
const AdminEmailCenter: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(
    initialEmailTemplates
  );
  const [editingTemplate, setEditingTemplate] =
    useState<EmailTemplate | null>(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // FETCH ORDERS (MERGED + CLEAN)
  // -------------------------------------------------------\\n  
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("Attempting to fetch orders via Supabase function...");
      const { data, error } = await supabase.functions.invoke("admin-api", {
        body: { action: "GET_ALL_ORDERS" },
      });

      if (error) {
        console.error("CRITICAL: Error invoking admin-api function:", error);
        // Display a user-friendly error message
        alert(`Failed to fetch orders. Please check the console for details. Error: ${error.message}`);
        setRecentOrders([]); // Clear any stale data
        return;
      }

      if (!data || !data.orders) {
        console.warn("No data returned from admin-api function, but no explicit error.");
        setRecentOrders([]);
        return;
      }

      console.log("Successfully fetched data:", data);

      const transformedOrders: Order[] = data.orders.map((o: any) => {
        const items = (o.order_items || []) as OrderItem[];

        const parseCurrency = (value: any): number => {
          if (typeof value === 'number') return value;
          if (typeof value === 'string') {
            if (value.toLowerCase() === 'free') return 0;
            const numericString = value.replace(/[^0-9.]+/g, "");
            const number = parseFloat(numericString);
            return isNaN(number) ? 0 : number;
          }
          return 0;
        };

        const subtotal = parseCurrency(o.subtotal);
        const shipping = parseCurrency(o.shipping_fee);
        const total = o.total_amount ? parseCurrency(o.total_amount) : (subtotal + shipping);

        return {
          id: o.id,
          order_number: o.order_number || 0,
          created_at: new Date(o.created_at).toLocaleDateString(),
          customer_name: o.customer_name,
          customer_email: o.customer_email,
          status: o.status,
          payment_status: o.payment_status || "Paid",
          subtotal: subtotal,
          shipping_fee: shipping,
          total_amount: total,
          delivery_date_estimate: o.delivery_date_estimate
            ? new Date(o.delivery_date_estimate).toLocaleDateString()
            : "N/A",
          delivery_eta: o.delivery_eta
            ? new Date(o.delivery_eta).toLocaleDateString()
            : "N/A",
          tracking_id: o.tracking_id || "N/A",
          tracking_url: o.tracking_url || "#",
          courier_name: o.courier_name,
          shipping_status: o.shipping_status || o.status,
          order_items: items,
          customer_details: {
            name: o.customer_name,
            email: o.customer_email,
            phone: o.customer_phone,
            address: o.customer_address,
            address1: o.customer_address1,
            city: o.customer_city,
            state: o.customer_state,
            postalCode: o.customer_postal_code,
          },
          order_link: `/orders/${o.id}`,
          review_link: `/products/review/${o.id}`,
          return_link: `/returns/${o.id}`,
        };
      });

      console.log("Transformed orders:", transformedOrders);
      setRecentOrders(transformedOrders);
    };

    fetchOrders();

    const channel = supabase
      .channel("realtime-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // -------------------------------------------------------
  // HANDLE TEMPLATE SAVE
  // -------------------------------------------------------
  const handleSaveTemplate = (updated: EmailTemplate) => {
    setTemplates((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  // -------------------------------------------------------
  // SELECT ORDERS
  // -------------------------------------------------------
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  // MODIFIED: Get the full Order objects for the modal
  const selectedOrders = recentOrders.filter((order) =>
    selectedOrderIds.includes(order.id)
  );

  // Removed obsolete variables: selectedRecipientEmails and selectedOrderNumbers

  // -------------------------------------------------------
  // RENDER UI
  // -------------------------------------------------------
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-soft-cream-white min-h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-forest-green-dark">
              Email Notification Center
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Manage email templates and send notifications.
            </p>
          </div>

          {/* The main Send Email button is here */}
        </div>

        {/* TEMPLATE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {templates.map((template) => (
            <EmailTemplateCard
              key={template.id}
              template={template}
              onSelect={() => setEditingTemplate(template)}
            />
          ))}
        </div>

        {/* RECENT ORDERS */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-forest-green-dark">
                Recent Orders
              </h2>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Select orders to send an email.
              </p>
            </div>

            <button
              onClick={() => setIsEmailModalOpen(true)}
              disabled={selectedOrderIds.length === 0}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Send Email ({selectedOrderIds.length})
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-6 py-3"></th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs uppercase">
                    Order ID
                  </th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs uppercase">
                    Customer
                  </th>
                  <th className="px-2 sm:px-6 py-3 text-left text-xs uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-2 sm:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrderIds.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="h-4 w-4 text-gold-accent border-gray-300 rounded"
                      />
                    </td>

                    <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-900 truncate">
                      {`SPX-ORD-${String(order.order_number).padStart(6, "0")}`}
                    </td>

                    <td className="px-2 sm:px-6 py-4 text-xs sm:text-sm text-gray-500">
                      {order.customer_name}
                    </td>

                    <td className="px-2 sm:px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* TEMPLATE EDITOR MODAL */}
      <EmailTemplateEditor
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        template={editingTemplate}
        onSave={handleSaveTemplate}
      />

      {/* EMAIL SEND MODAL - UPDATED PROPS */}
      <EmailSendForm
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        selectedOrders={selectedOrders} // Pass full order objects
        templates={templates} // Pass templates for selection in the modal
      />
    </div>
  );
};

export default AdminEmailCenter;