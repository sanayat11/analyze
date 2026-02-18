import { MockApi } from '@/shared/api/base';
import { MOCK_CALLS } from '@/shared/mocks/calls.mock';
import { CallRecord } from '../model/types';

class CallApi extends MockApi<CallRecord> {
    constructor() {
        super(MOCK_CALLS);
    }
}

export const callApi = new CallApi();
