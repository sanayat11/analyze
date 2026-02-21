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
    },
    {
        id: '4',
        duration: '01:45',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 2',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 9.0,
        date: '15.01.2026 10:30'
    },
    {
        id: '5',
        duration: '03:12',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 1',
        scenario: 'Ипотека',
        status: 'completed',
        score: 7.2,
        date: '18.01.2026 11:45'
    },
    {
        id: '6',
        duration: '00:50',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 10.0,
        date: '20.01.2026 15:20'
    },
    {
        id: '7',
        duration: '04:20',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'pending',
        score: null,
        date: '21.01.2026 09:10'
    },
    {
        id: '8',
        duration: '02:10',
        client: 'ИВАНОВ Иван Иванович',
        manager: 'Менеджер 1',
        scenario: 'Аренда',
        status: 'completed',
        score: 8.0,
        date: '24.01.2026 12:00'
    },
    {
        id: '9',
        duration: '03:45',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 2',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 9.5,
        date: '10.01.2026 14:15'
    },
    {
        id: '10',
        duration: '02:20',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 1',
        scenario: 'Ипотека',
        status: 'completed',
        score: 8.8,
        date: '12.01.2026 16:40'
    },
    {
        id: '11',
        duration: '05:10',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 1',
        scenario: 'Аренда',
        status: 'completed',
        score: 9.2,
        date: '14.01.2026 09:30'
    },
    {
        id: '12',
        duration: '01:30',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 2',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 9.0,
        date: '15.01.2026 11:20'
    },
    {
        id: '13',
        duration: '04:00',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 1',
        scenario: 'Ипотека',
        status: 'completed',
        score: 9.4,
        date: '17.01.2026 13:50'
    },
    {
        id: '14',
        duration: '02:45',
        client: 'ИВАНОВ Иван Иванович',
        manager: 'Менеджер 2',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 7.0,
        date: '05.01.2026 09:00'
    },
    {
        id: '15',
        duration: '03:20',
        client: 'ИВАНОВ Иван Иванович',
        manager: 'Менеджер 1',
        scenario: 'Ипотека',
        status: 'completed',
        score: 8.2,
        date: '08.01.2026 11:30'
    },
    {
        id: '16',
        duration: '01:10',
        client: 'ИВАНОВ Иван Иванович',
        manager: 'Менеджер 2',
        scenario: 'Аренда',
        status: 'completed',
        score: 6.5,
        date: '12.01.2026 14:15'
    },
    {
        id: '17',
        duration: '04:15',
        client: 'ИВАНОВ Иван Иванович',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 8.8,
        date: '15.01.2026 10:20'
    },
    {
        id: '18',
        duration: '02:30',
        client: 'ПЕТРОВ Петр Петрович',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'completed',
        score: 3.5,
        date: '02.01.2026 16:00'
    },
    {
        id: '19',
        duration: '01:50',
        client: 'ПЕТРОВ Петр Петрович',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 4.2,
        date: '06.01.2026 12:45'
    },
    {
        id: '20',
        duration: '03:10',
        client: 'ПЕТРОВ Петр Петрович',
        manager: 'Менеджер 2',
        scenario: 'Аренда',
        status: 'completed',
        score: 5.0,
        date: '10.01.2026 11:10'
    },
    {
        id: '21',
        duration: '02:00',
        client: 'КУЗНЕЦОВА Анна Андреевна',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 8.5,
        date: '03.01.2026 14:30'
    },
    {
        id: '22',
        duration: '04:20',
        client: 'КУЗНЕЦОВА Анна Андреевна',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'completed',
        score: 7.8,
        date: '07.01.2026 09:15'
    },
    {
        id: '23',
        duration: '01:30',
        client: 'КУЗНЕЦОВА Анна Андреевна',
        manager: 'Менеджер 1',
        scenario: 'Аренда',
        status: 'completed',
        score: 9.2,
        date: '11.01.2026 16:20'
    },
    {
        id: '24',
        duration: '03:40',
        client: 'КУЗНЕЦОВА Анна Андреевна',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 8.0,
        date: '14.01.2026 10:50'
    },
    {
        id: '25',
        duration: '02:15',
        client: 'КУЗНЕЦОВА Анна Андреевна',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'completed',
        score: 8.4,
        date: '18.01.2026 13:40'
    },
    {
        id: '26',
        duration: '01:45',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 1',
        scenario: 'Продажа квартиры',
        status: 'completed',
        score: 9.8,
        date: '20.01.2026 11:00'
    },
    {
        id: '27',
        duration: '03:30',
        client: 'СИДОРОВ Сидор Сидорович',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'completed',
        score: 8.5,
        date: '22.01.2026 15:30'
    },
    {
        id: '28',
        duration: '02:10',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 1',
        scenario: 'Аренда',
        status: 'completed',
        score: 8.0,
        date: '24.01.2026 14:20'
    },
    {
        id: '29',
        duration: '01:20',
        client: 'АКМАНОВ Денис Андреевич',
        manager: 'Менеджер 2',
        scenario: 'Ипотека',
        status: 'completed',
        score: 9.2,
        date: '25.01.2026 12:10'
    }
];
