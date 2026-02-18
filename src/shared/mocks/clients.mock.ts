import { Client } from '@/entities/client/model/types';

export const MOCK_CLIENTS: Client[] = [
    { id: '172970', name: 'АКМАНОВ Денис Андреевич', externalId: '172970', inn: '344101135580', funnel: 'warm', callsCount: 0, avgScore: null, createdAt: '22.01.2026', avatarLetter: 'А' },
    { id: '172971', name: 'ИВАНОВ Иван Иванович', externalId: '172971', inn: '344101135581', funnel: 'cold', callsCount: 5, avgScore: 7.5, createdAt: '23.01.2026', avatarLetter: 'И' },
    { id: '172972', name: 'ПЕТРОВ Петр Петрович', externalId: '172972', inn: '344101135582', funnel: 'warm', callsCount: 2, avgScore: 4.0, createdAt: '24.01.2026', avatarLetter: 'П' },
    { id: '172973', name: 'СИДОРОВ Сидор Сидорович', externalId: '172973', inn: '344101135583', funnel: 'cold', callsCount: 10, avgScore: 9.2, createdAt: '25.01.2026', avatarLetter: 'С' },
    { id: '172974', name: 'КУЗНЕЦОВА Анна Андреевна', externalId: '172974', inn: '344101135584', funnel: 'warm', callsCount: 1, avgScore: 8.0, createdAt: '26.01.2026', avatarLetter: 'К' },
];
