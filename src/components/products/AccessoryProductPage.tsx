import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accessories, Accessory } from './accessories';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { Shield, Wind, Droplets, Zap, CheckCircle, ShoppingCart } from 'lucide-react';
import AccessoryCard from '../AccessoryCard';
import { Product } from './allProductData';
import ProductSlider from '../ProductSlider';

const AccessoryProductPage: React.FC = () => {
  const { accessoryId } = useParams<{ accessoryId: string }>();
  const [accessory, setAccessory] = useState<Accessory | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCart, setCartOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const currentAccessory = accessories.find(a => a.id === accessoryId);
    if (currentAccessory) {
      setAccessory(currentAccessory);
    }
    window.scrollTo(0, 0);
  }, [accessoryId, navigate]);

  const handleAddToCart = () => {
    if (accessory) {
      const productToAdd: Product = {
        ...accessory,
        alt: accessory.name,
        category: 'Accessory',
      };
      addToCart(productToAdd, 1);
      setCartOpen(true);
    }
  };

  if (!accessory) {
    return <div className="bg-[#FAF9F6] h-screen"></div>; // Loading state with background
  }

  const relatedProducts = accessories.filter(a => a.id !== accessory.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'care', label: 'Care & Warranty' },
  ];

  const featureIcons = {
    "100% Waterproof": <Droplets className="w-6 h-6 text-[#C2A66D]" />,
    "Breathable Fabric": <Wind className="w-6 h-6 text-[#C2A66D]" />,
    "Dust & Allergen Protection": <Shield className="w-6 h-6 text-[#C2A66D]" />,
    "Noiseless Comfort": <Zap className="w-6 h-6 text-[#C2A66D]" />,
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1C2635]">
      {/* ======================= HERO SECTION ======================= */}
      <section className="relative h-[560px] lg:h-[640px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black overflow-hidden">
          <img src="https://images.unsplash.com/photo-1593642702821-c84648185b4a?q=80&w=2070&auto=format&fit=crop" alt="Premium accessory background" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-left">
            <motion.h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              {accessory.name}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-xl text-stone-200 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              {accessory.tagline}
            </motion.p>

            <motion.div
              className="mt-8 flex items-baseline gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <span className="font-sans text-4xl font-bold text-white">₹{accessory.price.toLocaleString('en-IN')}</span>
              <span className="text-stone-300 text-sm">incl. all taxes</span>
            </motion.div>

            <motion.button
              onClick={handleAddToCart}
              className="mt-10 bg-[#C2A66D] text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#C2A66D]/30 transform transition-all duration-300 hover:bg-[#B5965A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            >
              <ShoppingCart size={22} />
              Add to Cart
            </motion.button>
          </div>

          <motion.div
            className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
          >
            {accessory.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
                {featureIcons[highlight as keyof typeof featureIcons] || <CheckCircle className="w-6 h-6 text-[#C2A66D]" />}
                <span className="font-medium text-stone-100">{highlight}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ======================= TABS SECTION ======================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sticky top-20 z-20 bg-[#FAF9F6]/95 backdrop-blur-md py-2 mb-12 rounded-xl">
            <div className="flex justify-center">
              <div className="inline-flex bg-white p-1 rounded-full shadow-md border border-stone-200">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-[#1C2635] text-white shadow-lg'
                        : 'text-stone-500 hover:text-[#1C2635]'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            key={activeTab} // Animate when tab changes
            className="prose max-w-none text-lg text-stone-600 leading-relaxed bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && <p>{accessory.description}</p>}
            {activeTab === 'specifications' && (
              <ul className="list-disc pl-5 space-y-4">
                {Object.entries(accessory.specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-bold text-[#1C2635]">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'care' &&
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C2635] mb-4">Care Instructions</h3>
                  <p>Machine wash cold on a gentle cycle. Tumble dry low. Do not bleach, iron, or dry clean. For best results, wash with other linens.</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#1C2635] mb-4">Warranty</h3>
                  <p>This accessory comes with a {accessory.specifications['Warranty'] || 'standard warranty'}. Please refer to our warranty page for full details.</p>
                </div>
              </div>
            }
          </motion.div>
        </div>
      </section>

      {/* ======================= RELATED PRODUCTS ======================= */}
      <section className="bg-white py-16 sm:py-24 overflow-hidden border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#1C2635] mb-4">You May Also Like</h2>
            <div className="w-24 h-1 bg-[#C2A66D] mx-auto rounded-full" />
          </div>
          <ProductSlider
            items={relatedProducts}
            renderCard={(relatedAccessory) => (
              <AccessoryCard
                {...relatedAccessory}
                onAddToCart={() => {
                  const productToAdd: Product = { ...relatedAccessory, alt: relatedAccessory.name, category: 'Accessory' };
                  addToCart(productToAdd, 1);
                  setCartOpen(true);
                }}
                onCardClick={() => navigate(`/products/accessories/${relatedAccessory.id}`)}
                premiumStyle={true}
              />
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default AccessoryProductPage;