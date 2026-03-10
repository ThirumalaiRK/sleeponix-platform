import React, { useState, useEffect, useRef } from 'react';
import { Wind, Shield, Heart, Star, CheckCircle, Minus, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from '../../context/CartContext'
import { useSEO } from '../../hooks/useSEO';
import { useSchema } from '../../hooks/useSchema';
import orthobed from '../../assets/orthobed.webp';
import ortho from '../../assets/ortho.webp';
import ortho2 from '../../assets/ortho2.webp';
import ortho5 from '../../assets/ortho5.webp';
import ortho3 from '../../assets/ortho3.webp';
import spinerelax from '../../assets/spinerelax.webp';
import heaven from '../../assets/heaven.webp';

const orthoPrices = {
  '182.9 x 91.4': { '5': 15999, '6': 17999 },
  '182.9 x 106.7': { '5': 19999, '6': 21999 },
  '182.9 x 121.9': { '5': 21999, '6': 23999 },
  '182.9 x 152.4': { '5': 25999, '6': 27999 },
  '182.9 x 182.9': { '5': 29999, '6': 32999 },
  '190.5 x 91.4': { '5': 16999, '6': 18999 },
  '190.5 x 106.7': { '5': 20999, '6': 21999 },
  '190.5 x 121.9': { '5': 21999, '6': 23999 },
  '190.5 x 152.4': { '5': 26999, '6': 28999 },
  '190.5 x 182.9': { '5': 30999, '6': 33999 },
  '198.1 x 91.4': { '5': 17999, '6': 18999 },
  '198.1 x 106.7': { '5': 20999, '6': 22999 },
  '198.1 x 121.9': { '5': 22999, '6': 24999 },
  '198.1 x 152.4': { '5': 27999, '6': 30999 },
  '198.1 x 182.9': { '5': 31999, '6': 34999 }
};

const productImages = [
  { src: orthobed, alt: 'ORTHO Mattress top view' },
  { src: ortho, alt: 'ORTHO Mattress side edge' },
  { src: ortho2, alt: 'ORTHO Mattress fabric texture' },
  { src: ortho3, alt: 'ORTHO Mattress layer cut section' },
  { src: ortho5, alt: 'ORTHO Mattress in a bedroom' },
];

const sizes = Object.keys(orthoPrices);
const thicknesses = ["5", "6"];

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full flex justify-between items-center py-4 text-left"
      onClick={onClick}
    >
      <span className="text-lg font-semibold">{title}</span>
      <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && <div className="py-4 text-gray-600">{children}</div>}
  </div>
);

const Ortho: React.FC = () => {
  const { addToCart, setCartOpen } = useCart();

  useSEO({
    title: 'Ortho Firm Mattress | Sleeponix — Medical Grade Back Support',
    description: 'Buy Ortho firm orthopedic mattress for chronic back pain relief. Medical-grade rebonded foam with anti-sagging technology. 5-year warranty. Free delivery India.',
    keywords: 'orthopedic firm mattress, back pain relief mattress, rebonded foam mattress, firm mattress India',
    canonicalPath: '/products/ortho',
  });
  useSchema({
    type: 'Product',
    name: 'Ortho Firm Orthopedic Mattress',
    description: 'Medical-grade rebonded foam orthopedic mattress for firm spinal support and chronic back pain relief. Anti-sagging technology, 5-year warranty.',
    image: '/assets/ortho.webp',
    price: 15999,
    rating: 4.8,
    reviewCount: 95,
    url: '/products/ortho',
  });
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
  const [selectedThickness, setSelectedThickness] = useState<string>(thicknesses[0]);
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'description' | 'features'>('description');
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotate = () => {
    stopAutoRotate();
    autoRotateRef.current = setInterval(() => {
      setImageIndex(prev => (prev + 1) % productImages.length);
    }, 5000);
  };

  const stopAutoRotate = () => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
  };

  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const handleThumbnailClick = (index: number) => {
    stopAutoRotate();
    setImageIndex(index);
    startAutoRotate();
  };

  const getPrice = () => {
    const sizeData = orthoPrices[selectedSize as keyof typeof orthoPrices];
    if (sizeData) {
      return sizeData[selectedThickness as keyof typeof sizeData] || 0;
    }
    return 0;
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedThickness) {
      setWarning('Please select Size and Thickness');
      return;
    }
    setWarning('');
    addToCart({
      id: `ortho-${selectedSize}-${selectedThickness}`,
      name: "ORTHO Mattress",
      size: selectedSize,
      thickness: selectedThickness + '"',
      price: getPrice(),
      image: productImages[0].src,
      description: 'Triple-Layer Comfort',
      alt: 'Ortho Mattress',
      warranty: "5 Years",
      category: "Mattresses",
    }, quantity);
    toast.success(`✅ ${quantity} x ORTHO (${selectedSize} / ${selectedThickness}) added to your cart!`);
    setCartOpen(true);
  };

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const price = getPrice();

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 lg:px-8">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={productImages[4].src}
            alt="Luxurious bedroom with the ORTHO mattress"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1 bg-white/10 border border-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                5 Years Warranty
              </span>
              <span className="px-4 py-1 bg-white/10 border border-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                Orthopedic Support
              </span>
            </div>

            {/* Headlines */}
            <h1 className="font-serif font-bold text-white text-4xl sm:text-6xl lg:text-7xl">
              ORTHO
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-white/90 tracking-tight">
              Engineered for Firm Spinal Support
            </p>
            <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
              Designed with high-density foam and latex layering for orthopedic benefits and superior comfort.
            </p>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3 text-white/90">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    style={{ color: "#C6A878" }}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-sm">4.8 (95 reviews)</span>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                href="#selection"
                className="inline-block bg-[#c7a76d] hover:bg-[#b8955f] text-white font-semibold px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-full shadow-lg shadow-black/30 transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTION (UPDATED THEME) */}
      <section id="selection" className="py-24 bg-gradient-to-b from-[#F9F5F0] to-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-100/20 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT COLUMN: Image & Gallery */}
          <div className="lg:col-span-7" onMouseEnter={stopAutoRotate} onMouseLeave={startAutoRotate}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-stone-200"
              >
                <img
                  src={productImages[imageIndex].src}
                  alt={productImages[imageIndex].alt}
                  className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-700"
                  onClick={() => setIsLightboxOpen(true)}
                />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-stone-600 shadow-sm">
                  Click to expand
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3 mt-6">
              {productImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${imageIndex === idx ? 'border-[#C2A66D] shadow-md ring-2 ring-[#C2A66D]/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  whileHover={{ y: -2 }}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Options & Price */}
          <div className="lg:col-span-5 flex flex-col h-full justify-center">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">

              {/* Product Header */}
              <div className="mb-8 border-b border-stone-100 pb-6">
                <h2 className="font-serif text-3xl text-[#1C2635] mb-2 leading-tight">Ortho</h2>
                <p className="text-stone-500 text-sm tracking-wide uppercase font-medium">Firm Orthopedic Support</p>
              </div>

              {/* Options Scroller */}
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-[#1C2635] uppercase tracking-wider">Select Size (cm)</h3>
                    <span className="text-xs text-[#C2A66D] font-medium cursor-pointer hover:underline">Size Guide</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 px-1 text-xs sm:text-sm font-medium rounded-lg border transition-all duration-200 ${selectedSize === size
                          ? 'bg-[#1C2635] text-white border-[#1C2635] shadow-lg shadow-stone-200'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-[#1C2635] hover:bg-stone-50'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#1C2635] uppercase tracking-wider mb-3">Select Thickness</h3>
                  <div className="flex gap-3">
                    {thicknesses.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedThickness(t)}
                        className={`flex-1 py-3 font-medium rounded-lg border transition-all duration-200 ${selectedThickness === t
                          ? 'bg-[#1C2635] text-white border-[#1C2635] shadow-lg shadow-stone-200'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-[#1C2635] hover:bg-stone-50'
                          }`}
                      >
                        {t}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="mt-10 pt-6 border-t border-stone-100">
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-4xl font-serif font-bold text-[#1C2635]">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-stone-400 text-sm mb-2 line-through">₹{(price * 1.25).toLocaleString('en-IN')}</span>
                  <span className="text-green-600 text-xs font-bold mb-2 bg-green-50 px-2 py-1 rounded-full">Save 25%</span>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center bg-stone-100/50 rounded-xl px-2">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-[#1C2635] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-[#1C2635]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-[#1C2635] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#C2A66D] to-[#A88B52] hover:from-[#B5965A] hover:to-[#967A45] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#C2A66D]/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Add to Cart
                  </motion.button>
                </div>
                {warning && <p className="text-red-500 text-sm text-center mt-3 animate-pulse">{warning}</p>}

                <p className="text-center text-xs text-stone-400 mt-4">
                  Free Shipping • 5 Year Warranty • No Cost EMI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={productImages}
        index={imageIndex}
        plugins={[Thumbnails, Zoom]}
      />

      {/* Tabs Section (UPDATED THEME) */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white p-1 rounded-full shadow-md border border-stone-100">
              {[
                { id: 'description', label: 'Description' },
                { id: 'features', label: 'Specifications' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'description' | 'features')}
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

          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-serif text-4xl text-[#1C2635] mb-6">clinical precision for back relief</h2>
                  <p className="text-lg text-stone-600 leading-relaxed">
                    The <strong>Ortho</strong> is our medically-inspired solution for demanding back support.
                    Engineered with a high-density rebonded foam core, it provides a firm, unyielding surface
                    to correct posture and alleviate chronic spinal stress.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: Shield, title: "Orthopedic", desc: "Clinically designed for optimal spinal alignment." },
                    { icon: Wind, title: "Cooling Tech", desc: "Breathable layers dissipate heat effectively." },
                    { icon: Heart, title: "Pressure Relief", desc: "Firm support reduces stress on lower back." },
                    { icon: CheckCircle, title: "Durable Core", desc: "High-density rebonded foam structure." }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-xl transition-shadow duration-300">
                      <div className="w-16 h-16 mx-auto bg-[#Fdfbf7] rounded-full flex items-center justify-center mb-6 text-[#C2A66D]">
                        <feature.icon size={32} />
                      </div>
                      <h3 className="font-bold text-lg text-[#1C2635] mb-3">{feature.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl border border-stone-100"
              >
                <h3 className="font-serif text-2xl text-[#1C2635] mb-8 text-center">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {[
                    "Medical Grade Rebonded Foam",
                    "High-Density Support Core",
                    "Anti-Sagging Technology",
                    "Premium Knitted Quilted Cover",
                    "Firm Orthopedic Surface",
                    "5-Year Manufacturer Warranty"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-stone-50">
                      <CheckCircle className="text-[#C2A66D] flex-shrink-0" size={20} />
                      <span className="font-medium text-[#1C2635]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Accordion Section (UPDATED THEME) */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="bg-[#FAF9F6] rounded-2xl p-2">
            <AccordionItem title="Warranty & Care Instructions" isOpen={openAccordion === 1} onClick={() => handleAccordionClick(1)}>
              <p className="px-4 pb-2 text-stone-600 leading-relaxed">
                We stand by our quality with a <strong>5-year warranty</strong> against sagging. Rotate your mattress 180 degrees every 3 months.
                Use a mattress protector to keep it fresh and hygienic.
              </p>
            </AccordionItem>
          </div>
          <div className="bg-[#FAF9F6] rounded-2xl p-2">
            <AccordionItem title="Delivery & Return Policy" isOpen={openAccordion === 2} onClick={() => handleAccordionClick(2)}>
              <p className="px-4 pb-2 text-stone-600 leading-relaxed">
                freed Delivery across India. 7-10 business days. Includes our 30-Night Risk-Free Trial;
                sleep on it, and if it's not right, returning it is hassle-free.
              </p>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* Related Products (UPDATED THEME) */}
      <section className="py-24 bg-[#FAF9F6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C2635] mb-4">Complete Your Sleep Sanctuary</h2>
            <div className="w-24 h-1 bg-[#C2A66D] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Product 1: SpineRelax (Cross-sell/Alternative) */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 hover:shadow-2xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img src={spinerelax} alt="SpineRelax Mattress" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-8 text-center relative">
                <h3 className="text-2xl font-serif font-bold text-[#1C2635] mb-2">SpineRelax</h3>
                <p className="text-stone-500 mb-6">Dual-Layer Orthopedic Comfort</p>
                <Link to="/products/spine-relax" className="inline-block px-8 py-3 rounded-full border-2 border-[#1C2635] text-[#1C2635] font-bold hover:bg-[#1C2635] hover:text-white transition-all duration-300">
                  View Product
                </Link>
              </div>
            </div>

            {/* Product 2: Hevea Heaven (Up-sell) */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 hover:shadow-2xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img src={heaven} alt="HEVEA HEAVEN Mattress" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-8 text-center relative">
                <h3 className="text-2xl font-serif font-bold text-[#1C2635] mb-2">Hevea Heaven</h3>
                <p className="text-stone-500 mb-6">100% Natural Organic Latex</p>
                <Link to="/products/hevea-heaven" className="inline-block px-8 py-3 rounded-full border-2 border-[#1C2635] text-[#1C2635] font-bold hover:bg-[#1C2635] hover:text-white transition-all duration-300">
                  View Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky Add to Cart */}
      <div className="hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
        <button
          onClick={handleAddToCart}
          className="w-full bg-gold-champagne hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
        >
          Add to Cart
        </button>
        {warning && <p className="text-red-500 text-center mt-2">{warning}</p>}
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Ortho;