import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex flex-col justify-center items-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-9xl font-serif font-bold text-[#143d29] opacity-20">404</h1>
                <div className="relative -mt-16 sm:-mt-24 z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#143d29] mb-4">Page Not Found</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        Oops! It seems you've wandered into a dream. The page you are looking for doesn't exist.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 bg-[#143d29] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#0f2e1f] transition-all"
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 border-2 border-[#143d29] text-[#143d29] px-8 py-3 rounded-full font-bold hover:bg-[#143d29] hover:text-white transition-all"
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
