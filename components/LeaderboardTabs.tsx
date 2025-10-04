import React from 'react';
import { Tab } from '../types';

interface LeaderboardTabsProps {
  activeTab: Tab;
  onTabClick: (tab: Tab) => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="mb-4 border-b-2 border-black dark:border-y2k-cyan">
      <nav className="flex space-x-8" aria-label="Tabs">
        {Object.values(Tab).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`
              whitespace-nowrap py-3 px-1 border-b-4 font-bold text-lg uppercase
              ${
                activeTab === tab
                  ? 'border-y2k-pink text-black dark:text-white'
                  : 'border-transparent text-black/60 hover:text-black dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-400'
              }
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-y2k-pink
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