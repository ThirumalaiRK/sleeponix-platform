import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const StatBlock = ({ value, label, subtext, icon }: { value: number, label: string, subtext: string, suffix?: string, icon: React.ReactNode }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, springValue, value]);

    useEffect(() => {
        return springValue.onChange((v) => {
            setDisplayValue(Math.floor(v));
        });
    }, [springValue]);

    return (
        <div ref={ref} className="bg-[#1B4D3E]/5 border border-[#1B4D3E]/10 rounded-[2.5rem] p-12 text-center group hover:bg-[#1B4D3E]/80 hover:text-white transition-all duration-700">
            <div className="text-[#C6A878] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <div className="text-5xl font-serif font-bold mb-4 flex justify-center items-center gap-1">
                <span>{displayValue}</span>
                {label.includes('%') && <span>%</span>}
                {label.includes('+') && <span>+</span>}
            </div>
            <p className="text-lg font-bold uppercase tracking-widest mb-2 opacity-80">{label.replace(/[0-9%+\s]/g, '')}</p>
            <p className="text-sm opacity-60 font-medium group-hover:opacity-80 transition-opacity">
                {subtext}
            </p>
        </div>
    );
};

const EnvironmentalImpact: React.FC = () => {
    return (
        <section className="py-32 bg-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-[0.4em] text-[#C6A878] font-bold mb-4 block"
                    >
                        Our Footprint
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold text-[#1B4D3E] mb-6"
                    >
                        Numbers Speak Loudly
                    </motion.h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        Using data, not adjectives—our commitment to the planet is measurable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <StatBlock
                        value={100}
                        label="100% Natural"
                        subtext="Fully biodegradable raw materials"
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                    />
                    <StatBlock
                        value={0}
                        label="Zero Chemicals"
                        suffix=""
                        subtext="Zero harmful off-gassing or synthetics"
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.477 2.387a2 2 0 00.547 1.022l1.428 1.428a2 2 0 002.828 0l1.428-1.428a2 2 0 000-2.828z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 3h6m0 0v6m0-6L14 10M9 21h6m0 0v-6m0 6l-7-7M9 3v18"></path></svg>}
                    />
                    <StatBlock
                        value={25}
                        label="25+ Years"
                        subtext="Engineered for unmatched durability"
                        icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                    />
                </div>
            </div>
        </section>
    );
};

export default EnvironmentalImpact;
