import React from 'react';
import ScoreChart from './ScoreChart';
import { ScoreHistoryPoint } from '../types';

interface TeamPopoverProps {
  teamName: string;
  scoreHistory: ScoreHistoryPoint[];
  children: React.ReactNode;
}

const TeamPopover: React.FC<TeamPopoverProps> = ({ teamName, scoreHistory, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-y2k-bg-light dark:bg-black border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <p className="font-bold text-black dark:text-white mb-2 text-center uppercase">&gt; {teamName} &lt;</p>
        <ScoreChart history={scoreHistory} />
        <div className="absolute w-3 h-3 bg-y2k-bg-light dark:bg-black border-b-2 border-r-2 border-black dark:border-y2k-cyan transform rotate-45 -bottom-[9px] left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default TeamPopover;