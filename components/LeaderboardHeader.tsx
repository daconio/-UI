import React from 'react';

const LeaderboardHeader: React.FC = () => {
  const headers = [
    { name: '순위', align: 'center', width: 'w-16' },
    { name: '변동', align: 'center', width: 'w-16'},
    { name: '팀', align: 'left', width: 'w-auto' },
    { name: '배지', align: 'center', width: 'w-32' },
    { name: '제출', align: 'center', width: 'w-20' },
    { name: '점수', align: 'right', width: 'w-24' },
    { name: '최근 제출', align: 'right', width: 'w-24' },
  ];

  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {headers.map((header) => (
          <th
            key={header.name}
            scope="col"
            className={`py-3 px-6 text-${header.align} text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${header.width}`}
          >
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default LeaderboardHeader;