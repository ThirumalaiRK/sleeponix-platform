import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface PillowCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  tagline: string;
  onAddToCart: () => void;
  onCardClick: () => void;
}

const PillowCard: React.FC<PillowCardProps> = ({ name, price, image, tagline, onAddToCart, onCardClick }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg overflow-hidden group cursor-pointer border border-stone-100"
      onClick={onCardClick}
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {name.includes('Standard') && (
          <span className="absolute top-4 left-4 bg-[#C2A66D] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Bestseller</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-[#1C2635] truncate">{name}</h3>
        <p className="text-stone-500 mt-1 text-sm">{tagline}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-[#C2A66D]">₹{price.toLocaleString('en-IN')}</p>
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onAddToCart();
            }}
            className="bg-[#1C2635] text-white p-3 rounded-full transform transition-colors duration-300 shadow-md"
            whileHover={{ backgroundColor: '#C2A66D' }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PillowCard;