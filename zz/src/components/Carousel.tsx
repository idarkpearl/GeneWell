
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import FlipCard from './FlipCard';
import type { CardData } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CarouselProps {
    items: CardData[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    const [visibleSlides, setVisibleSlides] = useState(3);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const updateVisibleSlides = useCallback(() => {
        if (window.innerWidth < 768) {
            setVisibleSlides(1);
        } else if (window.innerWidth < 1024) {
            setVisibleSlides(2);
        } else {
            setVisibleSlides(3);
        }
    }, []);

    useEffect(() => {
        updateVisibleSlides();
        window.addEventListener('resize', updateVisibleSlides);
        return () => window.removeEventListener('resize', updateVisibleSlides);
    }, [updateVisibleSlides]);

    const displayItems = useMemo(() => {
        if (items.length === 0 || !visibleSlides) return [];
        const startClones = items.slice(-visibleSlides);
        const endClones = items.slice(0, visibleSlides);
        return [...startClones, ...items, ...endClones];
    }, [items, visibleSlides]);

    const [currentIndex, setCurrentIndex] = useState(visibleSlides);

    // Effect to reset position without animation when visibleSlides changes
    useEffect(() => {
        setIsTransitioning(false);
        setCurrentIndex(visibleSlides);
    }, [visibleSlides]);

    // Effect to re-enable transition after a jump
    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const handleTransitionEnd = () => {
        if (currentIndex < visibleSlides) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + items.length);
        } else if (currentIndex >= items.length + visibleSlides) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex - items.length);
        }
    };

    const changeSlide = (direction: number) => {
        if (!isTransitioning) return;
        setCurrentIndex(prev => prev + direction);
    };

    const prevSlide = () => changeSlide(-1);
    const nextSlide = () => changeSlide(1);

    const getTransformValue = () => {
        if (visibleSlides === 0) return 'translateX(0%)';
        const itemWidthPercentage = 100 / visibleSlides;
        return `translateX(-${currentIndex * itemWidthPercentage}%)`;
    };
    
    const realIndex = ((currentIndex - visibleSlides) % items.length + items.length) % items.length;

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <div className="overflow-hidden relative">
                <div
                    className="flex"
                    style={{
                        transform: getTransformValue(),
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {displayItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                            <FlipCard
                                image={item.image}
                                title={item.title}
                                description={item.description}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-10"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon />
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center z-10"
                aria-label="Next slide"
            >
                <ChevronRightIcon />
            </button>

            {/* Dots Navigation */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                           if (!isTransitioning) return;
                           setCurrentIndex(index + visibleSlides)
                        }}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${realIndex === index ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
