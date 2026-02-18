import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/entities/user/api/userApi';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import ProfileCard from '@/widgets/profile/ui/ProfileCard';
import SettingsGrid from '@/widgets/profile/ui/SettingsGrid';
import ConfirmModal from '@/features/confirm-action/ui/ConfirmModal';

export const ProfilePage: React.FC = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: () => userApi.getMe()
    });

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLogoutModalOpen(false);
        navigate('/404');
    };

    if (isLoading) return <div className="p-8">Загрузка...</div>;

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-[var(--text)]">Профиль пользователя</h1>

                <ProfileCard user={user} />

                <SettingsGrid
                    notificationsEnabled={notificationsEnabled}
                    onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
                />

                <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[20px] border border-red-100 dark:border-red-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-1">Выход из аккаунта</h3>
                            <p className="text-sm text-red-600/70 dark:text-red-400/70">Завершить сессию на этом устройстве</p>
                        </div>
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="px-6 py-2.5 bg-white dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all flex items-center gap-2 shadow-sm"
                        >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            Выйти
                        </button>
                    </div>
                </section>
            </div>

            <ConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
                title="Выход из аккаунта"
                message="Вы уверены, что хотите выйти? Вам придется войти снова, чтобы получить доступ к данным."
                confirmText="Да, выйти"
                isDangerous={true}
            />
        </main>
    );
};
