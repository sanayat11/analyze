import React from 'react';
import {
    BellIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';

interface SettingsGridProps {
    notificationsEnabled: boolean;
    onToggleNotifications: () => void;
}

const SettingsGrid: React.FC<SettingsGridProps> = ({ notificationsEnabled, onToggleNotifications }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notifications */}
            <section className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                        <BellIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text)]">Уведомления</h2>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[var(--text)]">Email уведомления</span>
                        <div
                            onClick={onToggleNotifications}
                            className={`w-12 h-6 rounded-full cursor-pointer transition-colors p-1 flex items-center ${notificationsEnabled ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between opacity-50 pointer-events-none">
                        <span className="text-sm font-medium text-[var(--text)]">Telegram уведомления</span>
                        <div className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 p-1 flex items-center">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Security */}
            <section className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                        <KeyIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-[var(--text)]">Безопасность</h2>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                    <button className="w-full text-left px-4 py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-between group">
                        Сменить пароль
                        <KeyIcon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text)]" />
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors flex items-center justify-between group">
                        Двухфакторная аутентификация
                        <span className="text-xs font-bold text-[var(--text-muted)] bg-[var(--surface-2)] px-2 py-1 rounded-md">Скоро</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SettingsGrid;
