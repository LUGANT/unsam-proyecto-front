import axios from "axios";
import { AxiosResponse } from "axios";
import { URL_BACK } from "../configuration";
import ApiService from "..";
import { logginType, signupType } from "../../types";
import { Solicitud } from "../../types/Event";

class UserService extends ApiService {
  async loggin(data: logginType): Promise<boolean> {
    const rta = await axios.post(URL_BACK + 'usuario/login', {
      'username': data.usuario,
      'password': data.contrasenia
    })
    return rta.data;
  }

  async singUp(data: signupType): Promise<boolean> {
    console.log("data que recibe el service login", data);
    // await axios.post(URL_BACK + 'usuario/signup', data)
    return true;
  }
  async sendRequest(idEvento: string, solicitanteId: string) {
    return this.handleRequest<Solicitud[]>(async () => {
      const response: AxiosResponse<Solicitud[]> = await this.api.post(
        `/solicitud/crear/${idEvento}/${solicitanteId}`
      );
      return response.data;
    });
  }
  async answerRequest(idSolicitud: string, aceptada: boolean) {
    return this.handleRequest<Solicitud[]>(async () => {
      const response: AxiosResponse<Solicitud[]> = await this.api.patch(
        `/solicitud/responder/${idSolicitud}`,
        null,
        { params: { aceptada } }
      );
      return response.data;
    });
  }
}

export const userService = new UserService("/usuario");
