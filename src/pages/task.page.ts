import { Locator, Page } from "@playwright/test";
import { step } from "allure-js-commons";

export class TaskPage {
  private page: Page;
  public taskTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskTitle = this.page.locator("h1.title.input");
  }

  async editTaskTitle(newTitle: string): Promise<void> {
    await step("Редактировать заголовок задачи", async () => {
      await this.taskTitle.click();
      await this.taskTitle.fill(newTitle);
      await this.taskTitle.press("Enter");
    });
  }
}
