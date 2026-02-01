import React from 'react';
import { Check, X } from 'lucide-react';

const WhyLatex: React.FC = () => {
  const comparisons = [
    { feature: "Temperature Regulation", latex: true, memory: false, spring: false },
    { feature: "Motion Isolation", latex: true, memory: true, spring: false },
    { feature: "Durability (15+ years)", latex: true, memory: false, spring: false },
    { feature: "Natural Materials", latex: true, memory: false, spring: false },
    { feature: "Hypoallergenic", latex: true, memory: false, spring: false },
    { feature: "Responsive Support", latex: true, memory: false, spring: true },
    { feature: "No Off-Gassing", latex: true, memory: false, spring: true },
  ];

  return (
    <section id="why-latex" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Diagram */}
          <div className="fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
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
              Why Choose Natural Latex?
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
                      {comparisons.map((item,) => (
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
  );
};

export default WhyLatex;