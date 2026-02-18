import React from 'react';
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    TrashIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { Notification } from '@/entities/notification/model/types';

interface NotificationsListProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onDelete?: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, onMarkAsRead, onDelete }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
            case 'error': return <ExclamationCircleIcon className="w-6 h-6 text-red-500" />;
            case 'warning': return <ExclamationCircleIcon className="w-6 h-6 text-amber-500" />;
            default: return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
        }
    };

    if (notifications.length === 0) {
        return (
            <div className="text-center py-20 bg-[var(--surface)] rounded-[20px] border border-[var(--border)]">
                <InformationCircleIcon className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
                <p className="text-[var(--text-muted)] font-medium">Нет новых уведомлений</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-6 rounded-2xl border transition-all hover:shadow-md flex gap-4 ${notification.isRead
                        ? 'bg-[var(--surface)] border-[var(--border)] opacity-70 hover:opacity-100'
                        : 'bg-[var(--surface)] border-[var(--primary)] shadow-sm'
                        }`}
                >
                    <div className="mt-1 shrink-0">
                        {getIcon(notification.type)}
                    </div>
                    <div className="flex items-center justify-between flex-1">
                        <div>
                            <div className="flex items-start justify-between mb-1">
                                <h3 className={`text-base font-bold ${notification.isRead ? 'text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                                    {notification.title}
                                </h3>
                                <span className="text-xs font-medium text-[var(--text-muted)] whitespace-nowrap ml-4">
                                    {notification.createdAt}
                                </span>
                            </div>
                            <p className={`text-sm ${notification.isRead ? 'text-[var(--text-muted)]' : 'text-[var(--text)]'} leading-relaxed`}>
                                {notification.message}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.isRead && (
                            <button
                                onClick={() => onMarkAsRead(notification.id)}
                                className="p-1.5 text-[var(--primary)] hover:bg-[var(--surface-2)] rounded-lg"
                                title="Отметить как прочитанное"
                            >
                                <CheckIcon className="w-4 h-4" />
                            </button>
                        )}
                        <button className="p-1.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--surface-2)] rounded-lg">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationsList;
