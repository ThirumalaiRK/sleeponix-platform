import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('sleeponix_cart') || '[]');
      setCartItemCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cartUpdated', updateCartCount);
    
    updateCartCount(); // Initial count

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const headerClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    bg-white
    ${isScrolled ? 'shadow-[0_6px_20px_rgba(0,0,0,0.07)]' : 'shadow-none'}
  `;

  const navLinkClasses = `
    text-gray-700 hover:text-deep-indigo font-medium
  `;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-deep-indigo">
            Sleeponix
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/" className={navLinkClasses}>Home</Link>
            <Link to="/shop" className={navLinkClasses}>Shop</Link>
            <Link to="/about" className={navLinkClasses}>About</Link>
            <Link to="/contact" className={navLinkClasses}>Contact</Link>
          </nav>

          {/* Icons & CTA */}
          <div className="flex items-center space-x-6">
            <button className={navLinkClasses}>
              <Search size={20} />
            </button>
            <Link to="/cart" className={`relative ${navLinkClasses}`}>
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-champagne text-deep-indigo text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className={navLinkClasses}>
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;