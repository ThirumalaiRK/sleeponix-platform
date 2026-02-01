import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ChevronLeft } from 'lucide-react';
import { allProducts, Product } from '../products/allProductData';
import { useCart } from '../../context/CartContext';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, setToast, setCartOpen } = useCart();

    useEffect(() => {
        const foundProduct = allProducts.find(p => p.id === productId);
        setProduct(foundProduct || null);
    }, [productId]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
            setToast({
                message: `${product.name} added to cart!`,
                actionText: "View Cart",
                onAction: () => {
                    setToast(null);
                    setCartOpen(true);
                },
            });
            setCartOpen(true);
        }
    };

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
                    <Link to="/shop" className="text-blue-600 hover:underline">
                        &larr; Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link to="/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-6 font-medium">
                        <ChevronLeft size={20} />
                        Back to Shop
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover aspect-[4/3]" />
                        </motion.div>

                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">{product.name}</h1>
                            <p className="text-lg text-gray-600 mt-3">{product.description}</p>

                            {product.rating && (
                                <div className="flex items-center mt-4 gap-2">
                                    <div className="flex">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={22} className={i < product.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">({product.rating} reviews)</span>
                                </div>
                            )}

                            <div className="mt-6">
                                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                                {product.oldPrice && <span className="text-lg text-gray-500 line-through ml-3">₹{product.oldPrice.toLocaleString()}</span>}
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-l-lg">-</button>
                                    <span className="px-5 py-3 font-semibold">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-r-lg">+</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-[#D2AA72] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#c19b67] transition-all shadow-md"
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <div className="mt-8 space-y-4 text-gray-700">
                                <p><strong className="font-semibold">Category:</strong> {product.category}</p>
                                {product.tags && <p><strong className="font-semibold">Tags:</strong> {product.tags.join(', ')}</p>}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetailPage;