import { AppUser } from '@/entities/user/model/types';

export const MOCK_USERS: AppUser[] = [
    { id: '1', username: 'admin@company.com', role: 'Админ', active: true },
    { id: '2', username: 'manager@company.com', role: 'Пользователь', active: true },
    { id: '3', username: 'blocked@company.com', role: 'Пользователь', active: false },
];
