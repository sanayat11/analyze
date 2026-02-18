
import { AnalyticsData } from '@/entities/analytics/model/types';

export const MOCK_ANALYTICS: AnalyticsData = {
    kpis: [
        {
            title: 'Всего токенов',
            value: 66836,
            change: 12.5,
            period: '24h',
            description: '51 987 prompt + 14 849 completion'
        },
        {
            title: 'Всего запросов',
            value: 17,
            change: -5.2,
            period: '24h',
            description: '3 932 токенов в среднем'
        },
        {
            title: 'Период',
            value: '24h',
            change: 0,
            period: '24h',
            description: '15.02.2026 - 16.02.2026'
        }
    ],
    chartData: {
        tokenUsage: [
            { date: '00:00', prompt: 4000, completion: 2400 },
            { date: '04:00', prompt: 3000, completion: 1398 },
            { date: '08:00', prompt: 2000, completion: 9800 },
            { date: '12:00', prompt: 2780, completion: 3908 },
            { date: '16:00', prompt: 1890, completion: 4800 },
            { date: '20:00', prompt: 2390, completion: 3800 },
        ],
        providerDistribution: [
            { name: 'timeweb', value: 400 },
            { name: 'openai', value: 300 },
            { name: 'anthropic', value: 300 },
            { name: 'google', value: 200 },
        ]
    },
    requests: [
        { id: '1', date: '16.02.2026, 16:55:00', provider: 'timeweb', model: 'gpt-5-mini', endpoint: 'gate', tokens: 1839, promptTokens: 1762, completionTokens: 77, cost: 0 },
        { id: '2', date: '16.02.2026, 16:54:01', provider: 'timeweb', model: 'gpt-5-mini', endpoint: 'gate', tokens: 2131, promptTokens: 2089, completionTokens: 42, cost: 0 },
        { id: '3', date: '16.02.2026, 16:50:57', provider: 'timeweb', model: 'gpt-5-mini', endpoint: 'gate', tokens: 2353, promptTokens: 2300, completionTokens: 53, cost: 0 },
        { id: '4', date: '16.02.2026, 16:45:45', provider: 'timeweb', model: 'gpt-5-mini', endpoint: 'analysis', tokens: 11022, promptTokens: 6345, completionTokens: 4677, cost: 0 },
        { id: '5', date: '16.02.2026, 16:44:49', provider: 'timeweb', model: 'gpt-5-mini', endpoint: 'gate', tokens: 2789, promptTokens: 2760, completionTokens: 29, cost: 0 },
    ],
    usageByModel: [
        { model: 'gpt-5-mini', provider: 'timeweb', tokens: 66836, promptTokens: 51987, completionTokens: 14849, requests: 17, averageTokens: 3932 }
    ],
    usageByEndpoint: [
        { endpoint: 'analysis', tokens: 36984, requests: 4, percentage: 55.3 },
        { endpoint: 'gate', tokens: 29852, requests: 13, percentage: 44.7 }
    ]
};
