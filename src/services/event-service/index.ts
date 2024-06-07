import { AxiosResponse } from "axios";
import ApiService from "..";
import { Evento, Solicitud } from "../../types/Event";

class EventService extends ApiService {
  async all(): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get("/all");
      return response.data;
    });
  }
  async getRequests(eventId: string): Promise<Solicitud[]> {
    console.log(eventId);

    return this.handleRequest<Solicitud[]>(async () => {
      const response: AxiosResponse<Solicitud[]> = await this.api.get(
        `/${eventId}/solicitudes`
      );
      return response.data;
    });
  }
  async getFromUser(userId: string): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        `/usuario/${userId}`
      );
      return response.data;
    });
  }
  async getSearchedEvents(searchParam: string): Promise<Evento[]>{
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        `?actividad=${searchParam}`
      )
      return response.data
    }
      
    )}
    
  async getById(eventId: string): Promise<Evento>{
    return this.handleRequest<Evento>(async () => {
      const response: AxiosResponse<Evento> = await this.api.get(`/${eventId}`);
      return response.data;
    });
  }
}

export default new EventService("/evento");
