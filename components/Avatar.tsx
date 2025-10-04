import React from 'react';
import { Member } from '../types';

interface AvatarProps {
  member: Member;
  isLeader?: boolean;
  sizeClass?: string;
}

const Avatar: React.FC<AvatarProps> = ({ member, isLeader = false, sizeClass = 'h-10 w-10' }) => {
  const leaderClass = isLeader ? 'border-y2k-pink' : 'border-transparent';

  return (
    <>
      <div className="group relative">
          <div
              className={`${sizeClass} ${member.bgColorClass} p-0.5 group-hover:scale-110 transition-transform duration-200 ease-in-out border-2 ${leaderClass} hover:!border-y2k-cyan`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${member.avatarUrl})`,
                imageRendering: 'pixelated',
              }}
              aria-label={`${member.name} 아바타`}
            />
          </div>
      </div>
    </>
  );
};

export default Avatar;