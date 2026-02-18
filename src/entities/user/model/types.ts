export interface AppUser {
    id: string;
    username: string;
    role: 'Админ' | 'Пользователь';
    active: boolean;
}
