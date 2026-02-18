import { MockApi, delay } from '@/shared/api/base';
import { MOCK_NOTIFICATIONS } from '@/shared/mocks/notifications.mock';
import { Notification } from '../model/types';

class NotificationApi extends MockApi<Notification> {
    constructor() {
        super(MOCK_NOTIFICATIONS);
    }

    async markAsRead(id: string): Promise<void> {
        await delay(300);
        console.log(`Marked notification ${id} as read`);
    }
}

export const notificationApi = new NotificationApi();
