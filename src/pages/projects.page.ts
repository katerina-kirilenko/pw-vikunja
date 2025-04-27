import { Page, Locator } from "@playwright/test";
import { step } from "allure-js-commons";

export class ProjectsPage {
  private page: Page;
  private projectsLink: Locator;
  private newProjectBtn: Locator;
  private projectTitle: (title: string) => Locator;
  private projectTitleInput: Locator;
  private addProjectBtn: Locator;
  private projectTitleMenuBtn: Locator;
  private projectDeleteLink: Locator;
  private confirmDeleteBtn: Locator;
  private actionSuccessPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectsLink = page.getByRole("link", { name: "Projects" });
    this.newProjectBtn = page.locator("a.base-button.button", {
      hasText: "New project",
    });
    this.projectTitleInput = page.getByRole("textbox", {
      name: "The project's title goes here…",
    });
    this.addProjectBtn = page.getByRole("button", {
      name: "Create",
    });
    this.projectTitle = (title: string) => page.getByLabel(title);
    this.projectTitleMenuBtn = page.locator(".project-title-button");
    this.projectDeleteLink = page.getByRole("link", { name: "Delete" });
    this.confirmDeleteBtn = page.getByRole("button", {
      name: "Do it!",
    });
    this.actionSuccessPopup = page.locator(".vue-notification-template");
  }

  async createProject(title: string): Promise<void> {
    await step("Создать проект", async () => {
      await this.projectsLink.click();
      await this.newProjectBtn.click();
      await this.projectTitleInput.fill(title);
      await this.addProjectBtn.click();
      await this.isActionDone("создать проект");
    });
  }

  async deleteProject(title: string): Promise<void> {
    await step("Удалить проект", async () => {
      await this.createProject(title);

      await this.projectTitleMenuBtn.click();
      await this.projectDeleteLink.click();
      await this.confirmDeleteBtn.click();
      await this.isActionDone("удалить проект");
    });
  }

  async isProjectExists(title: string): Promise<boolean> {
    return await step("Проверить существует ли проект", async () => {
      await this.projectsLink.click();
      return await this.projectTitle(title).isVisible();
    });
  }

  async isActionDone(action?: string): Promise<boolean> {
    return await step(`Действие '${action}' выполнено успешно`, async () => {
      return await this.actionSuccessPopup.isVisible();
    });
  }
}
