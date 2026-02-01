import React from 'react';
import { motion } from 'framer-motion';
import { Product } from './products/allProductData';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, viewMode = 'grid' }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={` ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const cardContent = (
    <>
      <div className={`relative ${viewMode === 'list' ? 'w-1/3 flex-shrink-0' : ''}`}>
        <div className={`aspect-w-1 aspect-h-1 w-full overflow-hidden ${viewMode === 'grid' ? 'rounded-t-xl' : 'rounded-l-xl'}`}>
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
        </div>
        {product.badges && (
          <div className="absolute top-3 left-3 flex flex-col gap-y-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                  badge === 'Bestseller' ? 'bg-[#FFD700] text-black' : 
                  badge === 'Sale' ? 'bg-[#E57373] text-white' : 
                  'bg-[#3BAF8B] text-white'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={`p-4 flex flex-col flex-grow ${viewMode === 'list' ? 'w-2/3' : ''}`}>
        <div>
          <h3 className="text-lg font-bold text-gray-800 font-poppins truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 font-inter mt-1 h-10">{product.description}</p>
        </div>
        <div className="flex items-center mt-2">
          {product.rating && (
            <>
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-xs text-gray-500 ml-2">({product.rating} reviews)</span>
            </>
          )}
        </div>
        <div className="flex-grow"></div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags?.map((tag) => (
            <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className={`flex items-end justify-between mt-4 ${viewMode === 'list' ? 'flex-row-reverse' : ''}`}>
          <div>
            <span className="text-xl font-semibold text-gray-900 font-poppins">${product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className={`mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 text-sm ${viewMode === 'grid' ? 'w-full' : 'px-4'}`}
          >
            <ShoppingCart size={16} />
            <span className={viewMode === 'list' ? 'hidden sm:inline' : ''}>Add to Cart</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      layout
      className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between h-full group ${viewMode === 'list' ? 'flex-row' : ''}`}
    >
      {cardContent}
    </motion.div>
  );
};

export default ProductCard;