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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-md mx-4 p-6 relative bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-black dark:text-white hover:text-y2k-pink dark:hover:text-y2k-cyan">
          <i className="fas fa-times text-2xl"></i>
        </button>
        <div className="text-center">
            <div
                className={`h-24 w-24 ${member.bgColorClass} mx-auto mb-4 border-2 border-black dark:border-y2k-cyan p-1`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${member.avatarUrl})`,
                  imageRendering: 'pixelated',
                }}
                aria-label={`${member.name} 아바타`}
              />
            </div>
            <h2 className="text-3xl font-bold uppercase">{member.name}</h2>
            <p className="text-md mt-2 font-mono text-black">{member.bio}</p>
        </div>
        <div className="mt-6 border-t-2 border-dashed border-black/50 dark:border-y2k-cyan/50 pt-4">
            <h3 className="text-lg font-bold text-y2k-pink uppercase tracking-widest">&gt; Player Info</h3>
            <div className="mt-2 space-y-2 font-mono">
                <p><strong>ID:</strong> {member.id}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailModal;