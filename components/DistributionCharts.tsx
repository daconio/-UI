import React, { useMemo } from 'react';
import { LeaderboardEntry } from '../types';
import BarChart from './BarChart';
import Avatar from './Avatar';

const ChartCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`relative p-4 bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-black/5 dark:bg-black/20 opacity-50 pointer-events-none" style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 245, 212, 0.1) 1px, rgba(0, 245, 212, 0.1) 2px)`,
      backgroundSize: '100% 3px'
    }}></div>
    <h3 className="text-md font-bold mb-4 text-center uppercase tracking-widest">{title}</h3>
    <div className="h-48 relative z-10">
      {children}
    </div>
  </div>
);

const DistributionCharts: React.FC<{ data: LeaderboardEntry[] }> = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    // 1. Submissions Data
    const submissionBins: { [key: string]: number } = { '1-50': 0, '51-100': 0, '101-150': 0, '151-200': 0, '201+': 0 };
    data.forEach(d => {
      if (d.entries <= 50) submissionBins['1-50']++;
      else if (d.entries <= 100) submissionBins['51-100']++;
      else if (d.entries <= 150) submissionBins['101-150']++;
      else if (d.entries <= 200) submissionBins['151-200']++;
      else submissionBins['201+']++;
    });
    const submissionData = Object.entries(submissionBins).map(([label, value]) => ({ label, value }));

    // 2. Badges Data
    const badgeBins: { [key: string]: number } = { '0': 0, '1': 0, '2': 0 };
    data.forEach(d => {
      const count = d.badges.length;
      if (count in badgeBins) badgeBins[String(count)]++;
    });
    const badgeData = Object.entries(badgeBins).map(([label, value]) => ({ label: `${label} 개`, value }));

    // 3. Score Data
    const scores = data.map(d => d.score);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const scoreRange = maxScore - minScore;
    const numBins = 5;
    const scoreBins = Array(numBins).fill(0).map((_, i) => {
        const binStart = minScore + i * (scoreRange / numBins);
        const binEnd = minScore + (i + 1) * (scoreRange / numBins);
        return {
            label: `${binStart.toFixed(2)}-${binEnd.toFixed(2)}`,
            value: 0,
            start: binStart,
            end: binEnd
        };
    });
    data.forEach(d => {
      for (let i = 0; i < scoreBins.length; i++) {
        // Include the upper bound in the last bin
        if (i === scoreBins.length - 1 && d.score >= scoreBins[i].start && d.score <= scoreBins[i].end) {
          scoreBins[i].value++;
          break;
        }
        if (d.score >= scoreBins[i].start && d.score < scoreBins[i].end) {
          scoreBins[i].value++;
          break;
        }
      }
    });


    // 4. Recency Data
    const now = new Date();
    const recencyBins: { [key: string]: number } = { '오늘': 0, '3일 내': 0, '7일 내': 0, '7일 이상': 0 };
    data.forEach(d => {
      const subDate = new Date(d.c_time);
      const diffHours = (now.getTime() - subDate.getTime()) / (1000 * 60 * 60);
      if (diffHours <= 24) recencyBins['오늘']++;
      else if (diffHours <= 72) recencyBins['3일 내']++;
      else if (diffHours <= 168) recencyBins['7일 내']++;
      else recencyBins['7일 이상']++;
    });
    const recencyData = Object.entries(recencyBins).map(([label, value]) => ({ label, value }));
    
    // 5. Interesting Team Names
    const calculateInterestScore = (name: string): number => {
        let score = 0;
        if (name.length > 10) score += name.length - 10;
        score += (name.match(/[^a-zA-Z0-9가-힣\s]/g) || []).length * 2;
        score += (name.match(/\d/g) || []).length;
        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
        score += (name.match(emojiRegex) || []).length * 5;
        return Math.max(1, score);
    };
    
    const interestingNamesData = data
        .map(d => ({
            label: d.team,
            value: calculateInterestScore(d.team),
            members: d.members,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 4);

    return { submissionData, badgeData, scoreData: scoreBins.map(({label, value}) => ({label, value})), recencyData, interestingNamesData };
  }, [data]);

  if (!chartData) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 transition-all duration-500 ease-in-out">
      <ChartCard title="Quest Completion Rate">
        <BarChart data={chartData.submissionData} color="text-y2k-pink" />
      </ChartCard>
      <ChartCard title="Loot Distribution">
        <BarChart data={chartData.badgeData} color="text-y2k-cyan" />
      </ChartCard>
      <ChartCard title="Power Levels">
        <BarChart data={chartData.scoreData} color="text-yellow-400" />
      </ChartCard>
      <ChartCard title="Recent Transmissions">
        <BarChart data={chartData.recencyData} color="text-green-400" />
      </ChartCard>
      <ChartCard title="Most Legendary Guilds" className="md:col-span-2">
           <div className="flex justify-around items-center h-full px-4">
            {chartData.interestingNamesData.map((team, teamIndex) => (
              <div key={teamIndex} className="flex flex-col items-center text-center w-1/4 p-2">
                <div className="flex space-x-[5px] mb-3 h-10 items-center">
                  {team.members.map((member, memberIndex) => (
                    <div key={member.id}>
                      <Avatar member={member} isLeader={team.members.length > 1 && memberIndex === 0} />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold truncate w-full text-black dark:text-white" title={team.label}>
                  {team.label}
                </p>
              </div>
            ))}
          </div>
      </ChartCard>
    </div>
  );
};

export default DistributionCharts;