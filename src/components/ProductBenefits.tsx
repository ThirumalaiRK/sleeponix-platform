import React from 'react';
import { Thermometer, Shield, Heart, Leaf } from 'lucide-react';

const ProductBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Thermometer,
      title: "Temperature Regulating",
      description: "Open-cell structure promotes airflow, keeping you cool and comfortable throughout the night."
    },
    {
      icon: Shield,
      title: "Anti-Allergic & Anti-Microbial",
      description: "Naturally resistant to dust mites, mold, and bacteria for a healthier sleep environment."
    },
    {
      icon: Heart,
      title: "Orthopedic Comfort",
      description: "Provides optimal spinal alignment and pressure point relief for restorative sleep."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Materials",
      description: "Sustainably sourced from rubber trees with zero harmful chemicals or synthetic materials."
    }
  ];

  return (
    <section className="pb-20 bg-ivory relative -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-24">
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
            Nature's Perfect Sleep Solution
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            Discover why thousands of customers choose natural latex for the ultimate sleep experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className={`bg-white p-8 rounded-2xl shadow-lg hover-lift text-center fade-in-up stagger-delay-${index + 1}`}
            >
              <div className="w-16 h-16 bg-gold-champagne/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <benefit.icon className="text-gold-champagne" size={32} />
              </div>
              
              <h3 className="text-xl font-semibold text-deep-indigo mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-slate-gray leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductBenefits;