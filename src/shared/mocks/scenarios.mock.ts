import { Scenario } from '@/entities/scenario/model/types';

export const MOCK_SCENARIOS: Scenario[] = [
    {
        id: '1',
        name: 'Продажа квартиры',
        internalName: 'sale_flat_v1',
        status: 'active',
        description: 'Сценарий для первичной продажи квартиры в новостройке',
        usages: 154,
        avgScore: 8.9,
        categories: ['Продажи', 'Недвижимость'],
        prompt: 'Ты - опытный риелтор...',
        updatedAt: '20.01.2026'
    },
    {
        id: '2',
        name: 'Аренда коммерческой',
        internalName: 'rent_commercial_v2',
        status: 'active',
        description: 'Скрипт для сдачи офисов',
        usages: 45,
        avgScore: 7.2,
        categories: ['Аренда', 'B2B'],
        prompt: 'Предложи клиенту офисное помещение...',
        updatedAt: '15.01.2026'
    },
    {
        id: '3',
        name: 'Работа с возражениями',
        internalName: 'objections_handling',
        status: 'inactive',
        description: 'Базовая отработка возражений "Дорого"',
        usages: 12,
        avgScore: 6.5,
        categories: ['Обучение'],
        prompt: 'Если клиент говорит дорого...',
        updatedAt: '10.12.2025'
    }
];
