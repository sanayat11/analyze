import { MOCK_ANALYTICS } from '@/shared/mocks/analytics.mock';
import { AnalyticsData } from '../model/types';
import { delay } from '@/shared/api/base';

class AnalyticsApi {
    async getAnalytics(): Promise<AnalyticsData> {
        await delay(500);
        return MOCK_ANALYTICS;
    }

    async export(format: 'csv' | 'pdf' | 'xlsx'): Promise<Blob> {
        await delay(1000);
        return new Blob(['mock data'], { type: 'text/plain' });
    }
}

export const analyticsApi = new AnalyticsApi();
