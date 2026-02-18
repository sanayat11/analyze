import { CallRecord } from '@/entities/call/model/types';

export const MOCK_CALLS: CallRecord[] = [
    {
        id: '1',
        duration: '02:30',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 8.5,
        date: '22.01.2026 14:30',
        transcription: 'Добрый день, я по поводу квартиры...',
        analysisData: {
            summary: 'Клиент заинтересован, но дорого.',
            criteria: [
                { name: 'Приветствие', score: 10, comment: 'Все отлично' },
                { name: 'Выявление потребностей', score: 7, comment: 'Не уточнил бюджет' }
            ]
        }
    },
    {
        id: '2',
        duration: '05:00',
        client: 'ИВАНОВ Иван Иванович',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'pending',
        score: null,
        date: '23.01.2026 09:15'
    },
    {
        id: '3',
        duration: '01:15',
        client: 'ПЕТРОВ Петр Петрович',
        manager: 'Менеджер 1',
        scenario: 'Аренда',
        status: 'transcription_error',
        score: null,
        date: '23.01.2026 11:20'
    }
];
