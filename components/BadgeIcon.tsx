import React from 'react';
import { Badge } from '../types';

interface BadgeIconProps {
  badge: Badge;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badge }) => {
  return (
    <div className="relative group flex justify-center">
      <i className={`${badge.iconClass} ${badge.colorClass} text-xl`}></i>
      <span className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {badge.name}
      </span>
    </div>
  );
};

export default BadgeIcon;