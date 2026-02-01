import React from 'react';
import AboutStory from '../AboutStory';
import OurStoryHero from '../OurStoryHero';

const OurStoryPage: React.FC = () => {
  return (
    <div>
      <OurStoryHero />
      <AboutStory />
    </div>
  );
};

export default OurStoryPage;