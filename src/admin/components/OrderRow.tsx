import React from 'react';
import { motion } from 'framer-motion';
import { Order, OrderStatus } from '../../types';
import StatusDropdown from './StatusDropdown';
import ActionsMenu from './ActionsMenu';
import toast from 'react-hot-toast';

interface OrderRowProps {
  order: Order;
  onStatusChange: (newStatus: OrderStatus) => void;
  onGenerateDocs: () => void;
  onDeleteOrder: () => void;
  onViewDetails: () => void; // Add onViewDetails to props
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  onStatusChange,
  onGenerateDocs,
  onDeleteOrder,
  onViewDetails, // Destructure onViewDetails
}) => {
  const productSummary = order.order_items
    .map(item => `${item.name} (x${item.quantity})`)
    .join(', ');

  const handleResendEmail = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Resending email...',
        success: 'Email resent successfully!',
        error: 'Failed to resend email.',
      }
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="grid grid-cols-1 md:grid-cols-[1fr,2fr,3fr,1.5fr,1.5fr,1fr] 
                 gap-4 items-center p-4 border-b border-[#eadfcc] 
                 hover:bg-[#fdf8f0] transition-colors duration-200"
    >
      {/* Order ID */}
      <div className="font-semibold text-[#143d29] text-sm">
        <span className="md:hidden font-bold mr-2">ID: </span>
        {order.order_id}
      </div>

      {/* Customer */}
      <div className="text-sm">
        <div className="font-medium text-[#143d29]">{order.customer_details.name}</div>
        <div className="text-xs text-gray-500">{order.customer_details.email}</div>
        <div className="text-xs text-gray-500">{order.customer_details.phone}</div>
        <div className="text-xs text-gray-500">{order.customer_details.address}</div>
      </div>

      {/* Products */}
      <div className="text-sm text-gray-600 truncate">
        <span className="md:hidden font-bold mr-2">Items: </span>
        {productSummary}
      </div>

      {/* Total */}
      <div className="font-semibold text-[#143d29] text-sm">
        <span className="md:hidden font-bold mr-2">Total: </span>
        ₹{order.total_amount.toLocaleString()}
      </div>

      {/* Status Dropdown */}
      <div className="w-full">
        <StatusDropdown value={order.status} onChange={onStatusChange} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2">
        <ActionsMenu
          onViewDetails={onViewDetails} // Pass onViewDetails to ActionsMenu
          onResendEmail={handleResendEmail}
          onGenerateInvoice={onGenerateDocs}
          onDeleteOrder={onDeleteOrder}
        />
      </div>
    </motion.div>
  );
};

export default OrderRow;