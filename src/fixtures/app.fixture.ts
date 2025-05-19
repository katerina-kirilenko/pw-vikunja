import { expect, test as base } from "@playwright/test";
import { LoginPage, OverviewPage, ProjectsPage, TaskPage } from "@pages";

type App = {
  loginPage: LoginPage;
  overviewPage: OverviewPage;
  projectsPage: ProjectsPage;
  taskPage: TaskPage;
};

export const test = base.extend<App>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  overviewPage: async ({ page, loginPage }, use) => {
    const overviewPage = new OverviewPage(page);
    await expect(overviewPage.tasksListTitle).toBeVisible();
    await use(overviewPage);
  },
  projectsPage: async ({ page, loginPage }, use) => {
    const projectsPage = new ProjectsPage(page);
    await use(projectsPage);
  },
  taskPage: async ({ page, loginPage }, use) => {
    const taskPage = new TaskPage(page);
    await use(taskPage);
  },
});
