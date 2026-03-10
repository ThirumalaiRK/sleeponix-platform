import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { Accessory, accessories } from './products/accessories';
import { useCart } from '../context/CartContext'; // Corrected import path

interface AccessoryPopupProps {
  accessoryId: string | null;
  onClose: () => void;
}

const AccessoryPopup: React.FC<AccessoryPopupProps> = ({ accessoryId, onClose }) => {
  const [accessory, setAccessory] = useState<Accessory | null>(null);
  const [selectedSize, setSelectedSize] = useState<Accessory['sizes'][0] | null>(null);
  // const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (accessoryId) {
      const foundAccessory = accessories.find(acc => acc.id === accessoryId);
      setAccessory(foundAccessory || null);
      if (foundAccessory) {
        setSelectedSize(foundAccessory.sizes[0]);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [accessoryId]);

  const handleAddToCart = () => {
    if (accessory && selectedSize) {
      addToCart(
        {
          ...accessory,
          id: `${accessory.id}-${selectedSize.name}`,
          name: `${accessory.name} (${selectedSize.name})`,
          price: selectedSize.price,
          category: (accessory as any).category ?? 'Accessory',
          alt: accessory.name,
        },
        1
      );
      onClose();
    }
  };

  const relatedAccessories = accessory
    ? accessories.filter(acc => accessory.related.includes(acc.id))
    : [];

  if (!accessory || !selectedSize) return null;

  return (
    <AnimatePresence>
      {accessoryId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-8 relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Image */}
                <div className="relative flex items-center justify-center">
                  <motion.img
                    key="image"
                    src={accessory.image}
                    alt={accessory.name}
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                    initial={{ scale: 1, opacity: 1 }}
                  />
                </div>

                {/* Right Side: Details */}
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-gray-900 font-serif">{accessory.name}</h2>
                  <p className="mt-2 text-md text-gray-500 italic">{accessory.tagline}</p>
                  <p className="mt-4 text-gray-700">{accessory.description}</p>

                  <div className="mt-6">
                    <label className="font-semibold text-gray-800">Choose your Size</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {accessory.sizes.map(size => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSize.name === size.name
                            ? 'bg-forest-green text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {size.name} ({size.dimensions})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-3xl font-bold text-gray-900">
                    MRP: ₹{selectedSize.price.toLocaleString('en-IN')}
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full bg-gradient-to-r from-forest-green to-forest-green text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg"
                  >
                    <ShoppingCart size={22} />
                    Add to Cart
                  </motion.button>
                </div>
              </div>

              {/* Related Accessories */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-bold text-center text-gray-800">Related Accessories</h3>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                  {relatedAccessories.map(related => (
                    <div key={related.id} className="text-center">
                      <img src={related.image} alt={related.name} className="w-full h-24 object-cover rounded-lg shadow-sm" />
                      <p className="mt-2 font-semibold text-sm text-gray-700">{related.name}</p>
                      <button
                        onClick={() => {
                          onClose();
                          // This is a bit of a hack to re-open the modal with the new accessory
                          setTimeout(() => {
                            const newEvent = new CustomEvent('openAccessoryPopup', { detail: related.id });
                            window.dispatchEvent(newEvent);
                          }, 150);
                        }}
                        className="mt-1 text-sm text-blue-600 hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccessoryPopup;