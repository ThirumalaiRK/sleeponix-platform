import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Printer } from 'lucide-react';
import { Order } from '../../types';
import {
  generateInvoicePDF,
  generateShippingLabelPDF,
} from '../utils/pdfGenerator';

interface GenerateDocumentsModalProps {
  order: Order;
  onClose: () => void;
}

const GenerateDocumentsModal: React.FC<GenerateDocumentsModalProps> = ({ order, onClose }) => {
  const documentOptions = [
    { id: 'invoice', label: 'Invoice', icon: FileText, generator: generateInvoicePDF },
    { id: 'shipping-label', label: 'Shipping Label', icon: Printer, generator: generateShippingLabelPDF },
  ];

  const handleGenerate = (docType: string) => {
    const option = documentOptions.find(opt => opt.id === docType);
    if (option) {
      // Transform the order object to the format expected by the PDF generator
      const pdfOrder = {
        id: order.id,
        // MERGED: Added order_id
        order_id: order.order_id,
        order_number: order.order_number,
        order_date: order.created_at,
        customer_details: {
          name: order.customer_details.name,
          email: order.customer_details.email,
          phone: order.customer_details.phone,
          billing_address: {
            street: order.customer_details.address1 || order.customer_details.address,
            city: order.customer_details.city || '',
            state: order.customer_details.state || '',
            zip: order.customer_details.postalCode || '',
          },
          shipping_address: {
            street: order.customer_details.address1 || order.customer_details.address,
            city: order.customer_details.city || '',
            state: order.customer_details.state || '',
            zip: order.customer_details.postalCode || '',
          },
        },
        items: (order.order_items || order.products || []).map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totals: {
          grand_total: order.total_amount,
          tax: order.total_amount - (order.total_amount / 1.18), // Assuming 18% tax
          subtotal: order.total_amount / 1.18,
          discount: 0,
        },
        // MERGED: Changed payment_prepaid boolean to payment_method string
        payment_method: "Prepaid",
        payment_prepaid: true, 
      };
      option.generator(pdfOrder);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 text-center">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Generate Documents</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              For Order ID: <span className="font-semibold text-gray-700">{order.order_id}</span>
            </p>

            <div className="grid grid-cols-2 gap-4">
              {documentOptions.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenerate(id)}
                  className="group p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center aspect-square border border-gray-100"
                >
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-indigo-600" />
                  </div>
                  <span className="mt-3 font-semibold text-sm text-gray-700">{label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GenerateDocumentsModal;