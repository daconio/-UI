import React from 'react';
import { Member } from '../types';

interface MemberPopoverProps {
  member: Member;
  children: React.ReactNode;
}

const MemberPopover: React.FC<MemberPopoverProps> = ({ member, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-surface text-text-main border-2 border-border-main shadow-hard p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <div className="flex items-center mb-2">
          <div
            className={`h-12 w-12 flex-shrink-0 ${member.bgColorClass} p-0.5 border-2 border-border-main`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${member.avatarUrl})`,
              }}
              aria-label={`${member.name} 아바타`}
            />
          </div>
          <div className="ml-3">
            <p className="font-bold text-lg text-text-main">{member.name}</p>
          </div>
        </div>
        <p className="text-sm text-text-main font-mono">{member.bio}</p>
        <div className="absolute w-3 h-3 bg-surface border-b-2 border-r-2 border-border-main transform rotate-45 -bottom-[9px] left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default MemberPopover;