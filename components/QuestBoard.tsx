import React from 'react';

const QuestItem = ({ text, completed }: { text: string; completed: boolean }) => (
  <li className="flex items-center">
    <div className={`w-5 h-5 border-2 border-black dark:border-y2k-cyan mr-3 flex items-center justify-center ${completed ? 'bg-y2k-cyan' : ''}`}>
      {completed && <i className="fas fa-check text-black text-xs"></i>}
    </div>
    <span className={`${completed ? 'line-through text-black/60 dark:text-white/60' : 'text-black dark:text-white'}`}>{text}</span>
  </li>
);

const QuestBoard = () => {
  return (
    <div className="mb-6 p-4 sm:p-6 bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard">
      <h2 className="text-xl font-bold mb-3 text-y2k-pink uppercase tracking-widest">&gt; Daily Mission Briefing</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <ul className="space-y-2">
            <QuestItem text="Log in to the Arena (모험의 시작)" completed={true} />
            <QuestItem text="Climb 5 Ranks" completed={false} />
            <QuestItem text="Complete a Submission (첫 번째 임무 완수)" completed={false} />
          </ul>
        </div>
        <div className="flex-shrink-0 md:border-l-2 md:pl-6 border-dashed border-black/50 dark:border-y2k-cyan/50 text-center">
          <p className="font-bold uppercase tracking-wider">Mission Reward</p>
          <div className="mt-2 text-4xl text-yellow-400">
            <i className="fas fa-gift"></i>
          </div>
          <p className="font-bold mt-1">1x [Data Cache]</p>
        </div>
      </div>
    </div>
  );
};

export default QuestBoard;
