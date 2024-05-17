import { AxiosResponse } from "axios";
import ApiService from "..";
const mockData: Solicitud[] = [
  {
    id: 1,
    solicitante: {
      id: 2,
      nombre: "Nicolas",
      apellido: "Masuyama",
      username: "masu",
      password: "1234",
    },
    evento: {
      id: 1,
      anfitrion: {
        id: 1,
        nombre: "Felipe",
        apellido: "Gamalleri",
        username: "feli",
        password: "1234",
      },
      actividad: {
        id: 2,
        nombre: "Futbol",
        esGrupal: true,
      },
      fecha: new Date("2024-05-10"),
      direccion: "calle trucha 123",
      capacidadMaxima: 10,
    },
  },
];
class RequestService extends ApiService {
  async send(idEvento: number, solicitanteId: number) {
    return this.handleRequest<Solicitud[]>(async () => {
      const response: AxiosResponse<Solicitud[]> = await this.api.post(
        `/crear/${idEvento}/${solicitanteId}`
      );
      return response.data;
    });
  }
  async answer(idSolicitud: number, aceptada: boolean) {
    return this.handleRequest<Solicitud[]>(async () => {
      const response: AxiosResponse<Solicitud[]> = await this.api.post(
        `/responder/${idSolicitud}`,
        { aceptada }
      );
      return response.data;
    });
  }
  async getByEvent(): Promise<Solicitud[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 1000); // Simula un retraso de 1 segundo
    });
  }
}

export default new RequestService("/usuario/solicitud");
