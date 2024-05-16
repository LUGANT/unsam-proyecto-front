import { AxiosResponse } from "axios";
import ApiService from "..";

class EventService extends ApiService {
  async todas(): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        "/evento/all"
      );
      return response.data;
    });
  }
}

export default new EventService("/evento");
