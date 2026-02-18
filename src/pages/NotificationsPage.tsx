import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from '@/entities/notification/api/notificationApi';
import { CheckIcon } from '@heroicons/react/24/outline';
import NotificationsList from '@/widgets/notifications/ui/NotificationsList';

export const NotificationsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const { data: notificationsData, isLoading } = useQuery({
        queryKey: ['notifications'],
        queryFn: () => notificationApi.getAll()
    });

    const notifications = notificationsData?.data || [];

    const markReadMutation = useMutation({
        mutationFn: notificationApi.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });

    const markAllReadMutation = useMutation({
        mutationFn: async () => {
            await notificationApi.markAsRead('all');
            return;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        }
    });


    if (isLoading) return <div className="p-8">Загрузка...</div>;

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-[var(--text)]">Уведомления</h1>
                    <button
                        onClick={() => markAllReadMutation.mutate()}
                        className="text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-1.5"
                    >
                        <CheckIcon className="w-4 h-4" />
                        Отметить все как прочитанные
                    </button>
                </div>

                <NotificationsList
                    notifications={notifications}
                    onMarkAsRead={(id) => markReadMutation.mutate(id)}
                />
            </div>
        </main>
    );
};

