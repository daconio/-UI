// Fix: Add Tab enum to resolve import error in LeaderboardTabs.tsx.
export enum Tab {
  Public = '공개',
  Private = '비공개',
}

export interface Member {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  bgColorClass: string;
}

export type SortKey = 'rank' | 'team' | 'entries' | 'score' | 'lastSubmission' | 'badges';
export type SortDirection = 'ascending' | 'descending';

export interface Badge {
  id: string;
  iconClass: string;
  name: string;
  colorClass: string;
  description: string;
}

// Fix: Add MedalType to resolve import error in Medal.tsx.
export type MedalType = 'gold' | 'silver' | 'bronze' | 'none';

export interface ScoreHistoryPoint {
  score: number;
  date: Date;
}

export interface RankHistoryPoint {
  rank: number;
  timestamp: number;
}

export interface LeaderboardEntry {
  teamId: number;
  rank: number;
  rankChange: number;
  team: string;
  members: Member[];
  badges: Badge[];
  score: number;
  entries: number;
  lastSubmission: string;
  joinDate: string;
  scoreHistory: ScoreHistoryPoint[];
  rankHistory: RankHistoryPoint[];
  c_time: string; // Raw date string for accurate sorting
  isNew?: boolean;
  hasNewSubmission?: boolean;
}