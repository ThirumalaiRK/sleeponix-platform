import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductSliderProps<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  cardWidth?: number;
  gap?: number;
}

const ProductSlider = <T extends { id: string | number }>({
  items,
  renderCard,
  cardWidth = 320, // Default card width in pixels
  gap = 32, // Default gap in pixels
}: ProductSliderProps<T>) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const totalWidth = items.length * (cardWidth + gap) - gap;
  const sliderWidth = sliderRef.current?.clientWidth || 0;
  const draggableWidth = Math.max(0, totalWidth - sliderWidth);

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;

    if (Math.abs(offset.x) > swipeThreshold) {
      const direction = offset.x < 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(items.length - 1, index + direction));
      setIndex(newIndex);
    }
  };

  const slideTo = (newIndex: number) => {
    setIndex(Math.max(0, Math.min(items.length - 1, newIndex)));
  };

  const x = useTransform(dragX, (value) => {
    const newX = -index * (cardWidth + gap) + value;
    return Math.max(-draggableWidth, Math.min(0, newX));
  });

  return (
    <div className="relative w-full" ref={sliderRef}>
      {/* Gradient Masks */}
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none" />

      {/* Slider Content */}
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x, gap: `${gap}px` }}
        drag="x"
        dragConstraints={{ left: -draggableWidth, right: 0 }}
        onDragEnd={onDragEnd}
        dragElastic={0.1}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {items.map((item) => (
          <div key={item.id} style={{ flex: `0 0 ${cardWidth}px` }}>
            {renderCard(item)}
          </div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[-2rem] pointer-events-none">
        <button
          onClick={() => slideTo(index - 1)}
          disabled={index === 0}
          className="pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-300"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateX(-50%)',
          }}
        >
          <ChevronLeft className="w-6 h-6 text-[#1C2635]" />
        </button>
        <button
          onClick={() => slideTo(index + 1)}
          disabled={index >= items.length - Math.floor(sliderWidth / (cardWidth + gap))}
          className="pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-300"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateX(50%)',
          }}
        >
          <ChevronRight className="w-6 h-6 text-[#1C2635]" />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;