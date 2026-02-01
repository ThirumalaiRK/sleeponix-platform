import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="smooth-scroll">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;