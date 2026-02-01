import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Wind, ShieldCheck, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PillowCard from "../PillowCard";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import { pillows, Pillow } from "../products/pillowData";

const features = [
  { icon: Leaf, text: '100% Natural Latex' },
  { icon: Wind, text: 'Breathable & Hypoallergenic' },
  { icon: ShieldCheck, text: 'Orthopedic Support Design' },
  { icon: Globe, text: 'Eco-Friendly & Sustainable' },
];

const PillowsPage: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (pillow: Pillow) => {
    addToCart(pillow as any, 1);
    toast.success(`✅ ${pillow.name} added to your cart!`);
  };

  const handleCardClick = (pillow: Pillow) => {
    if (window.innerWidth < 768) { // Check for mobile screen size
      navigate(`/products/pillows/standard-latex-pillow`);
    } else {
      navigate(`/products/pillows/${pillow.id}`);
    }
  };

  return (
    <div className="bg-beige-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-24 md:py-32 bg-gradient-to-b from-beige-100 to-white"
      >
        <div className="absolute inset-0 opacity-50">
          <img src="https://www.transparenttextures.com/patterns/light-paper-fibers.png" alt="Subtle texture" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800">
            Pillows — Comfort that Complements Your Sleep.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our collection of ergonomically crafted latex pillows designed for perfect support and breathability.
          </p>
        </div>
      </motion.section>

      {/* Product Display Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {pillows.map((pillow, index) => (
              <motion.div
                key={pillow.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PillowCard
                  {...pillow}
                  onAddToCart={() => handleAddToCart(pillow)}
                  onCardClick={() => handleCardClick(pillow)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                <feature.icon className="w-12 h-12 text-green-700 mb-3" />
                <p className="font-semibold text-gray-700">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
            Find the perfect pillow for your comfort.
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} className="mt-8 inline-block">
            <Link
              to="/shop"
              className="bg-green-800 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-green-900 transition-colors"
            >
              Explore Sleep Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PillowsPage;