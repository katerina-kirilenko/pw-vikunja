import { axiosBase } from "@helpers";
import { APIs, IProject, ITask } from "@types";

export class ProjectService {
  /** Создание нового проекта */
  public async create(data: Partial<ITask>): Promise<IProject> {
    const response = await axiosBase.put(APIs.project.create, data);
    return response.data;
  }
}
