import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';

interface Pillow {
  id: string;
  name: string;
  size: string;
  price: number;
  tagline: string;
  image: string;
}

interface PillowModalProps {
  pillow: Pillow | null;
  onClose: () => void;
  onAddToCart: (pillow: Pillow) => void;
}

const PillowModal: React.FC<PillowModalProps> = ({ pillow, onClose, onAddToCart }) => {
  if (!pillow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full md:w-1/2">
            <img src={pillow.image} alt={pillow.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <button onClick={onClose} className="self-end text-gray-500 hover:text-gray-800">
              <X size={28} />
            </button>
            <div className="flex-grow">
              <h2 className="text-4xl font-bold font-serif text-gray-900 mb-2">{pillow.name}</h2>
              <p className="text-gray-600 text-lg mb-4">{pillow.tagline}</p>
              <div className="my-6">
                <p className="text-sm text-gray-500">Size</p>
                <p className="text-lg font-semibold text-gray-800">{pillow.size}</p>
              </div>
              <div className="text-4xl font-bold text-green-800 mb-6">
                ₹{pillow.price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-gray-500 ml-2">Inclusive of all taxes</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Experience unparalleled comfort with our 100% natural latex pillow. Designed for optimal neck support and breathability, it ensures a cool and restful night's sleep. Hypoallergenic and durable, it's the perfect choice for a healthy sleep environment.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(pillow)}
              className="w-full mt-8 bg-green-800 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 text-lg"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PillowModal;