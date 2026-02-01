import React, { useState } from 'react';
import { Check, Play, Ruler, Book, Phone, Calendar, Users } from 'lucide-react';

const MeasureBedSize: React.FC = () => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [suggestedSize, setSuggestedSize] = useState('');

  const calculateBestFit = () => {
    const w = parseInt(width);
    const l = parseInt(length);

    if (isNaN(w) || isNaN(l)) {
      setSuggestedSize('Please enter valid dimensions.');
      return;
    }

    if (w >= 30 && w <= 40 && l >= 70 && l <= 80) {
      setSuggestedSize('Single');
    } else if (w >= 55 && w <= 65 && l >= 75 && l <= 85) {
      setSuggestedSize('Queen');
    } else if (w >= 70 && w <= 80 && l >= 75 && l <= 85) {
      setSuggestedSize('King');
    } else {
      setSuggestedSize('Custom');
    }
  };

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#1A1A1A' }} className="font-sans">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#1B4D3E] to-[#173F33] text-white">
        <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-4xl md:text-5xl font-bold mb-4">
              Measure Your Bed Size for the Perfect Fit
            </h1>
            <p className="text-base sm:text-lg mb-8 opacity-90">
              Ensure your mattress fits flawlessly with our easy-to-follow guide. Whether standard or custom, accurate measurements matter.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <div className="flex items-center rounded-full px-4 py-2">
                <Check size={16} className="text-[#C6A878] mr-2" />
                <span className="text-sm font-medium text-[#E6F0EC]">Accurate & Simple</span>
              </div>
              <div className="flex items-center rounded-full px-4 py-2">
                <Check size={16} className="text-[#C6A878] mr-2" />
                <span className="text-sm font-medium text-[#E6F0EC]">No Guesswork</span>
              </div>
              <div className="flex items-center rounded-full px-4 py-2">
                <Check size={16} className="text-[#C6A878] mr-2" />
                <span className="text-sm font-medium text-[#E6F0EC]">Works for Custom Beds</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 rounded-full font-semibold bg-[#C6A878] hover:bg-[#B49563] text-white transition-colors">
                Start Measuring
              </button>
              <button className="px-8 py-3 rounded-full font-semibold border border-[#C6A878] text-[#C6A878] hover:bg-[#C6A878] hover:text-white transition-colors">
                Watch How to Measure
              </button>
            </div>

          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-video rounded-3xl shadow-2xl bg-gray-800 flex items-center justify-center group mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>
            <div className="absolute inset-2 border-2 border-white/30 rounded-[28px]"></div>
            <Play size={64} className="text-white z-10 transform group-hover:scale-110 transition-transform" />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C6A878] to-[#1B4D3E] rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </div>
        </div>
      </section>

      {/* HOW TO MEASURE */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-3xl md:text-4xl font-bold mb-3">
              How to Measure Your Bed Frame
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#606060' }}>
              Follow these simple steps before placing your order.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[1, 2, 3, 4].map((step, index) => (
              <div
                key={step}
                className="bg-white border border-[#E0E3DF] hover:border-[#C6A878] shadow-sm rounded-xl p-6 sm:p-8 transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center font-bold text-xl mr-4">
                    {step}
                  </div>

                  {index < 3 ? (
                    <Ruler size={24} className="text-[#1B4D3E] rotate-0" />
                  ) : (
                    <Check size={24} className="text-[#1B4D3E]" />
                  )}
                </div>

                <h3 className="font-bold text-xl mb-2">
                  {index === 0 && 'Measure the Width'}
                  {index === 1 && 'Measure the Length'}
                  {index === 2 && 'Measure the Height'}
                  {index === 3 && 'Double-Check'}
                </h3>

                <p className="text-sm" style={{ color: '#606060' }}>
                  {index === 0 && 'Side to Side'}
                  {index === 1 && 'Head to Foot'}
                  {index === 2 && '(Optional)'}
                  {index === 3 && 'Your Measurements'}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SIZE REFERENCE GUIDE */}
      <section className="bg-[#F7F7F5] py-12">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              <Book size={28} className="mr-3" />
              Size Reference Guide
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full text-left bg-white">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="p-4 sm:p-6 text-[#1B4D3E] font-semibold">Mattress Size</th>
                  <th className="p-4 sm:p-6 text-[#1B4D3E] font-semibold">Dimensions</th>
                  <th className="p-4 sm:p-6 text-[#1B4D3E] font-semibold">Ideal For</th>
                </tr>
              </thead>

              <tbody>
                {[
                  ['Single', '36″ × 75″', 'Perfect for children and teens'],
                  ['Queen', '60″ × 80″', 'Most popular size for couples'],
                  ['King', '76″ × 80″', 'Spacious comfort for families']
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-[#E6F0EC] transition">
                    <td className="p-4 sm:p-6">{row[0]}</td>
                    <td className="p-4 sm:p-6">{row[1]}</td>
                    <td className="p-4 sm:p-6" style={{ color: '#606060' }}>{row[2]}</td>
                  </tr>
                ))}

                <tr className="hover:bg-[#E6F0EC] transition">
                  <td className="p-4 sm:p-6 font-bold">Custom</td>
                  <td className="p-4 sm:p-6 font-bold">Your Measurements</td>
                  <td className="p-4 sm:p-6 font-bold text-[#1B4D3E]">Unique Bed Frames / Custom Comfort</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* CUSTOM SIZE CALCULATOR */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto">

            <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Custom Size Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">

                {/* Width */}
                <div>
                  <label className="block text-sm font-medium mb-2">Width (inches)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full p-3 border border-[#E0E3DF] rounded-xl focus:border-[#C6A878] focus:ring-4 focus:ring-[#C6A878]/20 transition"
                    placeholder="e.g., 60"
                  />
                </div>

                {/* Length */}
                <div>
                  <label className="block text-sm font-medium mb-2">Length (inches)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full p-3 border border-[#E0E3DF] rounded-xl focus:border-[#C6A878] focus:ring-4 focus:ring-[#C6A878]/20 transition"
                    placeholder="e.g., 80"
                  />
                </div>

              </div>

              {/* Output */}
              <div className="text-center">
                <div className="bg-[#F7F7F5] rounded-2xl p-6 mb-6">
                  <p className="text-sm" style={{ color: '#606060' }}>Suggested Size</p>
                  <p className="text-2xl font-bold text-[#1B4D3E]">{suggestedSize || '...'}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={calculateBestFit}
                    className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#1B4D3E] to-[#173F33] hover:opacity-90 transition"
                  >
                    Calculate Best Fit
                  </button>

                  <button
                    className="px-8 py-3 rounded-full font-semibold border border-[#C6A878] text-[#C6A878] hover:bg-[#C6A878] hover:text-white transition"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TOOLS YOU'LL NEED */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[#F7F7F5]">
        <div className="container mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-3xl font-bold mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
            Tools You’ll Need
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">

            {[Ruler, Book, Users].map((Icon, index) => (
              <div
                key={index}
                className="bg-white border border-[#E0E3DF] rounded-xl shadow-sm p-8"
              >
                <div className="text-[#1B4D3E] bg-[#E6F0EC] p-3 rounded-xl inline-block mb-4">
                  <Icon size={40} />
                </div>
                <h3 className="font-bold text-xl">
                  {index === 0 ? 'Measuring Tape' : index === 1 ? 'Notepad' : 'Assistance'}
                </h3>
                <p style={{ color: '#606060' }}>
                  {index === 0 ? 'Flexible & sturdy' : index === 1 ? 'To record dimensions' : 'For precise measuring'}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* EXPERT GUIDANCE CTA */}
      <section className="bg-gradient-to-br from-[#1B4D3E] to-[#173F33] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-12 items-center">

          <div className="lg:col-span-2 text-center lg:text-left">

            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pro Tip: Need Expert Guidance?
            </h2>

            <p className="text-lg opacity-90 mb-8">
              Our experts can help you find the perfect mattress size and fit for your space, habits, and preferences.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">

              <button className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold bg-[#C6A878] hover:bg-[#B49563] text-white transition flex items-center justify-center">
                <Phone size={20} className="mr-2" /> Talk to Size Expert
              </button>

              <button className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold border border-[#C6A878] text-[#C6A878] hover:bg-[#C6A878] hover:text-white transition flex items-center justify-center">
                <Calendar size={20} className="mr-2" /> Schedule Home Visit
              </button>

            </div>

          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <ul className="space-y-3">

              <li className="flex items-start">
                <Check size={20} className="text-[#C6A878] mr-3 mt-1" />
                <span>Personalized recommendations</span>
              </li>

              <li className="flex items-start">
                <Check size={20} className="text-[#C6A878] mr-3 mt-1" />
                <span>Space planning tips</span>
              </li>

              <li className="flex items-start">
                <Check size={20} className="text-[#C6A878] mr-3 mt-1" />
                <span>Mattress + base matching</span>
              </li>

            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

export default MeasureBedSize;
