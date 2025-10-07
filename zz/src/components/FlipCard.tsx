
import React, { useState } from 'react';

interface FlipCardProps {
    image: string;
    title: string;
    description: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ image, title, description }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div 
            className="w-full h-[450px] bg-transparent cursor-pointer group"
            style={{ perspective: '1000px' }}
            onClick={handleFlip}
        >
            <div 
                className={`relative w-full h-full duration-700 ease-in-out`}
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-xl shadow-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="text-white text-xl font-bold border-2 border-white rounded-full px-6 py-2 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                           {title}
                        </span>
                    </div>
                     <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Click to flip
                    </div>
                </div>

                {/* Back Side */}
                <div 
                    className="absolute w-full h-full rounded-xl shadow-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-black p-8 flex flex-col justify-center text-center"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                    <p className="text-gray-300 text-lg">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
