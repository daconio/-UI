import React from 'react';
import { MedalType } from '../types';

interface MedalProps {
  type: MedalType;
}

const Medal: React.FC<MedalProps> = ({ type }) => {
  if (type === 'none') {
    return null;
  }

  let colorClass = '';
  switch (type) {
    case 'gold':
      colorClass = 'text-gold';
      break;
    case 'silver':
      colorClass = 'text-silver';
      break;
    case 'bronze':
      colorClass = 'text-bronze';
      break;
  }

  return (
    <span className={`text-lg ${colorClass}`}>
      <i className="fas fa-medal"></i>
    </span>
  );
};

export default Medal;