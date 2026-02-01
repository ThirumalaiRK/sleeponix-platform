import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface AccessoryCardProps {
  image: string;
  name: string;
  tagline: string;
  price: number;
  highlights: string[];
  onAddToCart: () => void;
  onCardClick: () => void;
  premiumStyle?: boolean;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({
  image,
  name,
  tagline,
  price,
  onAddToCart,
  onCardClick,
  premiumStyle = false,
}) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart();
  };

  if (premiumStyle) {
    return (
      <motion.div
        className="group relative bg-white rounded-[1.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer border border-stone-100"
        whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={onCardClick}
      >
        <div className="relative w-full aspect-square bg-[#FAF9F6]">
          <img src={image} alt={name} className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif text-[#1C2635]">{name}</h3>
          <div className="flex justify-between items-center mt-3">
            <p className="text-2xl font-bold text-[#C2A66D]">₹{price.toLocaleString('en-IN')}</p>
            <motion.button
              onClick={handleButtonClick}
              className="bg-[#1C2635] text-white rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.1, backgroundColor: '#C2A66D' }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Original card style
  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onCardClick}
    >
      <div className="relative w-full aspect-[4/3]">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleButtonClick}
            className="bg-white text-[#1C2635] font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-md"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </motion.button>
        </div>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-serif text-[#1C2635]">{name}</h3>
        <p className="text-gray-500 text-sm h-10">{tagline}</p>
      </div>
      <div className="p-4 md:hidden">
        <button
          onClick={handleButtonClick}
          className="w-full bg-[#1C2635] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default AccessoryCard;