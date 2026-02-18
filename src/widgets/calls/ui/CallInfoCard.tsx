import React from 'react';
import { UserIcon, IdentificationIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { CallRecord } from '@/entities/call/model/types';

interface CallInfoCardProps {
    call: CallRecord;
}

const CallInfoCard: React.FC<CallInfoCardProps> = ({ call }) => {
    return (
        <section className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <UserIcon className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">Клиент</div>
                    <div className="text-sm font-bold text-[var(--text)]">{call.client}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">+7 (999) ...</div>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <IdentificationIcon className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">Менеджер</div>
                    <div className="text-sm font-bold text-[var(--text)]">{call.manager}</div>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[var(--text-muted)]">
                    <CalendarDaysIcon className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider mb-1">Сценарий</div>
                    <div className="text-sm font-bold text-[var(--text)]">{call.scenario}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">Длительность: {call.duration}</div>
                </div>
            </div>
        </section>
    );
};

export default CallInfoCard;
