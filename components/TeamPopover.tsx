import React from 'react';
import ScoreChart from './ScoreChart';
import RankChart from './RankChart';
import { ScoreHistoryPoint, RankHistoryPoint } from '../types';

interface TeamPopoverProps {
  teamName: string;
  scoreHistory: ScoreHistoryPoint[];
  rankHistory: RankHistoryPoint[];
  children: React.ReactNode;
}

const TeamPopover: React.FC<TeamPopoverProps> = ({ teamName, scoreHistory, rankHistory, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-surface border-2 border-border-main shadow-hard p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <p className="font-bold text-text-main mb-2 text-center uppercase">&gt; {teamName} &lt;</p>
        
        <div className="text-secondary">
          <h4 className="font-bold text-xs text-center uppercase text-current/80">Score History</h4>
          <ScoreChart history={scoreHistory} height={80} />
        </div>
        
        <div className="text-primary">
          <h4 className="font-bold text-xs text-center uppercase text-current/80 mt-3">Rank History</h4>
          <RankChart history={rankHistory} height={80} />
        </div>
        
        <div className="absolute w-3 h-3 bg-surface border-b-2 border-r-2 border-border-main transform rotate-45 -bottom-[9px] left-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default TeamPopover;