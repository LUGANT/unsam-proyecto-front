import { AxiosResponse } from "axios";
import ApiService from "..";
import { Actividad } from "../../types/Activity";

class ActivityService extends ApiService {
  async all(): Promise<Actividad[]> {
    return this.handleRequest<Actividad[]>(async () => {
      const response: AxiosResponse<Actividad[]> = await this.api.get("/all");
      return response.data;
    });
  }
  async getById(activityId: string): Promise<Actividad> {
    return this.handleRequest<Actividad>(async () => {
      const response: AxiosResponse<Actividad> = await this.api.get(
        `/${activityId}`
      );
      return response.data;
    });
  }
}

export default new ActivityService("/actividad");
