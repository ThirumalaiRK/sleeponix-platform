import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-9xl font-bold text-brand-green serif-font">404</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-deep-indigo mb-4 serif-font">Page Not Found</h2>
                    <p className="text-slate-gray mb-8">
                        The mattress you are looking for might have been moved or doesn't exist.
                        Let's get you back to a comfortable sleep.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-4 rounded-full border-2 border-brand-green text-brand-green font-bold hover:bg-brand-green hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
