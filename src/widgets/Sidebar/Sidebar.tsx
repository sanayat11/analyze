import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import ConfirmModal from '@/features/confirm-action/ui/ConfirmModal';
import {
  PhoneIcon,
  UsersIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  onLinkClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isMobileMenuOpen, onLinkClick }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/404');
  };
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
      className={`
        bg-[var(--surface)] border-r border-[var(--border)] flex flex-col shrink-0 sticky top-0 h-screen transition-all duration-300 z-30
        md:translate-x-0 sidebar-transition
        ${isMobileMenuOpen ? 'translate-x-0 w-[260px] fixed' : '-translate-x-full md:relative'}
      `}
    >
      {/* Logo */}
      {/* Logo */}
      <Link to="/" className={`p-8 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all shrink-0 hover:opacity-80`}>
        <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
          <PhoneIcon className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-lg font-extrabold text-[var(--text)] tracking-tight whitespace-nowrap overflow-hidden transition-all">
            Analyzer<span className="text-[var(--primary)]">AI</span>
          </span>
        )}
      </Link>

      {/* Navigation */}
      <nav className="mt-4 px-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={onLinkClick}
            title={isCollapsed ? item.label : undefined}
            className={({ isActive }) => `
              w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group relative
              ${isCollapsed ? 'justify-center' : 'gap-3'}
              ${isActive
                ? 'bg-[var(--primary)] text-white shadow-md shadow-purple-500/10'
                : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && !isCollapsed && (
                  <span className="absolute -left-4 w-1.5 h-6 bg-white rounded-r-full"></span>
                )}
                <span className={`transition-colors duration-200 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-[var(--primary)]'}`}>
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

      {/* Sidebar Footer: Profile Block */}
      <div className="mt-auto shrink-0 border-t border-[var(--border)] bg-[var(--surface)]">
        <div
          className={`flex items-center p-4 ${isCollapsed ? 'justify-center' : 'justify-between'} group transition-all`}
          title={isCollapsed ? "admin — Администратор" : undefined}
        >
          <NavLink to="/profile" className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} min-w-0 hover:opacity-80 transition-opacity`}>
            <div className="w-10 h-10 bg-[var(--surface-2)] border border-[var(--border)] rounded-full overflow-hidden shrink-0 transition-transform group-hover:scale-105">
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

          {!isCollapsed && (
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all shrink-0"
              aria-label="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Copyright */}
        <div className={`px-8 py-4 border-t border-[var(--border)] transition-all ${isCollapsed ? 'flex justify-center' : ''}`}>
          {isCollapsed ? (
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">© 26</span>
          ) : (
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">© 2026 AI Call Analyzer</span>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Выход из аккаунта"
        message="Вы уверены, что хотите выйти? Вам придется войти снова, чтобы получить доступ к данным."
        confirmText="Да, выйти"
        isDangerous={true}
      />
    </aside>
  );
};

export default Sidebar;