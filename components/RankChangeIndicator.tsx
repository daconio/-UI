import React from 'react';

interface RankChangeIndicatorProps {
  change: number;
}

const RankChangeIndicator: React.FC<RankChangeIndicatorProps> = ({ change }) => {
  const hasChange = change !== 0;

  const getIndicator = () => {
    if (change > 0) {
      return (
        <span className="flex items-center justify-center text-sm font-medium text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {change}
        </span>
      );
    }
    if (change < 0) {
      return (
        <span className="flex items-center justify-center text-sm font-medium text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {Math.abs(change)}
        </span>
      );
    }
    return <span className="text-sm font-medium text-black dark:text-white">-</span>;
  };

  const getTooltipText = () => {
    if (change > 0) return `순위 ${change} 상승`;
    if (change < 0) return `순위 ${Math.abs(change)} 하락`;
    return '순위 변동 없음';
  };

  return (
    <div className="relative group flex justify-center items-center">
      <div className={hasChange ? 'animate-rank-change' : ''}>
        {getIndicator()}
      </div>
      <span className="absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {getTooltipText()}
      </span>
      <style>
        {`
          @keyframes rankChangePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
          .animate-rank-change {
            animation: rankChangePulse 0.6s cubic-bezier(0.5, 0, 0.5, 1);
          }
        `}
      </style>
    </div>
  );
};

export default RankChangeIndicator;