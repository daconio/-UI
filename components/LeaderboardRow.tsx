import React from 'react';
import { LeaderboardEntry, Member } from '../types';
import Medal from './Medal';
import Avatar from './Avatar';
import MemberPopover from './MemberPopover';
import BadgeIcon from './BadgeIcon';
import RankChangeIndicator from './RankChangeIndicator';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  onAvatarClick: (member: Member) => void;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, onAvatarClick }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-center">
        <div className="flex items-center justify-center space-x-2">
          <span>{entry.rank}</span>
          <Medal type={entry.medal} />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <RankChangeIndicator change={entry.rankChange} />
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex space-x-1 mr-3">
            {entry.members.map(member => (
              <MemberPopover key={member.id} member={member}>
                <div onClick={() => onAvatarClick(member)} className="cursor-pointer">
                  <Avatar member={member} />
                </div>
              </MemberPopover>
            ))}
          </div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white font-mono tracking-wider">{entry.team}</div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center justify-center space-x-3">
            {entry.badges.map((badge, index) => (
                <BadgeIcon key={index} badge={badge} />
            ))}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
        {entry.entries}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">
        {entry.score.toFixed(2)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-right">
        {entry.lastSubmission}
      </td>
    </tr>
  );
};

export default LeaderboardRow;