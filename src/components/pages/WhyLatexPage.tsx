import React from 'react';
import { Check, X, Droplet, Layers, Zap, Shield, Star, Package } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const WhyLatexPage: React.FC = () => {
  useSEO({
    title: 'Why Natural Latex? | Sleeponix - Science of Better Sleep',
    description: 'Discover why natural latex mattresses outperform memory foam and spring mattresses. Breathable, hypoallergenic, durable & eco-friendly sleep solutions.',
    keywords: 'why natural latex mattress, latex vs memory foam, organic latex benefits, best mattress material',
    canonicalPath: '/why-latex',
  });
  const comparisons = [
    { feature: "Temperature Regulation", latex: true, memory: false, spring: false },
    { feature: "Motion Isolation", latex: true, memory: true, spring: false },
    { feature: "Durability (15+ years)", latex: true, memory: false, spring: false },
    { feature: "Natural Materials", latex: true, memory: false, spring: false },
    { feature: "Hypoallergenic", latex: true, memory: false, spring: false },
    { feature: "Responsive Support", latex: true, memory: false, spring: true },
    { feature: "No Off-Gassing", latex: true, memory: false, spring: true },
  ];

  const manufacturingSteps = [
    {
      icon: Droplet,
      title: "Sap Harvesting",
      description: "Latex sap is gently tapped from mature rubber trees without harming them. This eco-conscious process helps trees stay healthy and productive for decades."
    },
    {
      icon: Layers,
      title: "Molding",
      description: "The raw sap is whipped into a frothy consistency and poured into custom molds. This is where shape and firmness begin to take form."
    },
    {
      icon: Zap,
      title: "Baking",
      description: "The mold is heated in a specialized oven to solidify the latex, locking in the bouncy, resilient structure that makes latex unique."
    },
    {
      icon: Shield,
      title: "Curing",
      description: "The baked latex is washed and cured to remove any residual proteins or impurities—ensuring allergy-friendly performance and odor-free sleep."
    },
    {
      icon: Star,
      title: "Finishing",
      description: "Each latex core is examined for consistency, firmness, and purity. It's trimmed, shaped, and matched to its comfort category."
    },
    {
      icon: Package,
      title: "Packing",
      description: "The final latex layers are wrapped in breathable, eco-conscious covers and securely packed for safe delivery—ready to offer you years of natural sleep."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-[#1E2D2F] to-[#304B42] text-white pt-[120px] px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center items-center text-4xl">🌿</div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Why Choose Natural Latex?
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover why Sleeponix uses 100% natural latex for unmatched comfort, breathability, and long-lasting support. Learn the science behind a healthier, sustainable sleep.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Diagram */}
            <div className="fade-in-up">
              <div className="bg-ivory p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-serif font-bold text-deep-indigo mb-6 text-center">
                  Natural Latex Open-Cell Structure
                </h3>

                {/* Simplified SVG representation of open-cell structure */}
                <div className="relative bg-gradient-to-br from-gold-champagne/10 to-forest-green/10 p-8 rounded-xl">
                  <svg viewBox="0 0 300 200" className="w-full h-auto">
                    {/* Open cells representation */}
                    {[...Array(24)].map((_, i) => {
                      const row = Math.floor(i / 6);
                      const col = i % 6;
                      return (
                        <circle
                          key={i}
                          cx={25 + col * 45}
                          cy={25 + row * 45}
                          r="15"
                          fill="none"
                          stroke="#D4AF7F"
                          strokeWidth="2"
                          className="animate-pulse-slow"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      );
                    })}

                    {/* Airflow arrows */}
                    <path d="M50 10 L250 10 M250 5 L245 10 L250 15" stroke="#3B5E47" strokeWidth="2" fill="none" />
                    <path d="M50 190 L250 190 M50 185 L55 190 L50 195" stroke="#3B5E47" strokeWidth="2" fill="none" />

                    <text x="150" y="35" textAnchor="middle" className="text-xs fill-forest-green font-semibold">
                      Cool Air Flow
                    </text>
                    <text x="150" y="180" textAnchor="middle" className="text-xs fill-forest-green font-semibold">
                      Heat Dissipation
                    </text>
                  </svg>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-gold-champagne rounded-full"></div>
                    <span className="text-slate-gray">Open-cell design ensures airflow</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-gold-champagne rounded-full"></div>
                    <span className="text-slate-gray">Buoyant comfort unlike memory foam</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-gold-champagne rounded-full"></div>
                    <span className="text-slate-gray">Naturally hypoallergenic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Comparison */}
            <div className="fade-in-up stagger-delay-1">
              <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-8">
                Natural Latex vs Others
              </h2>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-deep-indigo mb-6 text-center">
                    Material Comparison
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-slate-gray font-semibold">Feature</th>
                          <th className="text-center py-3 text-forest-green font-semibold">Natural Latex</th>
                          <th className="text-center py-3 text-slate-gray font-semibold">Memory Foam</th>
                          <th className="text-center py-3 text-slate-gray font-semibold">Spring</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisons.map((item, index) => (
                          <tr key={item.feature} className="border-b border-gray-100 hover:bg-ivory/50 transition-colors duration-200">
                            <td className="py-3 text-slate-gray">{item.feature}</td>
                            <td className="py-3 text-center">
                              {item.latex ? (
                                <Check className="text-forest-green mx-auto" size={20} />
                              ) : (
                                <X className="text-red-500 mx-auto" size={20} />
                              )}
                            </td>
                            <td className="py-3 text-center">
                              {item.memory ? (
                                <Check className="text-forest-green mx-auto" size={20} />
                              ) : (
                                <X className="text-red-500 mx-auto" size={20} />
                              )}
                            </td>
                            <td className="py-3 text-center">
                              {item.spring ? (
                                <Check className="text-forest-green mx-auto" size={20} />
                              ) : (
                                <X className="text-red-500 mx-auto" size={20} />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
              How Natural Latex Mattresses Are Made
            </h2>
            <h3 className="text-2xl font-serif text-forest-green mb-4">
              6-Step Artisanal Crafting Process
            </h3>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto">
              We combine age-old natural harvesting methods with advanced manufacturing
              for unmatched mattress purity and comfort.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold-champagne to-forest-green rounded-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {manufacturingSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'
                    } fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute top-8 w-6 h-6 bg-gold-champagne rounded-full border-4 border-white shadow-lg"
                    style={{
                      [index % 2 === 0 ? 'right' : 'left']: '-44px'
                    }}></div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg hover-lift">
                    <div className={`flex items-center space-x-4 ${index % 2 === 0 ? 'lg:flex-row-reverse lg:space-x-reverse' : ''
                      } mb-4`}>
                      <div className="w-16 h-16 bg-gold-champagne/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <step.icon className="text-gold-champagne" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-deep-indigo">
                          {index + 1}. {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-gray leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="bg-[#C2A66D] p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">
                Witness Artisan Craftsmanship
              </h3>
              <p className="text-white/90 mb-6">
                Experience the meticulous care behind every Sleeponix mattress
              </p>
              <button className="bg-white text-deep-indigo px-8 py-3 rounded-full font-semibold hover:bg-ivory transition-colors duration-300">
                Discover Our Process
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyLatexPage;