import React from 'react';
import FlipDigit from './FlipDigit';

interface FlipNumberProps {
  value: number;
}

const FlipNumber: React.FC<FlipNumberProps> = ({ value }) => {
  const stringValue = String(value);
  const digits = stringValue.split('');

  return (
    <div className="flex">
      {digits.map((digit, index) => (
        <FlipDigit key={`${digit}-${index}`} digit={digit} />
      ))}
    </div>
  );
};

export default FlipNumber;
