import React from 'react';

interface RankChangeIndicatorProps {
  change: number;
}

const RankChangeIndicator: React.FC<RankChangeIndicatorProps> = ({ change }) => {
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
  return <span className="text-sm font-medium text-gray-400">-</span>;
};

export default RankChangeIndicator;