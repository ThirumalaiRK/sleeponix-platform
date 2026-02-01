// @ts-nocheck
export function formatAddress(customer) {
  if (!customer) return "Address not available";

  const parts = [
    customer.address_line1,
    customer.address_line2,
    customer.city,
    customer.state,
    customer.postal_code,
  ].filter(Boolean);

  return parts.join(", ");
}

export function formatProducts(items) {
  if (!items || items.length === 0) return "No items";

  return items.map(item => `${item.product_name} (x${item.quantity})`);
}

export function prepareOrderForPDF(order) {
  return {
    orderNumber: order.order_number,
    createdAt: order.created_at,
    total: order.total_amount,
    payment: order.payment_method,

    customer: {
      name: order.customer?.name || "",
      email: order.customer?.email || "",
      phone: order.customer?.phone || "",
      address: formatAddress(order.customer),
    },

    items: order.items?.map(item => ({
      name: item.product_name,
      qty: item.quantity,
      price: item.unit_price,
    })) || [],
  };
}