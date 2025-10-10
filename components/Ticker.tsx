import React, { useState, useEffect, useMemo } from 'react';

interface TickerProps {
  items: string[];
}

const Ticker: React.FC<TickerProps> = ({ items }) => {
  // Duplicate items to create a seamless loop for the animation
  const tickerContent = [...items, ...items];
  const animationDuration = items.length * 5; // Adjust speed based on number of items

  const lightColors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-text-main)', 'var(--color-border-main)'];
  const numLightsHorizontal = 40;
  const numLightsVertical = 6;
  
  const [activeSet, setActiveSet] = useState<'odd' | 'even'>('odd');

  useEffect(() => {
    // This timer toggles which set of lights (odd or even) is currently active.
    const timer = setInterval(() => {
      setActiveSet(prevSet => (prevSet === 'odd' ? 'even' : 'odd'));
    }, 500); // Change the blinking speed here (in milliseconds).

    return () => clearInterval(timer);
  }, []);

  const lightPositions = useMemo(() => {
    const positions = [];
    // Top lights (right to left)
    for (let i = 0; i < numLightsHorizontal; i++) {
      positions.push({
        key: `t-${i}`,
        style: { top: '-4px', right: `calc(${(i / (numLightsHorizontal - 1)) * 100}% - 4px)` }
      });
    }
    // Left lights (top to bottom)
    for (let i = 0; i < numLightsVertical; i++) {
      positions.push({
        key: `l-${i}`,
        style: { left: '-4px', top: `calc(${(i / (numLightsVertical - 1)) * 100}% - 4px)` }
      });
    }
    // Bottom lights (left to right)
    for (let i = 0; i < numLightsHorizontal; i++) {
      positions.push({
        key: `b-${i}`,
        style: { bottom: '-4px', left: `calc(${(i / (numLightsHorizontal - 1)) * 100}% - 4px)` }
      });
    }
    // Right lights (bottom to top)
    for (let i = 0; i < numLightsVertical; i++) {
      positions.push({
        key: `r-${i}`,
        style: { right: '-4px', bottom: `calc(${(i / (numLightsVertical - 1)) * 100}% - 4px)` }
      });
    }
    return positions;
  }, [numLightsHorizontal, numLightsVertical]);


  return (
    <div className="relative py-1">
       {lightPositions.map((light, index) => {
        const isOdd = index % 2 !== 0;
        // A light is active if its group (odd/even) matches the currently active set.
        const isActive = (activeSet === 'odd' && isOdd) || (activeSet === 'even' && !isOdd);
        const color = lightColors[index % lightColors.length];
        return (
          <div
            key={light.key}
            className="absolute w-2 h-2 rounded-full"
            style={{
              ...light.style,
              backgroundColor: color,
              opacity: isActive ? 1 : 0.2,
              boxShadow: isActive ? `0 0 5px ${color}, 0 0 10px ${color}` : 'none',
              transition: 'opacity 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
            }}
          />
        );
      })}
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
        `}
      </style>
    </div>
  );
};

export default Ticker;