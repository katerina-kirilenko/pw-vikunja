export const URLs = {
  ui: "https://try.vikunja.io/",
  api: "https://try.vikunja.io/api/v1",
};

export const APIs = {
  login: `${URLs.api}/login`,
  task: {
    getAll: `/tasks/all`,
    getById: (taskId: number) => `/tasks/${taskId}`,
    create: (projectId: number) => `/projects/${projectId}/tasks`,
    update: (taskId: number) => `/tasks/${taskId}`,
    delete: (taskId: number) => `/tasks/${taskId}`,
  },
  project: {
    create: "/projects",
  },
};
