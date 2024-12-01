// import { test, expect, Locator, Page} from '@playwright/test';
import { Locator, Page, expect } from '@playwright/test';
import { Asana } from '../config/type';
import { asanaData as data } from './Asana/asanaTestData';
import { envFixtures as env } from '../config/qa.config';


export class BaseModel {
  protected readonly page: Page;
  readonly toDoColumn: Locator;
  readonly newRequestColumn: Locator;
  readonly inProgress: Locator;
  readonly completed: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toDoColumn = this.page.locator("div .CommentOnlyBoardColumn", { hasText: env.asana.toDo })
    this.newRequestColumn = this.page.locator("div .CommentOnlyBoardColumn", { hasText: env.asana.newRequests });
    this.inProgress = this.page.locator("div .CommentOnlyBoardColumn", { hasText: env.asana.inProgress });
    this.completed = this.page.locator("div .CommentOnlyBoardColumn", { hasText: env.asana.completed });
  }

public async loginAs(username: string) {
    await this.page.goto('https://app.asana.com/-/login');
    await this.page.locator('[type="email"]').fill(username);
    await this.page.locator('[role="button"]').getByText('Continue').last().click();
    await this.page.locator('[type="password"]').fill(env.users.pwd);
    await this.page.getByText('Log in').last().click();
}

/**
* Select tab like 'work request'
* @param projectName
*/
public async goToToProject(projectName: string) {
  await this.page.getByLabel(projectName).click();
}

/**
* Select tab like 'work request'
* @param project
*/
public async navigateToProject(project: keyof Asana) {

  switch (project) {
      case 'crossFunctionalProject':
          await this.page.getByLabel('Cross-functional project plan, Project').click();
          break;
      case 'workRequests':
        await this.page.getByLabel('Work Requests').click();
          break;
  }
}

/**
* Select tab like 'work request'
* @param columnName Pass in the locator
* @param tags This locator is used to find an element in a column
*/
public async validateColumns(columnName: string, tags: string[]) { 
      const toDoColumn = this.page.locator("div .CommentOnlyBoardColumn", { hasText: columnName })
      for (const text of tags) {
      await expect(toDoColumn.getByText(text)).toBeVisible();
      }
  }

/**
* Select tab like 'work request'
* @param columnName Pass in the locator
* @param tags This locator is used to find an element in a column
*/
public async verifyColumnsAndTags(columnName: string, tags: string,) {

    switch (columnName) {
        case 'toDo':
            switch (tags) {
              case 'draftProjectBrief':
                for (const text of [env.asana.draftProjectBrief,data.nonPriority]) {
                  await expect(this.toDoColumn.getByText(text)).toBeVisible();
                }
                  await this.verifyOnTrac(data.onTrack);
                  break;
              case 'scheduleKickoffMeeting':
                for (const text of [env.asana.scheduleKickoffMeeting,data.medium,data.atRisk]) {
                  await expect(this.toDoColumn.getByText(text)).toBeVisible();
                }
                  break;
              case 'shareTimelineWithTeammates':
                for (const text of [env.asana.shareTimelineWithTeammates,data.high, data.offTrack]) {
                  await expect(this.toDoColumn.getByText(text)).toBeVisible();
                }
            }
            break;
        case 'newRequests':
          switch (tags) {
            case 'laptopSetup':
              for (const text of [env.asana.laptopSetup,data.mediumPriority,data.lowEffort,data.newHardware,data.notStarted]) {
                await expect(this.newRequestColumn.getByText(text)).toBeVisible();
              }
          }
          break;
        case 'inProgress':
          switch (tags) {
              case 'passwordVerified':
                for (const text of [env.asana.passwordVerified,data.lowEffort, data.lowPriority, 
                    data.passwordReset, data.waiting]) {
                    await expect(this.inProgress.getByText(text)).toBeVisible();
                }  
            }
            break;
        case 'completed':
          switch (tags) {
              case 'newkeycardforDaniela':
                for (const text of [env.asana.newkeycardforDaniela,data.lowEffort,
                   data.newHardware, data.highPriority, data.done]) {
                  await expect(this.completed.getByText(text)).toBeVisible();
                }
            }
        break;
        
        
    }
  }
  

public async verifyOnTrac(tag: string){
        // Handle the 'On Trac' condition separately
        await expect(this.toDoColumn.getByText(tag).first()).toBeVisible()
  }
}