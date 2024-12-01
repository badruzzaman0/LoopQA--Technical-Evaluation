// import { test, expect } from '@playwright/test';
import { test } from '../../playwright.config';
import {BaseModel} from '../BasePage.model';
import { asanaData } from './asanaTestData';
import type { Asana, Users } from '../../config/type';

const tests: [string, keyof Asana, keyof Asana, keyof Asana][] = [
    ['Test Case 1: Draft project brief column', 'crossFunctionalProject', 'toDo', 'draftProjectBrief'],
    ['Test Case 2: Schedule kickoff meeting column', 'crossFunctionalProject', 'toDo','scheduleKickoffMeeting'],
    ['Test Case 3: Share timeline with teammates', 'crossFunctionalProject', 'toDo', 'shareTimelineWithTeammates'],
    ['Test Case 4: Work Requests - Laptop', 'workRequests','newRequests','laptopSetup'],
    ['Test Case 5: Work Requests - Password', 'workRequests','inProgress','passwordVerified'],
    ['Test Case 6: Work Requests - New keycard', 'workRequests', 'completed', 'newkeycardforDaniela']
];

test.describe('Verify Asana Dashboard', () => {
    for (const [desc, project, columnName, tags] of tests) {
        test(desc, async ({ page, env }) => {
            const asanaDashboard = new BaseModel(page);

            await asanaDashboard.loginAs(env.users.superUser)
            await asanaDashboard.navigateToProject(project);
            await asanaDashboard.verifyColumnsAndTags(columnName, tags);
        });
    }
});