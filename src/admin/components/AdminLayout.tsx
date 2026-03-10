import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiPackage,
  FiMail,
  FiLogOut,
  FiMenu,
  FiTrendingUp,
  FiSettings,
} from 'react-icons/fi';
import { supabase } from '../../supabaseClient';
import logo from '/images/og logo.png';

const navLinks = [
  { name: 'Dashboard', icon: FiGrid, path: '/admin/dashboard' },
  { name: 'Orders', icon: FiPackage, path: '/admin/orders' },
  { name: 'Email Center', icon: FiMail, path: '/admin/notifications' },
  { name: 'Income', icon: FiTrendingUp, path: '/admin/income' },
  { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
];

const SidebarContent: React.FC<{ onLinkClick: () => void }> = ({ onLinkClick }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  return (
    <div className="flex flex-col h-full text-natural-brown">
      <div className="p-6 text-center border-b border-border-color shadow-sm">
        <img src={logo} alt="Sleeponix Logo" className="h-10 mx-auto" />
        <span className="block text-xs font-sans text-soft-gold tracking-[0.2em] mt-2">
          ADMIN
        </span>
      </div>
      <nav className="flex-1 px-4 mt-6 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-base rounded-lg transition-all duration-300 relative ${isActive
                ? 'bg-[#0B3D2E] text-white shadow-sm' // UPDATED ACTIVE STYLES
                : 'hover:bg-warm-cream/60'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  className={`w-5 h-5 mr-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-soft-gold' // UPDATED ACTIVE ICON COLOR
                    }`}
                />
                <span className="font-medium">{link.name}</span>
                {/* REMOVED AnimatePresence for the active indicator */}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      {/* Logout Button */}
      <div className="p-4 mt-auto border-t border-gray-200/50">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-base rounded-lg transition-all duration-300 hover:bg-warm-cream/60 text-natural-brown"
        >
          <FiLogOut className="w-5 h-5 mr-4 text-soft-gold" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin-login');
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[#f6efe6]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-light-beige shadow-lg">
        <SidebarContent onLinkClick={() => { }} />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-72 z-50 lg:hidden shadow-2xl bg-white"
            >
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between lg:justify-end p-4 bg-white border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <FiMenu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;