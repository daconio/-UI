import React from 'react';
import { LeaderboardEntry, Member, SortKey, SortDirection } from '../types';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardRow from './LeaderboardRow';

interface LeaderboardProps {
  data: LeaderboardEntry[];
  onAvatarClick: (member: Member) => void;
  sortConfig: { key: SortKey; direction: SortDirection };
  onSort: (key: SortKey) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onAvatarClick, sortConfig, onSort }) => {
  return (
    <div className="border-2 border-border-main bg-surface shadow-hard">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <LeaderboardHeader sortConfig={sortConfig} onSort={onSort} />
          <tbody>
            {data.map((entry, index) => (
              <LeaderboardRow 
                key={entry.teamId} 
                entry={entry} 
                onAvatarClick={onAvatarClick} 
                rowIndex={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;