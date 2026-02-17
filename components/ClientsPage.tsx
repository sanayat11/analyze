import React from 'react';
import { 
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { Client } from '../types';

interface ClientsPageProps {
  clients: Client[];
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients }) => {
  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer";

  const getFunnelBadgeClass = (funnel: 'warm' | 'cold') => {
    switch (funnel) {
      case 'warm': return 'chip-amber';
      case 'cold': return 'chip-blue';
      default: return 'chip-blue';
    }
  };

  const getFunnelLabel = (funnel: 'warm' | 'cold') => {
    return funnel === 'warm' ? 'Теплый' : 'Холодный';
  };

  const getScoreChipStyle = (score: number | null) => {
    if (score === null) return 'text-slate-300 dark:text-slate-700 font-bold';
    if (score >= 8.0) return 'score-good';
    if (score >= 6.0) return 'score-neutral';
    return 'score-bad';
  };

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Клиенты</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium">Всего клиентов: 1149, с звонками: 3</p>
        </div>
        <button className="p-2.5 text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--primary)] rounded-xl border border-[var(--border)] transition-all hover:shadow-sm active:scale-95">
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Section */}
      <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="flex flex-col">
            <label className={labelStyle}>Поиск</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="ФИО, ИНН, Bitrix ID..." 
                className={inputStyle.replace('pl-4', 'pl-10')}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>ИНН</label>
            <input type="text" placeholder="Введите ИНН" className={inputStyle} />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Bitrix ID</label>
            <input type="text" placeholder="Введите Bitrix ID" className={inputStyle} />
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Воронка</label>
            <div className="relative">
              <select className={inputStyle + " appearance-none"}>
                <option>Выберите воронку</option>
                <option>Теплый</option>
                <option>Холодный</option>
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
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-6 py-2.5 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Сбросить
          </button>
          <button className="px-8 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
            Применить
          </button>
        </div>
      </section>

      {/* Table Section */}
      <div className="bg-[var(--surface)] rounded-[20px] shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] min-w-[280px]">Клиент ↑</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">ИНН</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Воронка</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Звонки</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] text-center">Оценка</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Создан</th>
                <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {clients.map((client) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-[var(--row-hover)] transition-all duration-150 group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#7C3AED] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-[#111b2e]">
                        {client.avatarLetter}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors cursor-pointer">
                          {client.name}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] mt-1 font-bold">
                          {client.externalId}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[var(--text)] tabular-nums">
                    {client.inn}
                  </td>
                  <td className="px-6 py-5">
                    <div className="cell-center">
                      <span className={`chip ${getFunnelBadgeClass(client.funnel)}`}>
                        {getFunnelLabel(client.funnel)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[var(--text)] tabular-nums text-center">
                    {client.callsCount}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      {client.avgScore !== null ? (
                        <span className={`score ${getScoreChipStyle(client.avgScore)}`}>
                          {client.avgScore.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)] font-bold">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[var(--text)] tabular-nums">
                    {client.createdAt}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors active:scale-90">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ClientsPage;