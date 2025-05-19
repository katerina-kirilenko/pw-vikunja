import { expect } from "@playwright/test";
import { generateTitle } from "@helpers";
import { appTest as test } from "@fixtures";

test.describe("UI tests", () => {
  test("Пользователь может добавить задачу на доску", async ({
    overviewPage,
  }) => {
    const taskTitle = generateTitle();
    await overviewPage.addTask(taskTitle);

    await expect(overviewPage.taskTitleLink(taskTitle)).toBeVisible();
  });

  test("Пользователь может завершить задачу кликнув чекбокс", async ({
    overviewPage,
  }) => {
    await overviewPage.finishTask();
    const countTaskDone = await overviewPage.getFinishedTasks();

    expect(countTaskDone).toBeGreaterThan(0);
  });

  test("Пользователь может изменить заголовок задачи", async ({
    overviewPage,
    taskPage,
  }) => {
    const taskTitle = generateTitle();
    await overviewPage.addTask(taskTitle);
    await expect(overviewPage.taskTitleLink(taskTitle)).toBeVisible();

    const newTaskTitle = generateTitle();
    await overviewPage.taskTitleLink(taskTitle).click();
    await taskPage.editTaskTitle(newTaskTitle);

    await expect(taskPage.taskTitle).toContainText(newTaskTitle);
  });

  test("Пользователь может создать новый проект", async ({ projectsPage }) => {
    const projectTitle = generateTitle();
    await projectsPage.createProject(projectTitle);

    expect(await projectsPage.isProjectExists(projectTitle)).toBeTruthy();
  });

  test("Пользователь может удалить проект", async ({ projectsPage }) => {
    const projectTitle = generateTitle();
    await projectsPage.deleteProject(projectTitle);

    expect(await projectsPage.isProjectExists(projectTitle)).toBeFalsy();
  });
});
