import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutStory from './components/AboutStory';
import ProductBenefits from './components/ProductBenefits';
import ProductOverview from './components/ProductOverview';
import WhyLatex from './components/WhyLatex';
import HowItsMade from './components/HowItsMade';
import SizeGuide from './components/SizeGuide';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="smooth-scroll">
      {/* The content of this file is not currently rendered due to routing in main.tsx */}
      {/* However, it is restored to its original state to preserve the homepage component structure. */}
      <Navigation />
      <Hero />
      <AboutStory />
      <ProductBenefits />
      <ProductOverview />
      <WhyLatex />
      <HowItsMade />
      <SizeGuide />
      <Certifications />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;