import { AxiosResponse } from "axios";
import ApiService from "..";
import {
  Evento,
  EventoCreate,
  Participante,
  Solicitud,
} from "../../types/Event";

class EventService extends ApiService {
  async all(page:number,size:number): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(`/all?page=${page}&size=${size}`);
      return response.data;
    });
  }
  async getEventForAnUserLogged(userId: string,page?:number,size?:number): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        `/home/${userId}?page=${page}&size=${size}`
      );
      return response.data;
    });
  }

  async getRequests(eventId: string): Promise<Solicitud[]> {
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
  async getSearchedEvents(
    userId: string,
    searchParam: string
  ): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        `${userId}?actividad=${searchParam}`
      );
      return response.data;
    });
  }

  async getById(userId: string, eventId: string): Promise<Evento> {
    return this.handleRequest<Evento>(async () => {
      const response: AxiosResponse<Evento> = await this.api.get(
        `/${eventId}/${userId}`
      );
      return response.data;
    });
  }
  async create(data: EventoCreate): Promise<any> {
    return this.handleRequest<any>(async () => {
      const response: AxiosResponse<any> = await this.api.post(`/crear`, data);
      return response.data;
    });
  }
  async delete(eventId: string): Promise<any> {
    return this.handleRequest<any>(async () => {
      const response: AxiosResponse<any> = await this.api.delete(
        `/${eventId}/borrar`
      );
      return response.data;
    });
  }

  async getEventsAssisted(userId: string): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        `/${userId}/eventosAsistidos`
      );
      return response.data;
    });
  }
  async getEventsToAssist(userId: string): Promise<Evento[]> {
    return this.handleRequest<Evento[]>(async () => {
      const response: AxiosResponse<Evento[]> = await this.api.get(
        `/${userId}/eventosPorAsistir`
      );
      return response.data;
    });
  }
  async getEventParticipant(
    eventId: string,
    userId: string
  ): Promise<Participante[]> {
    return this.handleRequest<Participante[]>(async () => {
      const response: AxiosResponse<Participante[]> = await this.api.get(
        `/${eventId}/opinar/${userId}`
      );
      return response.data;
    });
  }
}
// return new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("");
//   }, 1000); // Simula un retraso de 1 segundo
// });

export default new EventService("/evento");
