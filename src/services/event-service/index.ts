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
  async getById(eventId: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEvento);
      }, 1000); // Simula un retraso de 1 segundo
    });
    // return this.handleRequest<any>(async () => {
    //   const response: AxiosResponse<any> = await this.api.get(
    //     `/${eventId}`
    //   );
    //   return response.data;
    // });
  }
}

const mockEvento = {
  id: 1,
  anfitrion: {
    id: 1,
    nombre: "Felipe",
    apellido: "Gamalleri",
    username: "feli",
    password: "1234",
    puntuacion: 0.0,
  },
  actividad: {
    id: 2,
    nombre: "Futbol",
    esGrupal: true,
  },
  fecha: "2024-05-30",
  direccion: "calle trucha 123",
  maximoParticipantes: 7,
  descripcion:
    "Vamos a jugar un partidito tranqui, traer remera blanca o negra. Con buena onda",
  participantes: [
    {
      id: "33",
      username: "joaco12",
    },
    {
      id: "34",
      username: "cacho322",
    },
    {
      id: "35",
      username: "lupe4314564564564564562",
    },
  ],
};

export default new EventService("/evento");
