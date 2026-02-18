import { Notification } from '@/entities/notification/model/types';

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', type: 'info', title: 'Обновление системы', message: 'Система была обновлена до версии 2.0', isRead: false, createdAt: '2026-02-17T10:00:00' },
    { id: '2', type: 'warning', title: 'Лимит API', message: 'Вы приближаетесь к лимиту запросов', isRead: true, createdAt: '2026-02-16T15:30:00' },
    { id: '3', type: 'success', title: 'Отчет готов', message: 'Ежемесячный отчет сформирован', isRead: false, createdAt: '2026-02-17T09:15:00' },
];
