import React from 'react';
import { Award, Leaf, Shield, Globe, Star, CheckCircle } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      icon: Award,
      name: "OEKO-TEX",
      description: "Standard 100 certified for harmful substance testing",
      color: "text-blue-600"
    },
    {
      icon: Leaf,
      name: "GOLS",
      description: "Global Organic Latex Standard certification",
      color: "text-green-600"
    },
    {
      icon: Shield,
      name: "Cradle to Cradle",
      description: "Certified for material health and recyclability",
      color: "text-purple-600"
    },
    {
      icon: Globe,
      name: "FSC",
      description: "Forest Stewardship Council certified materials",
      color: "text-emerald-600"
    },
    {
      icon: Star,
      name: "Eco-Institute",
      description: "Tested for emissions and indoor air quality",
      color: "text-amber-600"
    },
    {
      icon: CheckCircle,
      name: "CertiPUR-US",
      description: "Certified foam standards for quality and safety",
      color: "text-indigo-600"
    }
  ];

  return (
    <section id="sustainability" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
            Certified Excellence
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            Sleeponix products are certified to the highest global standards — safe for you, safe for the planet.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div 
              key={cert.name}
              className={`bg-ivory p-8 rounded-2xl shadow-lg hover-lift text-center fade-in-up group`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <cert.icon className={`${cert.color} group-hover:scale-125 transition-transform duration-300`} size={40} />
              </div>
              
              <h3 className="text-xl font-serif font-bold text-deep-indigo mb-3">
                {cert.name}
              </h3>
              
              <p className="text-slate-gray leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sustainability Stats */}
        <div className="bg-gradient-to-r from-forest-green to-deep-indigo rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h3
              className="text-3xl font-serif font-bold mb-4"
              style={{ color: '#c7a76d' }}>
              Our Environmental Impact
            </h3>
            <p className="max-w-2xl mx-auto" style={{ color: '#c7a76d' }}>
              Every Sleeponix mattress represents our commitment to sustainable manufacturing and environmental stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-champagne mb-2">100%</div>
              <div className="text-white/80">Natural Materials</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-champagne mb-2">Zero</div>
              <div className="text-white/80">Chemical Off-Gassing</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-champagne mb-2">25+</div>
              <div className="text-white/80">Year Lifespan</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-champagne mb-2">Carbon</div>
              <div className="text-white/80">Neutral Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;