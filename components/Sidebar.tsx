import React from 'react';
import { 
  PhoneIcon, 
  UsersIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, isMobileMenuOpen }) => {
  const navItems = [
    { id: 'calls', label: 'Звонки', icon: <PhoneIcon className="w-5 h-5" /> },
    { id: 'managers', label: 'МОПы', icon: <UserGroupIcon className="w-5 h-5" /> },
    { id: 'clients', label: 'Клиенты', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'scenarios', label: 'Сценарии', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { id: 'analytics', label: 'Аналитика', icon: <ChartBarIcon className="w-5 h-5" /> },
    { id: 'admin', label: 'Админка', icon: <Cog6ToothIcon className="w-5 h-5" /> },
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
      <div className={`p-8 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all shrink-0`}>
        <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
          <PhoneIcon className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <span className="text-lg font-extrabold text-[var(--text)] tracking-tight whitespace-nowrap overflow-hidden transition-all">
            Analyzer<span className="text-[var(--primary)]">AI</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={isCollapsed ? item.label : undefined}
            className={`
              w-full flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group relative
              ${isCollapsed ? 'justify-center' : 'gap-3'}
              ${activeTab === item.id 
                ? 'bg-[var(--primary)] text-white shadow-md shadow-purple-500/10' 
                : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'}
            `}
          >
            {activeTab === item.id && !isCollapsed && (
              <span className="absolute -left-4 w-1.5 h-6 bg-white rounded-r-full"></span>
            )}
            <span className={`transition-colors duration-200 shrink-0 ${activeTab === item.id ? 'text-white' : 'group-hover:text-[var(--primary)]'}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="whitespace-nowrap overflow-hidden transition-all">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer: Profile Block */}
      <div className="mt-auto shrink-0 border-t border-[var(--border)] bg-[var(--surface)]">
        <div 
          className={`flex items-center p-4 ${isCollapsed ? 'justify-center' : 'justify-between'} group transition-all`}
          title={isCollapsed ? "admin — Администратор" : undefined}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} min-w-0`}>
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
          </div>
          
          {!isCollapsed && (
            <button className="p-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all shrink-0" aria-label="Logout">
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
    </aside>
  );
};

export default Sidebar;