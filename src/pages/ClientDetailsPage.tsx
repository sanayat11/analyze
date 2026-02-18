import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftIcon, PhoneIcon, ChartBarIcon, CalendarIcon, IdentificationIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { clientApi } from '@/entities/client/api/clientApi';
import { callApi } from '@/entities/call/api/callApi';


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

    if (isClientLoading) {
        return <div className="p-8 text-[var(--text-muted)]">Загрузка клиента...</div>;
    }

    if (!client) {
        return <div className="p-8 text-red-500">Клиент не найден</div>;
    }

    const calls = callsData?.data || [];

    const getScoreColorClass = (score: number | null) => {
        if (score === null) return 'text-gray-400';
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
                    onClick={() => navigate('/clients')}
                    className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:translate-x-[-4px] transition-all"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Назад к списку
                </button>

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/30">
                            {client.avatarLetter}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">{client.name}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${client.funnel === 'warm'
                                    ? 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                                    : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                    }`}>
                                    {client.funnel === 'warm' ? 'Теплый' : 'Холодный'}
                                </span>
                                <span className="text-sm text-[var(--text-muted)]">ID: {client.id}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <PhoneIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Всего звонков</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--text)]">{client.callsCount}</div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <ChartBarIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Средняя оценка</span>
                    </div>
                    <div className={`text-3xl font-bold ${getScoreColorClass(client.avgScore)}`}>
                        {client.avgScore?.toFixed(1) || '-'}
                    </div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <IdentificationIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">ИНН</span>
                    </div>
                    <div className="text-lg font-bold text-[var(--text)] font-mono">{client.inn || '-'}</div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <BuildingOfficeIcon className="w-5 h-5 text-[var(--text-muted)]" />
                        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Внешний ID (Bitrix)</span>
                    </div>
                    <div className="text-lg font-bold text-[var(--text)]">{client.externalId || '-'}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
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
                                            <div className="text-sm text-[var(--text-muted)]">{call.manager} • {call.duration}</div>
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

                <div className="space-y-6">
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                        <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-6">Информация</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-[var(--text-muted)] mb-1">Дата создания</div>
                                <div className="font-medium text-[var(--text)] flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-[var(--text-muted)]" />
                                    {client.createdAt}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

