import { test, expect } from "@playwright/test";
import { TaskService, ProjectService } from "@services";
import { IProject, ITask, Messages } from "@types";
import { generateTitle } from "@helpers";

test.describe("API tests", async () => {
  const taskService = new TaskService();
  const projectService = new ProjectService();

  let project: IProject;

  test.beforeAll("Создать проект", async () => {
    project = await projectService.create({ title: generateTitle() });
  });

  test("Получить все задачи", async () => {
    const data: ITask[] = await taskService.getAll();

    expect(data.length).toBeGreaterThanOrEqual(0);
  });

  test("Получить одну задачу", async () => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const data: ITask = await taskService.getById(task.id);

    expect(data.title).toBe(task.title);
  });

  test("Создать задачу", async () => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const data: ITask = await taskService.getById(task.id);

    expect(data.project_id).toEqual(task.project_id);
  });

  test("Обновить задачу", async () => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const data: ITask = await taskService.getById(task.id);

    expect(data.done).toBeFalsy();

    await taskService.update(task.id, { done: true });
    const updatedTask = await taskService.getById(task.id);

    expect(updatedTask.done).toBeTruthy();
  });

  test("Удалить задачу", async () => {
    const task = await taskService.create(project.id, {
      title: generateTitle(),
    });
    const response = await taskService.delete(task.id);

    expect(response.message).toBe(Messages.successDelete);
  });
});
