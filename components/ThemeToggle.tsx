
import React, { useState, useEffect } from 'react';
import { playSound } from '../utils';

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
      onClick={() => {
        playSound('toggle');
        setIsDarkMode(!isDarkMode);
      }}
      className="p-2 w-10 h-10 bg-surface text-secondary border-2 border-border-main shadow-hard hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px hover:shadow-hard-sm active:shadow-none transition-all"
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