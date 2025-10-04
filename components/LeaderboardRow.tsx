import React, { useState, useEffect } from 'react';
import { LeaderboardEntry, Member } from '../types';
import Medal from './Medal';
import Avatar from './Avatar';
import BadgeIcon from './BadgeIcon';
import RankChangeIndicator from './RankChangeIndicator';
import AnimatedScore from './AnimatedScore';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  onAvatarClick: (member: Member) => void;
  rowIndex: number;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, onAvatarClick, rowIndex }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const getAnimationClass = () => {
    if (entry.isNew) return 'animate-new-entry';
    if (entry.rankChange > 0) return 'animate-rank-up-bg';
    if (entry.rankChange < 0) return 'animate-rank-down-bg';
    return '';
  };

  return (
    <tr
      className={`
        border-b border-gray-400 dark:border-gray-700
        hover:bg-y2k-pink/20 transition-colors duration-200
        ${getAnimationClass()}
        ${isMounted ? 'opacity-100' : 'opacity-0'}
      `}
      style={{ transitionDelay: `${rowIndex * 35}ms` }}
    >
      <td className="h-20 px-6 text-center">
        <div className="flex items-center justify-center space-x-2 text-xl font-bold text-black dark:text-white">
          <span>{entry.rank}</span>
          <Medal type={entry.medal} />
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
              return (
                <div key={member.id} onClick={() => onAvatarClick(member)} className="cursor-pointer">
                  <Avatar member={member} isLeader={isLeader} />
                </div>
              );
            })}
          </div>
          <div className="text-lg font-semibold tracking-wider text-black dark:text-white">{entry.team}</div>
        </div>
      </td>
      <td className="h-20 px-6 text-center">
        <div className="flex items-center justify-center space-x-3">
          {entry.badges.map((badge, index) => (
            <BadgeIcon key={index} badge={badge} />
          ))}
        </div>
      </td>
      <td className="h-20 px-6 text-center font-mono text-lg text-black dark:text-white">
        {entry.entries}
      </td>
      <td className="h-20 px-6 text-right font-mono text-lg text-black dark:text-white">
        <AnimatedScore value={entry.score} duration={750} />
      </td>
      <td className="h-20 px-6 text-right text-sm text-black dark:text-gray-100">
        {entry.lastSubmission}
      </td>
      <style>
        {`
          @keyframes rankUpBg {
            0%, 100% { background-color: transparent; }
            40% { background-color: rgba(0, 245, 212, 0.2); }
          }
          .animate-rank-up-bg { animation: rankUpBg 1.5s ease-in-out; }

          @keyframes rankDownBg {
            0%, 100% { background-color: transparent; }
            40% { background-color: rgba(233, 69, 96, 0.2); }
          }
          .animate-rank-down-bg { animation: rankDownBg 1.5s ease-in-out; }

          @keyframes newEntryAnimation {
            0%, 100% { background-color: transparent; }
            40% { background-color: rgba(255, 255, 0, 0.2); }
          }
          .animate-new-entry { animation: newEntryAnimation 1.5s ease-in-out; }
        `}
      </style>
    </tr>
  );
};

export default LeaderboardRow;