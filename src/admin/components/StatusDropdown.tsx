import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { OrderStatus } from '../../types';

interface StatusDropdownProps {
  value: OrderStatus;
  onChange: (newStatus: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Dispatched',
  'Delivered',
  'Cancelled',
  'Returned',
];

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: OrderStatus) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[140px]" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between bg-[#f4ebdc] px-4 py-2 rounded-full border border-[#eadfcc] text-[#5f4b3b] font-medium focus:outline-none focus:ring-2 focus:ring-[#caa362]"
      >
        <span>{value}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FiChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-[#eadfcc] z-50 overflow-hidden"
          >
            {statusOptions.map(option => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 hover:bg-[#f9f2e8] cursor-pointer text-[#5f4b3b] text-left w-full"
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusDropdown;