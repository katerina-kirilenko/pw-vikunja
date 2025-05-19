import { expect } from "@playwright/test";
import { ITask, Messages } from "@types";
import { generateTitle } from "@helpers";
import { apiTest as test } from "@fixtures";

test.describe("API tests", async () => {
  test("Получить все задачи", async ({ taskService }) => {
    const data: ITask[] = await taskService.getAll();

    expect(data.length).toBeGreaterThanOrEqual(0);
  });

  test("Получить одну задачу", async ({ taskService, project }) => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const data: ITask = await taskService.getById(task.id);

    expect(data.title).toBe(task.title);
  });

  test("Создать задачу", async ({ taskService, project }) => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const data: ITask = await taskService.getById(task.id);

    expect(data.project_id).toEqual(task.project_id);
  });

  test("Обновить задачу", async ({ taskService, project }) => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const data: ITask = await taskService.getById(task.id);

    expect(data.done).toBeFalsy();

    await taskService.update(task.id, { done: true });
    const updatedTask = await taskService.getById(task.id);

    expect(updatedTask.done).toBeTruthy();
  });

  test("Удалить задачу", async ({ taskService, project }) => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const response = await taskService.delete(task.id);

    expect(response.message).toBe(Messages.successDelete);
  });
});
