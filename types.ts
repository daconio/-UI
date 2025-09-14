import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Member {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  bgColorClass: string;
}

export type MedalType = 'gold' | 'silver' | 'none';

export interface Badge {
  iconClass: string;
  name: string;
  colorClass: string;
}

export interface LeaderboardEntry {
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
}

export enum Tab {
    Public = '공개',
    Private = '비공개',
}