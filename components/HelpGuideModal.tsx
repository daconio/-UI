
import React from 'react';
import { 
  TOP_SUBMISSIONS_BADGE, 
  TOP_RECENCY_BADGE, 
  RISING_STAR_BADGE, 
  BIG_JUMP_BADGE, 
  CONSISTENT_PERFORMER_BADGE, 
  COLLABORATION_BADGE, 
  STREAK_STARTER_BADGE 
} from '../constants';
import { Badge } from '../types';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const badges: Badge[] = [
  TOP_SUBMISSIONS_BADGE,
  TOP_RECENCY_BADGE,
  RISING_STAR_BADGE,
  BIG_JUMP_BADGE,
  CONSISTENT_PERFORMER_BADGE,
  COLLABORATION_BADGE,
  STREAK_STARTER_BADGE
];

const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-2xl mx-4 my-8 p-6 relative bg-surface border-2 border-border-main shadow-hard" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-text-main hover:text-primary z-10">
          <i className="fas fa-times text-2xl"></i>
        </button>
        
        <div className="h-[70vh] overflow-y-auto pr-4 text-text-main">
          <h2 className="text-3xl font-bold uppercase text-center mb-6">사용자 가이드</h2>
          
          {/* 뱃지 섹션 */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-3">&gt; 뱃지 안내</h3>
            <div className="space-y-4">
              {badges.map(badge => (
                <div key={badge.id} className="flex items-start">
                  <div className="w-10 text-center flex-shrink-0">
                    <i className={`${badge.iconClass} ${badge.colorClass} text-2xl`}></i>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-text-main">{badge.name}</p>
                    <p className="text-sm text-text-muted">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 통계 정보 섹션 */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-3">&gt; 통계 정보</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Active Guilds (활성 길드):</span> 현재 리더보드에 있는 총 팀 수입니다.</li>
              <li><span className="font-bold">Adventurers (모험가):</span> 대회에 참여하는 모든 멤버의 총 수입니다.</li>
              <li><span className="font-bold">High Score (최고 점수):</span> 현재 리더보드에서 가장 높은 점수입니다.</li>
              <li><span className="font-bold">Avg. Power Level (평균 파워 레벨):</span> 모든 팀의 평균 점수입니다.</li>
              <li><span className="font-bold">Quests Completed (완료된 퀘스트):</span> 모든 팀이 제출한 총 횟수입니다.</li>
            </ul>
          </section>

          {/* 차트 분석 섹션 */}
          <section>
            <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-3">&gt; 데이터 스트림 분석</h3>
            <p className="mb-4">'Analyze Data Stream' 버튼을 클릭하면 리더보드 데이터에 대한 다양한 시각적 분석을 볼 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Quest Completion Rate (퀘스트 완료율):</span> 팀들의 제출 횟수 분포를 보여줍니다.</li>
              <li><span className="font-bold">Loot Distribution (전리품 분포):</span> 팀들이 보유한 뱃지 수량 분포를 보여줍니다.</li>
              <li><span className="font-bold">Power Levels (파워 레벨):</span> 팀들의 점수 분포를 보여줍니다.</li>
              <li><span className="font-bold">Recent Transmissions (최근 통신):</span> 팀들의 최근 제출 시간 분포를 보여줍니다.</li>
              <li><span className="font-bold">Most Legendary Guilds (가장 전설적인 길드):</span> 독특하거나 흥미로운 이름을 가진 팀들을 보여줍니다.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpGuideModal;