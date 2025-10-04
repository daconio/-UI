
import React, { useState, useEffect, useRef } from 'react';

// A custom hook to get the previous value of a prop or state.
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface AnimatedScoreProps {
  value: number;
  duration?: number;
}

const AnimatedScore: React.FC<AnimatedScoreProps> = ({ value, duration = 750 }) => {
  const prevValue = usePrevious(value);
  
  // Start the display from the old value, or the current value if it's the first render.
  const [displayValue, setDisplayValue] = useState(prevValue ?? value);
  
  const frameRef = useRef<number>();

  useEffect(() => {
    // Determine the start value for the animation.
    // If prevValue is undefined (first render), start from the target value itself (no animation).
    const startValue = prevValue ?? value;
    const endValue = value;
    
    if (startValue === endValue) {
      return; // No animation needed.
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Using an ease-out function for a smoother stop.
      const easedPercentage = 1 - Math.pow(1 - percentage, 3);
      const nextValue = startValue + (endValue - startValue) * easedPercentage;
      
      setDisplayValue(nextValue);

      if (progress < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure it ends precisely on the target value.
        setDisplayValue(endValue);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation frame if the component unmounts
    // or if the `value` prop changes again before the animation is complete.
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, prevValue, duration]); // Rerun the effect when the target value changes.

  return <span>{displayValue.toFixed(4)}</span>;
};

export default AnimatedScore;
