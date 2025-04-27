import { test, expect } from "@playwright/test";
import { LoginPage, OverviewPage, ProjectsPage, TaskPage } from "@pages";
import { generateTitle } from "@helpers";

test.describe("UI tests", () => {
  let overviewPage: OverviewPage;
  let loginPage: LoginPage;
  let projectsPage: ProjectsPage;
  let taskPage: TaskPage;

  test.beforeEach(async ({ page }) => {
    overviewPage = new OverviewPage(page);
    loginPage = new LoginPage(page);
    projectsPage = new ProjectsPage(page);
    taskPage = new TaskPage(page);

    await loginPage.goto();
    await expect(overviewPage.tasksListTitle).toBeVisible();
  });

  test("Пользователь может добавить задачу на доску", async () => {
    const taskTitle = generateTitle();
    await overviewPage.addTask(taskTitle);

    await expect(overviewPage.taskTitleLink(taskTitle)).toBeVisible();
  });

  test("Пользователь может завершить задачу кликнув чекбокс", async () => {
    await overviewPage.finishTask();
    const countTaskDone = await overviewPage.getFinishedTasks();

    expect(countTaskDone).toBeGreaterThan(0);
  });

  test("Пользователь может изменить заголовок задачи", async () => {
    const taskTitle = generateTitle();
    await overviewPage.addTask(taskTitle);
    await expect(overviewPage.taskTitleLink(taskTitle)).toBeVisible();

    const newTaskTitle = generateTitle();
    await overviewPage.taskTitleLink(taskTitle).click();
    await taskPage.editTaskTitle(newTaskTitle);

    await expect(taskPage.taskTitle).toContainText(newTaskTitle);
  });

  test("Пользователь может создать новый проект", async () => {
    const projectTitle = generateTitle();
    await projectsPage.createProject(projectTitle);

    expect(await projectsPage.isProjectExists(projectTitle)).toBeTruthy();
  });

  test("Пользователь может удалить проект", async () => {
    const projectTitle = generateTitle();
    await projectsPage.deleteProject(projectTitle);

    expect(await projectsPage.isProjectExists(projectTitle)).toBeFalsy();
  });
});
