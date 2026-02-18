import { MockApi } from '@/shared/api/base';
import { MOCK_SCENARIOS } from '@/shared/mocks/scenarios.mock';
import { Scenario } from '../model/types';

class ScenarioApi extends MockApi<Scenario> {
    constructor() {
        super(MOCK_SCENARIOS);
    }
}

export const scenarioApi = new ScenarioApi();
