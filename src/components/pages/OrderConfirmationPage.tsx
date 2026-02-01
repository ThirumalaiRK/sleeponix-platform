import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
    id: string;
    name: string;
    image: string;  // merged correctly
    quantity: number;
    price: number;
}

interface ShippingDetails {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
}

interface OrderConfirmationPageProps {
    shippingDetails: ShippingDetails;
    cartItems: CartItem[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const checkContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

const checkIconVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: [0.8, 1.05, 1],
        opacity: 1,
        transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
};

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ shippingDetails, cartItems }) => {
    return (
        <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            {/* Soft Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[760px] h-[600px] bg-cream-100/50 rounded-full blur-3xl opacity-60"></div>
            </div>

            {/* Main Card */}
            <motion.div
                className="w-full max-w-2xl bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8 sm:p-12 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Success Checkmark */}
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    variants={checkContainerVariants}
                >
                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-200/50 to-transparent rounded-full blur-lg"></div>
                        <motion.div
                            className="bg-[#1B4D3E] rounded-full p-4 shadow-lg"
                            variants={checkIconVariants}
                        >
                            <Check className="text-white" size={40} strokeWidth={3} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={itemVariants}
                    className="mt-12 text-center text-3xl sm:text-4xl font-bold text-[#1B4D3E] font-playfair"
                >
                    Your Sleep Journey Has Begun
                </motion.h1>

                <motion.p variants={itemVariants} className="text-center text-[#6B6B6B] mt-4 max-w-md mx-auto">
                    Thank you, {shippingDetails.fullName}! Your order is confirmed. A world of deep, restorative sleep is on its way.
                </motion.p>

                {/* Delivery Estimate */}
                <motion.div
                    variants={itemVariants}
                    className="bg-[#FFFCF3] border border-[#E0E3DF] rounded-[20px] p-5 mt-8 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <Truck className="text-[#1B4D3E]" size={24} />
                        <div>
                            <h2 className="font-bold text-[#1B4D3E]">Estimated Delivery</h2>
                            <p className="text-sm text-[#6B6B6B]">3–5 Business Days</p>
                        </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </motion.div>

                {/* Your Items (Merged Code Here) */}
                <motion.div variants={itemVariants} className="mt-8">
                    <h2 className="text-2xl font-bold text-[#1B4D3E] font-playfair mb-4">Your Items</h2>

                    <div className="border-t border-[#E0E3DF]">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b border-[#E0E3DF]">
                                <div className="flex items-center gap-4">

                                    {/* 🔥 Merged: item.image instead of item.imageUrl */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>

                                <p className="font-semibold text-gray-800">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/shop" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full bg-[#C6A878] text-white font-bold py-3 px-8 rounded-full shadow-md"
                            whileHover={{ scale: 1.05, backgroundColor: '#B49563' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continue Shopping
                        </motion.button>
                    </Link>

                    <Link to="/" className="w-full sm:w-auto">
                        <motion.button
                            className="w-full bg-[#E6F0EC] text-[#1B4D3E] font-bold py-3 px-8 rounded-full"
                            whileHover={{ scale: 1.05, backgroundColor: '#D1E7E2' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Back to Home
                        </motion.button>
                    </Link>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default OrderConfirmationPage;