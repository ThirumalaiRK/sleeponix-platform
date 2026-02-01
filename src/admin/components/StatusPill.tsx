import React from 'react';
import { OrderStatus } from '../../types';

interface StatusPillProps {
  status: OrderStatus;
}

const statusColorMap: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Processing: "bg-blue-100 text-blue-800 border-blue-300",
  Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Dispatched: "bg-purple-100 text-purple-800 border-purple-300",
  Delivered: "bg-green-100 text-green-900 border-green-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
  Returned: "bg-rose-100 text-rose-800 border-rose-300",
};

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1.5 text-xs font-medium rounded-full border inline-block ${
        statusColorMap[status] || "bg-gray-100 text-gray-800 border-gray-300"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusPill;