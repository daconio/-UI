import React from 'react';
import { RankHistoryPoint } from '../types';

interface RankChartProps {
  history: RankHistoryPoint[];
  width?: number;
  height?: number;
}

const RankChart: React.FC<RankChartProps> = ({ history, width = 240, height = 100 }) => {
    if (history.length < 2) {
        return (
            <div className="flex items-center justify-center h-full text-xs text-text-muted p-4 text-center">
                랭킹 기록이 충분하지 않습니다.
            </div>
        );
    }
    
    const ranks = history.map(h => h.rank);
    const minRank = Math.min(...ranks);
    const maxRank = Math.max(...ranks);
    let rankRange = maxRank - minRank;
    
    if (rankRange === 0) {
        rankRange = 1; 
    }

    const dates = history.map(h => h.timestamp);
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    let dateRange = maxDate - minDate;

    if (dateRange === 0) {
        dateRange = 1;
    }

    const points = history.map(h => {
        const x = dateRange === 0 ? width / 2 : ((h.timestamp - minDate) / dateRange) * width;
        const y = ((h.rank - minRank) / rankRange) * height;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
    
    const firstPointY = ((history[0].rank - minRank) / rankRange) * height;
    const lastPointY = ((history[history.length - 1].rank - minRank) / rankRange) * height;
    
    const areaPath = `M0,${firstPointY.toFixed(2)} ${points} ${width.toFixed(2)},${lastPointY.toFixed(2)} L${width.toFixed(2)},0 L0,0 Z`;

    return (
        <div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="rankChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="currentColor" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="currentColor" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#rankChartGradient)" />
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    points={points}
                />
                 {history.map((h, i) => {
                    const x = dateRange === 0 ? width / 2 : ((h.timestamp - minDate) / dateRange) * width;
                    const y = ((h.rank - minRank) / rankRange) * height;
                    return <circle key={i} cx={x} cy={y} r="2" fill="currentColor" />;
                })}
            </svg>
            <div className="flex justify-between text-xs text-text-main mt-1 px-1">
                <span>Best: {minRank}</span>
                <span>Worst: {maxRank}</span>
            </div>
        </div>
    );
};

export default RankChart;