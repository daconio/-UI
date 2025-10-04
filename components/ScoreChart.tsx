import React from 'react';
import { ScoreHistoryPoint } from '../types';

interface ScoreChartProps {
  history: ScoreHistoryPoint[];
  width?: number;
  height?: number;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ history, width = 240, height = 100 }) => {
    if (history.length < 2) {
        return (
            <div className="flex items-center justify-center h-full text-xs text-black p-4">
                점수 기록을 사용할 수 없습니다.
            </div>
        );
    }
    
    const scores = history.map(h => h.score);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    let scoreRange = maxScore - minScore;
    
    // To avoid division by zero if all scores are the same
    if (scoreRange === 0) {
        scoreRange = 1; 
    }

    const dates = history.map(h => h.date.getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    let dateRange = maxDate - minDate;

    // To avoid division by zero if all submissions are at the same time
    if (dateRange === 0) {
        dateRange = 1;
    }

    const points = history.map(h => {
        const x = ((h.date.getTime() - minDate) / dateRange) * width;
        const y = height - ((h.score - minScore) / scoreRange) * height;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
    
    const firstPointY = height - ((history[0].score - minScore) / scoreRange) * height;
    const lastPointY = height - ((history[history.length - 1].score - minScore) / scoreRange) * height;
    
    const areaPath = `M0,${firstPointY.toFixed(2)} ${points} ${width.toFixed(2)},${lastPointY.toFixed(2)} L${width.toFixed(2)},${height.toFixed(2)} L0,${height.toFixed(2)} Z`;

    return (
        <div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f5d4" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#chartGradient)" />
                <polyline
                    fill="none"
                    stroke="#00f5d4"
                    strokeWidth="1.5"
                    points={points}
                />
                 {history.map((h, i) => {
                    const x = ((h.date.getTime() - minDate) / dateRange) * width;
                    const y = height - ((h.score - minScore) / scoreRange) * height;
                    return <circle key={i} cx={x} cy={y} r="2" fill="#00f5d4" />;
                })}
            </svg>
            <div className="flex justify-between text-xs text-black mt-1 px-1">
                <span>Min: {minScore.toFixed(4)}</span>
                <span>Max: {maxScore.toFixed(4)}</span>
            </div>
        </div>
    );
};

export default ScoreChart;