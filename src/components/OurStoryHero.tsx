import React from 'react';

const OurStoryHero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#0c2e27] to-[#1a4a3f] text-white text-center py-10 md:py-20 lg:py-20">
      <div className="absolute inset-0" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/subtle-carbon.png)', opacity: 0.05 }}></div>
      <div className="relative z-10">
        <div className="flex justify-center items-center mb-4">
          {/* Optional leaf icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d4b47f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          About Sleeponix
        </h1>
        <p className="text-lg md:text-xl text-[#d4b47f] mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Redefining Natural Sleep
        </p>
        <div className="w-24 h-px bg-[#d4b47f] mx-auto mt-6"></div>
        <div className="max-w-3xl mx-auto mt-8 px-4">
          <blockquote className="bg-white/10 backdrop-blur-sm border border-[#d4b47f]/20 rounded-2xl p-6 md:p-8 relative">
            <svg className="absolute -top-4 -left-4 w-10 h-10 text-[#d4b47f] opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg md:text-xl md:leading-relaxed text-white/90 italic mb-4 font-serif">
              "Sleeponix, founded by C.R. Vigneshwaran, stands on a proud family legacy of over 50 years in business.
              With 30 years of experience, we are bringing a revolution to mattresses through sustainability,
              natural materials, and earthy comfort."
            </p>
            <footer className="text-[#d4b47f] font-semibold text-sm tracking-wider uppercase">
              — C.R. Vigneshwaran, Founder
            </footer>
          </blockquote>
        </div>

      </div>
    </div>
  );
};

export default OurStoryHero;