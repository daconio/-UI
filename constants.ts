import { LeaderboardEntry, Badge } from './types';

const avatarColors = [
  'bg-blue-400',
  'bg-orange-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-cyan-400',
];

const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

const bios = [
  'AI에 대한 열정을 가진 데이터 과학자입니다.',
  '머신러닝 엔지니어. 복잡한 문제를 해결하는 것을 즐깁니다.',
  '딥러닝 연구원. 혁신적인 AI 모델을 만드는 데 집중하고 있습니다.',
  '데이터 분석가. 숨겨진 인사이트를 찾는 것을 좋아합니다.',
  '소프트웨어 개발자. AI와 웹 기술의 결합에 관심이 많습니다.',
];

const getRandomBio = () => bios[Math.floor(Math.random() * bios.length)];

const badgesPool: Badge[] = [
    { iconClass: 'fas fa-trophy', name: '최고 점수', colorClass: 'text-yellow-500' },
    { iconClass: 'fas fa-rocket', name: '빠른 제출', colorClass: 'text-blue-500' },
    { iconClass: 'fas fa-bolt', name: '최다 제출', colorClass: 'text-purple-500' },
    { iconClass: 'fas fa-brain', name: '혁신적인 접근', colorClass: 'text-pink-500' },
    { iconClass: 'fas fa-medal', name: '대회 베테랑', colorClass: 'text-orange-500' },
    { iconClass: 'fas fa-fire', name: '연속 수상', colorClass: 'text-red-500' },
];

const getRandomBadges = (): Badge[] => {
    const shuffled = [...badgesPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 4)); 
};

export const publicLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    rankChange: 1,
    team: '지오토.ai',
    members: [
      { id: 'm1', name: '김민준', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m1/40/40', bgColorClass: getRandomColor() },
      { id: 'm2', name: '이서연', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m2/40/40', bgColorClass: getRandomColor() },
      { id: 'm3', name: '박도윤', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m3/40/40', bgColorClass: getRandomColor() },
      { id: 'm4', name: '최지우', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m4/40/40', bgColorClass: getRandomColor() },
    ],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 25.00,
    entries: 170,
    lastSubmission: '1d',
    joinDate: '1d',
  },
  {
    rank: 2,
    rankChange: -1,
    team: '아키텍트',
    members: [
      { id: 'm5', name: '정하윤', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m5/40/40', bgColorClass: getRandomColor() },
      { id: 'm6', name: '강서준', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m6/40/40', bgColorClass: getRandomColor() },
      { id: 'm7', name: '조은서', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m7/40/40', bgColorClass: getRandomColor() },
    ],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 16.94,
    entries: 42,
    lastSubmission: '2d',
    joinDate: '2d',
  },
  {
    rank: 3,
    rankChange: 0,
    team: '마인즈AI @ 투파랩스',
    members: [
      { id: 'm8', name: '윤채원', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m8/40/40', bgColorClass: getRandomColor() },
      { id: 'm9', name: '임이준', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m9/40/40', bgColorClass: getRandomColor() },
      { id: 'm10', name: '한지아', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m10/40/40', bgColorClass: getRandomColor() },
      { id: 'm11', name: '오유나', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m11/40/40', bgColorClass: getRandomColor() },
      { id: 'm12', name: '서예준', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m12/40/40', bgColorClass: getRandomColor() },
    ],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 15.42,
    entries: 158,
    lastSubmission: '1d',
    joinDate: '1d',
  },
  {
    rank: 4,
    rankChange: 2,
    team: '기예르모 바르바디요',
    members: [{ id: 'm13', name: 'Guillermo', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m13/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 11.94,
    entries: 47,
    lastSubmission: '3d',
    joinDate: '3d',
  },
  {
    rank: 5,
    rankChange: -1,
    team: '알엑스이',
    members: [{ id: 'm14', name: 'rxe', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m14/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 10.42,
    entries: 72,
    lastSubmission: '2mo',
    joinDate: '2mo',
  },
  {
    rank: 6,
    rankChange: 3,
    team: '이페이 오가와',
    members: [{ id: 'm15', name: 'Ippei Ogawa', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m15/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 10.00,
    entries: 141,
    lastSubmission: '1d',
    joinDate: '1d',
  },
  {
    rank: 7,
    rankChange: 0,
    team: '산율',
    members: [{ id: 'm16', name: 'sanyul', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m16/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 7.08,
    entries: 149,
    lastSubmission: '15h',
    joinDate: '15h',
  },
  {
    rank: 8,
    rankChange: -2,
    team: '푸쉬킨05',
    members: [{ id: 'm17', name: 'pushkin05', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m17/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 6.25,
    entries: 95,
    lastSubmission: '17h',
    joinDate: '17h',
  },
  {
    rank: 9,
    rankChange: 1,
    team: '디티',
    members: [{ id: 'm18', name: 'dt', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m18/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 5.42,
    entries: 19,
    lastSubmission: '5mo',
    joinDate: '5mo',
  },
  {
    rank: 10,
    rankChange: 0,
    team: '힘스AI7',
    members: [{ id: 'm19', name: 'HimsAI7', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m19/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 5.42,
    entries: 25,
    lastSubmission: '23d',
    joinDate: '23d',
  },
  {
    rank: 11,
    rankChange: -1,
    team: '알리',
    members: [{ id: 'm20', name: 'Ali', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m20/40/40', bgColorClass: getRandomColor() }],
    medal: 'gold',
    badges: getRandomBadges(),
    score: 5.00,
    entries: 58,
    lastSubmission: '16h',
    joinDate: '16h',
  },
  {
    rank: 12,
    rankChange: 4,
    team: '올킬',
    members: [
      { id: 'm21', name: '신수현', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m21/40/40', bgColorClass: getRandomColor() },
      { id: 'm22', name: '유지민', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m22/40/40', bgColorClass: getRandomColor() },
      { id: 'm23', name: '권다은', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m23/40/40', bgColorClass: getRandomColor() },
    ],
    medal: 'silver',
    badges: getRandomBadges(),
    score: 5.00,
    entries: 66,
    lastSubmission: '3mo',
    joinDate: '3mo',
  },
  {
    rank: 13,
    rankChange: 0,
    team: '앤드류',
    members: [{ id: 'm24', name: 'Andrew', bio: getRandomBio(), avatarUrl: 'https://picsum.photos/seed/m24/40/40', bgColorClass: getRandomColor() }],
    medal: 'silver',
    badges: getRandomBadges(),
    score: 5.00,
    entries: 20,
    lastSubmission: '3mo',
    joinDate: '3mo',
  },
];

export const privateLeaderboardData: LeaderboardEntry[] = [...publicLeaderboardData]
  .sort((a, b) => b.score * Math.random() - a.score * Math.random())
  .map((entry, index) => ({ 
    ...entry, 
    rank: index + 1,
    rankChange: Math.floor(Math.random() * 7) - 3, // Random change between -3 and +3
  }));