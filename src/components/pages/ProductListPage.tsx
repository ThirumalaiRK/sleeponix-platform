import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutGrid, List, Filter } from 'lucide-react';
import { allProducts, Product } from '../products/allProductData';
import ProductCard from '../ProductCard';

const categories = ['All', 'Mattress', 'Pillow', 'Accessory'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Newest'];

const ProductListPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [cartPopup, setCartPopup] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({ isOpen: false, product: null });

  const handleAddToCart = useCallback((product: Product) => {
    setCartPopup({ isOpen: true, product });
  }, []);

  const closePopup = () => {
    setCartPopup({ isOpen: false, product: null });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = selectedCategory === 'All'
      ? allProducts
      : allProducts.filter(p => p.category === selectedCategory);

    switch (sortOption) {
      case 'Price: Low to High':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'Rating: High to Low':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Newest':
        // Assuming 'New' badge indicates newest products
        products.sort((a, b) => (b.badges?.includes('New') ? 1 : -1) - (a.badges?.includes('New') ? 1 : -1));
        break;
      case 'Featured':
      default:
        // Assuming 'Bestseller' badge indicates featured products
         products.sort((a, b) => (b.badges?.includes('Bestseller') ? 1 : -1) - (a.badges?.includes('Bestseller') ? 1 : -1));
        break;
    }
    return products;
  }, [selectedCategory, sortOption]);

  const FilterPanel = ({ isMobile = false }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold font-poppins text-[#2A2A2A] mb-3">Categories</h3>
        <div className={`flex ${isMobile ? 'flex-wrap' : 'flex-col items-start'} gap-2`}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                if (isMobile) setMobileFilterOpen(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === category ? 'bg-[#3BAF8B] text-white shadow-md' : 'bg-white text-[#2A2A2A] hover:bg-gray-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-poppins text-[#2A2A2A]">All Products</h1>
          <p className="text-md text-gray-600 mt-2">Find your perfect piece for a blissful sleep.</p>
        </header>

        <div className="lg:flex lg:space-x-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-1/4 xl:w-1/5">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          <main className="lg:w-3/4 xl:w-4/5">
            {/* Top bar for sorting, view mode, and mobile filter trigger */}
            <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 p-4 rounded-xl shadow-sm mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-[#2A2A2A] bg-gray-100 px-4 py-2 rounded-full"
                >
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
                <div className="hidden md:block text-sm text-gray-600">
                  Showing {filteredAndSortedProducts.length} products
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-gray-300 rounded-full text-sm px-4 py-2 focus:ring-2 focus:ring-[#3BAF8B] focus:border-[#3BAF8B] transition"
                >
                  {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}><LayoutGrid size={20}/></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition ${viewMode === 'list' ? 'bg-white shadow' : ''}`}><List size={20}/></button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <AnimatePresence>
              <motion.div
                layout
                className={`transition-all duration-500 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8' : 'flex flex-col gap-6'}`}
              >
                {filteredAndSortedProducts.map(product => (
                  <motion.div layout key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ProductCard product={product} onAddToCart={handleAddToCart} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-[#FAF7F2] z-50 p-6 shadow-lg lg:hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-poppins">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)}><X size={24} /></button>
            </div>
            <FilterPanel isMobile={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Cart Popup */}
      <AnimatePresence>
        {cartPopup.isOpen && cartPopup.product && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <img src={cartPopup.product.image} alt={cartPopup.product.name} className="w-32 h-32 mx-auto rounded-xl mb-5 object-cover" />
              <h3 className="text-xl font-bold font-poppins text-gray-800">Added to Cart!</h3>
              <p className="text-gray-600 mt-2">{cartPopup.product.name}</p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={closePopup} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition w-full sm:w-auto">Continue Shopping</button>
                <button className="bg-[#2A2A2A] text-white px-6 py-3 rounded-full font-semibold hover:bg-black transition w-full sm:w-auto">View Cart</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;