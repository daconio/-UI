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

export type MedalType = 'gold' | 'silver' | 'bronze' | 'none';

export type SortKey = 'rank' | 'team' | 'entries' | 'score' | 'lastSubmission' | 'badges';
export type SortDirection = 'ascending' | 'descending';

export interface Badge {
  id: string;
  iconClass: string;
  name: string;
  colorClass: string;
  description: string;
}

export interface ScoreHistoryPoint {
  score: number;
  date: Date;
}

export interface LeaderboardEntry {
  teamId: number;
  rank: number;
  rankChange: number;
  team: string;
  members: Member[];
  medal: MedalType;
  badges: Badge[];
  score: number;
  entries: number;
  lastSubmission: string;
  joinDate: string;
  scoreHistory: ScoreHistoryPoint[];
  c_time: string; // Raw date string for accurate sorting
  isNew?: boolean;
}
