
export interface Users {
    superUser: string;
    pwd: string;
}
export interface Asana {
    crossFunctionalProject: string;
    toDo: string;
    draftProjectBrief: string;
    scheduleKickoffMeeting: string;
    shareTimelineWithTeammates: string;

    workRequests: string;

    newRequests: string;
    laptopSetup: string;

    inProgress: string;
    passwordVerified: string;

    completed: string;
    newkeycardforDaniela: string,

}
export interface EnvFixtures {
    // envName: string;
    // devopsUrl: string;
    users: Users;
    asana: Asana;
}
