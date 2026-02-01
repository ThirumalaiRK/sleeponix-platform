import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck } from 'lucide-react';
import { Order } from '../../types';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';

interface ShippingUpdateModalProps {
  order: Order;
  onClose: () => void;
  onSuccess: () => void;
}

const courierTrackingUrls: { [key: string]: (id: string) => string } = {
  'India Post': (id) => `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?value=${id}`,
  'DTDC': (id) => `https://www.dtdc.in/tracking-details.asp?strCnno=${id}`,
  'Professional Courier': (id) => `https://www.tpcindia.com/Default.aspx?id=${id}`,
  'Delhivery': (id) => `https://www.delhivery.com/track/package/${id}`,
  'BlueDart': (id) => `https://www.bluedart.com/web/routing-finder.html?gnkey=go&awb=awb&cn=${id}`,
};

const ShippingUpdateModal: React.FC<ShippingUpdateModalProps> = ({ order, onClose, onSuccess }) => {
  const [trackingId, setTrackingId] = useState(order.tracking_id || '');
  const [courier, setCourier] = useState(order.courier_name || '');
  const [trackingUrl, setTrackingUrl] = useState(order.tracking_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCourierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCourier = e.target.value;
    setCourier(newCourier);
    if (trackingId && courierTrackingUrls[newCourier]) {
      setTrackingUrl(courierTrackingUrls[newCourier](trackingId));
    }
  };

  const handleTrackingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTrackingId = e.target.value;
    setTrackingId(newTrackingId);
    if (courier && courierTrackingUrls[courier]) {
      setTrackingUrl(courierTrackingUrls[courier](newTrackingId));
    }
  };

  const handleSaveAndNotify = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('update-shipping-info', {
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

      toast.success('Order updated and notification sent!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(`Failed to update order: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-indigo flex items-center">
                  <Truck size={24} className="mr-3" />
                  Update Shipping Info
                </h2>
                <p className="text-sm text-slate-gray mt-1">Order ID: {order.order_id}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="courier" className="block text-sm font-medium text-slate-gray">
                    Courier Name
                  </label>
                  <select
                    id="courier"
                    value={courier}
                    onChange={handleCourierChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-deep-indigo focus:border-deep-indigo sm:text-sm rounded-md"
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
                  <label htmlFor="trackingId" className="block text-sm font-medium text-slate-gray">
                    Tracking ID
                  </label>
                  <input
                    type="text"
                    id="trackingId"
                    value={trackingId}
                    onChange={handleTrackingIdChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-deep-indigo focus:border-deep-indigo sm:text-sm rounded-md"
                  />
                </div>
              </div>
              {trackingUrl && (
                <div className="mt-4">
                  <p className="text-sm text-slate-gray">
                    Tracking URL: {' '}
                    <a
                      href={trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-deep-indigo hover:underline"
                    >
                      {trackingUrl}
                    </a>
                  </p>
                </div>
              )}
              <div className="mt-6 text-right">
                <button
                  onClick={handleSaveAndNotify}
                  disabled={!courier || !trackingId || isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-deep-indigo hover:bg-deep-indigo/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-indigo disabled:bg-gray-300"
                >
                  {isSubmitting ? 'Saving...' : 'Save & Notify Customer'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShippingUpdateModal;