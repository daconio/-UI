

import { ScoreHistoryPoint } from './types';
import { SOUND_EFFECTS } from './constants';

// --- Sound Effects Utility ---
const audioCache: { [key: string]: HTMLAudioElement } = {
  refresh: new Audio(SOUND_EFFECTS.REFRESH),
  sort: new Audio(SOUND_EFFECTS.SORT),
  notification: new Audio(SOUND_EFFECTS.NOTIFICATION),
  toggle: new Audio(SOUND_EFFECTS.TOGGLE),
};

// Set a global volume for all sound effects
Object.values(audioCache).forEach(audio => {
  audio.volume = 0.3;
});

type SoundKey = keyof typeof audioCache;

export const playSound = (sound: SoundKey) => {
  const audio = audioCache[sound];
  if (audio) {
    audio.currentTime = 0; // Rewind to start, allows replaying quickly
    audio.play().catch(e => {
      // Autoplay can be blocked by the browser, so we catch the error
      console.error(`Could not play sound "${sound}":`, e);
    });
  }
};
// --- End Sound Effects ---


export const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'now';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}mo`;
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears}y`;
};

export const generateScoreHistory = (currentScore: number, submissionCount: number): ScoreHistoryPoint[] => {
    const history: ScoreHistoryPoint[] = [];
    const now = new Date();
    
    if (submissionCount <= 0) return [];
  
    // Start with a score that is lower than the current score
    let score = Math.max(0, currentScore - (submissionCount * (Math.random() * 0.001 + 0.0001)));
  
    if (submissionCount === 1) {
      return [{ score: currentScore, date: new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000) }];
    }
  
    for (let i = 0; i < submissionCount; i++) {
      // Spread submissions over the last 30 days
      const date = new Date(now.getTime() - (30 - (i / submissionCount) * 30) * 24 * 60 * 60 * 1000 * (0.8 + Math.random() * 0.4));
      
      if (i > 0) {
          const remainingSubmissions = submissionCount - i;
          const scoreJump = (currentScore - score) / remainingSubmissions;
          // Scores generally improve, but can sometimes dip slightly.
          const improvement = scoreJump * (0.8 + Math.random() * 0.4);
          const noise = (Math.random() - 0.45) * 0.0005; 
          score += improvement + noise;
      }
  
      history.push({
        score: Math.max(0, score),
        date,
      });
    }
  
    // Ensure the last score is exactly the current score
    history[history.length - 1].score = currentScore;
    history[history.length - 1].date = now;
    
    history.sort((a, b) => a.date.getTime() - b.date.getTime());
  
    return history;
};
