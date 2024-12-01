import { test } from '../../playwright.config';
import {BaseModel} from '../BasePage.model';
import { asanaData as data } from './asanaTestData';

test.describe('Cross-functional project plan, Project', () => {
    test.beforeEach(async ({ page, env }) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.loginAs(env.users.superUser)
        await asanaDashboard.goToToProject(env.asana.crossFunctionalProject); 
    });

    test('Test Case 1: Draft project brief column', async ({ page, env }) => {
        const asanaDashboard = new BaseModel(page,);

        await asanaDashboard.validateColumns(env.asana.toDo,[env.asana.draftProjectBrief,data.nonPriority])
        // Handle the 'On Track' condition separately
        await asanaDashboard.verifyOnTrac(data.onTrack);
    });

    test('Test Case 2: Schedule kickoff meeting column', async ({ page, env }) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.validateColumns(env.asana.toDo,['Schedule kickoff meeting','Medium','At risk'])
    });

    test('Test Case 3: Share timeline with teammates', async ({ page, env}) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.validateColumns(env.asana.toDo,['Share timeline with teammates','High','Off track'])
    });

});

test.describe.only('Work Requests', () => {
    test.beforeEach(async ({ page, env }) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.loginAs(env.users.superUser)
        await asanaDashboard.goToToProject(env.asana.workRequests); 
    });

    test('Test Case 4: Work Requests - Laptop', async ({ page, env}) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.validateColumns(env.asana.newRequests,[env.asana.laptopSetup,data.mediumPriority,data.lowEffort,data.newHardware,data.notStarted,])
    });


    test('Test Case 5: Work Requests - Password', async ({ page, env}) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.validateColumns(env.asana.inProgress,[env.asana.passwordVerified,data.lowEffort, data.lowPriority, 
            data.passwordReset, data.waiting])
    });

    test('Test Case 6: Work Requests - New keycard', async ({ page, env}) => {
        const asanaDashboard = new BaseModel(page);

        await asanaDashboard.validateColumns(env.asana.completed,[data.lowEffort, data.newHardware, data.highPriority, data.done])
    });
});