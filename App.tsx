import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import LeaderboardTabs from './components/LeaderboardTabs';
import MemberDetailModal from './components/MemberDetailModal';
import ThemeToggle from './components/ThemeToggle';
import { Tab, Member } from './types';
import { publicLeaderboardData, privateLeaderboardData } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Public);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleAvatarClick = (member: Member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const currentData = activeTab === Tab.Public ? publicLeaderboardData : privateLeaderboardData;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">리더보드</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">현재 순위를 확인하세요.</p>
          </div>
          <ThemeToggle />
        </header>

        <main>
          <LeaderboardTabs activeTab={activeTab} onTabClick={handleTabClick} />
          <Leaderboard data={currentData} onAvatarClick={handleAvatarClick} />
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Competition. All rights reserved.</p>
        </footer>
      </div>

      <MemberDetailModal member={selectedMember} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
