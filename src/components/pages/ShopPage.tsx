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
} from 'lucide-react';

import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { useSEO } from '../../hooks/useSEO';

/* ----------------------------------------------------------
    CONSTANTS
---------------------------------------------------------- */
/* ----------------------------------------------------------
    CONSTANTS
---------------------------------------------------------- */
const CATEGORIES = ['Mattresses', 'Pillows', 'Accessories'];
const TAGS = ['Bestseller', 'New', 'Sale'];
const FEATURES = ['Natural', 'Latex', 'Orthopedic', 'Memory Foam', 'Waterproof', 'Support', 'Firm', 'Soft', 'Breathable'];
const MIN_RATING_OPTIONS = [4, 3];

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
      case 'Pillows': return `/products/pillows/${product.id}`;
      case 'Accessories': return `/products/accessories/${product.id}`;
      case 'Mattresses':
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
          <img src={product.image} alt={product.alt} loading="lazy" className="w-full h-48 object-cover" />
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
  selectedFeatures: string[];
  setSelectedFeatures: (f: React.SetStateAction<string[]>) => void;
  minRating: number;
  setMinRating: (r: number) => void;
  clearFilters: () => void;
}> = ({
  searchQuery, setSearchQuery,
  selectedCategories, setSelectedCategories,
  priceRange, setPriceRange,
  selectedTags, setSelectedTags,
  selectedFeatures, setSelectedFeatures,
  minRating, setMinRating,
  clearFilters
}) => (
    <div className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Search Input */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Search</h3>
        <div className="relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#143d29] focus:bg-white transition-all text-sm outline-none"
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#143d29] transition-colors" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Category</h3>
        <div className="space-y-2.5">
          {CATEGORIES.map(category => (
            <label key={category} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors">
              <div className="relative flex items-center">
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
                  className="peer h-5 w-5 rounded border-gray-300 text-[#143d29] focus:ring-[#143d29] transition-all cursor-pointer"
                />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-[#143d29] transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Special Collections Quick Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Collections</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/products/kids-latex" className="flex flex-col items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition-all group text-center">
            <span className="text-2xl">👶</span>
            <span className="text-xs font-bold text-blue-800">For Kids</span>
          </Link>
          <Link to="/products/pet-latex" className="flex flex-col items-center justify-center gap-2 p-3 bg-orange-50 hover:bg-orange-100 border border-orange-100 rounded-xl transition-all group text-center">
            <span className="text-2xl">🐾</span>
            <span className="text-xs font-bold text-orange-800">For Pets</span>
          </Link>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Price Range</h3>
          <span className="text-xs font-medium text-[#143d29] bg-green-50 px-2 py-1 rounded-md">
            ₹{priceRange.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#143d29]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
          <span>₹1,000</span>
          <span>₹50,000+</span>
        </div>
      </div>

      {/* Features & Materials */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Features & Materials</h3>
        <div className="space-y-2.5">
          {FEATURES.map(feature => (
            <label key={feature} className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => {
                    setSelectedFeatures(prev =>
                      prev.includes(feature)
                        ? prev.filter(f => f !== feature)
                        : [...prev, feature]
                    );
                  }}
                  className="peer h-5 w-5 rounded border-gray-300 text-[#143d29] focus:ring-[#143d29] transition-all cursor-pointer"
                />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-[#143d29] transition-colors">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Rating</h3>
        <div className="space-y-2">
          {MIN_RATING_OPTIONS.map(rating => (
            <button
              key={rating}
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${minRating === rating
                ? 'bg-yellow-50 border-yellow-200 text-yellow-900'
                : 'bg-white border-transparent hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">& Up</span>
              </div>
              {minRating === rating && <div className="h-2 w-2 rounded-full bg-yellow-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Tags</h3>
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
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all transform active:scale-95 ${selectedTags.includes(tag)
                ? 'bg-[#143d29] text-white border-[#143d29] shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-3 text-center text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all mt-4 flex items-center justify-center gap-2"
      >
        <X size={16} /> Clear All Filters
      </button>
    </div>
  );



/* ============================================================
    SHOP PAGE
============================================================ */
const ShopPage: React.FC = () => {
  useSEO({
    title: 'Shop Natural Latex Mattresses, Pillows & Accessories | Sleeponix',
    description: 'Browse Sleeponix\'s full range of premium natural latex mattresses, pillows, and sleep accessories. Filter by category, price, and rating. Free shipping on orders above ₹5,000.',
    keywords: 'buy natural latex mattress, latex pillow online, sleep accessories India, organic mattress shop',
    canonicalPath: '/shop',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
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
    setSelectedFeatures([]);
    setMinRating(0);
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
    if (selectedFeatures.length > 0) {
      products = products.filter(p => p.tags?.some(tag => selectedFeatures.includes(tag)));
    }
    if (minRating > 0) {
      products = products.filter(p => (p.rating || 0) >= minRating);
    }
    switch (sortBy) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'newest': products.sort((a, b) => Number(b.badges?.includes('New')) - Number(a.badges?.includes('New'))); break;
    }
    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedTags, selectedFeatures, minRating, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, selectedTags, selectedFeatures, minRating, sortBy]);

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
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${number === currentPage
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
      <Navigation />

      {/* Special Collections Removed - Moved to Filter Panel */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:w-1/4 xl:w-1/5 lg:sticky lg:top-24 self-start bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <FilterPanel
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
              priceRange={priceRange} setPriceRange={setPriceRange}
              selectedTags={selectedTags} setSelectedTags={setSelectedTags}
              selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures}
              minRating={minRating} setMinRating={setMinRating}
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
                selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures}
                minRating={minRating} setMinRating={setMinRating}
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