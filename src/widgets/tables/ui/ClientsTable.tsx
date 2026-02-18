import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Client } from '@/entities/client/model/types';
import { useNavigate } from 'react-router-dom';

interface ClientsTableProps {
    clients: Client[];
    onDelete: (id: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, onDelete }) => {
    const navigate = useNavigate();

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
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20">
                                            {client.avatarLetter}
                                        </div>
                                        <div>
                                            <div
                                                onClick={() => navigate(`/clients/${client.id}`)}
                                                className="font-bold text-[var(--text)] cursor-pointer hover:text-[var(--primary)] transition-colors"
                                            >
                                                {client.name}
                                            </div>
                                            <div className="text-xs text-[var(--text-muted)] mt-0.5">{client.externalId}</div>
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
                                    <button
                                        onClick={() => onDelete(client.id)}
                                        className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors active:scale-90"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientsTable;
