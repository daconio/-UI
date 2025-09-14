import React from 'react';
import { Member } from '../types';

interface AvatarProps {
  member: Member;
}

const Avatar: React.FC<AvatarProps> = ({ member }) => {
  const hexagonClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

  return (
    <div className="group relative">
        <div
            className={`h-10 w-10 ${member.bgColorClass} group-hover:scale-110 group-hover:ring-2 group-hover:ring-offset-1 group-hover:ring-indigo-500 transition-all duration-300`}
            style={{ clipPath: hexagonClipPath }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${member.avatarUrl})`,
              clipPath: hexagonClipPath,
              transform: 'scale(0.9)',
            }}
            aria-label={`${member.name} 아바타`}
          />
        </div>
    </div>
  );
};

export default Avatar;
