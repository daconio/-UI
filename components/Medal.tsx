
import React from 'react';
import { MedalType } from '../types';

interface MedalProps {
  type: MedalType;
}

const Medal: React.FC<MedalProps> = ({ type }) => {
  if (type === 'none') {
    return null;
  }

  const color = type === 'gold' ? 'text-yellow-500' : 'text-gray-400';

  return (
    <span className={`text-lg ${color}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    </span>
  );
};

export default Medal;
