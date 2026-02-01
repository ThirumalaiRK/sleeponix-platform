import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Leaf, Wind, Shield, Heart, Star, CheckCircle, Minus, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from '../../context/CartContext';
import heaven1 from '../../assets/download.png';
import heaven from '../../assets/heaven.png';
import heaven2 from '../../assets/mattress.png';
import heaven4 from '../../assets/heaven4.png';
import heaven5 from '../../assets/heaven5.png';
import spinerelax from '../../assets/spinerelax.png';
import ortho from '../../assets/ortho.png';

const priceData = {
    "72\" X 36\"": { "4\"": 23599, "5\"": 29599, "6\"": 35599, "8\"": 47499 },
    "72\" X 42\"": { "4\"": 27599, "5\"": 34499, "6\"": 40999, "8\"": 54499 },
    "72\" X 48\"": { "4\"": 31999, "5\"": 39999, "6\"": 47999, "8\"": 63999 },
    "72\" X 60\"": { "4\"": 37999, "5\"": 47499, "6\"": 56999, "8\"": 75999 },
    "72\" X 72\"": { "4\"": 45599, "5\"": 56999, "6\"": 68499, "8\"": 91499 },
    "75\" X 36\"": { "4\"": 24599, "5\"": 30999, "6\"": 36999, "8\"": 49499 },
    "75\" X 42\"": { "4\"": 28499, "5\"": 35499, "6\"": 42599, "8\"": 56999 },
    "75\" X 48\"": { "4\"": 33599, "5\"": 41499, "6\"": 49999, "8\"": 66499 },
    "75\" X 60\"": { "4\"": 39599, "5\"": 49499, "6\"": 59499, "8\"": 78999 },
    "75\" X 72\"": { "4\"": 47599, "5\"": 59499, "6\"": 71499, "8\"": 94999 },
    "78\" X 36\"": { "4\"": 25599, "5\"": 31999, "6\"": 38499, "8\"": 51499 },
    "78\" X 42\"": { "4\"": 29499, "5\"": 36999, "6\"": 44499, "8\"": 59999 },
    "78\" X 48\"": { "4\"": 34599, "5\"": 43499, "6\"": 51999, "8\"": 69499 },
    "78\" X 60\"": { "4\"": 41499, "5\"": 51499, "6\"": 61499, "8\"": 81999 },
    "78\" X 72\"": { "4\"": 50499, "5\"": 61999, "6\"": 75999, "8\"": 100999 },
};

const productImages = [
    { src: heaven, alt: 'Full mattress top view' },
    { src: heaven1, alt: 'Side edge and thickness close-up' },
    { src: heaven2, alt: 'Fabric texture zoom view' },
    { src: heaven4, alt: 'Layer cut section showing latex core' },
    { src: heaven5, alt: 'Lifestyle image in a bedroom setup' },
];

const sizes = Object.keys(priceData);
const thicknesses = ["4\"", "5\"", "6\"", "8\""];

const AccordionItem = ({ title, children, isOpen, onClick }) => (
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

const HeveaHeaven: React.FC = () => {
    const { addToCart, setCartOpen } = useCart();
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

    const getPrice = () => priceData[selectedSize]?.[selectedThickness] || 0;

    const handleAddToCart = () => {
        if (!selectedSize || !selectedThickness) {
            setWarning('Please select Size and Thickness');
            return;
        }
        setWarning('');
        addToCart({
            product_id: `hevea-heaven-${selectedSize}-${selectedThickness}`,
            name: "HEVEA HEAVEN",
            size: selectedSize,
            thickness: selectedThickness,
            price: getPrice(),
            quantity,
            warranty: "10 Years",
            category: "Natural Latex",
            image: productImages[0].src,
        });
        setCartOpen(true);
    };

    const handleAccordionClick = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const price = getPrice();

    return (
        <div className="min-h-screen bg-ivory">
            {/* Hero Section (MERGED/UPDATED) */}
            <section className="relative bg-black text-white py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 lg:px-8">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={productImages[4].src}
                        alt="Luxurious bedroom with the HEAVEN mattress"
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
                                10 Years Warranty
                            </span>
                            <span className="px-4 py-1 bg-white/10 border border-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                                Natural Comfort
                            </span>
                        </div>

                        {/* Headlines */}
                        <h1 className="font-serif font-bold text-white text-4xl sm:text-6xl lg:text-7xl">
                            HEVEA HEAVEN
                        </h1>
                        <p className="mt-4 text-xl sm:text-2xl text-white/90 tracking-tight">
                            85 Density 100% Natural Pincore Latex
                        </p>
                        <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
                            Natural, breathable, and durable with orthopedic comfort. Experience nature's comfort with Sleeponix premium natural latex mattresses.
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
                            <span className="text-sm">4.9 (120 reviews)</span>
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

            {/* Selection Section */}
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
                                <h2 className="font-serif text-3xl text-[#1C2635] mb-2 leading-tight">Hevea Heaven</h2>
                                <p className="text-stone-500 text-sm tracking-wide uppercase font-medium">100% Natural Organic Latex</p>
                            </div>

                            {/* Options Scroller */}
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-sm font-bold text-[#1C2635] uppercase tracking-wider">Select Size</h3>
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
                                        {thicknesses.map(th => (
                                            <button
                                                key={th}
                                                onClick={() => setSelectedThickness(th)}
                                                className={`flex-1 py-3 font-medium rounded-lg border transition-all duration-200 ${selectedThickness === th
                                                    ? 'bg-[#1C2635] text-white border-[#1C2635] shadow-lg shadow-stone-200'
                                                    : 'bg-white text-stone-600 border-stone-200 hover:border-[#1C2635] hover:bg-stone-50'
                                                    }`}
                                            >
                                                {th}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="mt-10 pt-6 border-t border-stone-100">
                                <div className="flex items-end gap-3 mb-6">
                                    <span className="text-4xl font-serif font-bold text-[#1C2635]">
                                        ₹{price.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-stone-400 text-sm mb-2 line-through">₹{(price * 1.2).toLocaleString('en-IN')}</span>
                                    <span className="text-green-600 text-xs font-bold mb-2 bg-green-50 px-2 py-1 rounded-full">Save 20%</span>
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
                                    Free Shipping • 10 Year Warranty • No Cost EMI
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

            {/* Tabs Section */}
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
                                    onClick={() => setActiveTab(tab.id as any)}
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
                                    <h2 className="font-serif text-4xl text-[#1C2635] mb-6">experience nature's embrace</h2>
                                    <p className="text-lg text-stone-600 leading-relaxed">
                                        The <strong>Hevea Heaven</strong> isn't just a mattress; it's a commitment to pure, restorative sleep.
                                        Crafted from 100% organic latex, it offers a weightless feel that relieves pressure points while providing
                                        deep, orthopedic support.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { icon: Leaf, title: "100% Organic", desc: "Pure natural latex, free from harmful chemicals." },
                                        { icon: Shield, title: "Orthopedic", desc: "Perfect spinal alignment for pain-free mornings." },
                                        { icon: Wind, title: "Breathable", desc: "Pincore technology triggers natural airflow." },
                                        { icon: Heart, title: "Hypoallergenic", desc: "Naturally resistant to dust mites and mold." }
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
                                        "100% Natural Pincore Latex Core",
                                        "85 Density Medium-Firm Feel",
                                        "GOTS Certified Organic Cover",
                                        "Zero Motion Transfer Technology",
                                        "Naturally Antimicrobial & Dust Mite Resistant",
                                        "10-Year Comprehensive Warranty"
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

            {/* Accordion Section */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <div className="bg-[#FAF9F6] rounded-2xl p-2">
                        <AccordionItem title="Warranty & Care Instructions" isOpen={openAccordion === 1} onClick={() => handleAccordionClick(1)}>
                            <p className="px-4 pb-2 text-stone-600 leading-relaxed">
                                We stand by our quality with a <strong>10-year warranty</strong>. To maintain peak performance, rotate your mattress 180 degrees every 3 months.
                                Always use a waterproof protector to shield against spills. Avoid direct prolonged exposure to sunlight as it may degrade the natural latex.
                            </p>
                        </AccordionItem>
                    </div>
                    <div className="bg-[#FAF9F6] rounded-2xl p-2">
                        <AccordionItem title="Delivery & Return Policy" isOpen={openAccordion === 2} onClick={() => handleAccordionClick(2)}>
                            <p className="px-4 pb-2 text-stone-600 leading-relaxed">
                                Enjoy <strong>Free Delivery</strong> across India within 7-10 business days. We offer a <strong>30-Night Risk-Free Trial</strong>;
                                if you're not perfectly satisfied, return it for a full refund—no questions asked.
                            </p>
                        </AccordionItem>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-24 bg-[#FAF9F6] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl text-[#1C2635] mb-4">Complete Your Sleep Sanctuary</h2>
                        <div className="w-24 h-1 bg-[#C2A66D] mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 hover:shadow-2xl transition-all duration-300">
                            <div className="h-64 overflow-hidden relative">
                                <img src={spinerelax} alt="SPINE RELAX Mattress" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            </div>
                            <div className="p-8 text-center relative">
                                <h3 className="text-2xl font-serif font-bold text-[#1C2635] mb-2">SpineRelax</h3>
                                <p className="text-stone-500 mb-6">Advanced Orthopedic Memory Foam Support</p>
                                <Link to="/products/spinerelax" className="inline-block px-8 py-3 rounded-full border-2 border-[#1C2635] text-[#1C2635] font-bold hover:bg-[#1C2635] hover:text-white transition-all duration-300">
                                    View Product
                                </Link>
                            </div>
                        </div>

                        <div className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-100 hover:shadow-2xl transition-all duration-300">
                            <div className="h-64 overflow-hidden relative">
                                <img src={ortho} alt="ORTHO Mattress" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            </div>
                            <div className="p-8 text-center relative">
                                <h3 className="text-2xl font-serif font-bold text-[#1C2635] mb-2">Ortho</h3>
                                <p className="text-stone-500 mb-6">Firm Support for Ultimate Back Relief</p>
                                <Link to="/products/ortho" className="inline-block px-8 py-3 rounded-full border-2 border-[#1C2635] text-[#1C2635] font-bold hover:bg-[#1C2635] hover:text-white transition-all duration-300">
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
                    className="w-full btn-primary text-lg"
                >
                    Add to Cart
                </button>
                {warning && <p className="text-red-500 text-center mt-2">{warning}</p>}
            </div>

            <Toaster position="top-right" />
        </div>
    );
};

export default HeveaHeaven;