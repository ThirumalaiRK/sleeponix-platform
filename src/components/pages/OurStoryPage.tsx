import React from 'react';
import AboutStory from '../AboutStory';
import OurStoryHero from '../OurStoryHero';
import { useSEO } from '../../hooks/useSEO';

const OurStoryPage: React.FC = () => {
  useSEO({
    title: 'Our Story | Sleeponix - A Decade of Natural Sleep Craftsmanship',
    description: 'Learn about Sleeponix\'s journey crafting premium natural latex mattresses for over a decade. Our commitment to organic, sustainable sleep solutions.',
    keywords: 'Sleeponix story, natural mattress brand, latex mattress maker India',
    canonicalPath: '/our-story',
  });
  return (
    <div>
      <OurStoryHero />
      <AboutStory />
    </div>
  );
};

export default OurStoryPage;