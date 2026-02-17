import React, { useState } from 'react';
import { 
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CommandLineIcon,
  ChartBarIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { Scenario } from '../types';

interface ScenariosPageProps {
  scenarios: Scenario[];
  onOpenCreate: () => void;
}

const ScenariosPage: React.FC<ScenariosPageProps> = ({ scenarios, onOpenCreate }) => {
  const [onlyActive, setOnlyActive] = useState(true);

  const getScoreColorClass = (score: number) => {
    if (score >= 8.0) return 'text-green-500 dark:text-green-400';
    if (score >= 6.0) return 'text-amber-500 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getScoreBgClass = (score: number) => {
    if (score >= 8.0) return 'score-good';
    if (score >= 6.0) return 'score-neutral';
    return 'score-bad';
  };

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Сценарии</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium">Всего: {scenarios.length}, Активных: {scenarios.filter(s => s.status === 'active').length}</p>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Только активные</span>
            <button 
              onClick={() => setOnlyActive(!onlyActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${onlyActive ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-800'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${onlyActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          
          <button 
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
          >
            <PlusIcon className="w-5 h-5" />
            Создать сценарий
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id}
            className="group bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Title Row */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  {scenario.name}
                </h2>
                <span className="chip chip-green text-[10px] font-bold uppercase tracking-widest px-2 height-[22px]">
                  Активен
                </span>
              </div>
              <span className="chip chip-blue text-[10px] font-bold px-3 py-1">
                {scenario.categories.length} категорий
              </span>
            </div>
            
            <p className="text-xs font-medium text-[var(--text-muted)] mb-4">{scenario.internalName}</p>
            
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 line-clamp-2">
              {scenario.description}
            </p>

            {/* Metrics Section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--surface-2)] p-4 rounded-2xl border border-[var(--border)] text-center transition-colors group-hover:bg-white dark:group-hover:bg-slate-800/50">
                <div className="text-2xl font-bold text-[var(--text)] mb-1 tabular-nums">{scenario.usages}</div>
                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">использований</div>
              </div>
              <div className={`p-4 rounded-2xl border border-[var(--border)] text-center transition-colors group-hover:bg-white dark:group-hover:bg-slate-800/50`}>
                <div className={`text-2xl font-bold tabular-nums mb-1 ${getScoreColorClass(scenario.avgScore)}`}>
                  {scenario.avgScore.toFixed(1)}
                </div>
                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">средняя оценка</div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TagIcon className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">Категории оценки:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {scenario.categories.map((cat, i) => (
                  <span key={i} className="chip chip-violet text-[11px] font-semibold px-3 opacity-90 hover:opacity-100 transition-opacity cursor-default">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt Preview */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <CommandLineIcon className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">Промт:</span>
              </div>
              <div className="bg-[var(--surface-2)] p-4 rounded-2xl border border-[var(--border)] group-hover:border-[var(--primary)] transition-colors">
                <pre className="text-[11px] font-mono text-[var(--text)] opacity-70 leading-relaxed overflow-x-auto whitespace-pre-wrap break-all h-20 overflow-y-auto custom-scrollbar">
                  {scenario.prompt}
                </pre>
              </div>
            </div>

            {/* Footer & Actions */}
            <div className="mt-auto pt-6 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Обновлен: {scenario.updatedAt}
              </span>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/10 active:scale-[0.98]">
                  Редактировать
                </button>
                <button className="px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-600 hover:text-white transition-all border border-red-100 dark:border-red-900/20 rounded-xl active:scale-[0.98]">
                  Удалить
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[var(--text)] bg-[var(--surface-2)] hover:bg-[var(--border)] rounded-xl border border-[var(--border)] transition-all active:scale-[0.98]">
                  <CommandLineIcon className="w-4 h-4" />
                  JSON
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ScenariosPage;