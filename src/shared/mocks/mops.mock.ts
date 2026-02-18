import { Manager } from '@/entities/mop/model/types';

export const MOCK_MOPS: Manager[] = [
    { id: '1', name: 'Смирнов Алексей', role: 'Менеджер по продажам', callsCount: 120, avgScore: 8.7, avatarLetter: 'С' },
    { id: '2', name: 'Иванова Мария', role: 'Старший менеджер', callsCount: 250, avgScore: 9.1, avatarLetter: 'И' },
    { id: '3', name: 'Петров Дмитрий', role: 'Стажер', callsCount: 45, avgScore: 6.5, avatarLetter: 'П' },
];
