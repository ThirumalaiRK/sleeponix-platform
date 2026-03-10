import React, { useState, useEffect } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    MapPin,
    Shield,
    Ruler,
    Search,
    ShoppingCart,
    Plus,
    Minus,
    Trash2
} from 'lucide-react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

import AccessoryPopup from './AccessoryPopup';
import { accessories } from './products/accessories';
import { mattressData } from './products/mattressData';

import curve2 from '../assets/curve2.webp';
import spillow from '../assets/spillow4.webp';
import pillow from '../assets/pillow1.webp';

const Navigation: React.FC = () => {

    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartCount,
        isCartOpen,
        setCartOpen
    } = useCart();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    /* Scroll effect */

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Disable body scroll when cart open */
    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    }, [isCartOpen]);

    /* Close Megamenu + Desktop Search when clicking outside */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (isShopMenuOpen && !target.closest(".shop-menu-container")) {
                setIsShopMenuOpen(false);
            }
            if (showSearch && !target.closest(".search-container")) {
                setShowSearch(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isShopMenuOpen, showSearch]);

    /* Auto-close menus on route change */
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsShopMenuOpen(false);
        setShowSearch(false);
        setCartOpen(false);
    }, [location.pathname]);

    const handleNavigation = (href: string) => {
        if (href.startsWith("#")) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(href);
        }
        setIsMobileMenuOpen(false);
        setIsShopMenuOpen(false);
        setShowSearch(false);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/shop?search=${searchQuery}`);
        setShowSearch(false);
    };

    const getNavTextColor = () => (isScrolled || !isHomePage ? "text-[#1C2635]" : "text-white");
    const getTotalPrice = () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0);

    /* Menu Items */
    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'Our Story', href: '/our-story' },
        {
            name: 'Shop',
            href: '/shop',
            megaMenu: {
                Mattresses: mattressData,
                Pillows: [
                    {
                        name: 'Shredded Latex Pillow',
                        description: 'Soft, breathable comfort',
                        size: 'Standard Size',
                        image: spillow,
                        href: '/products/pillows/shredded-latex-pillow'
                    },
                    {
                        name: 'Standard Latex Pillow',
                        description: 'Balanced firmness',
                        size: 'Standard Size',
                        image: pillow,
                        href: '/products/pillows/standard-latex-pillow'
                    },
                    {
                        name: 'Curves Latex Pillow',
                        description: 'Ergonomic design',
                        size: 'Contour Size',
                        image: curve2,
                        href: '/products/pillows/curves-latex-pillow'
                    }
                ],
                Accessories: accessories.map(acc => ({
                    name: acc.name,
                    description: acc.tagline,
                    image: acc.image,
                    href: `/products/accessories/${acc.id}`
                })),
                'Special Collections': [
                    {
                        name: 'Kids Latex',
                        description: '100% Natural & Safe',
                        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=200',
                        href: '/products/kids-latex'
                    },
                    {
                        name: 'Pet Latex',
                        description: 'Durable Toys for Pets',
                        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=200',
                        href: '/products/pet-latex'
                    }
                ]
            }
        },
        { name: 'Find Your Match', href: '/find-match' },
        { name: 'Store Finder', href: '/store-finder', icon: MapPin },

        { name: 'Warranty', href: '/warranty', icon: Shield },
        { name: 'Measure Bed Size', href: '/measure-bed-size', icon: Ruler }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? "bg-white shadow-md" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* LOGO */}
                    <div className="flex-1 flex justify-start">
                        <Link to="/" onClick={() => handleNavigation("/")}>
                            <img
                                src={isScrolled || !isHomePage ? "/images/og logo.png" : "/images/white logo.png"}
                                alt="Sleeponix"
                                className="h-10"
                            />
                        </Link>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
                        {menuItems.map(item => (
                            <div key={item.name} className={`relative ${item.megaMenu ? "shop-menu-container" : ""}`}>
                                {item.megaMenu ? (
                                    <>
                                        <button
                                            onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
                                            className={`flex items-center space-x-1 ${getNavTextColor()}`}
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDown size={16} className={`transition-transform ${isShopMenuOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {/* MEGA MENU */}
                                        {isShopMenuOpen && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[1000px] bg-white border rounded-2xl shadow-2xl p-8 z-50">
                                                <div className="grid grid-cols-4 gap-8">
                                                    {Object.entries(item.megaMenu).map(([category, products]) => (
                                                        <div key={category}>
                                                            <h3 className="text-xs uppercase text-gray-500 font-bold mb-4">{category}</h3>

                                                            {/* MATTRESSES */}
                                                            {category === "Mattresses" && products.map((p: any) => (
                                                                <Link key={p.name} to={p.href} onClick={() => handleNavigation(p.href)} className="block p-2 rounded-lg hover:bg-gray-50">
                                                                    <p className="font-semibold">{p.name}</p>
                                                                    <p className="text-xs text-gray-500">{p.description}</p>
                                                                </Link>
                                                            ))}

                                                            {/* PILLOWS */}
                                                            {category === "Pillows" && products.map((p: any) => (
                                                                <Link key={p.name} to={p.href} onClick={() => handleNavigation(p.href)} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                                                                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md bg-gray-100 object-cover" loading="lazy" />
                                                                    <div>
                                                                        <p className="font-semibold">{p.name}</p>
                                                                        <p className="text-xs text-gray-600">{p.description}</p>
                                                                        <p className="text-xs text-gray-500">{p.size}</p>
                                                                    </div>
                                                                </Link>
                                                            ))}

                                                            {/* ACCESSORIES */}
                                                            {category === "Accessories" && (
                                                                <>
                                                                    {products.map((acc: any) => (
                                                                        <Link key={acc.name} to={acc.href} onClick={() => handleNavigation(acc.href)} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                                                                            <img src={acc.image} alt={acc.name} className="w-12 h-12 rounded-md object-cover" loading="lazy" />
                                                                            <div>
                                                                                <p className="font-semibold">{acc.name}</p>
                                                                                <p className="text-xs text-gray-600">{acc.description}</p>
                                                                            </div>
                                                                        </Link>
                                                                    ))}

                                                                    <Link to="/shop" onClick={() => handleNavigation('/shop')} className="text-green-700 font-semibold text-sm mt-4 block">
                                                                        All Products →
                                                                    </Link>
                                                                </>
                                                            )}

                                                            {/* SPECIAL COLLECTIONS */}
                                                            {category === "Special Collections" && products.map((p: any) => (
                                                                <Link key={p.name} to={p.href} onClick={() => handleNavigation(p.href)} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50">
                                                                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md bg-gray-100 object-cover" loading="lazy" />
                                                                    <div>
                                                                        <p className="font-semibold">{p.name}</p>
                                                                        <p className="text-xs text-gray-600">{p.description}</p>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.href}
                                        onClick={() => handleNavigation(item.href)}
                                        className={`${location.pathname === item.href ? "text-[#C2A66D] font-bold border-b-2 border-[#C2A66D]" : getNavTextColor()} whitespace-nowrap transition-all duration-200`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP RIGHT ICONS */}
                    <div className="hidden lg:flex flex-1 justify-end items-center space-x-4">

                        {/* DESKTOP SEARCH DROPDOWN */}
                        <div className="relative search-container">
                            <button onClick={() => setShowSearch(!showSearch)} className={getNavTextColor()}>
                                <Search size={24} />
                            </button>

                            <AnimatePresence>
                                {showSearch && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <form onSubmit={handleSearchSubmit} className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}
                                                placeholder="Search for products..."
                                                className="w-64 bg-white rounded-lg py-2 pl-4 pr-10 shadow-lg border"
                                                autoFocus
                                            />
                                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                <Search size={20} />
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* CART */}
                        <button onClick={() => setCartOpen(true)} className={`relative ${getNavTextColor()}`}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* MOBILE ICONS */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <button onClick={() => setShowSearch(true)} className={getNavTextColor()}>
                            <Search size={24} />
                        </button>
                        <button onClick={() => setCartOpen(true)} className={`relative ${getNavTextColor()}`}>
                            <ShoppingCart size={24} />
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(true)} className={getNavTextColor()}>
                            <Menu size={28} />
                        </button>
                    </div>

                </div>
            </div>


            {/* MOBILE SEARCH OVERLAY */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSearch(false)}
                    >
                        <div onClick={e => e.stopPropagation()}>
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search…"
                                    className="w-80 sm:w-96 bg-white rounded-full py-3 px-6 text-lg"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Search size={24} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* CART DRAWER */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="fixed inset-0 bg-black/50" onClick={() => setCartOpen(false)} />

                        <motion.div
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                        >
                            <div className="flex flex-col h-full">

                                {/* CART HEADER */}
                                <div className="flex justify-between items-center p-6 border-b">
                                    <h2 className="text-2xl font-bold">Your Cart</h2>
                                    <button onClick={() => setCartOpen(false)}>
                                        <X size={28} />
                                    </button>
                                </div>

                                {/* EMPTY CART */}
                                {cartItems.length === 0 ? (
                                    <div className="flex-grow flex flex-col justify-center items-center">
                                        <ShoppingCart size={60} className="text-gray-300" />
                                        <p className="text-gray-500 mt-2">Your cart is empty</p>
                                    </div>
                                ) : (

                                    <>
                                        {/* CART ITEMS */}
                                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                                            {cartItems.map(item => (
                                                <div key={item.id} className="flex items-start space-x-4">
                                                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" loading="lazy" />

                                                    <div className="flex-grow">
                                                        <h4 className="font-semibold">{item.name}</h4>
                                                        <p className="text-gray-500 text-sm">₹{item.price.toLocaleString()}</p>

                                                        <div className="flex items-center mt-3">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-100">
                                                                <Minus size={16} />
                                                            </button>

                                                            <span className="px-4">{item.quantity}</span>

                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-100">
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 size={20} className="text-gray-400 hover:text-red-600" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* ⭐ UPDATED CART FOOTER (your new code) */}
                                        <div className="p-6 border-t bg-gray-50">
                                            <div className="flex justify-between items-center mb-4 text-lg font-semibold">
                                                <span>Subtotal</span>
                                                <span>₹{getTotalPrice().toLocaleString()}</span>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    navigate('/cart');
                                                    setCartOpen(false);
                                                }}
                                                className="w-full bg-[#c7a66d] text-white font-bold py-4 rounded-full text-lg hover:bg-[#b39561] transition-colors"
                                            >
                                                View Cart
                                            </button>
                                        </div>
                                    </>
                                )}

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="fixed inset-0 bg-black/25" onClick={() => setIsMobileMenuOpen(false)} />

                        <motion.div
                            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white p-6"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Menu</h2>
                                <button onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="mt-8 mb-8 h-[calc(100vh-120px)] overflow-y-auto pb-12 pr-2 custom-scrollbar">
                                {menuItems.map(item => (
                                    <div key={item.name} className="border-b border-gray-100 last:border-0 py-4">
                                        {item.megaMenu ? (
                                            <div className="space-y-4">
                                                <p className={`text-xl font-serif font-bold ${location.pathname.includes(item.href) ? "text-[#C2A66D]" : "text-[#1C2635]"}`}>
                                                    {item.name}
                                                </p>

                                                <div className="pl-4 space-y-6">
                                                    {Object.entries(item.megaMenu).map(([category, products]) => (
                                                        <div key={category}>
                                                            <h4 className="text-sm uppercase text-[#1C2635] font-bold mb-3 tracking-widest border-b border-gray-100 pb-1">{category}</h4>
                                                            <div className="space-y-3">
                                                                {category === "Special Collections" ? (
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        {products.map((p: any) => (
                                                                            <Link
                                                                                key={p.name}
                                                                                to={p.href}
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                                className={`
                                                                                    group relative overflow-hidden rounded-xl p-4 text-center border transition-all duration-300
                                                                                    ${p.name.includes("Kids")
                                                                                        ? "bg-blue-50 border-blue-100 hover:border-blue-300 hover:bg-blue-100"
                                                                                        : "bg-orange-50 border-orange-100 hover:border-orange-300 hover:bg-orange-100"
                                                                                    }
                                                                                `}
                                                                            >
                                                                                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                                                <span className={`text-2xl mb-2 block transform group-hover:scale-110 transition-transform duration-300`}>
                                                                                    {p.name.includes("Kids") ? "👶" : "🐾"}
                                                                                </span>

                                                                                <p className={`
                                                                                    font-bold text-sm relative z-10 transition-colors duration-300
                                                                                    ${p.name.includes("Kids") ? "text-blue-800" : "text-orange-800"}
                                                                                `}>
                                                                                    {p.name}
                                                                                </p>

                                                                                {/* Animated underline */}
                                                                                <div className={`
                                                                                    mx-auto mt-1 h-0.5 w-0 group-hover:w-1/2 transition-all duration-300 rounded-full
                                                                                    ${p.name.includes("Kids") ? "bg-blue-400" : "bg-orange-400"}
                                                                                `}></div>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    products.map((p: any) => (
                                                                        <Link
                                                                            key={p.name || p.id} // handling accessories which might rely on index or id
                                                                            to={p.href}
                                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                                            className={`block text-sm ${location.pathname === p.href ? "text-[#C2A66D] font-bold" : "text-gray-600 hover:text-[#C2A66D]"}`}
                                                                        >
                                                                            {p.name}
                                                                        </Link>
                                                                    ))
                                                                )}

                                                                {/* Add "All Products" link for Accessories specific logic from desktop if needed, though usually mapped in products */}
                                                                {category === "Accessories" && (
                                                                    <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1B4D3E] font-bold text-xs mt-2 block">
                                                                        View All Accessories →
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`block text-xl font-serif font-bold ${location.pathname === item.href ? "text-[#C2A66D]" : "text-[#1C2635]"}`}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <AccessoryPopup accessoryId={selectedAccessory} onClose={() => setSelectedAccessory(null)} />

        </nav>
    );
};

export default Navigation;
