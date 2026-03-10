import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, ChevronDown, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useSEO } from '../../hooks/useSEO';
import { useSchema } from '../../hooks/useSchema';

const KidsLatexPage: React.FC = () => {
    const { setCartOpen, addToCart } = useCart();

    useSEO({
        title: 'Kids Natural Latex Mattress | Sleeponix — Safe, Organic & Spine-Friendly',
        description: 'Buy 100% natural Talalay latex mattress for kids. Hypoallergenic, breathable, Oeko-Tex certified. Supports growing spines safely. Free delivery across India.',
        keywords: 'kids latex mattress, children mattress India, organic kids mattress, natural talalay latex for kids',
        canonicalPath: '/products/kids-latex',
    });
    useSchema({
        type: 'Product',
        name: 'Kids Natural Latex Mattress',
        description: '100% Natural Talalay Latex mattress for children. Hypoallergenic, breathable, Oeko-Tex certified. Supports healthy spinal development.',
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000',
        price: 12900,
        rating: 5.0,
        reviewCount: 428,
        url: '/products/kids-latex',
    });
    const [selectedSize, setSelectedSize] = useState('Twin');
    const [firmness, setFirmness] = useState('Medium Soft');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000"
    ];

    const currentPrice = 12900;
    const originalPrice = 15900;

    const handleAddToCart = () => {
        const product = {
            id: `kids-latex-${selectedSize}-${firmness.replace(' ', '-')}`.toLowerCase(),
            name: `Kids Natural Latex Mattress (${selectedSize})`,
            price: currentPrice,
            image: images[0],
            description: `${firmness} firmness, ${selectedSize} size.`,
            category: 'Mattresses' as const,
            rating: 5,
            reviewCount: 428,
            badges: ['Best Seller'],
            alt: "Kids Natural Latex Mattress"
        };

        addToCart(product, quantity);
        toast.success("Added to cart!");
        setCartOpen(true);
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
                <span className="hover:text-deep-indigo cursor-pointer">Home</span> /
                <span className="hover:text-deep-indigo cursor-pointer"> Shop</span> /
                <span className="font-semibold text-deep-indigo"> Kids</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Images */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                            <span className="absolute top-6 left-6 bg-[#1B4D3E] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-sm">
                                Best Seller
                            </span>
                            <img
                                src={images[activeImage]}
                                alt="Kids Latex Mattress"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#1B4D3E] ring-2 ring-[#1B4D3E]/20' : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                            <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="w-10 h-10 bg-[#1B4D3E] rounded-full flex items-center justify-center text-white">
                                    <span className="text-sm font-bold tracking-wider">Play</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-[#C6A878]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-sm text-gray-500">(428 Reviews)</span>
                        </div>

                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                            Natural Latex Comfort Support for Kids
                        </h1>
                        <p className="text-[#1B4D3E] font-semibold text-sm tracking-wide mb-6">
                            SOFT • BREATHABLE • SPINE-FRIENDLY
                        </p>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-bold text-gray-900">₹{currentPrice.toLocaleString()}</span>
                            <span className="text-xl text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                            <span className="bg-[#C6A878]/10 text-[#C6A878] border border-[#C6A878]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                -20% OFF
                            </span>
                        </div>

                        {/* Sizes */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-gray-900">Select Size</span>
                                <button className="text-[#C6A878] text-sm font-medium hover:underline hover:text-opacity-80">Size Guide</button>
                            </div>
                            <div className="flex gap-3">
                                {['Toddler', 'Twin', 'Full'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex-1 py-3 px-4 rounded-full border transition-all ${selectedSize === size
                                            ? 'border-[#1B4D3E] bg-[#1B4D3E]/5 text-[#1B4D3E] font-bold shadow-sm'
                                            : 'border-gray-200 text-gray-600 hover:border-[#1B4D3E]/50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Firmness */}
                        <div className="mb-8">
                            <span className="font-semibold text-gray-900 block mb-3">Firmness Level</span>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Medium Soft', sub: 'Best for side sleepers' },
                                    { label: 'Medium Firm', sub: 'Best for back support' }
                                ].map(opt => (
                                    <button
                                        key={opt.label}
                                        onClick={() => setFirmness(opt.label)}
                                        className={`p-4 rounded-xl border text-left transition-all ${firmness === opt.label
                                            ? 'border-[#1B4D3E] bg-[#1B4D3E]/5 ring-1 ring-[#1B4D3E]'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`font-bold ${firmness === opt.label ? 'text-[#1B4D3E]' : 'text-gray-900'}`}>{opt.label}</div>
                                        <div className={`text-xs mt-1 ${firmness === opt.label ? 'text-[#1B4D3E]/70' : 'text-gray-500'}`}>{opt.sub}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center border border-gray-200 rounded-full px-4 h-14 bg-gray-50">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-[#1B4D3E]">
                                    <Minus size={16} />
                                </button>
                                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-[#1B4D3E]">
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#1B4D3E] hover:bg-[#153d30] text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#1B4D3E]/20"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>

                            <button className="h-14 w-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-[#C6A878] transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>

                        {/* Accordion */}
                        <div className="border-t border-gray-200">
                            <div className="py-4 border-b border-gray-200 group cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-900">Description</span>
                                    <ChevronDown className="group-hover:text-[#1B4D3E] transition-colors" />
                                </div>
                                <div className="mt-2 text-gray-600 text-sm leading-relaxed">
                                    Experience the purest sleep for your child with our 100% natural Talalay latex mattress. Designed specifically for growing bodies, it provides optimal spinal alignment while remaining soft enough for comfort.
                                </div>
                            </div>
                            <details className="py-4 border-b border-gray-200 group cursor-pointer">
                                <summary className="flex justify-between items-center list-none hover:text-[#1B4D3E] transition-colors font-bold text-gray-900">
                                    Specifications & Materials
                                    <ChevronDown className="transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-4 space-y-3 text-sm text-gray-600">
                                    <div className="flex justify-between"><span className="font-medium">Core Material:</span><span>100% Natural Talalay Latex</span></div>
                                    <div className="flex justify-between"><span className="font-medium">Cover:</span><span>Organic Cotton (GOTS Certified)</span></div>
                                    <div className="flex justify-between"><span className="font-medium">Thickness:</span><span>6 inches</span></div>
                                    <div className="flex justify-between"><span className="font-medium">Certification:</span><span>Oeko-Tex Standard 100</span></div>
                                    <div className="flex justify-between"><span className="font-medium">Origin:</span><span>Handcrafted in Kerala, India</span></div>
                                </div>
                            </details>
                            <details className="py-4 border-b border-gray-200 group cursor-pointer">
                                <summary className="flex justify-between items-center list-none hover:text-[#1B4D3E] transition-colors font-bold text-gray-900">
                                    Shipping & Returns
                                    <ChevronDown className="transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-4 text-sm text-gray-600 space-y-2">
                                    <p><strong>Free Shipping:</strong> Delivered within 5-7 business days across India.</p>
                                    <p><strong>100-Night Trial:</strong> Try it risk-free. If you don't love it, we'll pick it up and give you a full refund.</p>
                                    <p><strong>Warranty:</strong> 10-year unmatched warranty against sagging and manufacturing defects.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Value Props */}
                <section className="mt-24 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">Sleeponix Kids</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🌿",
                                title: "Natural & Safe for Your Baby",
                                desc: "100% natural Talalay latex free from toxic chemicals, off-gassing, and synthetic foams."
                            },
                            {
                                icon: "🦴",
                                title: "Gentle Support for Growing Bodies",
                                desc: "Provides optimal spinal alignment and pressure relief essential for childhood development."
                            },
                            {
                                icon: "💨",
                                title: "Breathable & Temperature Regulating",
                                desc: "Open-cell structure allows constant airflow, preventing night sweats and overheating."
                            },
                            {
                                icon: "🛡️",
                                title: "Hypoallergenic Protection",
                                desc: "Naturally resistant to dust mites, mold, and mildew — perfect for sensitive skin and allergies."
                            },
                            {
                                icon: "🌱",
                                title: "Eco-Friendly & Sustainable",
                                desc: "Ethically sourced materials that are completely biodegradable and kind to the planet."
                            },
                            {
                                icon: "⭐",
                                title: "Durable & Long-Lasting Quality",
                                desc: "Maintains its shape and supportive qualities for years without sagging or flattening."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-[#1B4D3E]/20 transition-all duration-300 group">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default KidsLatexPage;
