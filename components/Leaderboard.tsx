import React from 'react';
import { LeaderboardEntry, Member } from '../types';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

interface LeaderboardProps {
  data: LeaderboardEntry[];
  onAvatarClick: (member: Member) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onAvatarClick }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <LeaderboardHeader />
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((entry) => (
              <LeaderboardRow key={entry.rank} entry={entry} onAvatarClick={onAvatarClick} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
