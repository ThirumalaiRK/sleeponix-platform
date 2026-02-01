import React from 'react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-[#1A3B2A] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 opacity-30" style={{ filter: 'blur(100px)' }}></div>
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
        <h2 className="font-serif text-4xl text-white">Join the Sleeponix Family</h2>
        <p className="mt-4 text-lg text-gray-300">Get exclusive access to new products, special offers, and tips for better sleep.</p>
        <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-5 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#C7A76D] focus:outline-none border-none"
          />
          <button
            type="submit"
            className="bg-[#C7A76D] text-[#1A3B2A] font-bold py-3 px-8 rounded-full transition-colors hover:bg-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;