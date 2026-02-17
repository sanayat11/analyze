import React from 'react';
import { 
  MoonIcon, 
  SunIcon,
  BellIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, toggleSidebar, toggleMobileMenu }) => {
  return (
    <header className="h-20 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] rounded-xl transition-all border border-transparent hover:border-[var(--border)]"
          aria-label="Toggle mobile menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        {/* Desktop sidebar toggle */}
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex p-2.5 text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] rounded-xl transition-all border border-transparent hover:border-[var(--border)]"
          aria-label="Toggle sidebar"
        >
          <div className="relative flex items-center justify-center">
             <Bars3Icon className="w-5 h-5" />
          </div>
        </button>
      </div>
      
      <div className="flex items-center gap-5">
        <button 
          id="themeToggle"
          onClick={toggleDarkMode}
          className="p-2.5 text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] rounded-xl transition-all border border-transparent hover:border-[var(--border)]"
          title={isDarkMode ? "Включить светлую тему" : "Включить темную тему"}
        >
          {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        
        <button className="p-2.5 text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text)] rounded-xl transition-all relative border border-transparent hover:border-[var(--border)]">
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--surface)]"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;