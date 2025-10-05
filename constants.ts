import { Badge } from './types';

export const LEADERBOARD_API_URL = 'https://newapi.dacon.io/leaderboard/V2/public?cpt_id=236575';

const avatarColors = [
  'bg-primary',
  'bg-secondary',
  'bg-yellow-400',
  'bg-purple-500',
  'bg-green-400',
];

export const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

const bios = [
  'AI에 대한 열정을 가진 데이터 과학자입니다.',
  '머신러닝 엔지니어. 복잡한 문제를 해결하는 것을 즐깁니다.',
  '딥러닝 연구원. 혁신적인 AI 모델을 만드는 데 집중하고 있습니다.',
  '데이터 분석가. 숨겨진 인사이트를 찾는 것을 좋아합니다.',
  '소프트웨어 개발자. AI와 웹 기술의 결합에 관심이 많습니다.',
];

export const getRandomBio = () => bios[Math.floor(Math.random() * bios.length)];

export const getCharacterAvatarUrl = (seed: string) => `https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;


export const GOLD_MEDAL_BADGE: Badge = {
  id: 'gold_medal',
  iconClass: 'fas fa-medal',
  name: '1위',
  colorClass: 'text-gold',
  description: '리더보드 1위를 차지했습니다.',
};

export const SILVER_MEDAL_BADGE: Badge = {
  id: 'silver_medal',
  iconClass: 'fas fa-medal',
  name: '2위',
  colorClass: 'text-silver',
  description: '리더보드 2위를 차지했습니다.',
};

export const BRONZE_MEDAL_BADGE: Badge = {
  id: 'bronze_medal',
  iconClass: 'fas fa-medal',
  name: '3위',
  colorClass: 'text-bronze',
  description: '리더보드 3위를 차지했습니다.',
};

export const TOP_SUBMISSIONS_BADGE: Badge = {
  id: 'top_submissions',
  iconClass: 'fas fa-bolt',
  name: '최다 제출 Top 10',
  colorClass: 'text-yellow-400',
  description: '가장 많은 제출 횟수를 기록한 상위 10팀에게 주어집니다.',
};

export const TOP_RECENCY_BADGE: Badge = {
  id: 'top_recency',
  iconClass: 'fas fa-rocket',
  name: '최근 제출 Top 10',
  colorClass: 'text-secondary',
  description: '가장 최근에 제출한 상위 10팀에게 주어집니다.',
};

export const RISING_STAR_BADGE: Badge = {
  id: 'rising_star',
  iconClass: 'fas fa-meteor',
  name: '떠오르는 샛별',
  colorClass: 'text-primary',
  description: '새롭게 등장하여 상위 20%에 진입한 팀입니다.',
};

export const BIG_JUMP_BADGE: Badge = {
  id: 'big_jump',
  iconClass: 'fas fa-angles-up',
  name: '엄청난 도약',
  colorClass: 'text-accent-up',
  description: '최근 순위가 5계단 이상 급상승한 팀입니다.',
};

export const CONSISTENT_PERFORMER_BADGE: Badge = {
  id: 'consistent_performer',
  iconClass: 'fas fa-user-clock',
  name: '꾸준한 노력가',
  colorClass: 'text-purple-400',
  description: '꾸준히 50회 이상 제출하며 노력하는 팀입니다.',
};

export const COLLABORATION_BADGE: Badge = {
  id: 'collaboration',
  iconClass: 'fas fa-handshake',
  name: '협업',
  colorClass: 'text-orange-400',
  description: '2명 이상의 팀원으로 구성된 팀입니다.',
};

export const STREAK_STARTER_BADGE: Badge = {
  id: 'streak_starter',
  iconClass: 'fas fa-fire',
  name: '연속 상승',
  colorClass: 'text-accent-down',
  description: '3회 연속으로 순위가 상승한 팀입니다.',
};

export const SOUND_EFFECTS = {
  REFRESH: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAABwAPS/5P/U/9L/0//U/9L/0v/U/9L/0//S/9P/0v/U/9L/0//S/9P/0v/T/9L/1P/T/wA=',
  SORT: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
  NOTIFICATION: 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSBIAACAgLz8/vr7/PX0+vPz9fXz9Pbw9fHu8e/u8O3r7ezp6uXm5uLh4N/d3dva2tXX1tbU09LS0c/OzsrJyMfFxMPBwcC/vr28urq5uLe2tri0s7GwsKujo6Giod/e3dva2tXV1dTT0tHRz87OysnIx8XFw8LBwL++vb27u7q5uLa2tri0s7GwsKujo6GhoqGiod/f3t7e3d3c3Nvb2tra2dnY19fX1dXV1NTT09LR0c/Pz87OzsjIyMfHx8TExMLCwsHBwL+/v76+vr29vbu7u7m5ubm5t7e3tra2tbW1tLS0s7OzsLCwr6+vo6OjoaGhoKCg',
  TOGGLE: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAABwAPS/5P/U/9L/0//U/9L/0v/U/9L/0//S/9P/0v/U/9L/0//S/9P/0v/T/9L/1P/T/wA=',
};