import React, { useState } from 'react';
import { Check, Play, Ruler, Book, Phone, Calendar, Users } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const MeasureBedSize: React.FC = () => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [suggestedSize, setSuggestedSize] = useState('');
  const [activeStep, setActiveStep] = useState<number | null>(1);

  useSEO({
    title: 'How to Measure Your Bed Size | Sleeponix Size Guide',
    description: 'Use our step-by-step bed size measurement guide & custom size calculator to find the perfect Sleeponix mattress fit. Single, Queen, King or custom sizes.',
    keywords: 'how to measure mattress size, bed size guide India, custom mattress size, mattress dimensions',
    canonicalPath: '/measure-bed-size',
  });

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

      {/* INTERACTIVE 3-STEP MEASUREMENT */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: 'Playfair Display, serif' }} className="text-3xl md:text-4xl font-bold mb-4 text-[#1B4D3E]">
              The 3-Step Measurement
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow the A, B, C system to get the exact dimensions needed for your custom order.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Steps */}
            <div className="space-y-8">
              {[
                { id: 1, label: 'A', title: 'Width', desc: 'Measure from the widest point side-to-side.', fullDesc: 'Measure across the mattress or bed frame from left to right.' },
                { id: 2, label: 'B', title: 'Length', desc: 'Measure from head to foot, inside the frame.', fullDesc: 'Measure from the headboard to the footboard.' },
                { id: 3, label: 'C', title: 'Height/Depth', desc: 'Measure the depth of the mattress recess.', fullDesc: 'Measure from the top of the slats/base to the top of the side rail.' }
              ].map((step) => (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${activeStep === step.id
                    ? 'bg-[#F2F9F7] border-[#1B4D3E] shadow-lg scale-102 transform translate-x-2'
                    : 'bg-transparent border-transparent hover:bg-gray-50'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold transition-colors ${activeStep === step.id ? 'bg-[#1B4D3E] text-white' : 'bg-[#E6F0EC] text-[#1B4D3E]'
                    }`}>
                    {step.label}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${activeStep === step.id ? 'text-[#1B4D3E]' : 'text-gray-900'}`}>{step.title}</h3>
                    <p className="text-gray-600 font-medium mb-1">{step.desc}</p>
                    <p className={`text-sm text-gray-500 transition-all duration-300 ${activeStep === step.id ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>{step.fullDesc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Interactive SVG Diagram */}
            <div className="bg-[#F9FAFB] rounded-3xl p-10 flex items-center justify-center relative border border-gray-100 shadow-inner min-h-[400px]">
              <svg viewBox="0 80 600 350" className="w-full h-full drop-shadow-sm select-none" style={{ maxHeight: '400px' }}>
                <defs>
                  <marker id="arrowHeadGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 L0,0" fill="#1B4D3E" />
                  </marker>
                  <marker id="arrowHeadGray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 L0,0" fill="#9CA3AF" />
                  </marker>
                </defs>

                {/* --- BASE BED FRAME (Wireframe Style) --- */}

                {/* Back Headboard (Partially Hidden) */}
                <path d="M140,180 L140,100 L200,60 L200,140" fill="none" stroke="#E5E7EB" strokeWidth="1" />

                {/* Main Mattress Block */}
                {/* Top Surface */}
                <path d="M140,180 L440,180 L520,120 L200,120 L140,180 Z"
                  fill={activeStep === 1 || activeStep === 2 ? "#FFFFFF" : "#F9FAFB"}
                  stroke="#D1D5DB" strokeWidth="1.5" />

                {/* Front Face (Long Side = Length, Step B) */}
                <path d="M140,180 L440,180 L440,260 L140,260 Z"
                  fill={activeStep === 2 ? "#E6F0EC" : "#FFFFFF"}
                  stroke={activeStep === 2 ? "#1B4D3E" : "#D1D5DB"}
                  strokeWidth={activeStep === 2 ? 2 : 1.5}
                  className="transition-all duration-300"
                />

                {/* Side Face (Short Side = Width, Step A) */}
                <path d="M440,180 L520,120 L520,200 L440,260 Z"
                  fill={activeStep === 1 ? "#E6F0EC" : "#F3F4F6"}
                  stroke={activeStep === 1 ? "#1B4D3E" : "#D1D5DB"}
                  strokeWidth={activeStep === 1 ? 2 : 1.5}
                  className="transition-all duration-300"
                />

                {/* Headboard (Visible Part) */}
                {/* Front Face */}
                <path d="M140,180 L140,100 L200,60 L200,120" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
                {/* Side Thickness */}
                <path d="M200,60 L210,60 L210,125" fill="none" stroke="#E5E7EB" strokeWidth="1" />


                {/* --- DIMENSION INDICATORS --- */}

                {/* A: Width Indicator (Short Side / Side Face) */}
                <g style={{ transition: 'all 0.4s ease', opacity: activeStep === 1 ? 1 : 0.3 }}>
                  {/* Extension Lines - projected out */}
                  <line x1="445" y1="265" x2="485" y2="295" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />
                  <line x1="525" y1="205" x2="565" y2="235" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />

                  {/* Arrow Line */}
                  <line x1="480" y1="290" x2="560" y2="230"
                    stroke={activeStep === 1 ? "#1B4D3E" : "#9CA3AF"}
                    strokeWidth="2"
                    markerEnd={activeStep === 1 ? "url(#arrowHeadGreen)" : "url(#arrowHeadGray)"}
                    markerStart={activeStep === 1 ? "url(#arrowHeadGreen)" : "url(#arrowHeadGray)"} />

                  {/* Label */}
                  <rect x="500" y="255" width="90" height="30" rx="4" fill="#FFFFFF" fillOpacity="0.8" />
                  <text x="545" y="275" textAnchor="middle" fill={activeStep === 1 ? "#1B4D3E" : "#6B7280"} fontSize="16" fontWeight="bold">A (Width)</text>
                </g>


                {/* B: Length Indicator (Long Side / Front Face) */}
                <g style={{ transition: 'all 0.4s ease', opacity: activeStep === 2 ? 1 : 0.3 }}>
                  {/* Extension Lines */}
                  <line x1="140" y1="265" x2="140" y2="310" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />
                  <line x1="440" y1="265" x2="440" y2="310" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />

                  {/* Arrow Line */}
                  <line x1="145" y1="295" x2="435" y2="295"
                    stroke={activeStep === 2 ? "#1B4D3E" : "#9CA3AF"}
                    strokeWidth="2"
                    markerEnd={activeStep === 2 ? "url(#arrowHeadGreen)" : "url(#arrowHeadGray)"}
                    markerStart={activeStep === 2 ? "url(#arrowHeadGreen)" : "url(#arrowHeadGray)"} />

                  {/* Label */}
                  <rect x="250" y="275" width="90" height="40" rx="4" fill="#FFFFFF" fillOpacity="0.8" />
                  <text x="295" y="300" textAnchor="middle" fill={activeStep === 2 ? "#1B4D3E" : "#6B7280"} fontSize="16" fontWeight="bold">B (Length)</text>
                </g>


                {/* C: Height Indicator (Vertical Left Side) */}
                <g style={{ transition: 'all 0.4s ease', opacity: activeStep === 3 ? 1 : 0.3 }}>
                  {/* Extension Lines */}
                  <line x1="140" y1="180" x2="95" y2="180" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />
                  <line x1="140" y1="260" x2="95" y2="260" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="4" />

                  {/* Arrow Line */}
                  <line x1="105" y1="185" x2="105" y2="255"
                    stroke={activeStep === 3 ? "#1B4D3E" : "#9CA3AF"}
                    strokeWidth="2"
                    markerEnd={activeStep === 3 ? "url(#arrowHeadGreen)" : "url(#arrowHeadGray)"}
                    markerStart={activeStep === 3 ? "url(#arrowHeadGreen)" : "url(#arrowHeadGray)"} />

                  {/* Label */}
                  <rect x="65" y="205" width="30" height="90" rx="4" fill="#FFFFFF" fillOpacity="0.8" />
                  <text x="80" y="250" textAnchor="middle" fill={activeStep === 3 ? "#1B4D3E" : "#6B7280"} fontSize="16" fontWeight="bold" transform="rotate(-90 80 250)">C (Depth)</text>

                  {/* Highlight Top Edge to show Depth Context */}
                  <path d="M140,180 L440,180" stroke={activeStep === 3 ? "#1B4D3E" : "none"} strokeWidth="3" />
                </g>

              </svg>
            </div>
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
