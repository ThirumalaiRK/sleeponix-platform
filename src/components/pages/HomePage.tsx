import React from 'react';
import Hero from '../Hero';
import ProductBenefits from '../ProductBenefits';
import ProductOverview from '../ProductOverview';
import Testimonials from '../Testimonials';
import Certifications from '../Certifications';
import HowItsMade from '../HowItsMade';
import WhyLatex from '../WhyLatex';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero />
      <ProductOverview />
      <ProductBenefits />
      <WhyLatex />
      <HowItsMade />
      <Certifications />
      <Testimonials />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <img src="/images/features.png" alt="Product features" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default HomePage;