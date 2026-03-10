import { Order, OrderItem } from '../adminTypes';

export const transformSupabaseOrder = (o: any): Order => {
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
            quantity: i.quantity,
            price: i.price || 0,
            name: i.product_name || "Unknown Product",
            product_id: i.product_id || ""
          })
        )
      : [],
    // Retain potential existing fields if they exist in valid Order type
    tracking_id: o.tracking_id || '',
    tracking_url: o.tracking_url || '',
    delivery_date_estimate: o.delivery_date_estimate || '',
    delivery_eta: o.delivery_eta || '',
    payment_status: o.payment_status || 'Pending',
    customer_name: o.customer_name || '',
    customer_email: o.customer_email || ''
  };
};
