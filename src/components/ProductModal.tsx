import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart } from "lucide-react";
import { Product } from "./products/allProductData";
import { useCart } from "../context/CartContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose(); // Optionally close modal on add to cart
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={18} className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold font-poppins text-gray-800">{product.name}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
                  <X size={28} />
                </button>
              </div>
              <p className="text-gray-500 mt-2">{product.description}</p>

              {/* Rating & Reviews */}
              {product.rating && (
                <div className="flex items-center gap-3 my-4">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600">({product.rating} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 my-5">
                <span className="text-3xl font-bold text-[#2A2A2A]">₹{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags?.map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#2A2A2A] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg hover:bg-black transition-transform transform hover:scale-105"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>

              {/* Additional Details */}
              {product.highlights && (
                <div className="mt-6">
                    <h4 className="font-bold text-gray-800 mb-2">Highlights:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {product.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
                    </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;