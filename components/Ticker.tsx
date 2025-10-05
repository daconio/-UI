
import React from 'react';

interface TickerProps {
  items: string[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  // Duplicate items to create a seamless loop for the animation
  const tickerContent = [...items, ...items];
  const animationDuration = items.length * 5; // Adjust speed based on number of items

  const lightColors = ['#e94560', '#f8b400', '#00f5d4', '#4ecca3', '#a2d2ff'];
  const numLights = 35; // Number of lights per border (top/bottom)

  const renderLights = (position: 'top' | 'bottom') => {
    const lights = [];
    for (let i = 0; i < numLights; i++) {
      lights.push(
        <div
          key={`${position}-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `calc(${(i / (numLights - 1)) * 100}% - 4px)`,
            [position]: '-4px',
            backgroundColor: lightColors[i % lightColors.length],
            animation: `blink ${Math.random() * 1.5 + 0.8}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 2.5}s`,
          }}
        />
      );
    }
    return lights;
  };

  return (
    <div className="relative py-1">
      {renderLights('top')}
      {renderLights('bottom')}
      <div 
        className="relative w-full h-10 overflow-hidden group border-2 border-border-main/50 bg-black/5 dark:bg-black/20 p-1"
      >
        <div 
          className="absolute top-0 left-0 h-full flex items-center whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{
            animation: `ticker ${animationDuration}s linear infinite`,
          }}
        >
          {tickerContent.map((item, index) => (
            <span key={index} className="mx-6 text-sm font-medium animate-text-blink text-text-main">
              <i className="fas fa-bolt text-yellow-400 mr-2"></i>
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>
        {`
          @keyframes ticker {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes textBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          .animate-text-blink {
            animation: textBlink 2s ease-in-out infinite;
          }
          @keyframes blink {
            0%, 100% { 
              opacity: 0.4;
              box-shadow: none; 
            }
            50% { 
              opacity: 1; 
              box-shadow: 0 0 4px currentColor, 0 0 6px currentColor;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Ticker;