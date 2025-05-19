import { test as base } from "@playwright/test";
import { TaskService, ProjectService } from "@services";
import { IProject } from "@types";
import { generateTitle } from "@helpers";

type Api = {
  taskService: TaskService;
  projectService: ProjectService;
  project: IProject;
};

export const test = base.extend<Api>({
  taskService: async ({}, use) => {
    await use(new TaskService());
  },

  projectService: async ({}, use) => {
    await use(new ProjectService());
  },

  project: async ({ projectService }, use) => {
    const project = await projectService.create({ title: generateTitle() });
    await use(project);
  },
});
