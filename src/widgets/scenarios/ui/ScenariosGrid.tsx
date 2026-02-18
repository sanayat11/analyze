import React from 'react';
import { TagIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { Scenario } from '@/entities/scenario/model/types';

interface ScenariosGridProps {
    scenarios: Scenario[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const ScenariosGrid: React.FC<ScenariosGridProps> = ({ scenarios, onDelete, onEdit }) => {
    const getScoreColorClass = (score: number) => {
        if (score >= 8.0) return 'text-green-500 dark:text-green-400';
        if (score >= 6.0) return 'text-amber-500 dark:text-amber-400';
        return 'text-red-500 dark:text-red-400';
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {scenarios.map((scenario) => (
                <div
                    key={scenario.id}
                    className="group bg-[var(--surface)] p-8 rounded-[20px] 
                               border border-[var(--border)] 
                               shadow-sm 
                               transition-transform duration-300 
                               hover:-translate-y-1 
                               flex flex-col"
                >
                    {/* Title Row */}
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-[var(--text)]">
                                {scenario.name}
                            </h2>

                            {scenario.status === 'active' && (
                                <span className="chip chip-green text-[10px] font-bold uppercase tracking-widest px-2">
                                    Активен
                                </span>
                            )}
                        </div>

                        <span className="chip chip-blue text-[10px] font-bold px-3 py-1">
                            {scenario.categories.length} категорий
                        </span>
                    </div>

                    <p className="text-xs font-medium text-[var(--text-muted)] mb-4">
                        {scenario.internalName}
                    </p>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 line-clamp-2">
                        {scenario.description}
                    </p>

                    {/* Metrics Section */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[var(--surface-2)] p-4 rounded-2xl 
                                        border border-[var(--border)] 
                                        text-center">
                            <div className="text-2xl font-bold text-[var(--text)] mb-1 tabular-nums">
                                {scenario.usages}
                            </div>
                            <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                                использований
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl 
                                        border border-[var(--border)] 
                                        text-center">
                            <div className={`text-2xl font-bold tabular-nums mb-1 ${getScoreColorClass(scenario.avgScore)}`}>
                                {scenario.avgScore.toFixed(1)}
                            </div>
                            <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                                средняя оценка
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <TagIcon className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                                Категории оценки:
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {scenario.categories.map((cat, i) => (
                                <span
                                    key={i}
                                    className="chip chip-violet text-[11px] font-semibold px-3 opacity-90 cursor-default"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Prompt */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <CommandLineIcon className="w-4 h-4 text-[var(--text-muted)]" />
                            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
                                Промт:
                            </span>
                        </div>

                        <div className="bg-[var(--surface-2)] p-4 rounded-2xl 
                                        border border-[var(--border)]">
                            <pre className="text-[11px] font-mono text-[var(--text)] opacity-70 
                                            leading-relaxed overflow-x-auto 
                                            whitespace-pre-wrap break-all 
                                            h-20 overflow-y-auto custom-scrollbar">
                                {scenario.prompt}
                            </pre>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-[var(--border)] 
                                    flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                            Обновлен: {scenario.updatedAt}
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onEdit(scenario.id)}
                                className="flex items-center gap-2 px-4 py-2 
                                           text-xs font-bold text-white 
                                           bg-blue-600 
                                           rounded-xl 
                                           transition-transform duration-150
                                           active:scale-[0.98]"
                            >
                                Редактировать
                            </button>

                            <button
                                onClick={() => onDelete(scenario.id)}
                                className="px-4 py-2 text-xs font-bold 
                                           text-red-600 dark:text-red-400 
                                           bg-red-50 dark:bg-red-500/10 
                                           border border-red-100 dark:border-red-900/20 
                                           rounded-xl 
                                           transition-transform duration-150
                                           active:scale-[0.98]"
                            >
                                Удалить
                            </button>

                            <button
                                className="flex items-center gap-2 px-4 py-2 
                                           text-xs font-bold 
                                           text-[var(--text)] 
                                           bg-[var(--surface-2)] 
                                           border border-[var(--border)] 
                                           rounded-xl 
                                           transition-transform duration-150
                                           active:scale-[0.98]"
                            >
                                <CommandLineIcon className="w-4 h-4" />
                                JSON
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScenariosGrid;
