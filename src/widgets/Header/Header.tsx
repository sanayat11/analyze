import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleMobileMenu: () => void;
  isSidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, toggleMobileMenu, isSidebarCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <header className="h-14 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--primary)] rounded-xl transition-all border border-transparent hover:border-[var(--border)]"
          aria-label="Toggle mobile menu"
        >
          <Bars3Icon className="w-6 h-6" />
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

      </div>
    </header>
  );
};

export default Header;