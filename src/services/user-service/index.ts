import { AxiosResponse } from "axios";
import ApiService from "..";
import { logginType, signupType } from "../../types";

class UserService extends ApiService {
  async loggin(data: logginType): Promise<boolean> {
    console.log("data que recibe el service", data);
    // await axios.post(URL_BACK + '/loggin', data)
    return true;
  }

  async singUp(data: signupType): Promise<boolean> {
    console.log("data que recibe el service login", data);
    // await axios.post(URL_BACK + '/signup', data)
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
