
import React from 'react';
import { Member } from '../types';

interface AvatarProps {
  member: Member;
  isLeader?: boolean;
  sizeClass?: string;
  applyFlipAnimation?: boolean;
  flipAnimationDelay?: number;
}

const Avatar: React.FC<AvatarProps> = ({ member, isLeader = false, sizeClass = 'h-10 w-10', applyFlipAnimation = false, flipAnimationDelay = 0 }) => {
  const leaderClass = isLeader ? 'border-primary' : 'border-transparent';
  const finalAnimationDelay = applyFlipAnimation ? `${flipAnimationDelay}s` : `${Math.random() * 2.5}s`;

  return (
    <div className="group relative">
      <div
        className={`${sizeClass} ${member.bgColorClass} p-0.5 border-2 ${leaderClass} transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-secondary group-hover:[filter:drop-shadow(0_0_6px_var(--color-secondary))] ${applyFlipAnimation ? 'animate-avatar-flip' : 'animate-subtle-pulse'}`}
        style={{ animationDelay: finalAnimationDelay }}
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

        @keyframes avatarFlip {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .animate-avatar-flip {
          animation-name: avatarFlip;
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }

        .group:hover .animate-subtle-pulse,
        .group:hover .animate-avatar-flip {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Avatar;
