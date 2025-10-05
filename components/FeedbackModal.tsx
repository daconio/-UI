import React, { useState } from 'react';
import { playSound } from '../utils';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    console.log('Feedback Submitted:', { name, email, message });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      playSound('notification');
      alert('피드백이 성공적으로 전송되었습니다. 감사합니다!');
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-lg mx-4 p-6 relative bg-surface border-2 border-border-main shadow-hard" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-text-main hover:text-primary z-10">
          <i className="fas fa-times text-2xl"></i>
        </button>
        
        <h2 className="text-3xl font-bold uppercase text-center mb-6 text-text-main">피드백 보내기</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-1 uppercase tracking-wider text-text-main">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-background border-2 border-border-main text-text-main focus:outline-none placeholder:text-text-muted"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-1 uppercase tracking-wider text-text-main">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-background border-2 border-border-main text-text-main focus:outline-none placeholder:text-text-muted"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-bold mb-1 uppercase tracking-wider text-text-main">메시지</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-2 bg-background border-2 border-border-main text-text-main focus:outline-none placeholder:text-text-muted"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center w-full px-6 py-3 font-bold text-secondary bg-surface border-2 border-border-main shadow-hard hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px hover:shadow-hard-sm active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} mr-2`}></i>
              {isSubmitting ? '전송 중...' : '피드백 전송'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;