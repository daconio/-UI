
import React from 'react';
import { Member } from '../types';

interface AvatarProps {
  member: Member;
  isLeader?: boolean;
  sizeClass?: string;
}

const Avatar: React.FC<AvatarProps> = ({ member, isLeader = false, sizeClass = 'h-10 w-10' }) => {
  const leaderClass = isLeader ? 'border-primary' : 'border-transparent';

  return (
    <div className="group relative">
      <div
        className={`${sizeClass} ${member.bgColorClass} p-0.5 border-2 ${leaderClass} transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-secondary group-hover:[filter:drop-shadow(0_0_6px_var(--color-secondary))] animate-subtle-pulse`}
        style={{ animationDelay: `${Math.random() * 2.5}s` }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${member.avatarUrl})`,
          }}
          aria-label={`${member.name} 아바타`}
        />
      </div>
      <style>{`
        @keyframes subtle-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 4s ease-in-out infinite;
        }
        .group:hover .animate-subtle-pulse {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Avatar;