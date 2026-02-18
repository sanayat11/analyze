import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    PhoneIcon,
    ChartBarIcon,
    CalendarIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { clientApi } from '@/entities/client/api/clientApi';
import { callApi } from '@/entities/call/api/callApi';
import { formatName } from '@/shared/lib/utils/formatName';

export const ClientDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: client, isLoading: isClientLoading } = useQuery({
        queryKey: ['client', id],
        queryFn: () => clientApi.getById(id!),
        enabled: !!id
    });

    const { data: callsData, isLoading: isCallsLoading } = useQuery({
        queryKey: ['calls', 'client', client?.name],
        queryFn: () => callApi.getAll({ filters: { client: client?.name } }),
        enabled: !!client?.name
    });

    const calls = useMemo(() => callsData?.data || [], [callsData]);

    const lastCall = useMemo(() => {
        if (!calls.length) return null;
        // Assuming calls are sorted by date desc, or we sort them here
        return [...calls].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    }, [calls]);

    const getScoreColorClass = (score: number | null) => {
        if (score === null) return 'text-[var(--text-muted)]';
        if (score >= 8.0) return 'text-green-500';
        if (score >= 6.0) return 'text-amber-500';
        return 'text-red-500';
    };

    const getScoreBadgeClass = (score: number | null) => {
        if (score === null) return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
        if (score >= 8.0) return 'score-good';
        if (score >= 6.0) return 'score-neutral';
        return 'score-bad';
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'completed': return 'chip-green';
            case 'transcription_error': return 'chip-red';
            case 'pending': return 'chip-amber';
            default: return 'chip-blue';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'АНАЛИЗ ЗАВЕРШЁН';
            case 'transcription_error': return 'ОШИБКА';
            case 'pending': return 'В ОБРАБОТКЕ';
            default: return status.toUpperCase();
        }
    };

    if (isClientLoading) {
        return <div className="p-8 text-[var(--text-muted)]">Загрузка клиента...</div>;
    }

    if (!client) {
        return <div className="p-8 text-red-500">Клиент не найден</div>;
    }

    return (
        <main className="flex-1 p-8 space-y-8 overflow-y-auto w-full">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-[var(--text)]">
                            Клиент #{client.id}
                        </h1>
                        <span className={`chip ${client.funnel === 'warm' ? 'chip-amber' : 'chip-blue'}`}>
                            {client.funnel === 'warm' ? 'Теплый' : 'Холодный'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-xs font-bold text-[var(--text)] bg-[var(--surface-2)] hover:bg-[var(--border)] rounded-lg transition-colors">
                            Bitrix ID
                        </button>
                        <button className="px-4 py-2 text-xs font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors shadow-lg shadow-purple-500/20">
                            Подробнее
                        </button>
                    </div>
                </div>
                <div className="text-sm text-[var(--text-muted)] font-medium">
                    Создан: {client.createdAt}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-[var(--primary)]">
                            <PhoneIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">Всего звонков</span>
                    </div>
                    <div className="text-4xl font-bold text-[var(--text)]">{client.callsCount}</div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-emerald-500">
                            <ChartBarIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">Средняя оценка</span>
                    </div>
                    <div className="text-4xl font-bold text-[var(--text)]">{client.avgScore?.toFixed(1) || '-'}</div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-purple-500">
                            <CalendarIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">Последний звонок</span>
                    </div>
                    <div className="text-xl font-bold text-[var(--text)]">
                        {lastCall ? lastCall.date.split(' ')[0] : '-'}
                    </div>
                    <div className="text-sm font-medium text-[var(--text-muted)] mt-1">
                        {lastCall ? lastCall.date.split(' ')[1] : ''}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content: Call History */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden min-h-[400px]">
                        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--surface-2)]">
                            <h2 className="text-lg font-bold text-[var(--text)]">История звонков</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                                        <th className="px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">ID</th>
                                        <th className="px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Статус</th>
                                        <th className="px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] text-center">Оценка</th>
                                        <th className="px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] text-right">Дата</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {isCallsLoading ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-8 text-center text-[var(--text-muted)]">Загрузка...</td>
                                        </tr>
                                    ) : calls.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-8 text-center text-[var(--text-muted)]">Нет звонков</td>
                                        </tr>
                                    ) : (
                                        calls.map((call) => (
                                            <tr key={call.id} className="hover:bg-[var(--row-hover)] transition-colors group cursor-pointer">
                                                <td className="px-8 py-5 text-sm font-bold text-[var(--text-muted)] tabular-nums">#{call.id}</td>
                                                <td className="px-8 py-5">
                                                    <span className={`chip ${getStatusBadgeClass(call.status)}`}>
                                                        {getStatusLabel(call.status)}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    {call.score !== null ? (
                                                        <span className={`score ${getScoreBadgeClass(call.score)}`}>
                                                            {call.score.toFixed(1)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[var(--text-muted)] font-bold">—</span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-xs font-bold text-[var(--text)] tabular-nums">{call.date.split(' ')[0]}</span>
                                                        <span className="text-[10px] text-[var(--text-muted)] font-medium tabular-nums">{call.date.split(' ')[1]}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Client Info Card */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <UserIcon className="w-5 h-5 text-emerald-500" />
                            <h3 className="text-sm font-bold text-[var(--text)]">Информация о клиенте</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ФИО</div>
                                <div className="text-sm font-bold text-[var(--text)]">{formatName(client.name)}</div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">ИНН</div>
                                <div className="text-sm font-bold text-[var(--text)] font-mono">{client.inn}</div>
                            </div>

                            <div>
                                <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-2">Bitrix ID</div>
                                <div className="bg-[var(--surface-2)] p-2 rounded-lg text-xs font-mono text-[var(--text-muted)] border border-[var(--border)] break-all">
                                    {client.externalId}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Card */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                        <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-6">Дополнительно</div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[var(--text-muted)]">Активность</span>
                                <span className="chip chip-green">АКТИВЕН</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[var(--text-muted)]">Заметок</span>
                                <span className="text-sm font-bold text-[var(--text)]">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

