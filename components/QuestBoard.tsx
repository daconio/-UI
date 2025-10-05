import React from 'react';

const QuestItem = ({ text, completed }: { text: string; completed: boolean }) => (
  <li className="flex items-center">
    <div className={`w-5 h-5 border-2 border-border-main mr-3 flex items-center justify-center ${completed ? 'bg-secondary' : ''}`}>
      {completed && <i className="fas fa-check text-black text-xs"></i>}
    </div>
    <span className={`${completed ? 'line-through text-text-muted' : 'text-text-main'}`}>{text}</span>
  </li>
);

const QuestBoard = () => {
  return (
    <div className="mb-6 p-4 sm:p-6 bg-surface border-2 border-border-main shadow-hard">
      <h2 className="text-xl font-bold mb-3 text-primary uppercase tracking-widest">&gt; Daily Mission Briefing</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <ul className="space-y-2">
            <QuestItem text="Log in to the Arena (모험의 시작)" completed={true} />
            <QuestItem text="Climb 5 Ranks" completed={false} />
            <QuestItem text="Complete a Submission (첫 번째 임무 완수)" completed={false} />
          </ul>
        </div>
        <div className="flex-shrink-0 md:border-l-2 md:pl-6 border-dashed border-border-main/50 text-center">
          <p className="font-bold uppercase tracking-wider text-text-main">Mission Reward</p>
          <div className="mt-2 text-4xl text-gold">
            <i className="fas fa-gift"></i>
          </div>
          <p className="font-bold mt-1 text-text-main">1x [Data Cache]</p>
        </div>
      </div>
    </div>
  );
};

export default QuestBoard;