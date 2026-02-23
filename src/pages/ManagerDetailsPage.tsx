import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeftIcon,
    PhoneIcon,
    ChartBarIcon,
    IdentificationIcon,
    UserCircleIcon,
    TrophyIcon,
    ChartPieIcon,
    ExclamationTriangleIcon,
    BoltIcon,
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

    const kpiData = [
        { label: 'Выполнение плана продаж', value: 85, color: 'bg-emerald-500' },
        { label: 'Конверсия звонков пула', value: 64, color: 'bg-blue-500' },
        { label: 'Соблюдение скрипта', value: 92, color: 'bg-purple-500' }
    ];

    const improvements = [
        { name: 'Чистота речи', score: 6.5, comment: 'Слова-паразиты ("как бы", "ну")' },
        { name: 'Знание продукта', score: 7.0, comment: 'Платает в тарифах премиум-сегмента' },
        { name: 'Обработка возражений', score: 5.5, comment: 'Теряется при возражении "Дорого"' },
        { name: 'Приветствие', score: 9.5, comment: 'Замечаний нет' },
    ];

    return (
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors w-fit group"
            >
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Назад к списку
            </button>

            <div className="space-y-6">

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

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content (Left 2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* KPI Widget */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <ChartPieIcon className="w-5 h-5 text-emerald-500" />
                                <h2 className="text-lg font-bold text-[var(--text)]">Выполнение KPI</h2>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {kpiData.map((kpi, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-[var(--text)]">{kpi.label}</span>
                                        <span className="text-sm font-bold text-[var(--text-muted)]">{kpi.value}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                                        <div className={`h-full ${kpi.color} rounded-full`} style={{ width: `${kpi.value}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Areas for Improvement */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
                                <h2 className="text-lg font-bold text-[var(--text)]">Области для улучшения</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {improvements.map((imp, i) => (
                                <div key={i} className="bg-[var(--surface-2)]/30 p-4 border border-[var(--border)] rounded-[16px] flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-[var(--text)]">{imp.name}</span>
                                            <span className={`text-sm font-bold ${getScoreColorClass(imp.score)}`}>{imp.score}/10</span>
                                        </div>
                                        <div className="w-full h-1 bg-[var(--surface-2)] rounded-full overflow-hidden mb-3">
                                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${imp.score * 10}%` }}></div>
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-[var(--text-muted)] mt-auto leading-relaxed">{imp.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call History */}
                    <div className="space-y-4 pt-4 border-t border-[var(--border)]">
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
                                    <div key={call.id} onClick={() => navigate(`/call/${call.id}`)} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-2)]/50 transition-all group cursor-pointer">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getStatusColor(call.status)}`}>
                                                    {getStatusText(call.status)}
                                                </span>
                                                <span className="text-sm font-medium text-[var(--text-muted)] tabular-nums">{call.date}</span>
                                            </div>
                                            <div className={`text-lg font-bold ${getScoreColorClass(call.score)}`}>
                                                {call.score?.toFixed(1) || '-'}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-[var(--text)] mb-1">{call.scenario}</div>
                                                <div className="text-sm font-medium text-[var(--text-muted)]">Клиент: {call.client} • {call.duration}</div>
                                            </div>

                                            <button className="px-4 py-2 text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 hover:bg-[var(--primary)] hover:text-white rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                Детали
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar (Right 1/3) */}
                <div className="space-y-6">
                    {/* General Stats summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[var(--surface)] p-5 rounded-[20px] border border-[var(--border)] shadow-sm">
                            <PhoneIcon className="w-5 h-5 text-[var(--text-muted)] mb-2" />
                            <div className="text-2xl font-bold text-[var(--text)]">{manager.callsCount}</div>
                            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1">Звонков</div>
                        </div>
                        <div className="bg-[var(--surface)] p-5 rounded-[20px] border border-[var(--border)] shadow-sm">
                            <ChartBarIcon className="w-5 h-5 text-[var(--text-muted)] mb-2" />
                            <div className={`text-2xl font-bold ${getScoreColorClass(manager.avgScore)}`}>{manager.avgScore?.toFixed(1) || '-'}</div>
                            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1">Сред. оценка</div>
                        </div>
                    </div>

                    {/* Rating among managers */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                            <TrophyIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">Рейтинг МОПов</div>
                            <div className="text-xl font-bold text-[var(--text)]">2 место <span className="text-sm font-medium text-[var(--text-muted)]">из 15</span></div>
                        </div>
                    </div>

                    {/* Workload */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                            <BoltIcon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">Загруженность</div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-xl font-bold text-[var(--text)]">85%</div>
                                <div className="text-[10px] font-bold text-red-500 uppercase">Высокая</div>
                            </div>
                            <div className="w-full h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full" style={{ width: `85%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Add Info Card */}
                    <div className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm">
                        <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-6">Дополнительно</div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[var(--text-muted)]">Активность</span>
                                <span className="chip chip-green">АКТИВЕН</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-[var(--text-muted)]">ID</span>
                                <span className="text-sm font-bold text-[var(--text)]">{manager.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
