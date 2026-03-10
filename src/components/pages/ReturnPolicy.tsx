import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, CheckCircle, Truck, Mail, AlertTriangle } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const ReturnPolicy: React.FC = () => {
    useSEO({
        title: 'Return Policy | Sleeponix - 365-Night Home Trial',
        description: 'Sleeponix offers a 365-night home trial. Not happy? Return your latex mattress for a full refund, no questions asked. Hassle-free pickup included.',
        canonicalPath: '/return-policy',
    });
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8]">
            {/* Hero Header */}
            <div className="bg-[#143d29] relative overflow-hidden pt-32 pb-24 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
                ></motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
                        <RefreshCcw className="text-[#C6A878] w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Returns & Refunds</h1>
                    <p className="text-[#B0C4BC] text-lg max-w-2xl mx-auto leading-relaxed">
                        We want you to sleep soundly. That includes being confident in your purchase. Learn about our hassle-free return process.
                    </p>
                    <p className="mt-8 text-[#C6A878] font-medium tracking-wide uppercase text-sm">Last Updated: {new Date().getFullYear()}</p>
                </motion.div>
            </div>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-6 pb-24 -mt-12 relative z-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-3xl shadow-xl border border-[#eadfcc] overflow-hidden p-8 md:p-12 space-y-12"
                >

                    {/* Section 1 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#143d29]/10 text-[#143d29] font-serif font-bold">1</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">365-Night Home Trial</h2>
                                <p className="text-[#5f4b3b] leading-relaxed mb-4">
                                    We are confident you'll love your Sleeponix mattress. We recommend sleeping on your new mattress for at least 30 nights to allow your body to adjust. If you are not completely satisfied within the first 365 nights (trial period specific to select mattress models), you may return it for a full refund.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <CheckCircle className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Eligibility for Returns</h2>
                                <div className="space-y-4 text-[#5f4b3b] leading-relaxed">
                                    <p>To be eligible for a return:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>The item must be in good condition, free from stains or damage not caused by defect.</li>
                                        <li>Original tags should be intact if applicable.</li>
                                        <li>Proof of purchase is required.</li>
                                        <li>Mattresses must have been used for at least 30 nights.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Truck className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">The Return Process</h2>
                                <ol className="list-decimal pl-5 space-y-3 text-[#5f4b3b]">
                                    <li><strong>Contact Us:</strong> Email us at <span className="text-[#C6A878]">returns@sleeponix.com</span> to initiate your return.</li>
                                    <li><strong>Schedule Pickup:</strong> We will arrange for a courier or charity to pick up the mattress from your home at no cost to you.</li>
                                    <li><strong>Refund:</strong> Once the pickup aligns with our donation or recycling policies, we will process your full refund.</li>
                                </ol>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 4 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <AlertTriangle className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Damaged or Defective Items</h2>
                                <p className="text-[#5f4b3b] leading-relaxed">
                                    Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right. Photos of the damage may be requested.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 5 */}
                    <motion.section variants={itemVariants} className="bg-[#fcfaf7] p-8 rounded-2xl border border-[#eadfcc]">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="bg-white p-4 rounded-full shadow-sm">
                                <Mail className="w-6 h-6 text-[#143d29]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#143d29] mb-2">Need Help?</h3>
                                <p className="text-[#5f4b3b] mb-4">
                                    For any return questions, please contact our support team.
                                </p>
                                <a href="mailto:support@sleeponix.com" className="text-[#C6A878] font-bold hover:underline">
                                    support@sleeponix.com
                                </a>
                            </div>
                        </div>
                    </motion.section>

                </motion.div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
