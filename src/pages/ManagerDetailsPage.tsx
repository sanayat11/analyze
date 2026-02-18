import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeftIcon,
    PhoneIcon,
    ChartBarIcon,
    IdentificationIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { mopApi } from '@/entities/mop/api/mopApi';
import { callApi } from '@/entities/call/api/callApi';

export const ManagerDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: manager, isLoading: isManagerLoading } = useQuery({
        queryKey: ['mop', id],
        queryFn: () => mopApi.getById(id!),
        enabled: !!id
    });

    const { data: callsData, isLoading: isCallsLoading } = useQuery({
        queryKey: ['calls', 'manager', manager?.name],
        queryFn: () => callApi.getAll({ filters: { manager: manager?.name } }),
        enabled: !!manager?.name
    });

    if (isManagerLoading) {
        return <div className="p-8 text-[var(--text-muted)]">Загрузка данных менеджера...</div>;
    }

    if (!manager) {
        return <div className="p-8 text-red-500">Менеджер не найден</div>;
    }

    const calls = callsData?.data || [];

    const getScoreColorClass = (score: number | null) => {
        if (score === null) return 'text-[var(--text-muted)]';
        if (score >= 8.0) return 'text-green-500';
        if (score >= 6.0) return 'text-amber-500';
        return 'text-red-500';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
            case 'transcription_error': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
            case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Успешно';
            case 'transcription_error': return 'Ошибка';
            case 'pending': return 'В обработке';
            default: return status;
        }
    };

    return (
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
            <div className="space-y-6">
                <button
                    onClick={() => navigate('/managers')}
                    className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:translate-x-[-4px] transition-all"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Назад к списку
                </button>

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#7C3AED] flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/30">
                            {manager.avatarLetter}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">{manager.name}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400`}>
                                    {manager.role}
                                </span>
                                <span className="text-sm text-[var(--text-muted)]">ID: {manager.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <PhoneIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Всего звонков</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--text)]">{manager.callsCount}</div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <ChartBarIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Средняя оценка</span>
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColorClass(manager.avgScore)}`}>
                        {manager.avgScore?.toFixed(1) || '-'}
                    </div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <IdentificationIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Статус</span>
                    </div>
                    <div className="text-lg font-bold text-[var(--text)]">Активен</div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[var(--text)]">История звонков</h2>
                </div>

                {isCallsLoading ? (
                    <div className="p-8 text-center text-[var(--text-muted)]">Загрузка звонков...</div>
                ) : calls.length === 0 ? (
                    <div className="p-12 text-center bg-[var(--surface)] rounded-[20px] border border-[var(--border)] text-[var(--text-muted)]">
                        История звонков пуста
                    </div>
                ) : (
                    <div className="space-y-4">
                        {calls.map(call => (
                            <div key={call.id} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getStatusColor(call.status)}`}>
                                            {getStatusText(call.status)}
                                        </span>
                                        <span className="text-sm font-medium text-[var(--text-muted)]">{call.date}</span>
                                    </div>
                                    <div className={`text-lg font-bold ${getScoreColorClass(call.score)}`}>
                                        {call.score?.toFixed(1) || '-'}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-[var(--text)] mb-1">{call.scenario}</div>
                                        <div className="text-sm text-[var(--text-muted)]">Клиент: {call.client} • {call.duration}</div>
                                    </div>

                                    <button className="px-4 py-2 text-xs font-bold text-[var(--primary)] bg-purple-50 dark:bg-purple-500/10 hover:bg-[var(--primary)] hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                        Детали
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};
