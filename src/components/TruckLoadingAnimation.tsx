import { motion, Variants } from 'framer-motion';

const TruckLoadingAnimation = () => {
    const truckVariants: Variants = {
        initial: { x: '-150%', opacity: 0 },
        animate: {
            x: '150%',
            opacity: [0, 1, 1, 0],
            transition: {
                x: { duration: 3, ease: 'easeInOut' },
                opacity: { duration: 3, times: [0, 0.1, 0.9, 1] },
            }
        }
    };

    const textVariants: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: [0, 1, 1, 0],
            y: 0,
            transition: {
                opacity: { duration: 3, times: [0, 0.2, 0.8, 1] },
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.2
            }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-[#F7F7F5] flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                variants={truckVariants}
                initial="initial"
                animate="animate"
            >
                <motion.img 
                    src="/animation/truck.png" 
                    alt="Processing Order" 
                    className="w-40 md:w-56 h-auto"
                    style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
                    initial={{ scale: 0.98 }}
                    animate={{ scale: [0.98, 1.02, 1, 1.02, 0.98] }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                />
            </motion.div>
            <motion.p
                className="text-[#1B4D3E] font-semibold text-lg md:text-xl mt-8 font-serif"
                variants={textVariants}
                initial="initial"
                animate="animate"
            >
                Processing your order… Preparing for dispatch
            </motion.p>
        </motion.div>
    );
};

export default TruckLoadingAnimation;