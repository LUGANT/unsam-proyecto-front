import axios from "axios";
import { AxiosResponse } from "axios";
import { URL_BACK } from "../configuration";
import ApiService from "..";
import { logginType, signupType } from "../../types";
import { Solicitud } from "../../types/Event";

class UserService extends ApiService {
  
  async loggin(data: logginType): Promise<any> {
    const rta = await axios.post(URL_BACK + 'usuario/login', {
      'username': data.usuario,
      'password': data.contrasenia
    })
    return rta.data;
  }

  async singUp(data: signupType): Promise<any> {
    const rta = await axios.post(URL_BACK + 'usuario/signup', {
      'nombre': data.nombre,
      'apellido': data.apellido,
      'email': data.email,
      'username': data.usuario,
      'password': data.contrasenia
    })
    return rta.data;
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

  async getUserData(userId:string | null){
    const rta = await axios.get(URL_BACK + `usuario/${userId}/perfil`)
    return rta.data;
  }

  async updateUsername(userId:string | null,newUsername:string){
    const rta = await axios.patch(URL_BACK + `usuario/${userId}/updateUsername?nuevoUsername=${newUsername}`)
    return rta;
  }
}

export const userService = new UserService("/usuario");
