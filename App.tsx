import React, { useState, useEffect, useMemo, useRef } from 'react';
import Leaderboard from './components/Leaderboard';
import MemberDetailModal from './components/MemberDetailModal';
import ThemeToggle from './components/ThemeToggle';
import Ticker from './components/Ticker';
import LeaderboardStats from './components/LeaderboardStats';
import DistributionCharts from './components/DistributionCharts';
import QuestBoard from './components/QuestBoard'; // Import the new component
import { 
  getRandomColor, 
  getRandomBio, 
  LEADERBOARD_API_URL, 
  TOP_SUBMISSIONS_BADGE, 
  TOP_RECENCY_BADGE, 
  getRandomPixelAvatarUrl,
  RISING_STAR_BADGE,
  BIG_JUMP_BADGE,
  CONSISTENT_PERFORMER_BADGE,
  COLLABORATION_BADGE
} from './constants';
import { Member, LeaderboardEntry, MedalType, SortKey, SortDirection, Badge } from './types';
import { formatRelativeTime, generateScoreHistory } from './utils';

// Header navigation links from Dacon
const navLinks = [
  { name: '커뮤니티', href: 'https://dacon.io/' },
  { name: '대회', href: 'https://dacon.io/competitions' },
  { name: '학습', href: 'https://dacon.io/hackathon' },
  { name: '랭킹', href: 'https://dacon.io/ranking' },
  { name: '더보기', href: 'https://dacon.io/more/notice' },
];

// Footer links and social media data from Dacon
const footerLinks = [
  { name: '이용약관', href: 'https://dacon.io/more/notice/89' },
  { name: '대회주최문의', href: 'https://dacon.io/forum/403890' },
  { name: '데이콘 서비스소개', href: 'https://dacon.io/about' },
  { name: '교육 문의', href: 'https://dacon.io/forum/406358' },
  { name: '채용', href: 'https://dacon.io/community/hiring' },
];

const socialLinks = [
  { name: 'Kakao', href: 'https://pf.kakao.com/_bmVkxj', icon: 'https://dacon.io/_nuxt/img/footer_kakao.29c8bd6.svg' },
  { name: 'Instagram', href: 'https://www.instagram.com/daconio', icon: 'https://dacon.io/_nuxt/img/footer_instagram.f30fc61.svg' },
  { name: 'YouTube', href: 'https://www.youtube.com/@%EB%8D%B0%EC%9D%B4%EC%BD%98', icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy44MTM2IDAuNDQ3NkMxOC42NzM5IDAuNjk0NCAxOS43NTIzIDEuNDIwMiAxOS41ODE4IDIuMzQxOUMyMCA0LjAxMzcgMjAgNy41IDIwIDcuNUMyMCA3LjUgMjAgMTAuOTg3NSAxOS41ODE4IDEyLjY1ODFDMTkuMzUyMyAxMy41Nzk4IDE4LjY3MzkgMTQuMzA1NiAxNy44MTM2IDE0LjU1MjRDMTYuMjU0NSAxNSAxMCAxNSAxMCAxNUMxMCAxNSAzLjc0NjYgMTUgMi4xODY0IDE0LjU1MjRDMS4zMjYxIDE0LjMwNTYgMC42NDc3IDEzNTc5OCAwLjQxODIgMTIuNjU4MUMwIDEwLjk4NjMgMCA3LjUgMCA3LjVDMCA3LjUgMCA0LjAxbDM3IDAuNDE4MiAyLjM0MTlDMC42NDc3IDEuNDIwMiAxLjMyNjEgMC42OTQ0IDIuMTg2NCAwLjQ0NzZDMy43NDU1IDAgMTAgMCAxMCAwQzEwIDAgMTYuMjU0NSAwIDE3LjgxMzYgMC40NDc2Wk0xMyA3LjVMOCAxMFY1TDEzIDcuNVoiIGZpbGw9IiM0QjU1NjMiLz4KPC9zdmc+Cg==' },
  { name: 'Blog', href: 'https://m.blog.naver.com/daconist?tab=1', icon: 'https://dacon.io/_nuxt/img/footer_blog.b618b8d.svg' },
];

// Type definition for the raw API response entry
interface ApiLeaderboardEntry {
  team_id: number;
  ranking: number;
  team_name: string;
  team_info: {
    user_id: string;
    name: string;
    picture: string;
  }[];
  score: number;
  submission_cnt: number;
  c_time: string;
}

function App() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [publicData, setPublicData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [leaderboardKey, setLeaderboardKey] = useState(Date.now());
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'rank', direction: 'ascending' });
  const [showCharts, setShowCharts] = useState(false);
  const previousPublicDataRef = useRef<LeaderboardEntry[]>([]);

  useEffect(() => {
    previousPublicDataRef.current = publicData;
  }, [publicData]);

  const handleAvatarClick = (member: Member) => {
    setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(LEADERBOARD_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();

      let leaderboardList: ApiLeaderboardEntry[];

      if (apiData?.data && Array.isArray(apiData.data)) {
        leaderboardList = apiData.data;
      } else if (apiData?.data?.list && Array.isArray(apiData.data.list)) {
        leaderboardList = apiData.data.list;
      } else if (Array.isArray(apiData)) {
        leaderboardList = apiData;
      } else {
        console.error('API response is not in the expected format:', JSON.stringify(apiData, null, 2));
        throw new Error('Invalid API response structure.');
      }
      
      const topSubmissionsTeamIds = new Set(
        [...leaderboardList]
          .sort((a, b) => b.submission_cnt - a.submission_cnt)
          .slice(0, 10)
          .map(t => t.team_id)
      );
      
      const topRecencyTeamIds = new Set(
        [...leaderboardList]
          .sort((a, b) => new Date(b.c_time).getTime() - new Date(a.c_time).getTime())
          .slice(0, 10)
          .map(t => t.team_id)
      );

      const oldRanks = new Map<number, number>(
        previousPublicDataRef.current.map(entry => [entry.teamId, entry.rank])
      );
      const oldTeamIds = new Set<number>(
        previousPublicDataRef.current.map(entry => entry.teamId)
      );

      const newData: LeaderboardEntry[] = leaderboardList.map((item) => {
        const oldRank = oldRanks.get(item.team_id);
        const rankChange = oldRank !== undefined ? oldRank - item.ranking : 0;
        const isNew = previousPublicDataRef.current.length > 0 && !oldTeamIds.has(item.team_id);

        const members: Member[] = item.team_info.map((m) => ({
          id: m.user_id,
          name: m.name,
          bio: getRandomBio(),
          avatarUrl: getRandomPixelAvatarUrl(),
          bgColorClass: getRandomColor(),
        }));

        let medal: MedalType = 'none';
        if (item.ranking === 1) {
          medal = 'gold';
        } else if (item.ranking === 2) {
          medal = 'silver';
        } else if (item.ranking === 3) {
          medal = 'bronze';
        }
        
        const badges: Badge[] = [];
        if (topSubmissionsTeamIds.has(item.team_id)) {
            badges.push(TOP_SUBMISSIONS_BADGE);
        }
        if (topRecencyTeamIds.has(item.team_id)) {
            badges.push(TOP_RECENCY_BADGE);
        }

        // Add collaboration badge for teams with more than 1 member
        if (item.team_info.length > 1) {
            if (!badges.some(b => b.id === COLLABORATION_BADGE.id)) {
                badges.push(COLLABORATION_BADGE);
            }
        }

        // Add new automatic badges for teams ranked 4th or lower
        if (item.ranking > 3) {
            // Big Jump Badge: If rank improved by more than 5
            if (rankChange > 5) {
                if (!badges.some(b => b.id === BIG_JUMP_BADGE.id)) {
                    badges.push(BIG_JUMP_BADGE);
                }
            }
            
            // Rising Star Badge: New team entering in the top 20%
            const totalTeams = leaderboardList.length;
            if (isNew && item.ranking <= totalTeams * 0.2) {
                 if (!badges.some(b => b.id === RISING_STAR_BADGE.id)) {
                    badges.push(RISING_STAR_BADGE);
                }
            }
    
            // Consistent Performer Badge: >50 submissions but not a top 10 submitter
            if (item.submission_cnt > 50 && !topSubmissionsTeamIds.has(item.team_id)) {
                if (!badges.some(b => b.id === CONSISTENT_PERFORMER_BADGE.id)) {
                    badges.push(CONSISTENT_PERFORMER_BADGE);
                }
            }
        }

        return {
          teamId: item.team_id,
          rank: item.ranking,
          rankChange,
          team: item.team_name,
          members,
          medal,
          badges,
          score: item.score,
          entries: item.submission_cnt,
          lastSubmission: formatRelativeTime(item.c_time),
          joinDate: formatRelativeTime(item.c_time),
          scoreHistory: generateScoreHistory(item.score, item.submission_cnt),
          c_time: item.c_time,
          isNew,
        };
      });

      setPublicData(newData);
      setLeaderboardKey(Date.now());

    } catch (error) {
      console.error("Failed to refresh leaderboard:", error);
      alert('리더보드 데이터를 새로고침하는 데 실패했습니다. 자세한 내용은 콘솔을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedAndFilteredData = useMemo(() => {
    const filteredData = publicData.filter(entry =>
      entry.team.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortableItems = [...filteredData];
    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      let comparison = 0;
      if (sortConfig.key === 'badges') {
        comparison = b.badges.length - a.badges.length;
        if (comparison === 0) {
            comparison = a.rank - b.rank; // Secondary sort by rank
        }
      } else if (sortConfig.key === 'lastSubmission') {
        // Use the raw c_time for accurate date sorting
        comparison = new Date(a.c_time).getTime() - new Date(b.c_time).getTime();
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      }

      return sortConfig.direction === 'ascending' ? comparison : -comparison;
    });

    return sortableItems;
  }, [publicData, searchTerm, sortConfig]);

  const tickerItems = publicData.slice(0, 5).map(entry => (
    `${entry.team} just scored ${entry.score.toFixed(4)}!`
  ));

  return (
    <div className="text-black dark:text-gray-100 min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-y2k-bg-light/80 dark:bg-y2k-bg-dark/80 backdrop-blur-sm border-b-2 border-black dark:border-y2k-cyan">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="https://dacon.io/" className="flex-shrink-0">
            <img src="https://r2-images.dacon.co.kr/external/dacon-logo.svg" alt="Dacon Logo" className="h-8" />
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-y2k-pink dark:hover:text-y2k-cyan font-bold transition-colors text-lg"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-y2k-surface-dark" aria-label="Open menu">
              <i className="fas fa-bars h-5 w-5"></i>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6 flex-grow">
        <div className="p-4 sm:p-6 mb-6 bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard">
           <h2 className="text-xl font-bold mb-2 text-y2k-pink uppercase tracking-widest">&gt; Activity Log</h2>
           <Ticker items={tickerItems} />
        </div>
        
        <QuestBoard />
        
        <LeaderboardStats data={publicData} />

        {showCharts && <DistributionCharts data={publicData} />}

        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-4xl font-bold uppercase text-shadow-lg">Ranking Terminal</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Find Challenger..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2 w-48 bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan focus:outline-none placeholder:text-gray-800 dark:placeholder:text-gray-400"
                aria-label="팀명 검색"
              />
            </div>
            
            <button
              onClick={() => setShowCharts(!showCharts)}
              className="flex items-center px-4 py-2 font-bold text-black dark:text-y2k-cyan bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] hover:shadow-hard-sm-light dark:hover:shadow-hard-sm active:shadow-none transition-all"
              aria-label={showCharts ? 'Hide Data Stream' : 'Analyze Data Stream'}
            >
              <i className="fas fa-chart-bar mr-2"></i>
              {showCharts ? 'Hide Data Stream' : 'Analyze Data Stream'}
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center px-4 py-2 font-bold text-black dark:text-y2k-cyan bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] hover:shadow-hard-sm-light dark:hover:shadow-hard-sm active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className={`fas fa-sync-alt ${isLoading ? 'animate-spin' : ''} mr-2`}></i>
              {isLoading ? 'Scanning...' : 'Refresh Rankings'}
            </button>
          </div>
        </div>
      
        {isLoading && publicData.length === 0 ? (
          <div className="flex justify-center items-center h-96 bg-y2k-bg-light dark:bg-y2k-surface-dark border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard">
            <i className="fas fa-spinner fa-spin text-4xl text-y2k-pink"></i>
          </div>
        ) : (
          <Leaderboard 
            key={leaderboardKey} 
            data={sortedAndFilteredData} 
            onAvatarClick={handleAvatarClick}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        )}
      </main>

      <MemberDetailModal member={selectedMember} onClose={handleCloseModal} />

      <footer className="pt-8 border-t-2 border-black dark:border-y2k-cyan mt-8 bg-y2k-bg-light dark:bg-y2k-surface-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-6 md:mb-0">
              <h6 className="font-bold mb-2 uppercase text-y2k-pink">&gt; DACON QUEST: AI ARENA</h6>
              <nav className="flex flex-wrap gap-x-4 gap-y-2">
                {footerLinks.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline dark:hover:text-y2k-cyan transition-colors">
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                  <img src={link.icon} alt={`${link.name} logo`} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-800 dark:text-gray-400 space-y-1">
            <p>
              데이콘(주) | 대표 김국진 | 699-81-01021 | 통신판매업 신고번호: 제 2021-서울영등포-1704호 | 직업정보제공사업 신고번호: J1204020250004
            </p>
            <p>
              서울특별시 영등포구 은행로 3 익스콘벤처타워 901호 | 이메일 <a href="mailto:dacon@dacon.io" className="hover:underline">dacon@dacon.io</a> | 전화번호: 070-4102-0545
            </p>
            <p className="pt-2">
              Copyright ⓒ DACON Inc. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;