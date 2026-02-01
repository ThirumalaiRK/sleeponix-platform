// ------------------------------
// ORDER STATUS TYPE
// ------------------------------
export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

// ------------------------------
// ORDER ITEM INTERFACE (FINAL MERGED)
// ------------------------------
export interface OrderItem {
  id: number;             // item row id
  product_id: string;     // variant or product reference
  name: string;           // product name
  quantity: number;
  price: number;

  // Optional variant fields
  size?: string;
  thickness?: string;
}


// ------------------------------
// ORDER INTERFACE (FINAL MERGED)
// ------------------------------
export interface Order {
  id: string; // This is the unique nanoid
  order_number: number; // This is the new sequential number
  order_id: string; // This will be the formatted display ID, e.g., #spl_001
  created_at: string;
  customer_details: {
    name: string;
    email: string;
    phone: string;
    address: string;
    address1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };

  total_amount: number;
  subtotal: number;
  shipping_fee: number;
  status: OrderStatus;

  // Shipping details (optional)
  tracking_id?: string;
  courier_name?: string;
  tracking_url?: string;

  // Unified final structure
  order_items: OrderItem[];

  // Backward compatibility (old components)
  products?: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}


// ------------------------------
// PREPARED ORDER INTERFACE
// ------------------------------
export interface PreparedOrder {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  shippingAddress: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: string;
  qrCodeValue: string;
}