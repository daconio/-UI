import React from 'react';
import { Member } from '../types';

interface MemberDetailModalProps {
  member: Member | null;
  onClose: () => void;
}

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ member, onClose }) => {
  if (!member) {
    return null;
  }

  const hexagonClipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
            <div
                className={`h-24 w-24 ${member.bgColorClass} mx-auto mb-4`}
                style={{ clipPath: hexagonClipPath }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${member.avatarUrl})`,
                  clipPath: hexagonClipPath,
                  transform: 'scale(0.92)'
                }}
                aria-label={`${member.name} 아바타`}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{member.name}</h2>
            <p className="text-md text-gray-600 dark:text-gray-300 mt-2">{member.bio}</p>
        </div>
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">추가 정보</h3>
            <div className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                <p><strong>ID:</strong> {member.id}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailModal;
