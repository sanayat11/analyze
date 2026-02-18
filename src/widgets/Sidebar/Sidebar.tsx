import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import {
  PhoneIcon,
  UsersIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';



interface SidebarProps {
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  toggleSidebar: () => void;
  onLinkClick?: () => void;
}

const styles = {
  container: (isMobileMenuOpen: boolean) => `
    bg-[var(--surface)] border-r border-[var(--border)] flex flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 z-30
    md:translate-x-0 sidebar-transition
    ${isMobileMenuOpen ? 'translate-x-0 w-[260px] fixed' : '-translate-x-full md:relative'}
  `,
  logoLink: (isCollapsed: boolean) => `
    p-8 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all shrink-0 hover:opacity-80
  `,
  logoIconWrapper: `
    w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0
  `,
  logoText: `
    text-lg font-extrabold text-[var(--text)] tracking-tight whitespace-nowrap overflow-hidden transition-all
  `,
  navLink: (isActive: boolean, isCollapsed: boolean) => `
    w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group relative
    ${isCollapsed ? 'justify-center' : 'gap-3'}
    ${isActive
      ? 'bg-[var(--primary)] text-white shadow-md shadow-purple-500/10'
      : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'}
  `,
  navIcon: (isActive: boolean) => `
    transition-colors duration-200 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-[var(--primary)]'}
  `,
  profileContainer: (isCollapsed: boolean) => `
    flex items-center p-4 ${isCollapsed ? 'justify-center' : 'justify-between'} group transition-all
  `,
  profileLink: (isCollapsed: boolean) => `
    flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} min-w-0 hover:opacity-80 transition-opacity
  `,
  avatarWrapper: `
    w-10 h-10 bg-[var(--surface-2)] border border-[var(--border)] rounded-full overflow-hidden shrink-0 transition-transform group-hover:scale-105
  `
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isMobileMenuOpen, toggleSidebar, onLinkClick }) => {

  const navItems = [
    { id: 'calls', path: '/calls', label: 'Звонки', icon: <PhoneIcon className="w-5 h-5" /> },
    { id: 'managers', path: '/managers', label: 'МОПы', icon: <UserGroupIcon className="w-5 h-5" /> },
    { id: 'clients', path: '/clients', label: 'Клиенты', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'scenarios', path: '/scenarios', label: 'Сценарии', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { id: 'analytics', path: '/analytics', label: 'Аналитика', icon: <ChartBarIcon className="w-5 h-5" /> },
    { id: 'admin', path: '/admin', label: 'Админка', icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  const sidebarWidth = isCollapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)';

  return (
    <aside
      style={{ width: sidebarWidth }}
      className={styles.container(isMobileMenuOpen)}
    >

      {/* Logo */}
      <Link to="/" className={styles.logoLink(isCollapsed)}>
        <div className={styles.logoIconWrapper}>
          <PhoneIcon className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className={styles.logoText}>
            Analyzer<span className="text-[var(--primary)]">AI</span>
          </span>
        )}
      </Link>

      {/* Toggle Button */}
      <div className={`px-2 mb-2 flex ${isCollapsed ? 'justify-center' : 'ml-2'}`}>
        <button
          onClick={toggleSidebar}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface-2)] rounded-xl transition-all border border-transparent hover:border-[var(--border)] hover:shadow-sm active:scale-95"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={onLinkClick}
            title={isCollapsed ? item.label : undefined}
            className={({ isActive }) => styles.navLink(isActive, isCollapsed)}
          >
            {({ isActive }) => (
              <>
                {isActive && !isCollapsed && (
                  <span className="absolute -left-4 w-1.5 h-6 bg-white rounded-r-full"></span>
                )}
                <span className={styles.navIcon(isActive)}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="whitespace-nowrap overflow-hidden transition-all">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto shrink-0 border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="flex flex-col">
          {/* Mobile collapsed state or just stacking */}
          <div
            className={styles.profileContainer(isCollapsed)}
            title={isCollapsed ? "admin — Администратор" : undefined}
          >
            <NavLink to="/profile" className={styles.profileLink(isCollapsed)}>
              <div className={styles.avatarWrapper}>
                <img
                  src="https://picsum.photos/seed/admin/100/100"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isCollapsed && (
                <div className="text-left overflow-hidden">
                  <div className="text-sm font-bold text-[var(--text)] leading-tight truncate">admin</div>
                  <div className="text-[11px] font-semibold text-[var(--text-muted)] leading-tight uppercase tracking-wider truncate">Администратор</div>
                </div>
              )}
            </NavLink>

          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;