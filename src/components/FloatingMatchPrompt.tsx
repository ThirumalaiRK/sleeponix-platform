import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, X } from 'lucide-react';

const FloatingMatchPrompt: React.FC = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Show after a short delay on initial load, but don't show if dismissed
    useEffect(() => {
        if (isDismissed) return;
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500); // 1.5 seconds delay

        return () => clearTimeout(timer);
    }, [location.pathname, isDismissed]);

    // Don't show on the actual quiz page, checkout, cart, or admin pages
    const hideOnPaths = ['/find-match', '/checkout', '/cart', '/admin', '/order-confirmation'];
    const shouldHide = hideOnPaths.some(path => location.pathname.startsWith(path));

    if (shouldHide || isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none"
                >
                    <div className="pointer-events-auto relative group">

                        {/* Close button that appears on hover/active */}
                        <button
                            onClick={(e) => { e.preventDefault(); setIsDismissed(true); }}
                            className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-gray-50 hover:text-black"
                            aria-label="Dismiss prompt"
                        >
                            <X size={12} strokeWidth={3} />
                        </button>

                        <Link
                            to="/find-match"
                            className="relative flex items-center gap-3 bg-[#1B4D3E] text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_8px_30px_rgb(27,77,62,0.3)] hover:shadow-[0_8px_30px_rgb(27,77,62,0.5)] transition-shadow group-hover:bg-[#153d30]"
                        >
                            {/* Pulsing ring behind the icon */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute inset-0 rounded-full bg-[#C6A878]"
                                />
                                <div className="relative w-9 h-9 bg-[#C6A878] rounded-full flex items-center justify-center shadow-inner">
                                    <Stethoscope size={18} className="text-white" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-bold text-sm tracking-wide leading-tight">Find Your Match</span>
                                <span className="text-[10px] text-white/70 font-semibold tracking-widest uppercase">Take The Assessment</span>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingMatchPrompt;
