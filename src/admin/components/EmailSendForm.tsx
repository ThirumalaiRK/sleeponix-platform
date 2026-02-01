import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import { Order, EmailTemplate, OrderItem } from "../adminTypes";

/* -------------------------------------------------------
   HELPERS (SCHEMA SAFE)
------------------------------------------------------- */
const getProductName = (item: OrderItem) =>
  item.name || "Product Name Not Available";

const getProductPrice = (item: OrderItem) =>
  item.price ?? 0;

/* -------------------------------------------------------
   TEMPLATE POPULATION
------------------------------------------------------- */
const populateTemplate = (content: string, order: Order): string => {
  if (!content || !order) return "";

  const subtotal =
    order.order_items?.reduce(
      (sum, item) => sum + item.quantity * getProductPrice(item),
      0
    ) || 0;

  const shipping = order.shipping_fee || 0;
  const total = subtotal + shipping;

  const replacements: Record<string, string> = {
    "{{customer_name}}": order.customer_name,
    "{{order_id}}": `SPX-ORD-${String(order.order_number).padStart(6, "0")}`,
    "{{order_date}}": new Date(order.created_at).toLocaleDateString("en-GB"),
    "{{payment_status}}": order.payment_status,
    "{{subtotal}}": `₹${subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    "{{shipping}}": `₹${shipping.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    "{{total}}": `₹${total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    "{{expected_delivery}}":
      order.delivery_date_estimate || "Within 3–5 working days",
    "{{order_link}}": `https://yourdomain.com/orders/${order.id}`,
    "{{shipping_fee}}": `₹${shipping.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    "{{total_amount}}": `₹${total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
    "{{delivery_date_estimate}}":
      order.delivery_date_estimate || "Within 3–5 working days",
  };

  let populatedContent = content;

  for (const key in replacements) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    populatedContent = populatedContent.replace(regex, replacements[key]);
  }

  /* ---------- ITEM LOOP ---------- */
  const itemLoopRegex = /{{#each items}}([\s\S]*?){{\/each}}/;
  const match = populatedContent.match(itemLoopRegex);

  if (match && order.order_items?.length) {
    const template = match[1];

    const itemsBlock = order.order_items
      .map((item) =>
        template
          .replace(/{{this.name}}/g, getProductName(item))
          .replace(/{{this.quantity}}/g, String(item.quantity))
          .replace(
            /{{this.price}}/g,
            `₹${getProductPrice(item).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}`
          )
      )
      .join("\n");

    populatedContent = populatedContent.replace(itemLoopRegex, itemsBlock);
  }

  return populatedContent;
};

/* -------------------------------------------------------
   COMPONENT
------------------------------------------------------- */
interface EmailSendFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrders: Order[];
  templates: EmailTemplate[];
}

const EmailSendForm: React.FC<EmailSendFormProps> = ({
  isOpen,
  onClose,
  selectedOrders,
  templates,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  /* ---------- PREVIEW ---------- */
  useEffect(() => {
    if (!selectedTemplateId || !selectedOrders.length) return;

    const template = templates.find((t) => t.id === selectedTemplateId);
    if (!template) return;

    const previewOrder = selectedOrders[0];
    setSubject(populateTemplate(template.subject, previewOrder));
    setBody(populateTemplate(template.content, previewOrder));
  }, [selectedTemplateId, templates, selectedOrders]);

  /* ---------- SEND EMAIL ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplateId || !selectedOrders.length) {
      toast.error("Select a template and at least one order.");
      return;
    }

    const template = templates.find((t) => t.id === selectedTemplateId);
    if (!template) {
      toast.error("Could not find the selected template.");
      return;
    }

    setIsSending(true);
    const toastId = toast.loading(
      `Sending ${selectedOrders.length} email(s)...`
    );

    try {
      await Promise.all(
        selectedOrders.map((order) => {
          const populatedSubject = populateTemplate(template.subject, order);
          const populatedBody = populateTemplate(template.content, order);

          return supabase.functions.invoke("admin-api", {
            body: {
              action: "SEND_EMAIL",
              payload: {
                to: order.customer_email,
                subject: populatedSubject,
                html: populatedBody,
              },
            },
          });
        })
      );

      toast.success("All emails sent successfully!", { id: toastId });
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Email send failed", { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  const recipientList = selectedOrders
    .map((o) => o.customer_email)
    .join(", ");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full p-8 relative"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
        >
          <button onClick={onClose} className="absolute top-5 right-5">
            <FiX size={24} />
          </button>

          <h2 className="text-2xl font-serif mb-4 text-center">
            Send Email Notification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              readOnly
              value={recipientList}
              className="w-full p-3 bg-gray-100 rounded"
            />

            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">Select template</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>

            <input
              readOnly
              value={subject}
              className="w-full p-3 bg-gray-100 rounded"
            />
            <textarea
              readOnly
              value={body}
              rows={8}
              className="w-full p-3 bg-gray-100 rounded"
            />

            <button
              disabled={isSending}
              className="w-full bg-green-700 text-white py-3 rounded"
            >
              {isSending ? "Sending..." : "Send Emails"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmailSendForm;
