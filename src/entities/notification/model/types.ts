export interface Notification {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}
