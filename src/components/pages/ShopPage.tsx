import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { allProducts, Product } from '../products/allProductData';

import {
  Search,
  X,
  ChevronDown,
  Star,
  SlidersHorizontal,
  ArrowRight,
  ShoppingCart,
  Menu,
} from 'lucide-react';

import { Link } from 'react-router-dom';

/* ----------------------------------------------------------
    CONSTANTS
---------------------------------------------------------- */
const CATEGORIES = ['Mattress', 'Pillow', 'Accessory'];
const TAGS = ['Bestseller', 'New', 'Sale'];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
];

const PRODUCTS_PER_PAGE = 9;

/* ============================================================
    PRODUCT CARD
============================================================ */
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-yellow-400 text-yellow-900';
      case 'New':
        return 'bg-green-200 text-green-800';
      case 'Sale':
        return 'bg-pink-200 text-pink-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getProductLink = (product: Product) => {
    if (product.href) return product.href;
    switch (product.category) {
      case 'Pillow': return `/products/pillows/${product.id}`;
      case 'Accessory': return `/products/accessories/${product.id}`;
      case 'Mattress':
      default: return `/products/${product.id}`;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
      className="group relative flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden border border-transparent hover:shadow-xl hover:border-gray-200 transition-all duration-300"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link to={getProductLink(product)} className="flex flex-col flex-grow">
        <div className="relative">
          <img src={product.image} alt={product.alt} className="w-full h-48 object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badges?.map(badge => (
              <span key={badge} className={`px-2 py-1 text-xs font-bold rounded-full ${getBadgeColor(badge)}`}>
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 h-10 overflow-hidden">{product.description}</p>
          <div className="flex-grow" />
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className={i < (product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-[#0C593B]">₹{product.price.toLocaleString()}</span>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-[#0C593B] transition-colors" style={{ transform: 'translateZ(20px)' }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ============================================================
    FILTER PANEL
============================================================ */
const FilterPanel: React.FC<{
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (c: React.SetStateAction<string[]>) => void;
  priceRange: number;
  setPriceRange: (p: number) => void;
  selectedTags: string[];
  setSelectedTags: (t: React.SetStateAction<string[]>) => void;
  clearFilters: () => void;
}> = ({
  searchQuery, setSearchQuery,
  selectedCategories, setSelectedCategories,
  priceRange, setPriceRange,
  selectedTags, setSelectedTags,
  clearFilters
}) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Search</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-700 focus:border-transparent"
        />
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Category</h3>
      <div className="space-y-2">
        {CATEGORIES.map(category => (
          <label key={category} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => {
                setSelectedCategories(prev =>
                  prev.includes(category)
                    ? prev.filter(c => c !== category)
                    : [...prev, category]
                );
              }}
              className="h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-600"
            />
            <span className="ml-3 text-sm text-gray-700">{category}</span>
          </label>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Price Range</h3>
      <input
        type="range"
        min="1000"
        max="50000"
        step="1000"
        value={priceRange}
        onChange={(e) => setPriceRange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-700"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>₹1,000</span>
        <span>₹{priceRange.toLocaleString()}</span>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedTags.includes(tag)
                ? 'bg-green-800 text-white border-green-800'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

    <button
      onClick={clearFilters}
      className="w-full py-2 text-center text-sm font-semibold text-red-600 hover:bg-red-50 rounded-full transition-colors"
    >
      Clear All Filters
    </button>
  </div>
);

/* ============================================================
    SHOP HEADER
============================================================ */
const ShopHeader: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('sleeponix_cart') || '[]');
      setCartItemCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const navLink = 'text-gray-800 hover:text-[#0C593B] transition duration-300';

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-serif font-bold text-gray-800">
            <img src="/images/og logo.png" alt="Sleeponix" className="h-10" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLink}>Home</Link>
            <Link to="/shop" className={navLink}>Shop</Link>
            <Link to="/our-story" className={navLink}>About</Link>
            <Link to="/contact" className={navLink}>Contact</Link>
          </nav>
          <div className="hidden md:flex items-center space-x-6">
            <button className={navLink}><Search size={20} /></button>
            <Link to="/cart" className={`relative ${navLink}`}>
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#0C593B] text-white text-xs rounded-full flex justify-center items-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-800">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white shadow-lg">
            <nav className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" className={navLink}>Home</Link>
              <Link to="/shop" className={navLink}>Shop</Link>
              <Link to="/our-story" className={navLink}>About</Link>
              <Link to="/contact" className={navLink}>Contact</Link>
              <div className="flex space-x-4 pt-4">
                <Search size={20} className={navLink} />
                <Link to="/cart" className={`relative ${navLink}`}>
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#0C593B] text-white text-xs rounded-full flex justify-center items-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ============================================================
    SHOP PAGE
============================================================ */
const ShopPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange(50000);
    setSelectedTags([]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];
    if (searchQuery) {
      products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }
    products = products.filter(p => p.price <= priceRange);
    if (selectedTags.length > 0) {
      products = products.filter(p => p.badges?.some(tag => selectedTags.includes(tag)));
    }
    switch (sortBy) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'newest': products.sort((a, b) => Number(b.badges?.includes('New')) - Number(a.badges?.includes('New'))); break;
    }
    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedTags, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, selectedTags, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-12">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              number === currentPage
                ? 'bg-[#0C593B] text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <ShopHeader />

      <header className="text-center pt-32 pb-16 px-4">
        <motion.h1 className="text-4xl md:text-5xl font-bold text-[#0C593B]">Shop Our Collection</motion.h1>
        <p className="mt-4 text-lg text-[#555] max-w-2xl mx-auto">
          Find your perfect match for a blissful night’s sleep.
        </p>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 xl:w-1/5 lg:sticky lg:top-24 self-start bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <FilterPanel
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
              priceRange={priceRange} setPriceRange={setPriceRange}
              selectedTags={selectedTags} setSelectedTags={setSelectedTags}
              clearFilters={clearFilters}
            />
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">Showing {Math.min(filteredAndSortedProducts.length, (currentPage - 1) * PRODUCTS_PER_PAGE + 1)}–{Math.min(filteredAndSortedProducts.length, currentPage * PRODUCTS_PER_PAGE)} of {filteredAndSortedProducts.length} Results</p>
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button 
                  className="lg:hidden p-2 rounded-md bg-white border border-[#EAEAEA] shadow-sm hover:shadow-md transition-shadow" 
                  onClick={() => setIsFiltersOpen(true)}
                  aria-label="Open Filters"
                >
                  <SlidersHorizontal size={20} />
                </button>
                
                {/* Sort Dropdown */}
                <div className="relative" ref={sortRef}>
                  <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EAEAEA] rounded-full text-sm shadow-sm hover:bg-gray-50 transition-colors">
                    <span>{SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span>
                    <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }} 
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-[#EAEAEA] z-20 overflow-hidden"
                      >
                        {SORT_OPTIONS.map(option => (
                          <button 
                            key={option.value} 
                            onClick={() => { setSortBy(option.value); setIsSortOpen(false); }} 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence>
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
              {paginatedProducts.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  <h3 className="text-xl font-semibold">No products found.</h3>
                  <p className="mt-2">Try adjusting your filters or search query.</p>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {renderPagination()}
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFiltersOpen(false)} aria-label="Close Filters"><X size={24} /></button>
              </div>
              <FilterPanel
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                priceRange={priceRange} setPriceRange={setPriceRange}
                selectedTags={selectedTags} setSelectedTags={setSelectedTags}
                clearFilters={clearFilters}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;