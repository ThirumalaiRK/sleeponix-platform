import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMoreVertical,
  FiEye,
  FiMail,
  FiFileText,
  FiTrash2,
} from 'react-icons/fi';

interface ActionsMenuProps {
  onViewDetails: () => void;
  onResendEmail: () => void;
  onGenerateInvoice: () => void;
  onDeleteOrder: () => void;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  onViewDetails,
  onResendEmail,
  onGenerateInvoice,
  onDeleteOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /** Close menu when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /** Actions menu items */
  const menuItems = [
    { label: 'View Details', icon: FiEye, action: onViewDetails },
    { label: 'Resend Email', icon: FiMail, action: onResendEmail },
    { label: 'Generate Invoice', icon: FiFileText, action: onGenerateInvoice },
    { label: 'Delete Order', icon: FiTrash2, action: onDeleteOrder, isDestructive: true }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* More Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-[#143d29] hover:bg-gray-100 rounded-full transition"
        aria-label="More Actions"
      >
        <FiMoreVertical />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#eadfcc] z-50 overflow-hidden"
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  item.isDestructive
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-[#5f4b3b] hover:bg-[#f9f2e8]'
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActionsMenu;