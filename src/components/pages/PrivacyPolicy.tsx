import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, Database, Cookie, Shield, Mail } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

const PrivacyPolicy: React.FC = () => {
    useSEO({
        title: 'Privacy Policy | Sleeponix - How We Protect Your Data',
        description: 'Read Sleeponix Privacy Policy. Learn how we collect, use, and protect your personal information when you shop with us.',
        canonicalPath: '/privacy-policy',
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
                        <Lock className="text-[#C6A878] w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Privacy Policy</h1>
                    <p className="text-[#B0C4BC] text-lg max-w-2xl mx-auto leading-relaxed">
                        Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it.
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
                                <Database className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Collection of Information</h2>
                                <p className="text-[#5f4b3b] leading-relaxed mb-4">
                                    We collect personal information that you provide to us directly, such as when you create an account, make a purchase, or contact customer support. This information may include:
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#5f4b3b] text-sm font-medium">
                                    <li className="flex items-center gap-2"><span className="text-[#C6A878]">•</span> Name and Contact Details</li>
                                    <li className="flex items-center gap-2"><span className="text-[#C6A878]">•</span> Shipping & Billing Address</li>
                                    <li className="flex items-center gap-2"><span className="text-[#C6A878]">•</span> Payment Information</li>
                                    <li className="flex items-center gap-2"><span className="text-[#C6A878]">•</span> Order History</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Eye className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Use of Information</h2>
                                <p className="text-[#5f4b3b] leading-relaxed mb-4">
                                    We use the information we collect to provide, maintain, and improve our services, including:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-[#5f4b3b]">
                                    <li>Processing transactions and sending related information like order confirmations and invoices.</li>
                                    <li>Sending you technical notices, updates, security alerts, and support messages.</li>
                                    <li>Responding to your comments, questions, and requests.</li>
                                    <li>Communicating with you about products, services, offers, and events.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Cookie className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Cookies & Tracking</h2>
                                <p className="text-[#5f4b3b] leading-relaxed">
                                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 4 */}
                    <motion.section variants={itemVariants} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <Shield className="w-8 h-8 text-[#C6A878]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#143d29] mb-4">Security</h2>
                                <p className="text-[#5f4b3b] leading-relaxed">
                                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
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
                                <h3 className="text-xl font-bold text-[#143d29] mb-2">Privacy Concerns?</h3>
                                <p className="text-[#5f4b3b] mb-4">
                                    If you have any questions about this Privacy Policy, please contact us.
                                </p>
                                <a href="mailto:privacy@sleeponix.com" className="text-[#C6A878] font-bold hover:underline">
                                    privacy@sleeponix.com
                                </a>
                            </div>
                        </div>
                    </motion.section>

                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
