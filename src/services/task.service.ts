import { axiosBase } from "@helpers";
import { APIs, ITask } from "@types";

export class TaskService {
  /** Возвращает все задачи по любому проекту, к которому у пользователя есть доступ */
  public async getAll(): Promise<ITask[]> {
    const response = await axiosBase.get(APIs.task.getAll);
    return response.data;
  }

  /** Возвращает одну задачу по ее идентификатору */
  public async getById(taskId: number): Promise<ITask> {
    const response = await axiosBase.get(APIs.task.getById(taskId));
    return response.data;
  }

  /** Создает задачу в конкретном проекте */
  public async create(projectId: number, data: Partial<ITask>): Promise<ITask> {
    const response = await axiosBase.put(APIs.task.create(projectId), data);
    return response.data;
  }

  /** Обновляет задачу. Это включает в себя отметку ее как выполненной. */
  public async update(taskId: number, data: Partial<ITask>): Promise<ITask> {
    const response = await axiosBase.post(APIs.task.update(taskId), data);
    return response.data;
  }

  /** Удаляет задачу из проекта. Это не означает "отметить как выполненное" */
  public async delete(taskId: number): Promise<any> {
    const response = await axiosBase.delete(APIs.task.delete(taskId));
    return response.data;
  }
}
