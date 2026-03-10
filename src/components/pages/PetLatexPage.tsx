import React, { useState } from 'react';
import { Star, ShoppingCart, Video, Award, Cat, Dog, Tag, Check, Play } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { useSEO } from '../../hooks/useSEO';
import { useSchema } from '../../hooks/useSchema';

const PetLatexPage: React.FC = () => {
    const { setCartOpen, addToCart } = useCart();

    useSEO({
        title: 'Natural Latex Pet Toy | Sleeponix — Safe, Vet-Approved for Dogs & Cats',
        description: 'Buy 100% natural Hevea latex pet toy for dogs and cats. Chemical-free, vet-approved, durable with built-in squeaker. Free delivery. Buy 2 get 10% off.',
        keywords: 'natural latex dog toy, organic pet toy India, vet approved dog toy, latex cat toy',
        canonicalPath: '/products/pet-latex',
    });
    useSchema({
        type: 'Product',
        name: 'Soft Natural Latex Pet Comfort Toy',
        description: '100% natural Hevea latex pet toy for dogs and cats. Chemical-free, vet-approved, durable with built-in squeaker. Available in 3 sizes and 3 colors.',
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1000',
        price: 1999,
        rating: 4.8,
        reviewCount: 1240,
        url: '/products/pet-latex',
    });
    const [petType, setPetType] = useState('Dog');
    const [size, setSize] = useState('M');
    const [color, setColor] = useState('Cyan');
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000"
    ];

    const currentPrice = 1999;
    const originalPrice = 2499;

    const handleAddToCart = () => {
        const product = {
            id: `pet-latex-${petType}-${size}-${color}`.toLowerCase(),
            name: `Soft Natural Latex Comfort Toy (${petType} - ${size})`,
            price: currentPrice,
            image: images[0],
            description: `${petType} toy in ${color}, Size ${size}.`,
            category: 'Accessories' as const,
            rating: 4.8,
            reviewCount: 1240,
            badges: ['New Arrival'],
            alt: `Natural Latex ${petType} Toy`
        };

        addToCart(product, 1);
        toast.success("Added to cart!");
        setCartOpen(true);
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
                <span className="hover:text-deep-indigo cursor-pointer">Home</span> /
                <span className="hover:text-deep-indigo cursor-pointer"> Shop</span> /
                <span className="font-semibold text-deep-indigo"> Pets</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                            <span className="absolute top-6 left-6 bg-[#1B4D3E] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10">
                                Best Seller
                            </span>
                            <img src={images[activeImage]} alt="Pet Mattress" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 box-content transition-colors ${activeImage === idx ? 'border-[#1B4D3E] ring-2 ring-[#1B4D3E]/20' : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer text-gray-400 hover:text-[#1B4D3E] transition-colors">
                                <Video size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight mb-2">
                            Natural Latex<br />Pet Comfort Mattress
                        </h1>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-sm text-gray-400 border-b border-gray-300 pb-0.5 ml-2">1,240 reviews</span>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl font-bold">₹{currentPrice.toLocaleString()}</span>
                            <span className="text-xl text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                            <span className="bg-[#C6A878]/10 text-[#C6A878] border border-[#C6A878]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                -22% OFF
                            </span>
                        </div>

                        <div className="mb-6">
                            <span className="font-bold text-sm block mb-3">Pet Type</span>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setPetType('Dog')}
                                    className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-all ${petType === 'Dog' ? 'bg-[#1B4D3E]/5 text-[#1B4D3E] border border-[#1B4D3E]' : 'border border-gray-200 text-gray-600 hover:border-[#1B4D3E]/50'
                                        }`}
                                >
                                    <Dog size={18} /> Dog
                                </button>
                                <button
                                    onClick={() => setPetType('Cat')}
                                    className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 font-medium transition-all ${petType === 'Cat' ? 'bg-[#1B4D3E]/5 text-[#1B4D3E] border border-[#1B4D3E]' : 'border border-gray-200 text-gray-600 hover:border-[#1B4D3E]/50'
                                        }`}
                                >
                                    <Cat size={18} /> Cat
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-12 mb-8">
                            <div>
                                <div className="flex justify-between items-center mb-3 w-32">
                                    <span className="font-bold text-sm">Size</span>
                                    <span className="text-[#C6A878] text-xs underline cursor-pointer hover:text-opacity-80">Size Guide</span>
                                </div>
                                <div className="flex gap-2">
                                    {['S', 'M', 'L'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${size === s ? 'bg-[#1B4D3E] text-white shadow-md' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-[#1B4D3E]/50'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="font-bold text-sm block mb-3">Color</span>
                                <div className="flex gap-3">
                                    {['Natural', 'Charcoal', 'Olive'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`w-12 h-12 rounded-full border-2 transition-all p-0.5 ${color === c ? 'border-[#1B4D3E]' : 'border-transparent hover:border-gray-300'
                                                }`}
                                            title={c}
                                        >
                                            <div className={`w-full h-full rounded-full ${c === 'Natural' ? 'bg-[#EAE6DF]' :
                                                c === 'Charcoal' ? 'bg-[#2D3436]' : 'bg-[#4A5D23]'
                                                }`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-[#1B4D3E] hover:bg-[#153d30] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 mb-4 shadow-lg shadow-[#1B4D3E]/20 transition-all text-lg"
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </button>

                        <div className="bg-[#C6A878]/10 border border-[#C6A878]/20 rounded-xl p-3 flex items-center justify-center gap-2 text-sm text-[#1B4D3E] font-medium mb-8">
                            <Tag size={16} className="text-[#C6A878]" />
                            Buy 2 Get 10% Off automatically at checkout!
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-3 rounded-2xl">
                                <div className="bg-white p-2.5 rounded-xl text-[#C6A878] shadow-sm"><Award size={20} /></div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900">Vet-Approved</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">SAFETY FIRST</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-3 rounded-2xl">
                                <div className="bg-white p-2.5 rounded-xl text-[#1B4D3E] shadow-sm"><Check size={20} /></div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900">Gentle on Joints</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">SOFT LATEX</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Message */}
                <div className="mt-16 bg-[#1B4D3E]/5 border border-[#1B4D3E]/10 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-inner">
                    <h2 className="text-2xl font-serif font-bold text-[#1B4D3E] mb-4">SLEEPONIX FURRY PETS</h2>
                    <p className="text-gray-700 leading-relaxed md:text-lg">
                        At Sleeponix, we believe pets deserve the same comfort and care as their owners.
                        The Sleeponix Pets Latex Mattress is crafted from natural latex, providing gentle support,
                        durability, and a healthy sleeping surface for your beloved pets.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mt-20">
                    <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Why Pets Love It</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { title: "100% Natural Material", text: "Made from sustainable Hevea tree sap, free from harmful chemicals.", icon: "🌿" },
                            { title: "Pressure Relief", text: "Provides orthopedic joint support for pets of all ages.", icon: "🦴" },
                            { title: "Easy to Clean", text: "Water-resistant surface. Removable, machine-washable organic cover.", icon: "💧" },
                            { title: "Durable Design", text: "Resistant to scratching and digging, ensuring long-lasting comfort.", icon: "🛡️" }
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-gray-100 hover:border-[#1B4D3E]/30 p-6 rounded-2xl hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-gray-50 group-hover:bg-[#1B4D3E]/5 rounded-full flex items-center justify-center text-2xl mb-4 transition-colors">
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Section */}
                <section className="mt-20">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Rest & Recovery</h2>
                    <p className="text-gray-500 mb-8">Perfect for every moment of your pet's day.</p>

                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 grid lg:grid-cols-2">
                        <div className="relative h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=1000"
                                alt="Dog Sleeping on Bed"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-white/90 shadow-lg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play fill="#1B4D3E" className="text-[#1B4D3E] ml-1" />
                                </div>
                            </div>
                        </div>

                        <div className="p-12 flex flex-col justify-center bg-gray-50/50">
                            <span className="inline-block bg-[#C6A878]/10 text-[#C6A878] border border-[#C6A878]/20 px-3 py-1 rounded-full text-xs font-bold w-fit mb-4 uppercase tracking-wider">
                                Deep Sleep
                            </span>
                            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Built for Joint Support</h3>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                The natural resilience of latex provides necessary push-back support, lifting older pets and supporting their weight rather than letting them sink in, reducing joint pressure immensely.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <span className="text-[#1B4D3E] bg-[#1B4D3E]/10 p-1.5 rounded-full"><Check size={14} strokeWidth={3} /></span> Alleviates arthritis pain
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <span className="text-[#1B4D3E] bg-[#1B4D3E]/10 p-1.5 rounded-full"><Check size={14} strokeWidth={3} /></span> Regulates sleeping temperature
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                    <span className="text-[#1B4D3E] bg-[#1B4D3E]/10 p-1.5 rounded-full"><Check size={14} strokeWidth={3} /></span> Naturally resists doggy odors
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Reviews Section - Simplified */}
                {/* Reviews Section - Simplified */}
                <section className="mt-20 bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-20 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Customer Reviews</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-gray-900">4.8</span>
                                <div className="flex text-[#C6A878]">
                                    <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" className="text-gray-300" />
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">Based on 1,240 reviews</p>
                            <button className="mt-6 border-2 border-[#1B4D3E] text-[#1B4D3E] px-6 py-2 rounded-full font-bold hover:bg-[#1B4D3E] hover:text-white transition-colors">
                                Write a Review
                            </button>
                        </div>

                        <div className="flex-1 w-full max-w-lg space-y-2">
                            {[
                                { star: 5, pct: 78, color: "bg-[#1B4D3E]" },
                                { star: 4, pct: 15, color: "bg-[#1B4D3E]" },
                                { star: 3, pct: 4, color: "bg-[#1B4D3E]/70" },
                                { star: 2, pct: 1, color: "bg-[#1B4D3E]/30" },
                                { star: 1, pct: 2, color: "bg-[#1B4D3E]/30" }
                            ].map(row => (
                                <div key={row.star} className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                    <span>{row.star}</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                                    </div>
                                    <span className="w-6 text-right">{row.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PetLatexPage;
