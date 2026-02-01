import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Bug, Wind, Calendar } from 'lucide-react';

const badges = [
    { icon: <ShieldAlert size={28} />, label: "Anti-bacterial" },
    { icon: <Bug size={28} />, label: "Dust-mite resistant" },
    { icon: <Wind size={28} />, label: "Breathable" },
    { icon: <Calendar size={28} />, label: "High durability" }
];

const TrustBadges: React.FC = () => {
    return (
        <section className="py-20 bg-[#FAF7F2] border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
                    {badges.map((badge, idx) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center gap-4 text-gray-400 group hover:text-[#C6A878] transition-colors duration-500"
                        >
                            <div className="transition-transform duration-500 group-hover:scale-110">
                                {badge.icon}
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] font-bold">{badge.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
