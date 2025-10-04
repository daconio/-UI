import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 w-10 h-10 bg-y2k-bg-light dark:bg-y2k-surface-dark text-black dark:text-y2k-cyan border-2 border-black dark:border-y2k-cyan shadow-hard-light dark:shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] hover:shadow-hard-sm-light dark:hover:shadow-hard-sm active:shadow-none transition-all"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <i className="fas fa-sun h-5 w-5"></i>
      ) : (
        <i className="fas fa-moon h-5 w-5"></i>
      )}
    </button>
  );
};

export default ThemeToggle;