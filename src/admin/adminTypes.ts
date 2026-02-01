export interface EmailTemplate {
  id: string;
  trigger: string;
  title: string;
  description: string;
  subject: string;
  content: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_number: number;
  created_at: string;
  customer_name: string;
  customer_email: string;
  status: string;
  payment_status: string;
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  delivery_date_estimate: string;
  delivery_eta: string;
  tracking_id: string;
  tracking_url: string;
  courier_name?: string; // Added
  shipping_status?: string; // Added
  order_items: OrderItem[];
  customer_details: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    address1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  order_link?: string;
  review_link?: string;
  return_link?: string;
}
