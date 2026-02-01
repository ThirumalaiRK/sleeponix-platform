import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrdersTable from '../components/OrdersTable';

const AdminOrdersPage: React.FC = () => {
  // 1. State for search functionality
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      className="bg-[#f6efe6] min-h-screen p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-serif text-[#143d29]">Manage Orders</h1>
        <p className="text-[#5f4b3b] mt-2 text-lg">View, update, and track all customer orders.</p>
      </header>

      {/* 2. Search and Filters Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID, Customer Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-[#eadfcc] bg-[#fffaf1] focus:ring-2 focus:ring-[#143d29] transition"
        />
      </div>

      {/* Orders Table Card */}
     <motion.div
        className="bg-[#fffaf1] p-6 lg:p-8 rounded-[20px] shadow-premium border border-[#eadfcc]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <OrdersTable searchQuery={searchQuery} />
      </motion.div>
    </motion.div>
  );
};

export default AdminOrdersPage;