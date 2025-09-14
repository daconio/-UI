import React from 'react';
import { Member } from '../types';

interface MemberPopoverProps {
  member: Member;
  children: React.ReactNode;
}

const MemberPopover: React.FC<MemberPopoverProps> = ({ member, children }) => {
  const hexagonClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
  
  return (
    <div className="group relative flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <div className="flex items-center mb-2">
          <div
            className={`h-12 w-12 flex-shrink-0 ${member.bgColorClass}`}
            style={{ clipPath: hexagonClipPath }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${member.avatarUrl})`,
                clipPath: hexagonClipPath,
                transform: 'scale(0.92)',
              }}
              aria-label={`${member.name} 아바타`}
            />
          </div>
          <div className="ml-3">
            <p className="font-bold text-gray-900 dark:text-white">{member.name}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
        <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r border-gray-200 dark:border-gray-700"></div>
      </div>
    </div>
  );
};

export default MemberPopover;
