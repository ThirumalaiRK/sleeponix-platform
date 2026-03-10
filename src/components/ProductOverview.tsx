import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { mattressData } from "./products/mattressData";
import { pillows } from "./products/pillowData";
import { accessories } from "./products/accessories";

/* -----------------------------------------------------------
   FINAL COLLECTIONS (MERGED VERSION)
----------------------------------------------------------- */
const collections = {
  mattresses: {
    title: "Mattresses",
    items: mattressData,
    color: "text-[#c7a76d]",
  },

  pillows: {
    title: "Pillows",
    items: pillows.map((p) => ({
      ...p,
      href: `/products/pillows/${p.id}`,
    })),
    color: "text-[#c7a76d]",
  },

  accessories: {
    title: "Accessories",
    items: accessories.map((a) => ({
      ...a,
      href: "#",
      description: a.tagline,
      price: a.sizes?.[0]?.price || 0,
      features: [],
    })),
    color: "text-[#c7a76d]",
  },
};

/* -----------------------------------------------------------
   PRODUCT CARD
----------------------------------------------------------- */
const ProductCard = ({ product }: { product: any }) => {
  return (
    <motion.div
      className="group relative flex-shrink-0 w-[300px] md:w-[340px] h-[480px] bg-white rounded-3xl shadow-lg overflow-hidden"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Stronger Gradient Overlay for Better Contrast - Always Visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      {/* Card Content - Improved Layout & Typography */}
      <div className="relative h-full flex flex-col justify-end p-6 z-10">

        {/* Title & Tagline Container */}
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-lg tracking-wide">
            {product.name}
          </h3>

          <div className="h-1 w-12 bg-[#c7a76d] rounded-full mb-3"></div>

          <p className="text-sm font-medium text-gray-200 leading-relaxed drop-shadow-md line-clamp-3">
            {product.description || "Premium quality product designed for your ultimate comfort."}
          </p>
        </div>

        {/* Features - Better Spacing */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-2 mb-6">
            {product.features.slice(0, 2).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#c7a76d] mt-0.5 flex-shrink-0 drop-shadow-sm" />
                <span className="text-xs font-semibold text-gray-100 drop-shadow-sm">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* View Details Button - Always visible, higher contrast */}
        <div className="mt-auto pt-2">
          <Link
            to={product.href || `/products/${product.id}`}
            className="block w-full text-center font-bold text-white bg-white/20 hover:bg-[#c7a76d] backdrop-blur-sm border border-white/40 hover:border-[#c7a76d] rounded-xl px-4 py-3.5 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* -----------------------------------------------------------
   MAIN COMPONENT — PRODUCT OVERVIEW
----------------------------------------------------------- */
const ProductOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mattresses");

  const activeCollection =
    collections[activeTab as keyof typeof collections];

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`carousel-${activeTab}`);
    if (container) {
      const scrollAmt =
        direction === "left"
          ? -container.offsetWidth
          : container.offsetWidth;

      container.scrollBy({ left: scrollAmt, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-forest-green tracking-tight">
            Sleeponix Product Collections
          </h2>
          <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
            Experience unparalleled comfort with our curated sleep solutions.
          </p>
          <div className="mt-6 h-1 w-24 bg-gold-500 mx-auto rounded-full" />
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-12 border-b border-gray-200">
          {Object.keys(collections).map((key) => {
            const tab = collections[key as keyof typeof collections];
            const isActive = activeTab === key;
            const tabClass = tab.color || "text-charcoal-900";

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 sm:px-6 py-4 font-semibold text-lg capitalize transition-colors duration-300 relative rounded-t-lg ${isActive
                  ? `${tabClass} bg-gray-100`
                  : "text-charcoal-500 hover:text-charcoal-800 hover:bg-gray-100"
                  }`}
              >
                {tab.title}

                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500"
                    layoutId="underline"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* CAROUSEL */}
        <div className="relative">
          <div
            id={`carousel-${activeTab}`}
            className="flex items-center gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 -mx-4 px-4 no-scrollbar"
          >
            {activeCollection.items.map((product, index) => (
              <AnimatePresence key={`${activeTab}-${product.id}`} mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="snap-center"
                >
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 shadow-md flex items-center justify-center hover:bg-white/80 transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-[#1A3A32]" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-sm border border-white/20 shadow-md flex items-center justify-center hover:bg-white/80 transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6 text-[#1A3A32]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;