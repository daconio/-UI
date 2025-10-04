import { Badge } from './types';

export const LEADERBOARD_API_URL = 'https://newapi.dacon.io/leaderboard/V2/public?cpt_id=236575';

const avatarColors = [
  'bg-y2k-pink',
  'bg-y2k-cyan',
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

const PIXEL_ART_AVATAR_URLS = [
  'https://api.iconify.design/pixelarticons/user.svg',
  'https://api.iconify.design/pixelarticons/user-plus.svg',
  'https://api.iconify.design/pixelarticons/user-minus.svg',
  'https://api.iconify.design/pixelarticons/users.svg',
  'https://api.iconify.design/pixelarticons/android.svg',
  'https://api.iconify.design/pixelarticons/bug.svg',
  'https://api.iconify.design/pixelarticons/cat.svg',
  'https://api.iconify.design/pixelarticons/dog.svg',
  'https://api.iconify.design/pixelarticons/ghost.svg',
  'https://api.iconify.design/pixelarticons/ninja.svg',
  'https://api.iconify.design/pixelarticons/robot.svg',
  'https://api.iconify.design/pixelarticons/alien.svg',
  'https://api.iconify.design/pixelarticons/head.svg',
  'https://api.iconify.design/pixelarticons/human-handsdown.svg',
  'https://api.iconify.design/pixelarticons/human-male.svg',
  'https://api.iconify.design/pixelarticons/human-female.svg',
  'https://api.iconify.design/pixelarticons/human-run.svg',
  'https://api.iconify.design/pixelarticons/mood-happy.svg',
  'https://api.iconify.design/pixelarticons/mood-sad.svg',
  'https://api.iconify.design/pixelarticons/mood-neutral.svg',
  'https://api.iconify.design/openmoji/man-mage.svg?color=%23888888',
  'https://api.iconify.design/openmoji/woman-mage.svg?color=%23888888',
  'https://api.iconify.design/openmoji/man-elf.svg?color=%23888888',
  'https://api.iconify.design/openmoji/woman-elf.svg?color=%23888888',
  'https://api.iconify.design/openmoji/man-vampire.svg?color=%23888888',
  'https://api.iconify.design/openmoji/woman-vampire.svg?color=%23888888',
  'https://api.iconify.design/openmoji/man-zombie.svg?color=%23888888',
  'https://api.iconify.design/openmoji/woman-zombie.svg?color=%23888888',
  'https://api.iconify.design/openmoji/man-genie.svg?color=%23888888',
  'https://api.iconify.design/openmoji/woman-genie.svg?color=%23888888',
  'https://api.iconify.design/openmoji/robot.svg?color=%23888888',
  'https://api.iconify.design/openmoji/ghost.svg?color=%23888888',
  'https://api.iconify.design/openmoji/alien.svg?color=%23888888',
  'https://api.iconify.design/openmoji/alien-monster.svg?color=%23888888',
  'https://api.iconify.design/openmoji/ogre.svg?color=%23888888',
  'https://api.iconify.design/openmoji/goblin.svg?color=%23888888',
  'https://api.iconify.design/pepicons-pop/person-circle.svg',
  'https://api.iconify.design/pepicons-print/person-circle.svg',
  'https://api.iconify.design/streamline-emojis/female-technologist-1.svg',
  'https://api.iconify.design/streamline-emojis/male-technologist-1.svg',
  'https://api.iconify.design/streamline-emojis/man-detective-1.svg',
  'https://api.iconify.design/streamline-emojis/woman-detective-1.svg',
  'https://api.iconify.design/streamline-emojis/woman-super-villain-1.svg',
  'https://api.iconify.design/streamline-emojis/man-super-villain-1.svg',
  'https://api.iconify.design/streamline-emojis/woman-super-hero-1.svg',
  'https://api.iconify.design/streamline-emojis/man-super-hero-1.svg',
];

export const getRandomPixelAvatarUrl = () => PIXEL_ART_AVATAR_URLS[Math.floor(Math.random() * PIXEL_ART_AVATAR_URLS.length)];


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
  colorClass: 'text-y2k-cyan',
  description: '가장 최근에 제출한 상위 10팀에게 주어집니다.',
};

export const RISING_STAR_BADGE: Badge = {
  id: 'rising_star',
  iconClass: 'fas fa-meteor',
  name: '떠오르는 샛별',
  colorClass: 'text-y2k-pink',
  description: '새롭게 등장하여 상위 20%에 진입한 팀입니다.',
};

export const BIG_JUMP_BADGE: Badge = {
  id: 'big_jump',
  iconClass: 'fas fa-angles-up',
  name: '엄청난 도약',
  colorClass: 'text-green-400',
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