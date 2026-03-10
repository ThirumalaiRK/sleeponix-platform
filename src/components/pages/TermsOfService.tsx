import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Mail, CreditCard } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const TermsOfService: React.FC = () => {
    useSEO({
        title: 'Terms of Service | Sleeponix',
        description: 'Read Sleeponix Terms of Service. Understand your rights and obligations when purchasing our premium natural latex mattresses and sleep products.',
        canonicalPath: '/terms-of-service',
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
                        <FileText className="text-[#C6A878] w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Terms of Service</h1>
                    <p className="text-[#B0C4BC] text-lg max-w-2xl mx-auto leading-relaxed">
                        Please read these terms carefully before using our services. They outline your rights and obligations when purchasing from Sleeponix.
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
                    <motion.div variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#143d29]/10 text-[#143d29] font-serif font-bold">1</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Introduction & Agreement</h2>
                                <p className="text-[#5f4b3b] leading-relaxed">
                                    Welcome to Sleeponix ("we," "our," or "us"). By accessing our website, purchasing our products, or using our services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#143d29]/10 text-[#143d29] font-serif font-bold">2</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Products & Usage</h2>
                                <div className="space-y-4 text-[#5f4b3b] leading-relaxed">
                                    <p>We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
                                    <p>We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <CreditCard className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Pricing & Payment</h2>
                                <p className="text-[#5f4b3b] leading-relaxed mb-4">
                                    Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-[#5f4b3b]">
                                    <li>All payments are securely processed.</li>
                                    <li>We accept major credit cards, UPI, and other secure payment methods.</li>
                                    <li>Taxes are calculated based on your shipping location.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <ShieldCheck className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Limitation of Liability</h2>
                                <p className="text-[#5f4b3b] leading-relaxed">
                                    In no case shall Sleeponix, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div variants={itemVariants} className="bg-[#fcfaf7] p-8 rounded-2xl border border-[#eadfcc]">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="bg-white p-4 rounded-full shadow-sm">
                                <Mail className="w-6 h-6 text-[#143d29]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#143d29] mb-2">Have Questions?</h3>
                                <p className="text-[#5f4b3b] mb-4">
                                    If you have any questions about these Terms of Service, please contact us.
                                </p>
                                <a href="mailto:support@sleeponix.com" className="text-[#C6A878] font-bold hover:underline">
                                    support@sleeponix.com
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
