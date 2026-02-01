import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckoutStep {
    id: number;
    title: string;
}

interface CheckoutTruckProgressProps {
    currentStep: number;
    steps: CheckoutStep[];
}

const CheckoutTruckProgress: React.FC<CheckoutTruckProgressProps> = ({ currentStep, steps }) => {
    const [truckPosition, setTruckPosition] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Recalculate position on step change or resize
    useEffect(() => {
        const calculatePosition = () => {
            if (stepRefs.current[currentStep - 1] && containerRef.current) {
                const currentStepElement = stepRefs.current[currentStep - 1];
                if (currentStepElement) {
                    const stepCenter = currentStepElement.offsetLeft + currentStepElement.offsetWidth / 2;
                    const truckWidth = window.innerWidth < 768 ? 60 : 90; // Responsive truck width
                    const newPosition = stepCenter - truckWidth / 2;
                    
                    if (Math.abs(truckPosition - newPosition) > 1) {
                        setIsMoving(true);
                        setTruckPosition(newPosition);
                    }
                }
            }
        };

        // A small delay to ensure DOM elements are rendered and have dimensions
        const timeoutId = setTimeout(calculatePosition, 100);
        window.addEventListener('resize', calculatePosition);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', calculatePosition);
        };
    }, [currentStep, truckPosition]);
    
    // Reset moving state after animation
    useEffect(() => {
        if (isMoving) {
            const timer = setTimeout(() => setIsMoving(false), 800); // Corresponds to animation duration
            return () => clearTimeout(timer);
        }
    }, [isMoving]);

    const truckVariants: Variants = {
        initial: { x: 0, rotate: 0 },
        animate: (isMoving) => ({
            x: truckPosition,
            rotate: isMoving ? [0, 3, -1, 0] : 0,
            transition: {
                x: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
                rotate: { duration: 0.8, repeat: 0 },
            },
        }),
    };

    const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6 mb-8 overflow-hidden">
            <div ref={containerRef} className="relative w-full h-20 flex items-center">
                {/* Progress Bar */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2">
                    <motion.div 
                        className="h-full"
                        style={{ background: 'linear-gradient(90deg, #C6A878, #EAE2B7)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressWidth}%` }}
                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                    />
                </div>

                {/* Truck */}
                <motion.div
                    className="absolute top-1/2 -translate-y-[calc(50%+20px)] z-10"
                    style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))' }}
                    variants={truckVariants}
                    custom={isMoving}
                    initial="initial"
                    animate="animate"
                >
                    <motion.img 
                        src="/animation/truck.png" 
                        alt="Delivery Truck" 
                        className="w-[60px] md:w-[90px] h-auto"
                        whileHover={{ y: -3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    />
                    {/* Glow Trail */}
                    <AnimatePresence>
                    {isMoving && (
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-24 h-12 -z-10"
                            style={{ 
                                background: 'rgba(198, 168, 120, 0.30)',
                                filter: 'blur(25px)',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
                            exit={{ opacity: 0, transition: { duration: 0.4 } }}
                        />
                    )}
                    </AnimatePresence>
                </motion.div>

                {/* Steps */}
                <div className="w-full flex justify-between items-start">
                    {steps.map((step, index) => {
                        const isCompleted = currentStep > step.id;
                        const isActive = currentStep === step.id;
                        return (
                            <div 
                                key={step.id} 
                                ref={el => stepRefs.current[index] = el}
                                className="relative z-20 flex flex-col items-center text-center w-20"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ${isCompleted ? 'bg-gold-champagne border-gold-champagne text-white' : isActive ? 'border-gold-champagne text-gold-champagne bg-white' : 'border-gray-300 text-gray-400 bg-white'}`}>
                                    {isCompleted ? <Check size={20} /> : step.id}
                                </div>
                                <span className={`mt-3 font-medium text-sm sm:text-base ${isActive || isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>{step.title}</span>
                                {isActive && (
                                    <motion.div 
                                        className="absolute -inset-2 rounded-full bg-gold-champagne/10 -z-10"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1.5, opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CheckoutTruckProgress;