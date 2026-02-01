// ============================================================================
// CheckoutPage.tsx (FINAL MERGED — SIZE + THICKNESS, TAX REMOVED, COD REMOVED,
// NEW BUTTON STYLE, UPDATED STEPPER, UPDATED HEADER, UPDATED ORDER SUMMARY)
// ============================================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Smartphone } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import OrderConfirmationPage from './OrderConfirmationPage';
import TruckLoadingAnimation from '../TruckLoadingAnimation';
import { supabase } from '../../supabaseClient';
import { CartItem } from '../../context/CartContext';

// -------------------------------------------------------------
// TYPES (MERGED)
// -------------------------------------------------------------
// Local CartItem definition removed to use shared type from context

interface PaymentDetails {
    method: 'card' | 'upi';
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
    upiId: string;
}

interface OrderSummaryProps {
    cartItems: CartItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
}

interface CheckoutStep {
    id: number;
    title: string;
}

interface ShippingDetails {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    deliveryInstructions: string;
}

// ============================================================================
// ORDER SUMMARY (MERGED + SIZE + THICKNESS)
// ============================================================================
const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, subtotal, shippingCost, total }) => (
    <div className="space-y-6">

        <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1C2635]">Items in Cart</h3>

            {cartItems.length > 0 ? (
                cartItems.map(item => (
                    <div key={item.id} className="flex items-start space-x-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                            <p className="font-bold text-[#1C2635] line-clamp-2">{item.name}</p>

                            {item.size && (
                                <p className="text-sm text-stone-500">{`Size: ${item.size}`}</p>
                            )}

                            {item.thickness && (
                                <p className="text-sm text-stone-500">{`Thickness: ${item.thickness}`}</p>
                            )}

                            <p className="text-sm text-[#C2A66D] font-medium mt-1">Qty: {item.quantity}</p>
                        </div>

                        <p className="font-bold text-[#1C2635]">
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-stone-500 py-4 text-center">Your cart is empty.</p>
            )}
        </div>

        <hr className="border-stone-200" />

        <div className="space-y-3">
            <div className="flex justify-between text-stone-600">
                <p>Subtotal</p>
                <p className="font-bold text-[#1C2635]">₹{subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-stone-600">
                <p>Shipping</p>
                <p className="font-bold text-green-600">
                    {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                </p>
            </div>

            <hr className="border-stone-200" />

            <div className="flex justify-between text-xl font-bold text-[#1C2635]">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
            </div>
        </div>
    </div>
);

// ============================================================================
// CHECKOUT PAGE
// ============================================================================
// ============================================================================
// CHECKOUT PAGE
// ============================================================================
const CheckoutPage: React.FC = () => {

    const { cartItems, cartTotal, clearCart } = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm<ShippingDetails>();

    const [currentStep, setCurrentStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
        fullName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        deliveryInstructions: '',
    });

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        method: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        upiId: '',
    });

    const steps: CheckoutStep[] = [
        { id: 1, title: 'Shipping' },
        { id: 2, title: 'Payment' },
        { id: 3, title: 'Review' },
    ];

    // Handlers
    const handleShippingSubmit = (data: ShippingDetails) => {
        setShippingDetails(data);
        setCurrentStep(2);
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep(3);
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // 1. Prepare Order Data
            const orderStart = {
                id: crypto.randomUUID(), // Generate client-side ID to satisfy non-null constraint
                customer_name: shippingDetails.fullName,
                customer_email: shippingDetails.email,
                customer_phone: shippingDetails.phone,
                customer_address: `${shippingDetails.address1}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.postalCode}`,
                customer_address1: shippingDetails.address1,
                customer_city: shippingDetails.city,
                customer_state: shippingDetails.state,
                customer_postal_code: shippingDetails.postalCode,
                delivery_instructions: shippingDetails.deliveryInstructions,
                total: total,
                status: 'pending',
                shipping_status: 'Processing'
            };

            // 2. Insert Order into Supabase
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert([orderStart])
                .select()
                .single();

            if (orderError) throw new Error(`Order placement failed: ${orderError.message}`);
            if (!orderData) throw new Error("No data returned from order creation");

            const newOrderId = orderData.id;

            // 3. Prepare Order Items
            const orderItemsInsert = cartItems.map(item => ({
                order_id: newOrderId,
                product_id: item.id, // Ensure this matches your product ID logic
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
                size: (item as any).size || null,
                thickness: (item as any).thickness || null
            }));

            // 4. Insert Order Items
            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItemsInsert);

            if (itemsError) throw new Error(`Failed to add items: ${itemsError.message}`);

            // 5. Success
            setOrderPlaced(true);
            clearCart();
        } catch (error: any) {
            console.error("Checkout Error:", error);
            alert(`Checkout Failed: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const subtotal = cartTotal ?? 0;
    const total = subtotal;

    if (orderPlaced) {
        return (
            <OrderConfirmationPage
                shippingDetails={shippingDetails}
                cartItems={cartItems as CartItem[]}
            />
        );
    }

    return (
        <div
            className="bg-[#FAF9F6] font-sans min-h-screen"
            style={{
                backgroundImage: `
                    radial-gradient(circle at top left, rgba(28, 38, 53, 0.03), transparent 30%),
                    radial-gradient(circle at bottom right, rgba(194, 166, 109, 0.05), transparent 40%)
                `,
            }}
        >
            <AnimatePresence>
                {isProcessing && <TruckLoadingAnimation />}
            </AnimatePresence>

            {/* ======================== HEADER (MERGED) ======================== */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-30 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">

                        <Link to="/">
                            <img src="/images/og logo.png" alt="Sleeponix" className="h-10" />
                        </Link>

                        {/* NEW UPDATED MERGED CODE */}
                        <Link
                            to="/cart"
                            className="text-sm text-[#1C2635] hover:text-[#C2A66D] flex items-center transition-colors duration-300 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Cart
                        </Link>

                    </div>
                </div>
            </header>

            {/* ======================== MAIN ======================== */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">

                {/* PAGE TITLE */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1C2635]">Checkout</h1>
                    <div className="w-24 h-1 bg-[#C2A66D] mx-auto rounded-full mt-4" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">

                    {/* LEFT SIDE CONTENT */}
                    <div className="lg:col-span-7">

                        {/* ======================== STEPPER ======================== */}
                        <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-stone-100 z-20 mb-8 p-6">
                            <div className="flex items-center justify-between">

                                {steps.map((step, index) => (
                                    <React.Fragment key={step.id}>
                                        <div className="flex flex-col items-center text-center flex-1">

                                            <div className="relative">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold border-2
                                                    ${currentStep >= step.id
                                                            ? 'bg-[#1C2635] text-white border-[#1C2635] shadow-lg shadow-[#1C2635]/20'
                                                            : 'bg-white text-stone-400 border-stone-200'
                                                        }`}
                                                >
                                                    {step.id}
                                                </div>
                                            </div>

                                            <p className={`mt-3 text-sm font-bold tracking-wide transition-colors
                                                ${currentStep >= step.id ? 'text-[#1C2635]' : 'text-stone-400'}`}>
                                                {step.title}
                                            </p>
                                        </div>

                                        {index < steps.length - 1 && (
                                            <div className={`flex-1 h-0.5 mx-4 transition-colors rounded-full
                                                ${currentStep > index + 1 ? 'bg-[#C2A66D]' : 'bg-stone-200'}`}
                                            ></div>
                                        )}
                                    </React.Fragment>
                                ))}

                            </div>
                        </div>

                        {/* SHIPPING, PAYMENT, REVIEW (UNCHANGED FROM YOUR VERSION) */}
                        {/* --------------------------------------------------------- */}

                        {/* SHIPPING */}
                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-6 md:p-8"
                                >
                                    <h2 className="text-2xl font-serif font-bold text-[#1C2635] mb-6 border-b border-stone-100 pb-4">
                                        Shipping Details
                                    </h2>

                                    <form onSubmit={handleSubmit(handleShippingSubmit)} className="space-y-6">

                                        {/* Row 1 */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-[#1C2635] mb-2 block">Full Name *</label>
                                                <input
                                                    type="text"
                                                    {...register('fullName', { required: 'Full name is required' })}
                                                    className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl focus:ring-2 transition-all outline-none
                                                    ${errors.fullName ? 'border-red-400 focus:ring-red-100' :
                                                            'border-stone-200 focus:border-[#C2A66D] focus:ring-[#C2A66D]/20'
                                                        }`}
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-[#1C2635] mb-2 block">Email *</label>
                                                <input
                                                    type="email"
                                                    {...register('email', {
                                                        required: 'Email is required',
                                                        pattern: { value: /^\S+@\S+$/, message: "Invalid email" }
                                                    })}
                                                    className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl focus:ring-2 transition-all outline-none
                                                    ${errors.email ? 'border-red-400 focus:ring-red-100' :
                                                            'border-stone-200 focus:border-[#C2A66D] focus:ring-[#C2A66D]/20'
                                                        }`}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="text-sm font-medium text-[#1C2635] mb-2 block">Address *</label>
                                            <input
                                                type="text"
                                                {...register('address1', { required: 'Address is required' })}
                                                className={`w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl focus:ring-2 transition-all outline-none
                                                ${errors.address1 ? 'border-red-400 focus:ring-red-100' :
                                                        'border-stone-200 focus:border-[#C2A66D] focus:ring-[#C2A66D]/20'
                                                    }`}
                                                placeholder="Street address"
                                            />
                                        </div>

                                        {/* CITY / STATE / ZIP */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-[#1C2635] mb-2 block">City *</label>
                                                <input
                                                    type="text"
                                                    {...register('city', { required: 'City is required' })}
                                                    className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl 
                                                    border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-[#1C2635] mb-2 block">State *</label>
                                                <input
                                                    type="text"
                                                    {...register('state', { required: 'State is required' })}
                                                    className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl 
                                                    border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-[#1C2635] mb-2 block">Postal Code *</label>
                                                <input
                                                    type="text"
                                                    {...register('postalCode', { required: 'Postal code is required' })}
                                                    className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl 
                                                    border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Continue Button */}
                                        <button
                                            className="w-full bg-[#1C2635] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#1C2635]/30
                                            hover:bg-[#C2A66D] hover:shadow-[#C2A66D]/30 transform hover:-translate-y-1
                                            transition-all duration-300 ease-in-out focus:outline-none
                                            focus:ring-4 focus:ring-[#C2A66D]/50 mt-4"
                                        >
                                            Continue to Payment
                                        </button>

                                    </form>
                                </motion.div>
                            )}

                            {/* PAYMENT */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-6 md:p-8"
                                >
                                    <h2 className="text-2xl font-serif font-bold text-[#1C2635] mb-6 border-b border-stone-100 pb-4">
                                        Payment Details
                                    </h2>

                                    {/* Method */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                                        {[
                                            { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                                            { value: 'upi', label: 'UPI', icon: Smartphone },
                                        ].map(method => (
                                            <label key={method.value} className="cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value={method.value}
                                                    checked={paymentDetails.method === method.value}
                                                    onChange={(e) =>
                                                        setPaymentDetails(prev => ({
                                                            ...prev,
                                                            method: e.target.value as any
                                                        }))
                                                    }
                                                    className="sr-only"
                                                />

                                                <div className={`p-6 border-2 rounded-xl text-center transition-all duration-300
                                                    ${paymentDetails.method === method.value
                                                        ? "border-[#C2A66D] bg-[#C2A66D]/5 shadow-md"
                                                        : "border-stone-100 bg-[#FAF9F6] hover:border-[#C2A66D]/50"
                                                    }`}>
                                                    <method.icon className={`mx-auto mb-3 transition-colors ${paymentDetails.method === method.value ? 'text-[#C2A66D]' : 'text-stone-400 group-hover:text-[#C2A66D]'}`} size={28} />
                                                    <p className={`text-sm font-bold ${paymentDetails.method === method.value ? 'text-[#1C2635]' : 'text-stone-500'}`}>{method.label}</p>
                                                </div>

                                            </label>
                                        ))}

                                    </div>

                                    {/* CARD FORM */}
                                    {paymentDetails.method === 'card' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium text-[#1C2635] mb-2 block">Card Number *</label>
                                                <input
                                                    type="text"
                                                    value={paymentDetails.cardNumber}
                                                    onChange={(e) =>
                                                        setPaymentDetails(prev => ({
                                                            ...prev,
                                                            cardNumber: e.target.value
                                                        }))
                                                    }
                                                    className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl 
                                                    border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-[#1C2635] mb-2 block">Expiry *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        value={paymentDetails.expiryDate}
                                                        onChange={(e) =>
                                                            setPaymentDetails(prev => ({
                                                                ...prev,
                                                                expiryDate: e.target.value
                                                            }))
                                                        }
                                                        className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl
                                                        border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-sm font-medium text-[#1C2635] mb-2 block">CVV *</label>
                                                    <input
                                                        type="text"
                                                        value={paymentDetails.cvv}
                                                        onChange={(e) =>
                                                            setPaymentDetails(prev => ({
                                                                ...prev,
                                                                cvv: e.target.value
                                                            }))
                                                        }
                                                        className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl
                                                        border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                                        placeholder="123"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* UPI FORM */}
                                    {paymentDetails.method === 'upi' && (
                                        <div>
                                            <label className="text-sm font-medium text-[#1C2635] mb-2 block">UPI ID *</label>
                                            <input
                                                type="text"
                                                placeholder="yourname@bank"
                                                value={paymentDetails.upiId}
                                                onChange={(e) =>
                                                    setPaymentDetails(prev => ({
                                                        ...prev,
                                                        upiId: e.target.value
                                                    }))
                                                }
                                                className="w-full px-4 py-3 bg-[#FAF9F6] border rounded-xl 
                                                border-stone-200 focus:border-[#C2A66D] focus:ring-2 focus:ring-[#C2A66D]/20 outline-none"
                                            />
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(1)}
                                            className="w-full bg-stone-200 text-stone-600 font-bold py-3 rounded-xl
                                            hover:bg-stone-300 transform hover:-translate-y-0.5 
                                            transition-all duration-300 ease-in-out focus:outline-none"
                                        >
                                            Back
                                        </button>

                                        <button
                                            onClick={handlePaymentSubmit}
                                            className="w-full bg-[#1C2635] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#1C2635]/30
                                            hover:bg-[#C2A66D] hover:shadow-[#C2A66D]/30 transform hover:-translate-y-0.5 
                                            transition-all duration-300 ease-in-out focus:outline-none 
                                            focus:ring-4 focus:ring-[#C2A66D]/50"
                                        >
                                            Continue
                                        </button>
                                    </div>

                                </motion.div>
                            )}

                            {/* REVIEW */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-6 md:p-8"
                                >
                                    <h2 className="text-2xl font-serif font-bold text-[#1C2635] mb-6 border-b border-stone-100 pb-4">
                                        Review Your Order
                                    </h2>

                                    <div className="space-y-6">

                                        {/* SHIPPING SUMMARY */}
                                        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-100">
                                            <div className="flex justify-between items-center pb-2 border-b border-stone-200 mb-2">
                                                <h3 className="font-bold text-[#1C2635]">Shipping To</h3>
                                                <button
                                                    onClick={() => setCurrentStep(1)}
                                                    className="text-[#C2A66D] text-sm font-bold hover:text-[#1C2635] transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            </div>

                                            <div className="text-stone-600 space-y-1">
                                                <p className="font-medium">{shippingDetails.fullName}</p>
                                                <p>{shippingDetails.address1}</p>
                                                <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}</p>
                                                <p>{shippingDetails.email}</p>
                                            </div>
                                        </div>

                                        {/* PAYMENT SUMMARY */}
                                        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-stone-100">
                                            <div className="flex justify-between items-center pb-2 border-b border-stone-200 mb-2">
                                                <h3 className="font-bold text-[#1C2635]">Payment Method</h3>
                                                <button
                                                    onClick={() => setCurrentStep(2)}
                                                    className="text-[#C2A66D] text-sm font-bold hover:text-[#1C2635] transition-colors"
                                                >
                                                    Edit
                                                </button>
                                            </div>

                                            <div className="text-stone-600">
                                                <p className="capitalize font-medium flex items-center gap-2">
                                                    {paymentDetails.method === 'card' ? <CreditCard size={16} /> : <Smartphone size={16} />}
                                                    {paymentDetails.method === 'card' ? 'Credit/Debit Card' : 'UPI'}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* PLACE ORDER */}
                                    <form onSubmit={handleOrderSubmit} className="mt-8">
                                        <button
                                            className="w-full bg-gradient-to-r from-[#C2A66D] to-[#A88B52] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#C2A66D]/40
                                            hover:from-[#B5965A] hover:to-[#967A45] transform hover:-translate-y-1
                                            transition-all duration-300 ease-in-out focus:outline-none 
                                            focus:ring-4 focus:ring-[#C2A66D]/50 text-lg flex items-center justify-center gap-2"
                                        >
                                            <span>Place Order</span>
                                            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">₹{total.toFixed(2)}</span>
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                        </AnimatePresence>

                    </div>

                    {/* RIGHT SECTION */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-24">

                            <h2 className="text-2xl font-serif font-bold text-[#1C2635] mb-6 border-b border-stone-100 pb-4">
                                Order Summary
                            </h2>

                            <OrderSummary
                                cartItems={cartItems}
                                subtotal={subtotal}
                                shippingCost={0}
                                total={total}
                            />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;
