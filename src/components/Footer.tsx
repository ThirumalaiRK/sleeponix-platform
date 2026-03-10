import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Why Latex?", href: "/why-latex" },
    { name: "Contact", href: "/contact" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/our-story" },
    { name: "Store Locator", href: "/store-finder" },
  ];

  const legal = [
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Warranty", href: "/warranty" },
    { name: "Return Policy", href: "/return-policy" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Twitter, href: "#" },
  ];

  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-[#1A3A32] to-[#111816] text-white font-sans overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")` }}
      ></div>

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-8 pt-24 pb-12">
        {/* Newsletter Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-24"
          variants={itemVariants}
        >
          <div>
            <h3 className="text-3xl font-serif text-[#E1ECE7] mb-3">Join the Sleeponix Family</h3>
            <p className="text-[#B0C4BC] leading-relaxed max-w-lg">
              Be the first to know about new products, exclusive offers, and the latest in sleep science.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-[#C6A878] 
                         placeholder:text-[#9FB4AD]/70 transition-all duration-300"
            />
            <motion.button
              type="submit"
              className="bg-[#C6A878] text-[#1A3A32] px-8 py-4 rounded-xl font-semibold 
                         flex items-center justify-center space-x-2 shadow-lg shadow-black/20"
              whileHover={{ scale: 1.05, backgroundColor: '#B49563' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <span>Subscribe</span>
              <ArrowRight size={20} />
            </motion.button>
          </form>
        </motion.div>

        {/* Main Footer Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-16"
          variants={footerVariants}
        >
          {/* Brand Section */}
          <motion.div
            className="sm:col-span-2 lg:col-span-2"
            variants={itemVariants}
          >
            <img src="/images/white logo.png" alt="Sleeponix" className="h-10 mb-6" />
            <p className="text-[#B0C4BC] mb-8 max-w-md leading-relaxed text-base">
              Crafting premium natural latex mattresses for a decade. Experience the perfect blend of comfort, sustainability, and luxury sleep.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="text-white/70 hover:text-[#C6A878]"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {[{ title: "Quick Links", links: quickLinks },
          { title: "Company", links: company },
          { title: "Legal", links: legal }].map((column, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-xl font-semibold text-[#E1ECE7] mb-8 tracking-wider">{column.title}</h3>
              <ul className="space-y-5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[#B0C4BC] hover:text-white transition-colors duration-300 text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <div className="text-[#9FB4AD]/80 text-sm text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Sleeponix. All Rights Reserved. Crafted for blissful nights.
          </div>
          <div className="flex items-center space-x-6 text-sm text-[#9FB4AD]/80">
            <div className="flex items-center space-x-2 hover:text-white transition-colors">
              <Mail size={16} />
              <a href="mailto:support@sleeponix.com">support@sleeponix.com</a>
            </div>
            <span>1-800-SLEEPONIX</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;