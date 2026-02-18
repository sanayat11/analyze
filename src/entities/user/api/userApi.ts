import { MockApi, delay } from '@/shared/api/base';
import { MOCK_USERS } from '@/shared/mocks/users.mock';
import { AppUser } from '../model/types';

class UserApi extends MockApi<AppUser> {
    constructor() {
        super(MOCK_USERS);
    }

    async getMe(): Promise<AppUser> {
        await delay(500);
        return {
            id: '1',
            username: 'admin',
            role: 'Админ',
            active: true
        };
    }
}

export const userApi = new UserApi();
