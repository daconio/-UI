import React from 'react';
import { SortKey, SortDirection } from '../types';

interface LeaderboardHeaderProps {
  sortConfig: { key: SortKey; direction: SortDirection };
  onSort: (key: SortKey) => void;
}

const SortIcon: React.FC<{ direction?: SortDirection | false }> = ({ direction }) => {
  const activeClass = "text-text-main";
  const inactiveClass = "text-text-muted group-hover:text-text-main";
  
  if (direction === 'ascending') {
    return <i className={`fas fa-sort-up ml-1 ${activeClass}`}></i>;
  }
  if (direction === 'descending') {
    return <i className={`fas fa-sort-down ml-1 ${activeClass}`}></i>;
  }
  return <i className={`fas fa-sort ml-1 ${inactiveClass} transition-colors`}></i>;
};


const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ sortConfig, onSort }) => {
  const headers: { name: string; align: string; width: string; sortable: boolean, key?: SortKey }[] = [
    { name: '순위', align: 'center', width: 'w-16', sortable: true, key: 'rank' },
    { name: '변동', align: 'center', width: 'w-16', sortable: false },
    { name: '팀', align: 'left', width: 'w-auto', sortable: true, key: 'team' },
    { name: '배지', align: 'center', width: 'w-32', sortable: true, key: 'badges' },
    { name: '제출', align: 'center', width: 'w-20', sortable: true, key: 'entries' },
    { name: '점수', align: 'right', width: 'w-24', sortable: true, key: 'score' },
    { name: '최근 제출', align: 'right', width: 'w-24', sortable: true, key: 'lastSubmission' },
  ];

  return (
    <thead className="bg-surface">
      <tr className="border-b-2 border-border-main">
        {headers.map((header) => (
          <th
            key={header.name}
            scope="col"
            className={`py-3 px-6 text-${header.align} text-sm font-bold text-text-main uppercase tracking-wider ${header.width}`}
            aria-sort={header.sortable && sortConfig.key === header.key ? sortConfig.direction : 'none'}
          >
            {header.sortable && header.key ? (
               <button
                  onClick={() => onSort(header.key!)}
                  className="group flex items-center w-full focus:outline-none"
                  style={{ justifyContent: header.align === 'right' ? 'flex-end' : header.align === 'left' ? 'flex-start' : 'center' }}
                  aria-label={`Sort by ${header.name}`}
                >
                  <span>{header.name}</span>
                  <SortIcon direction={sortConfig.key === header.key && sortConfig.direction} />
               </button>
            ) : (
              <div 
                className="flex items-center w-full"
                style={{ justifyContent: header.align === 'right' ? 'flex-end' : header.align === 'left' ? 'flex-start' : 'center' }}
              >
                {header.name}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default LeaderboardHeader;