import React from 'react';
import { Badge } from '../types';

interface BadgeIconProps {
  badge: Badge;
  sizeClass?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badge, sizeClass = 'text-2xl' }) => {
  return (
    <div className="relative group flex justify-center">
      <i className={`${badge.iconClass} ${badge.colorClass} ${sizeClass} transition-transform group-hover:scale-125`}></i>
      <div className="absolute bottom-full mb-3 w-56 px-4 py-3 bg-y2k-bg-light dark:bg-black text-black dark:text-white border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <p className="font-bold text-sm uppercase text-y2k-pink">&gt; {badge.name}</p>
        <p className="mt-1 text-xs">{badge.description}</p>
        <div className="absolute w-3 h-3 bg-y2k-bg-light dark:bg-black border-b-2 border-r-2 border-black dark:border-y2k-cyan transform rotate-45 -bottom-[9px] left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default BadgeIcon;