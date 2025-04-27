import { Page, Locator } from "@playwright/test";
import { step } from "allure-js-commons";

export class OverviewPage {
  private page: Page;
  public tasksListTitle: Locator;
  public taskTitleInput: Locator;
  public addTaskBtn: Locator;
  public taskTitleLink: (title: string) => Locator;
  public taskCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tasksListTitle = this.page.getByRole("heading", {
      name: "Current Tasks",
    });
    this.taskTitleInput = this.page.getByRole("textbox", {
      name: "Add a task…",
    });
    this.addTaskBtn = this.page.getByRole("button", {
      name: "Add",
      exact: true,
    });
    this.taskTitleLink = (title: string) =>
      this.page.getByRole("link", { name: title });
    this.taskCheckbox = page.locator("label.base-checkbox__label");
  }

  async addTask(taskTitle: string): Promise<void> {
    await step("Добавить задачу", async () => {
      await this.taskTitleInput.fill(taskTitle);
      await this.addTaskBtn.click();
    });
  }

  async finishTask(): Promise<void> {
    return await step("Отметить задачу как Done", async () => {
      await this.taskCheckbox.first().click();
    });
  }

  async getFinishedTasks(): Promise<number> {
    return await step("Получить кол-во завершенных задач", async () => {
      return this.page.locator("div.tasktext.done").count();
    });
  }
}
