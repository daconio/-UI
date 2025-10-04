import React, { useMemo } from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardStatsProps {
  data: LeaderboardEntry[];
}

const StatCard: React.FC<{ icon: string; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
  <div className="p-4 bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard flex items-center">
    <div className={`p-3 mr-4 border-2 border-black dark:border-y2k-cyan`}>
      <i className={`fas ${icon} text-2xl ${color}`}></i>
    </div>
    <div>
      <p className="text-sm uppercase font-bold">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);


const LeaderboardStats: React.FC<LeaderboardStatsProps> = ({ data }) => {
  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        totalTeams: 0,
        totalMembers: 0,
        averageScore: 'N/A',
        highestScore: 'N/A',
        totalSubmissions: 0,
      };
    }

    const totalTeams = data.length;
    const totalMembers = data.reduce((sum, entry) => sum + entry.members.length, 0);
    const totalSubmissions = data.reduce((sum, entry) => sum + entry.entries, 0);
    const scores = data.map(entry => entry.score);
    const averageScore = (scores.reduce((sum, score) => sum + score, 0) / totalTeams).toFixed(4);
    const highestScore = Math.max(...scores).toFixed(4);
    
    return {
      totalTeams,
      totalMembers,
      averageScore,
      highestScore,
      totalSubmissions,
    };
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-6">
      <StatCard icon="fa-users" label="Active Guilds" value={stats.totalTeams} color="text-y2k-cyan" />
      <StatCard icon="fa-user-friends" label="Adventurers" value={stats.totalMembers.toLocaleString()} color="text-y2k-pink" />
      <StatCard icon="fa-trophy" label="High Score" value={stats.highestScore} color="text-yellow-400" />
      <StatCard icon="fa-calculator" label="Avg. Power Level" value={stats.averageScore} color="text-green-400" />
      <StatCard icon="fa-paper-plane" label="Quests Completed" value={stats.totalSubmissions.toLocaleString()} color="text-purple-400" />
    </div>
  );
};

export default LeaderboardStats;