import { MockApi } from '@/shared/api/base';
import { MOCK_MOPS } from '@/shared/mocks/mops.mock';
import { Manager } from '../model/types';

class MopApi extends MockApi<Manager> {
    constructor() {
        super(MOCK_MOPS);
    }
}

export const mopApi = new MopApi();
