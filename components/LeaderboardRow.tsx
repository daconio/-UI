
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LeaderboardEntry, Member, Badge } from '../types';
import Avatar from './Avatar';
import BadgeIcon from './BadgeIcon';
import RankChangeIndicator from './RankChangeIndicator';
import AnimatedScore from './AnimatedScore';
import TeamPopover from './TeamPopover';
import FlipNumber from './FlipNumber';
import MemberPopover from './MemberPopover';
import Confetti from './Confetti';

// A custom hook to get the previous value of a prop or state.
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  onAvatarClick: (member: Member) => void;
  rowIndex: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, onAvatarClick, rowIndex }) => {
  const [isMounted, setIsMounted] = useState(false);
  const prevScore = usePrevious(entry.score);
  const prevBadges = usePrevious(entry.badges);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const getAnimationClass = () => {
    if (entry.isNew) return 'animate-focus-entry';
    if (entry.hasNewSubmission) return 'animate-new-submission-bg';
    if (entry.rankChange > 0) return 'animate-rank-up-bg';
    if (entry.rankChange < 0) return 'animate-rank-down-bg';
    return '';
  };
  
  const getRankRowClass = (rank: number) => {
    if (rank === 1) return 'bg-gold/20';
    if (rank === 2) return 'bg-silver/20';
    if (rank === 3) return 'bg-bronze/20';
    if (rank <= 10) return 'bg-secondary/10';
    if (rank <= 50) return 'bg-purple-500/10';
    return '';
  };

  const shouldAnimate = entry.rank <= 16;
  const isTop3 = entry.rank <= 3;
  const isTop1 = entry.rank === 1;

  // Check if the score has actually changed from the previous render.
  const hasScoreChanged = prevScore !== undefined && prevScore !== entry.score;
  
  const prevBadgeIds = useMemo(() => new Set((prevBadges || []).map(b => b.id)), [prevBadges]);

  return (
    <tr
      className={`
        border-b border-border-main/50
        hover:bg-primary/20 transition-all duration-200
        ${getRankRowClass(entry.rank)}
        ${getAnimationClass()}
        ${shouldAnimate ? 'opacity-0' : (isMounted ? 'opacity-100' : 'opacity-0')}
        ${shouldAnimate && isMounted ? 'animate-slide-in-from-right' : ''}
      `}
      style={{
        transitionDelay: shouldAnimate ? '0s' : `${rowIndex * 35}ms`,
        animationDelay: shouldAnimate ? `${(entry.rank - 1) * 0.3}s` : '0s'
      }}
    >
      <td className="h-20 px-6 text-center relative overflow-visible">
        {isTop1 && isMounted && <Confetti />}
        <div className="flex items-center justify-center text-xl font-bold text-text-main">
          <FlipNumber value={entry.rank} />
        </div>
      </td>
      <td className="h-20 px-6 text-center">
        <RankChangeIndicator change={entry.rankChange} />
      </td>
      <td className="h-20 px-6 text-left">
        <div className="flex items-center">
          <div className="mr-3 flex space-x-[5px]">
            {entry.members.map((member, index) => {
              const isLeader = entry.members.length > 1 && index === 0;
              const avatarFlipDelay = shouldAnimate ? (entry.rank - 1) * 0.3 : 0;
              return (
                <MemberPopover key={member.id} member={member}>
                  <div onClick={() => onAvatarClick(member)} className="cursor-pointer">
                    <Avatar 
                      member={member} 
                      isLeader={isLeader}
                      applyFlipAnimation={shouldAnimate && isMounted}
                      flipAnimationDelay={avatarFlipDelay}
                    />
                  </div>
                </MemberPopover>
              );
            })}
          </div>
          <TeamPopover teamName={entry.team} scoreHistory={entry.scoreHistory} rankHistory={entry.rankHistory}>
            <div className="text-lg font-semibold tracking-wider text-text-main cursor-help">{entry.team}</div>
          </TeamPopover>
        </div>
      </td>
      <td className="h-20 px-6 text-center">
        <div 
          className={`flex items-center justify-center space-x-3 ${isTop3 && shouldAnimate && isMounted ? 'animate-badge-swoop-in' : ''}`}
          style={isTop3 && shouldAnimate && isMounted ? { animationDelay: `${(entry.rank - 1) * 0.3}s` } : {}}
        >
          {entry.badges.map((badge, index) => {
            const isNew = prevBadges !== undefined && !prevBadgeIds.has(badge.id);
            return <BadgeIcon key={index} badge={badge} isNew={isNew} />;
          })}
        </div>
      </td>
      <td className="h-20 px-6 text-center font-mono text-lg text-text-main">
        <div className="flex justify-center">
          <FlipNumber value={entry.entries} />
        </div>
      </td>
      <td className={`h-20 px-6 text-right font-mono text-lg text-text-main ${hasScoreChanged ? 'animate-score-update' : ''}`}>
        <AnimatedScore value={entry.score} duration={750} />
      </td>
      <td className="h-20 px-6 text-right text-sm text-text-main">
        {entry.lastSubmission}
      </td>
      <style>
        {`
          @keyframes rankUpBg {
            0%, 100% { background-color: transparent; }
            40% { background-color: var(--color-accent-up-translucent, rgba(0, 245, 212, 0.2)); }
          }
          .animate-rank-up-bg { animation: rankUpBg 1.5s ease-in-out; }

          @keyframes rankDownBg {
            0%, 100% { background-color: transparent; }
            40% { background-color: var(--color-accent-down-translucent, rgba(233, 69, 96, 0.2)); }
          }
          .animate-rank-down-bg { animation: rankDownBg 1.5s ease-in-out; }

          @keyframes newEntryPulse {
            0%, 100% {
              box-shadow: none;
              background-color: transparent;
            }
            50% {
              box-shadow: inset 0 0 0 3px #fde047, 0 0 12px 2px #fde047; /* Yellow glow */
              background-color: rgba(253, 224, 71, 0.1);
            }
          }
          .animate-focus-entry {
            animation: newEntryPulse 1.25s ease-in-out 2;
          }

          @keyframes newSubmissionGlow {
            0%, 100% { background-color: transparent; }
            25%, 75% { background-color: var(--color-secondary-translucent, rgba(0, 245, 212, 0.2)); }
            50% { background-color: var(--color-secondary-translucent-light, rgba(0, 245, 212, 0.1)); }
          }
          .animate-new-submission-bg {
            animation: newSubmissionGlow 2s ease-in-out;
          }
          
          @keyframes scoreUpdateGlow {
            0%, 100% {
              color: inherit;
              text-shadow: none;
            }
            50% {
              color: var(--color-secondary);
              text-shadow: 0 0 8px var(--color-secondary), 0 0 12px var(--color-secondary);
            }
          }
          .animate-score-update {
            animation: scoreUpdateGlow 1.5s ease-in-out;
          }

          @keyframes flipOutTop {
            from {
              transform: rotateX(0deg);
              opacity: 1;
            }
            to {
              transform: rotateX(-90deg);
              opacity: 0;
            }
          }
          .animate-flip-out-top {
            animation: flipOutTop 250ms ease-in forwards;
            transform-origin: bottom;
          }

          @keyframes flipInBottom {
            from {
              transform: rotateX(90deg);
              opacity: 0;
            }
            to {
              transform: rotateX(0deg);
              opacity: 1;
            }
          }
          .animate-flip-in-bottom {
            animation: flipInBottom 250ms ease-out 250ms forwards;
            transform-origin: top;
          }

          /* New animation for top 10 */
          @keyframes slideInFromRight {
            0% {
              transform: translateX(50%);
              opacity: 0;
            }
            60% {
              transform: translateX(-10px);
              opacity: 1;
            }
            80% {
              transform: translateX(5px);
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in-from-right {
            /* A bouncy ease-out effect */
            animation: slideInFromRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          /* New animation for top 3 badges */
          @keyframes badgeSwoopIn {
            0% {
              transform: translateX(40px);
              opacity: 0;
            }
            60% {
              transform: translateX(-20px);
              opacity: 1;
            }
            80% {
              transform: translateX(10px);
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-badge-swoop-in {
            animation: badgeSwoopIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}
      </style>
    </tr>
  );
};

export default LeaderboardRow;
