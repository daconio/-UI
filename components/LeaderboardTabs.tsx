import React from 'react';
import { Tab } from '../types';

interface LeaderboardTabsProps {
  activeTab: Tab;
  onTabClick: (tab: Tab) => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="mb-4 border-b-2 border-border-main">
      <nav className="flex space-x-8" aria-label="Tabs">
        {Object.values(Tab).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`
              whitespace-nowrap py-3 px-1 border-b-4 font-bold text-lg uppercase
              ${
                activeTab === tab
                  ? 'border-primary text-text-main'
                  : 'border-transparent text-text-muted hover:text-text-main hover:border-text-muted'
              }
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary
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