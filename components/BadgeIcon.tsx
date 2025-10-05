
import React from 'react';
import { Badge } from '../types';

interface BadgeIconProps {
  badge: Badge;
  sizeClass?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ badge, sizeClass = 'text-2xl' }) => {
  return (
    <div className="relative group flex justify-center">
      <i className={`${badge.iconClass} ${badge.colorClass} ${sizeClass} opacity-90 transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:-translate-y-1 group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_6px_currentColor)]`}></i>
      <div className="absolute bottom-full mb-3 w-56 px-4 py-3 bg-surface text-text-main border-2 border-border-main shadow-hard opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <p className="font-bold text-sm uppercase text-primary">&gt; {badge.name}</p>
        <p className="mt-1 text-xs text-text-muted">{badge.description}</p>
        <div className="absolute w-3 h-3 bg-surface border-b-2 border-r-2 border-border-main transform rotate-45 -bottom-[9px] left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default BadgeIcon;