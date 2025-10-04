import React from 'react';

interface TickerProps {
  items: string[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  // Duplicate items to create a seamless loop for the animation
  const tickerContent = [...items, ...items];

  const animationDuration = items.length * 5; // Adjust speed based on number of items

  return (
    <div className="relative w-full h-10 overflow-hidden group border-2 border-black/50 dark:border-y2k-cyan/50 bg-black/5 dark:bg-black/20 p-1">
      <div 
        className="absolute top-0 left-0 h-full flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]"
        style={{
          animation: `ticker ${animationDuration}s linear infinite`,
        }}
      >
        {tickerContent.map((item, index) => (
          <span key={index} className="mx-6 text-sm font-medium">
            <i className="fas fa-bolt text-yellow-400 mr-2"></i>
            {item}
          </span>
        ))}
      </div>
      {/*
        This style block defines the keyframes for the ticker animation.
        It's placed here to keep the component self-contained.
        In a larger application, this would typically go into a global CSS file.
      */}
      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;