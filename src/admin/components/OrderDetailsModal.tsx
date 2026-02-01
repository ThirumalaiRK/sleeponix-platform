import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Truck, Loader2 } from 'lucide-react';
// import { toast } from 'react-hot-toast'; // This is mocked below

// ---
// NOTE: In a real application, you MUST import your Supabase client and Toast library:
// import { createClient } from '@supabase/supabase-js';
// import toast from 'react-hot-toast'; 

// Mock Supabase/Toast for component completeness (Replace with real imports in your project)
const supabase = {
  functions: {
    invoke: (name: string, { body }: { body: any }) => new Promise((resolve, reject) => {
      // MOCK API Call: Simulate a network delay and success/failure randomly
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          console.log(`[MOCK SUCCESS] Invoked ${name} with body:`, body);
          resolve({ error: null });
        } else {
          console.error(`[MOCK ERROR] Failed to invoke ${name}`);
          reject({ error: { message: 'Network error or function failure.' } });
        }
      }, 1500);
    }),
  },
};
const toast = {
  success: (message: string) => console.log(`[TOAST SUCCESS] ${message}`),
  error: (message: string) => console.error(`[TOAST ERROR] ${message}`),
};
// ---

// Assuming 'Order' type is defined elsewhere, or you can define it here for completeness
interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string; 
  order_id: string;
  total_amount: number;
  subtotal: number;
  shipping_fee: number;
  created_at: string;
  customer_details: CustomerDetails;
  order_items: OrderItem[];
  tracking_id?: string;
  courier_name?: string;
  tracking_url?: string;
}

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

// 🚀 REFACTORED: Replaced with a more descriptive and accessible component name
const OrderDetailsModal = ({ order, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  // State for tracking updates, initialized from order
  const [trackingId, setTrackingId] = useState(order.tracking_id || '');
  const [courier, setCourier] = useState(order.courier_name || '');
  const [trackingUrl, setTrackingUrl] = useState(order.tracking_url || '');
  const [isSaving, setIsSaving] = useState(false);

  // Destructure financial details from order with fallbacks
  const {
    subtotal = 0,
    shipping_fee = 0,
    total_amount = 0,
  } = order;

  // Define dynamic tracking URL generation based on courier
  const courierTrackingUrls: { [key: string]: (id: string) => string } = {
    'India Post': (id) => `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?value=${id}`,
    'DTDC': (id) => `https://www.dtdc.in/tracking-details.asp?strCnno=${id}`,
    'Professional Courier': (id) => `https://www.tpcindia.com/Default.aspx?id=${id}`,
    'Delhivery': (id) => `https://www.delhivery.com/track/package/${id}`,
    'BlueDart': (id) => `https://www.bluedart.com/web/routing-finder.html?gnkey=go&awb=awb&cn=${id}`,
  };

  // Handler for courier selection change
  const handleCourierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourier = e.target.value;
    setCourier(newCourier);
    if (trackingId && courierTrackingUrls[newCourier]) {
      setTrackingUrl(courierTrackingUrls[newCourier](trackingId));
    } else {
      setTrackingUrl('');
    }
  };

  // Handler for tracking ID input change
  const handleTrackingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTrackingId = e.target.value;
    setTrackingId(newTrackingId);
    if (courier && courierTrackingUrls[courier]) {
      setTrackingUrl(courierTrackingUrls[courier](newTrackingId));
    } else {
      setTrackingUrl('');
    }
  };

  /**
   * Async handler to save tracking info via Supabase Function.
   */
  const handleSaveAndNotify = async () => {
    if (!courier || !trackingId || isSaving) return;

    setIsSaving(true);
    try {
      const { error } = await (supabase as any).functions.invoke('update-shipping-info', {
        body: {
          order_id: order.id, 
          courier_name: courier,
          tracking_id: trackingId,
          tracking_url: trackingUrl,
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Order updated and customer notification sent!');
      onClose(); // Close modal on success
    } catch (error) {
      console.error('Error updating shipping info:', error);
      toast.error('Failed to update order. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const isSaveDisabled = !courier || !trackingId || isSaving;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 font-inter"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          // 🚀 REFACTORED: Added flex utilities for scroll control
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden" 
          style={{ maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header (Non-Scrolling) */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                {/* 🎨 REFACTORED: Used text-deep-indigo */}
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-indigo">Order Summary</h2>
                {/* 🎨 REFACTORED: Used text-slate-gray, removed the background span */}
                <p className="text-sm text-slate-gray mt-1">Order ID: {order.order_id}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                disabled={isSaving}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="px-6 sm:px-8 overflow-y-auto flex-grow pb-6"> {/* Added flex-grow and padding adjustments */}
            
            {/* Customer & Date Details */}
            <div className="pt-6"> {/* Removed border-t here, moved it to items list separator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* 🎨 REFACTORED: Used text-deep-indigo */}
                  <h3 className="text-lg font-semibold text-deep-indigo mb-2">Customer Details</h3>
                  {/* 🎨 REFACTORED: Used text-slate-gray */}
                  <p className="text-slate-gray">{order.customer_details.name}</p>
                  <p className="text-slate-gray">{order.customer_details.email}</p>
                  <p className="text-slate-gray">{order.customer_details.phone}</p>
                  <div className="mt-2 text-slate-gray">
                    <p>
                      <span className="font-semibold">Address:</span> {order.customer_details.address1 || ''}
                    </p>
                    <p>
                      <span className="font-semibold">City:</span> {order.customer_details.city || ''}
                    </p>
                    <p>
                      <span className="font-semibold">State:</span> {order.customer_details.state || ''}
                    </p>
                    <p>
                      <span className="font-semibold">Postal Code:</span> {order.customer_details.postalCode || ''}
                    </p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  {/* 🎨 REFACTORED: Used text-deep-indigo */}
                  <h3 className="text-lg font-semibold text-deep-indigo mb-2">Order Date</h3>
                  <p className="text-slate-gray">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="mt-6 border-t border-gray-200 pt-6"> {/* Added border-t */}
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Items</h3>
              <div className="space-y-4"> {/* Removed max-h/overflow-y since the parent handles scrolling */}
                {order.order_items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} &times; ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    {/* 🎨 REFACTORED: Used text-deep-indigo */}
                    <p className="font-semibold text-deep-indigo">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Update Section (Moved up, without border-t) */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              {/* 🎨 REFACTORED: Used text-deep-indigo and Truck size 20 */}
              <h3 className="text-lg font-bold text-deep-indigo mb-4 flex items-center">
                <Truck size={20} className="mr-2" />
                Shipping Update
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="courier" className="block text-sm font-medium text-gray-700">
                    Courier Name
                  </label>
                  <select
                    id="courier"
                    value={courier}
                    onChange={handleCourierChange}
                    disabled={isSaving}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg shadow-sm disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Select Courier</option>
                    {Object.keys(courierTrackingUrls).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700">
                    Tracking ID
                  </label>
                  <input
                    type="text"
                    id="trackingId"
                    value={trackingId}
                    onChange={handleTrackingIdChange}
                    disabled={isSaving}
                    placeholder="Enter tracking number"
                    className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg shadow-sm disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
              
              {/* Tracking URL Preview */}
              {trackingUrl && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-sm font-medium text-indigo-700">
                    Generated Tracking URL:
                  </p>
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 truncate block hover:underline"
                  >
                    {trackingUrl}
                  </a>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 text-right">
                <button
                  onClick={handleSaveAndNotify}
                  disabled={isSaveDisabled}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : null}
                  {isSaving ? 'Saving...' : 'Save & Notify Customer'}
                </button>
              </div>
            </div>
            
          </div>
          
          {/* Footer (Non-Scrolling: Financial Summary) */}
          {/* 🚀 REFACTORED: Added mt-auto to push to bottom */}
          <div className="p-6 sm:p-8 mt-auto border-t border-gray-200">
            <div className="space-y-3">
              {/* 🎨 REFACTORED: Used text-slate-gray */}
              <div className="flex justify-between text-slate-gray">
                <span className="font-medium">Subtotal</span>
                <span>₹{(subtotal || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-gray">
                <span className="font-medium">Shipping</span>
                {shipping_fee > 0 ? <span>₹{shipping_fee.toLocaleString()}</span> : <span className="font-semibold text-green-600">Free</span>}
              </div>
              {/* 🎨 REFACTORED: Used text-deep-indigo */}
              <div className="flex justify-between text-xl font-bold text-deep-indigo border-t pt-3 border-gray-200">
                <span>Total Due</span>
                <span>₹{(total_amount || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;