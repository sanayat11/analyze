import React from 'react';
import { Link } from 'react-router-dom';
import { IdentificationIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Manager } from '@/entities/mop/model/types';

interface ManagersGridProps {
    managers: Manager[];
    onDelete: (id: string) => void;
}

const ManagersGrid: React.FC<ManagersGridProps> = ({ managers, onDelete }) => {
    const getScoreColorClass = (score: number | null) => {
        if (score === null) return 'text-[var(--text-muted)]';
        if (score >= 8.0) return 'text-green-500 dark:text-green-400';
        if (score >= 6.0) return 'text-amber-500 dark:text-amber-400';
        return 'text-red-500 dark:text-red-400';
    };

    return (
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
                        <Link
                            to={`/managers/${manager.id}`}
                            className="px-4 py-2.5 bg-[#EFF6FF] dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[13px] font-bold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-95 flex items-center justify-center"
                        >
                            Подробнее
                        </Link>
                        <button
                            onClick={() => onDelete(manager.id)}
                            className="px-4 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[13px] font-bold rounded-xl border border-red-100 dark:border-red-900/20 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all active:scale-95"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManagersGrid;
