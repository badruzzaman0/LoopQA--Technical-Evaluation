import * as qa from './qa.config';
import { test as base } from '@playwright/test';
import type { EnvFixtures } from './type';

interface CustomFixtures {
    env: EnvFixtures;
}
const getTest = (env = '') => {
    const envFixtures: EnvFixtures =
        {
            qa: qa.envFixtures,
        }[env] || qa.envFixtures;

    return base.extend<CustomFixtures>({
        env: envFixtures,
    });
};

export { CustomFixtures, getTest };