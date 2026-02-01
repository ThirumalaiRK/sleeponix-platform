import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0 bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/72d37254-a62a-4b90-9b9d-fc4b8f7fe88c.png")`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 fade-in-up leading-tight">
          Experience Nature's
          <span className="block text-gold-champagne mt-2">Comfort</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-delay-1 px-2">
          100% Natural Latex Mattresses Engineered for Restorative Sleep
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 fade-in-up stagger-delay-2 px-4">
          <button className="w-full sm:w-auto bg-gold-champagne hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 group">
            <span>Experience True Comfort</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </button>
          
          <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-deep-indigo px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
            <Play size={20} />
            <span>Discover Our Craft</span>
          </button>
        </div>

        {/* Floating badges */}
        <div className="flex justify-center space-x-6 lg:space-x-8 text-white/80 fade-in-up stagger-delay-3">
          <div className="text-center px-2">
            <div className="text-xl lg:text-2xl font-bold text-gold-champagne">100%</div>
            <div className="text-sm">Natural</div>
          </div>
          <div className="text-center px-2">
            <div className="text-xl lg:text-2xl font-bold text-gold-champagne">Artisan</div>
            <div className="text-sm">Crafted</div>
          </div>
          <div className="text-center px-2">
            <div className="text-xl lg:text-2xl font-bold text-gold-champagne">Lifetime</div>
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-px">
        {/* Smooth Latex Wave SVG */}
        <style>
          {`
            .latex-wave-animation {
              animation: wavePathAnim 4s linear infinite;
            }

            @keyframes wavePathAnim {
              0% {
                d: path("M 0,120 L 0,40 C 120,80 240,20 360,50 C 480,80 600,30 720,60 C 840,90 960,40 1080,70 C 1200,100 1320,50 1440,80 L1440,120 L0,120 Z");
              }
              25% {
                d: path("M 0,120 L 0,60 C 100,90 200,40 300,70 C 400,100 600,60 700,80 C 800,100 1000,50 1200,90 C 1300,100 1400,70 1440,80 L1440,120 L0,120 Z");
              }
              50% {
                d: path("M 0,120 L 0,50 C 130,30 260,90 390,60 C 520,30 650,70 780,50 C 910,30 1040,80 1170,60 C 1300,40 1370,60 1440,80 L1440,120 L0,120 Z");
              }
              75% {
                d: path("M 0,120 L 0,60 C 100,70 220,100 360,60 C 500,20 680,100 840,50 C 1000,0 1160,80 1300,60 C 1370,50 1400,70 1440,80 L1440,120 L0,120 Z");
              }
              100% {
                d: path("M 0,120 L 0,40 C 120,80 240,20 360,50 C 480,80 600,30 720,60 C 840,90 960,40 1080,70 C 1200,100 1320,50 1440,80 L1440,120 L0,120 Z");
              }
            }
          `}
        </style>

        <svg viewBox="0 0 1440 120" className="w-full h-24 sm:h-32 md:h-40 lg:h-48 block" preserveAspectRatio="none">
          <path
            className="latex-wave-animation"
            d="M 0,120 L 0,40 C 120,80 240,20 360,50 C 480,80 600,30 720,60 C 840,90 960,40 1080,70 C 1200,100 1320,50 1440,80 L1440,120 L0,120 Z"
            fill="#fdfdfdff"
          />
          <path
            className="latex-wave-animation"
            d="M 0,120 L 0,60 C 180,30 360,90 540,50 C 720,10 900,80 1080,40 C 1260,70 1350,30 1440,50 L1440,120 L0,120 Z"
            fill="#ffffffff"
            fillOpacity="0.7"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;