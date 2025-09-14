import React from 'react';
import { Tab } from '../types';

interface LeaderboardTabsProps {
  activeTab: Tab;
  onTabClick: (tab: Tab) => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {Object.values(Tab).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
              }
              transition-colors duration-200 focus:outline-none
            `}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LeaderboardTabs;
