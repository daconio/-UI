import React from 'react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-3xl mx-4 my-8 p-6 relative bg-surface border-2 border-border-main shadow-hard" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-text-main hover:text-primary z-10">
          <i className="fas fa-times text-2xl"></i>
        </button>
        
        <div className="h-[70vh] overflow-y-auto pr-4 text-text-main">
          <h2 className="text-3xl font-bold uppercase text-center mb-6">리더보드 사용 매뉴얼</h2>
          
          <section className="mb-8">
            <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-3">&gt; 1. 화면 구성</h3>
            <ul className="list-disc list-inside space-y-3">
              <li><span className="font-bold">헤더 (Header):</span> 데이콘의 주요 서비스로 바로 이동할 수 있는 내비게이션 링크와 함께, 웹사이트의 전체적인 색상 테마(Y2K, Cyberpunk 등)와 다크/라이트 모드를 변경할 수 있는 토글 버튼이 있습니다.</li>
              <li><span className="font-bold">실시간 티커 (Live Ticker):</span> 리더보드 상위 5팀의 최근 점수 획득 소식을 marquee 스타일로 보여주며, 테두리의 전구 애니메이션으로 레트로한 느낌을 더합니다.</li>
              <li><span className="font-bold">리더보드 통계 (Leaderboard Stats):</span> 대회에 참여 중인 전체 팀 수, 총 멤버 수, 최고 점수, 평균 점수, 총 제출 횟수 등 주요 현황을 한눈에 파악할 수 있습니다.</li>
               <li><span className="font-bold">기능 버튼 (Action Buttons):</span>
                 <ul className="list-['-_'] list-inside ml-6 mt-1 space-y-1">
                    <li><span className="font-bold text-secondary">가이드/매뉴얼:</span> 뱃지 정보, 통계 용어 등 간단한 안내(가이드)와 현재 보고 계신 상세한 사용법(매뉴얼)을 확인할 수 있습니다.</li>
                    <li><span className="font-bold text-secondary">팀 검색:</span> 특정 팀의 순위를 빠르게 찾을 수 있습니다.</li>
                    <li><span className="font-bold text-secondary">데이터 분석:</span> 제출 횟수, 점수 분포 등 리더보드 데이터를 시각적인 차트로 분석해 봅니다.</li>
                    <li><span className="font-bold text-secondary">랭킹 새로고침:</span> 최신 리더보드 데이터를 수동으로 불러옵니다.</li>
                 </ul>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-3">&gt; 2. 리더보드 테이블</h3>
            <ul className="list-disc list-inside space-y-3">
              <li><span className="font-bold">순위/변동:</span> 현재 순위와 직전 새로고침 대비 순위 변동 폭을 보여줍니다. 숫자가 바뀌는 플립 애니메이션으로 시각적 재미를 더했습니다.</li>
              <li><span className="font-bold">팀:</span> 팀 이름과 소속 멤버들의 아바타를 표시합니다. 팀 이름에 마우스를 올리면 점수 및 순위 변화 그래프를, 아바타에 마우스를 올리면 멤버의 간단한 프로필을 볼 수 있습니다. 아바타 클릭 시 더 상세한 정보가 담긴 모달이 나타납니다.</li>
              <li><span className="font-bold">배지:</span> 팀이 달성한 특별한 업적을 아이콘으로 보여줍니다. 아이콘에 마우스를 올리면 배지에 대한 설명을 확인할 수 있습니다.</li>
              <li><span className="font-bold">점수/제출:</span> 팀의 현재 점수와 총 제출 횟수를 나타냅니다. 점수가 업데이트될 경우, 점수가 잠시 빛나는 애니메이션 효과가 적용됩니다.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-3">&gt; 3. 시각 효과 및 인터랙션</h3>
            <ul className="list-disc list-inside space-y-3">
              <li><span className="font-bold">등장 애니메이션:</span> 상위 16개 팀은 리더보드 로드 시 오른쪽에서부터 순서대로 미끄러져 들어오는 애니메이션과 함께 아바타가 뒤집히는 효과가 적용되어 역동적인 등장을 연출합니다.</li>
              <li><span className="font-bold">1위 축하 효과:</span> 1위 팀에게는 데이터 로드 시 화면에 화려한 색종이가 흩날리는 축하 애니메이션이 표시됩니다.</li>
              <li><span className="font-bold">순위 변동 피드백:</span> 순위가 오르거나 내린 팀의 행 배경색이 잠시 해당 상태(상승: 초록, 하락: 빨강)에 맞는 색으로 빛나 시각적으로 변화를 인지하기 쉽습니다.</li>
              <li><span className="font-bold">사운드 효과:</span> 새로고침, 정렬 등 주요 기능 사용 시 간단한 사운드 효과가 재생되어 사용자 경험을 향상시킵니다.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;