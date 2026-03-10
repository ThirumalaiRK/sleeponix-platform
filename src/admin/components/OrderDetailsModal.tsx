
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Truck, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../supabaseClient';
import { Order } from '../../types';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdate?: () => void; // Add callback to refresh parent list
}

const OrderDetailsModal = ({ order, onClose, onUpdate }: OrderDetailsModalProps) => {
  if (!order) return null;

  // State for tracking updates
  const [trackingId, setTrackingId] = useState(order.tracking_id || '');
  const [courier, setCourier] = useState(order.courier_name || '');
  const [trackingUrl, setTrackingUrl] = useState(order.tracking_url || '');
  const [isSaving, setIsSaving] = useState(false);

  // Destructure financial details
  const {
    subtotal = 0,
    shipping_fee = 0,
    total_amount = 0,
  } = order;

  // Courier Tracking URL Templates
  const courierTrackingUrls: { [key: string]: (id: string) => string } = {
    'India Post': (id) => `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?value=${id}`,
    'DTDC': (id) => `https://www.dtdc.in/tracking/shipment-tracking.asp`, // DTDC usually requires form submission, linking to tracking page
    'Professional Courier': (id) => `https://www.tpcindia.com/Default.aspx`, // TPC is tricky with direct links
    'Delhivery': (id) => `https://www.delhivery.com/track/package/${id}`,
    'BlueDart': (id) => `https://www.bluedart.com/web/routing-finder.html?gnkey=go&awb=awb&cn=${id}`,
    'Ecom Express': (id) => `https://ecomexpress.in/tracking/?awb_field=${id}`,
    'Xpressbees': (id) => `https://www.xpressbees.com/track?awb=${id}`,
    'Shadowfax': (id) => `https://tracker.shadowfax.in/track?orderId=${id}`,
  };

  const generateTrackingUrl = (courierName: string, id: string) => {
    if (!id) return '';
    const generator = courierTrackingUrls[courierName];
    return generator ? generator(id) : '';
  };

  const handleCourierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourier = e.target.value;
    setCourier(newCourier);
    setTrackingUrl(generateTrackingUrl(newCourier, trackingId));
  };

  const handleTrackingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTrackingId = e.target.value;
    setTrackingId(newTrackingId);
    setTrackingUrl(generateTrackingUrl(courier, newTrackingId));
  };

  const handleSaveAndNotify = async () => {
    if (!courier || !trackingId || isSaving) return;

    setIsSaving(true);
    const toastId = toast.loading('Updating shipping info...');

    try {
      const { data, error } = await supabase.functions.invoke('admin-api', {
        body: {
          action: 'UPDATE_SHIPPING_INFO',
          payload: {
            orderId: order.id,
            courierName: courier,
            trackingId: trackingId,
            trackingUrl: trackingUrl,
          },
        },
      });

      if (error) throw new Error(error.message || 'Failed to update shipping info');
      if (data?.error) throw new Error(data.error);

      toast.success('Order status updated to Shipped!', { id: toastId });
      if (onUpdate) onUpdate();
      onClose();
    } catch (error: any) {
      console.error('Error updating shipping info:', error);
      toast.error(error.message || 'Failed to update order. Please try again.', { id: toastId });
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
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 font-inter backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 flex justify-between items-start bg-gray-50 border-b border-gray-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#143d29]">Order Summary</h2>
              <p className="text-sm text-gray-500 mt-1 font-mono">ID: {order.order_id || order.order_number}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
              disabled={isSaving}
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 sm:px-8 overflow-y-auto flex-grow py-6 custom-scrollbar">

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customer</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p className="font-semibold text-lg text-gray-900">{order.customer_details?.name}</p>
                  <p>{order.customer_details?.email}</p>
                  <p>{order.customer_details?.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Shipping Address</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>{order.customer_details?.address || order.customer_details?.address1}</p>
                  <p>
                    {[
                      order.customer_details?.city,
                      order.customer_details?.state,
                      order.customer_details?.postalCode
                    ].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Items Ordered</h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                {(order.order_items || []).map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900 ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Update Form */}
            <div className="bg-[#f0fdf4] border border-green-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[#143d29] mb-4 flex items-center gap-2">
                <Truck size={20} /> Shipping Update
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#143d29] uppercase tracking-wide mb-1.5">Courier Name</label>
                  <select
                    value={courier}
                    onChange={handleCourierChange}
                    disabled={isSaving}
                    className="w-full rounded-lg border-gray-200 text-sm focus:border-[#143d29] focus:ring-[#143d29]"
                  >
                    <option value="">Select Courier</option>
                    {Object.keys(courierTrackingUrls).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#143d29] uppercase tracking-wide mb-1.5">Tracking ID</label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={handleTrackingIdChange}
                    disabled={isSaving}
                    placeholder="Enter tracking number"
                    className="w-full rounded-lg border-gray-200 text-sm focus:border-[#143d29] focus:ring-[#143d29]"
                  />
                </div>
              </div>

              {/* URL Preview */}
              {trackingUrl && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-green-100/50 flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400">TRACKING LINK PREVIEW</span>
                  <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate">
                    {trackingUrl}
                  </a>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveAndNotify}
                  disabled={isSaveDisabled}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#143d29] text-white rounded-lg font-bold text-sm hover:bg-[#0f2e1f] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  {isSaving ? 'Updating...' : 'Save & Notify Customer'}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Totals */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 text-sm">
            <div className="flex justify-between mb-2 text-gray-500">
              <span>Subtotal</span>
              <span>₹{(subtotal || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-500">
              <span>Shipping</span>
              {shipping_fee > 0 ? <span>₹{shipping_fee.toLocaleString()}</span> : <span className="text-green-600 font-medium">Free</span>}
            </div>
            <div className="flex justify-between text-lg font-bold text-[#143d29] border-t border-gray-200 pt-3">
              <span>Total Paid</span>
              <span>₹{(total_amount || 0).toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;