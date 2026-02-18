import { MockApi } from '@/shared/api/base';
import { MOCK_CLIENTS } from '@/shared/mocks/clients.mock';
import { Client } from '../model/types';

class ClientApi extends MockApi<Client> {
    constructor() {
        super(MOCK_CLIENTS);
    }
}

export const clientApi = new ClientApi();
