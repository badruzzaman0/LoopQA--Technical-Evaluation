
import type { PlaywrightTestConfig } from '@playwright/test';
import type { EnvFixtures } from './type';


const config: PlaywrightTestConfig<EnvFixtures> = {
    use: {
        baseURL: 'https://app.asana.com/-/login',
    },
};

const envFixtures: EnvFixtures = {
    users: {
        superUser: 'ben+pose@workwithloop.com',
        pwd: 'Password123'
    },
   
    asana: {
        crossFunctionalProject: 'Cross-functional project plan, Project',
        toDo: 'To do',
        draftProjectBrief: 'Draft project brief',
        scheduleKickoffMeeting: 'Schedule kickoff meeting',
        shareTimelineWithTeammates: 'Share timeline with teammates',

        workRequests: 'Work Requests',
        newRequests: 'New Requests',
        laptopSetup:'[Example] Laptop setup for new hire',
      
        inProgress: 'In Progress',
        passwordVerified: '[Example] Password not working',
        completed: 'Completed',
        newkeycardforDaniela: '[Example] New keycard for Daniela V',
    },
};

export { config, envFixtures };
