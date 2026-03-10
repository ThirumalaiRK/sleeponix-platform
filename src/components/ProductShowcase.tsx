import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, easeInOut } from 'framer-motion';
import { ArrowRight, Bed, Sofa, ToyBrick } from 'lucide-react';
import { mattressData } from './products/mattressData';
import { pillows } from './products/pillowData';
import { accessories } from './products/accessories';

const categoryIcons = {
  Mattresses: <Bed className="w-8 h-8 text-charcoal-700" />,
  Pillows: <Sofa className="w-8 h-8 text-charcoal-700" />,
  Accessories: <ToyBrick className="w-8 h-8 text-charcoal-700" />,
};

const categories = [
  {
    name: 'Mattresses',
    link: '/shop?category=mattresses',
    products: mattressData.slice(0, 2),
    icon: categoryIcons.Mattresses,
    description: 'Discover the foundation of perfect sleep with our luxury latex mattresses.',
  },
  {
    name: 'Pillows',
    link: '/products/pillows',
    products: pillows.slice(0, 2).map(p => ({ ...p, href: `/products/pillows/${p.id}` })),
    icon: categoryIcons.Pillows,
    description: 'Experience unparalleled comfort and support with our ergonomic pillows.',
  },
  {
    name: 'Accessories',
    link: '/shop?category=accessories',
    products: accessories.slice(0, 2).map(a => ({ ...a, href: '#', description: a.tagline })),
    icon: categoryIcons.Accessories,
    description: 'Complete your sleep sanctuary with our premium bed accessories.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeInOut,
    },
  }),
};

const ProductShowcase: React.FC = () => {
  const location = useLocation();

  return (
    <section className="bg-cream-100 py-24 sm:py-32 relative overflow-hidden">
      {/* Organic Wave Divider - Top */}
      <div className="absolute top-0 left-0 w-full h-24 -translate-y-1/2">
        <svg className="w-full h-full text-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C480,100 960,0 1440,50 L1440,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-900 tracking-tight">
            Explore Our Collection
          </h2>
          <p className="mt-4 text-lg text-charcoal-600 max-w-2xl mx-auto">
            Curated for your ultimate comfort, from mattresses to accessories.
          </p>
          <div className="mt-6 h-1 w-24 bg-gold-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((category, index) => {
            const isActive = location.pathname + location.search === category.link;
            return (
              <motion.div
                key={category.name}
                className={`group relative flex flex-col h-full bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl shadow-charcoal-500/10 overflow-hidden border border-white/30 transition-all duration-300 ${isActive ? 'ring-2 ring-gold-500' : ''}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
              >
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    {category.icon}
                    <h3 className="text-2xl font-semibold font-serif text-charcoal-900">{category.name}</h3>
                  </div>
                  <p className="text-charcoal-600 mb-6 min-h-[40px] flex-grow">{category.description}</p>

                  <div className="space-y-5">
                    {category.products.map(product => (
                      <Link to={product.href || '#'} key={product.name} className="block">
                        <motion.div
                          className="flex items-center gap-5 p-4 rounded-2xl bg-white/50 group-hover:bg-white/80 transition-colors duration-300"
                          whileHover={{ scale: 1.03, x: 5, transition: { duration: 0.3, ease: 'easeInOut' } }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-xl shadow-lg flex-shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-charcoal-800">
                              {product.name}
                            </p>
                            <p className="text-sm text-charcoal-500 line-clamp-2">{product.description}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-8 mt-auto bg-gradient-to-t from-white/80 to-transparent relative">
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-transparent transition-colors duration-300 group-hover:bg-gold-500"></div>
                  <Link
                    to={category.link}
                    className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-charcoal-900 bg-gold-500 rounded-full shadow-lg hover:bg-gold-600 transition-all duration-300 group-hover:shadow-xl"
                  >
                    View All {category.name}
                    <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Organic Wave Divider - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 translate-y-1/2">
        <svg className="w-full h-full text-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C480,0 960,100 1440,50 L1440,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
};

export default ProductShowcase;