import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils';

const themes = [
  { id: 'theme-y2k', name: 'Y2K' },
  { id: 'theme-cyberpunk', name: 'Cyberpunk' },
  { id: 'theme-retro', name: 'Retro' },
  { id: 'theme-minimalist', name: 'Minimalist' },
];

const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('colorTheme') || 'theme-y2k';
    }
    return 'theme-y2k';
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Remove old theme classes before adding the new one
    themes.forEach(theme => root.classList.remove(theme.id));
    root.classList.add(currentTheme);
    localStorage.setItem('colorTheme', currentTheme);
  }, [currentTheme]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (themeId: string) => {
    playSound('toggle');
    setCurrentTheme(themeId);
    setIsOpen(false);
  };
  
  const currentThemeName = themes.find(t => t.id === currentTheme)?.name || 'Theme';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 w-32 h-10 bg-surface text-text-main border-2 border-border-main shadow-hard hover:-translate-x-px hover:-translate-y-px active:translate-x-px active:translate-y-px hover:shadow-hard-sm active:shadow-none transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select theme"
      >
        <i className="fas fa-palette mr-2"></i>
        <span className="font-bold text-sm">{currentThemeName}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-surface border-2 border-border-main shadow-hard z-30" role="menu">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`w-full text-left px-4 py-2 font-bold hover:bg-primary hover:text-white dark:hover:text-black transition-colors ${currentTheme === theme.id ? 'bg-secondary text-black' : 'text-text-main'}`}
              role="menuitem"
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
