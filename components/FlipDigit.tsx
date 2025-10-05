import React, { useState, useEffect, useRef } from 'react';

// A custom hook to get the previous value of a prop or state.
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface FlipDigitProps {
  digit: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
    const prevDigit = usePrevious(digit);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (prevDigit !== undefined && prevDigit !== digit) {
            setIsAnimating(true);
            // The timeout duration should match the CSS animation duration.
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [digit, prevDigit]);

    return (
        <div 
          className="relative w-[1ch] h-[1.2em] flex items-center justify-center" 
          style={{ perspective: '120px' }}
        >
            <span className="absolute inset-0">{digit}</span>
            {isAnimating && prevDigit && (
                <>
                    <span 
                        key={`${prevDigit}-out`}
                        className="absolute inset-0 animate-flip-out-top"
                    >
                        {prevDigit}
                    </span>
                    <span 
                        key={`${digit}-in`}
                        className="absolute inset-0 animate-flip-in-bottom"
                    >
                        {digit}
                    </span>
                </>
            )}
        </div>
    );
};

export default FlipDigit;
