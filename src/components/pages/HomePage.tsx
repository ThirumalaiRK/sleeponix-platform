import React from 'react';
import Hero from '../Hero';
import ProductBenefits from '../ProductBenefits';
import ProductOverview from '../ProductOverview';
import Testimonials from '../Testimonials';
import Certifications from '../Certifications';
import HowItsMade from '../HowItsMade';
import WhyLatex from '../WhyLatex';
import { useSEO } from '../../hooks/useSEO';
import { useSchema } from '../../hooks/useSchema';

const HomePage: React.FC = () => {
  useSEO({
    title: 'Sleeponix - Premium Natural Latex Mattresses | 100% Organic Sleep Solutions',
    description: 'Experience nature\'s comfort with Sleeponix premium natural latex mattresses. 100% organic, hypoallergenic, and eco-friendly. 25-year warranty, 365-night trial.',
    keywords: 'natural latex mattress, organic mattress, eco-friendly sleep, hypoallergenic mattress, luxury bedding India',
    canonicalPath: '/',
  });

  // Inject Organization + WebSite schema for Google Knowledge Panel and Sitelinks Search Box
  useSchema({ type: 'Organization' });
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