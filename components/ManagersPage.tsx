import React from 'react';
import { 
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  IdentificationIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Manager } from '../types';

interface ManagersPageProps {
  managers: Manager[];
}

const ManagersPage: React.FC<ManagersPageProps> = ({ managers }) => {
  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer";

  const getScoreColorClass = (score: number | null) => {
    if (score === null) return 'text-[var(--text-muted)]';
    if (score >= 8.0) return 'text-green-500 dark:text-green-400';
    if (score >= 6.0) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">МОПы</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium">Всего: {managers.length}, Активных: {managers.length}</p>
        </div>
        <button className="p-2.5 text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--primary)] rounded-xl border border-[var(--border)] transition-all hover:shadow-sm active:scale-95">
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Section */}
      <section className="bg-[var(--surface)] p-8 rounded-2xl shadow-sm border border-[var(--border)] transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col md:col-span-1.5">
            <label className={labelStyle}>Поиск</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="ФИО, email, должность..." 
                className={inputStyle.replace('pl-4', 'pl-10')}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Статус</label>
            <div className="relative">
              <select className={inputStyle + " appearance-none"}>
                <option>Все</option>
                <option>Активен</option>
                <option>Неактивен</option>
              </select>
              <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>На странице</label>
            <div className="relative">
              <select className={inputStyle + " appearance-none"}>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end gap-3 md:justify-end">
            <button className="px-6 py-2.5 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              Сбросить
            </button>
            <button className="px-8 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
              Применить
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {managers.map((manager) => (
          <div 
            key={manager.id}
            className="group bg-[var(--surface)] p-7 rounded-[20px] border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Top: Avatar & Title */}
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#7C3AED] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/10 ring-2 ring-white dark:ring-[#111b2e]">
                {manager.avatarLetter}
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-[var(--text)] leading-snug line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                  {manager.name}
                </h3>
                <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1">
                  {manager.role}
                </span>
              </div>
            </div>

            {/* Middle: Metrics */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-[var(--text)]">
                <IdentificationIcon className="w-5 h-5 text-[var(--text-muted)] opacity-60" />
                <span className="font-semibold">{manager.callsCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ChartBarIcon className="w-5 h-5 text-[var(--text-muted)] opacity-60" />
                {manager.avgScore !== null ? (
                  <span className="font-semibold text-[var(--text-muted)]">
                    Средняя оценка: <span className={`font-bold ${getScoreColorClass(manager.avgScore)}`}>{manager.avgScore}</span>
                  </span>
                ) : (
                  <span className="font-semibold text-[var(--text-muted)]">Нет оценок</span>
                )}
              </div>
            </div>

            {/* Bottom: Actions */}
            <div className="mt-auto grid grid-cols-2 gap-3">
              <button className="px-4 py-2.5 bg-[#EFF6FF] dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[13px] font-bold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-95">
                Подробнее
              </button>
              <button className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[13px] font-bold rounded-xl border border-red-100 dark:border-red-900/20 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all active:scale-95">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ManagersPage;