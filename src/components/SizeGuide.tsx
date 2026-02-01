import React, { useState } from 'react';
import { Calculator, HelpCircle } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('Queen');
  
  const sizes = [
    { name: 'Single', inches: '36" × 75"', use: 'Kids & Teens', price: 'Personalized' },
    { name: 'Twin XL', inches: '39" × 80"', use: 'College Dorms', price: 'Tailored' },
    { name: 'Full', inches: '54" × 75"', use: 'Single Adults', price: 'Crafted' },
    { name: 'Queen', inches: '60" × 80"', use: 'Couples', price: 'Bespoke' },
    { name: 'King', inches: '76" × 80"', use: 'Families', price: 'Premium' },
    { name: 'Cal King', inches: '72" × 84"', use: 'Tall Sleepers', price: 'Luxury' },
  ];

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text mb-6">
            Find Your Perfect Size
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            Choose the ideal mattress size for your space and sleeping needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Size Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-deep-indigo text-white p-6">
                <h3 className="text-2xl font-serif font-bold mb-2">Size Chart</h3>
                <p className="text-gray-300">Select a size to see details</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedSize === size.name
                          ? 'border-gold-champagne bg-gold-champagne/10'
                          : 'border-gray-200 hover:border-gold-champagne/50'
                      }`}
                    >
                      <div className="font-semibold text-deep-indigo">{size.name}</div>
                      <div className="text-sm text-slate-gray">{size.inches}</div>
                      <div className="text-sm text-gold-champagne font-semibold">{size.price}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Size Details */}
                {selectedSize && (
                  <div className="mt-8 p-6 bg-ivory rounded-xl">
                    <h4 className="text-xl font-serif font-bold text-deep-indigo mb-4">
                      {selectedSize} Mattress Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-slate-gray mb-1">Dimensions</div>
                        <div className="font-semibold text-deep-indigo">
                          {sizes.find(s => s.name === selectedSize)?.inches}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-gray mb-1">Best For</div>
                        <div className="font-semibold text-deep-indigo">
                          {sizes.find(s => s.name === selectedSize)?.use}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-gray mb-1">Experience Level</div>
                        <div className="font-semibold text-gold-champagne text-xl">
                          {sizes.find(s => s.name === selectedSize)?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Custom Size Calculator */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calculator className="text-gold-champagne" size={24} />
                <h3 className="text-xl font-serif font-bold text-deep-indigo">
                  Custom Size Calculator
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Width (inches)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
                    placeholder="60"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Length (inches)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent"
                    placeholder="80"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Thickness (inches)
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-champagne focus:border-transparent">
                    <option>8 inches</option>
                    <option>10 inches</option>
                    <option>12 inches</option>
                  </select>
                </div>
                
                <button className="w-full bg-gold-champagne hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300">
                  Request Consultation
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-forest-green text-white rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle size={24} />
                <h3 className="text-xl font-serif font-bold">Need Help?</h3>
              </div>
              <p className="text-green-100 mb-4">
                Not sure which size is right for you? Our sleep experts are here to help.
              </p>
              <button className="w-full bg-white text-forest-green py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Sleep Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;