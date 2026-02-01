import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Droplet, Beaker, Flame, Wind, ClipboardCheck, Package } from 'lucide-react';

const steps = [
  {
    icon: Droplet,
    title: "Latex Extraction",
    description: "Fresh natural latex sap is collected and purified for processing.",
  },
  {
    icon: Beaker,
    title: "Foaming & Blending",
    description: "Latex is mixed with additives and whipped into stable foam.",
  },
  {
    icon: Flame,
    title: "Molding & Vulcanization",
    description: "Foamed latex is poured into molds and heat-cured for strength.",
  },
  {
    icon: Wind,
    title: "Washing & Drying",
    description: "Latex cores are thoroughly washed, then dried and cured.",
  },
  {
    icon: ClipboardCheck,
    title: "Shaping & Quality Check",
    description: "Edges are trimmed and each piece is tested for firmness and durability.",
  },
  {
    icon: Package,
    title: "Covering & Packaging",
    description: "Covers are stitched, products are packed, and prepared for dispatch.",
  },
];

const HowItsMade: React.FC = () => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const timelineVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
    },
  };

  const dotVariants: Variants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: { delay: i * 0.15 + 0.4, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  const connectorVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.15 + 0.4, duration: 0.5, ease: 'easeOut' },
        opacity: { delay: i * 0.15 + 0.4, duration: 0.01 },
      },
    }),
  };

  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 mb-6">
            Crafted by Nature, Perfected by Science
          </h2>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            From tree to bedroom, discover the meticulous process behind every Sleeponix mattress
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#cbb79a]"
            style={{ transform: "translateX(-50%)", originY: 0 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={timelineVariants}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-24 gap-y-16 lg:gap-y-24">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  variants={cardVariants}
                  className={`relative ${isLeft ? "lg:col-start-1" : "lg:col-start-2"} ${!isLeft && "lg:mt-24"}`}
                >
                  <div
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2"
                    style={{ [isLeft ? "right" : "left"]: "100%", width: "3rem" }}
                  >
                    <motion.div
                      custom={index}
                      variants={dotVariants}
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#cbb79a] rounded-full z-10"
                      style={{ [isLeft ? "right" : "left"]: "-8px" }}
                    />
                    <motion.svg
                      width="48"
                      height="40"
                      viewBox="0 0 48 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ [isLeft ? "right" : "left"]: 0, transform: !isLeft ? "scaleX(-1)" : "" }}
                    >
                      <motion.path
                        custom={index}
                        variants={connectorVariants}
                        d="M0 20 C 16 0, 32 40, 48 20"
                        stroke="#cbb79a"
                        strokeWidth="1.5"
                      />
                    </motion.svg>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-[#c7a76d]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <step.icon className="text-[#c7a76d]" size={32} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-serif font-bold text-charcoal-900">
                          {step.title}
                        </h3>
                        <div className="text-sm text-[#c7a76d] font-semibold">
                          Step {index + 1}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-gray leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MERGED Artisan Craftsmanship Section */}
        <div className="text-center mt-24">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto border">
            <h3 className="text-2xl font-serif font-bold text-[#c7a76d] mb-4">
              Witness Artisan Craftsmanship
            </h3>
            <p className="text-[#c7a76d] mb-6">
              Experience the meticulous care behind every Sleeponix mattress
            </p>
            <button className="bg-[#c7a76d] text-white px-8 py-3 rounded-full font-semibold transition hover:brightness-95">
              Discover Our Process
            </button>
          </div>
        </div>

        {/* Environmental Impact Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-serif font-bold text-charcoal-900 mb-4">
            Our Environmental Impact
          </h2>
          <div className="bg-beige-100 p-8 rounded-2xl max-w-4xl mx-auto">
            <p className="text-charcoal-900">
              Our commitment to the planet is as strong as our commitment to your sleep. 
              We use sustainable practices at every step, ensuring a greener tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItsMade;