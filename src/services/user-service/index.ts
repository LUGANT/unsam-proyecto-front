import { AxiosResponse } from "axios";
import { URL_BACK } from "../configuration";
import ApiService from "..";
import { logginType, signupType } from "../../types";
import { Solicitud } from "../../types/Event";

class UserService extends ApiService {
  async loggin(data: logginType): Promise<any> {
    const rta = await this.api.post(URL_BACK + "usuario/login", {
      username: data.usuario,
      password: data.contrasenia,
    });
    localStorage.setItem("token", rta.data.token);
    return rta.data;
  }

  async singUp(data: signupType): Promise<any> {
    const rta = await this.api.post(URL_BACK + "usuario/signup", {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      username: data.usuario,
      password: data.contrasenia,
    });
    return rta.data;
  }

  async getUser(): Promise<any> {
    const rta = await this.api.get(URL_BACK + "usuario/user");
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

  async getUserData(userId: string | null) {
    return this.handleRequest<Profile>(async () => {
      const rta: AxiosResponse<Profile> = await this.api.get(
        URL_BACK + `usuario/${userId}/perfil`
      );
      return rta.data;
    });
  }

  async updateUser(userId: string | null, userData: UserData) {
    console.log(userData);

    const rta = await this.api.patch(
      URL_BACK + `usuario/${userId}/updateUser`,
      userData
    );
    return rta;
  }
  async updatePassword(
    usuarioId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const rta = await this.api.patch(URL_BACK + `usuario/cambiarPassword`, {
      usuarioId,
      contrasenaActual: currentPassword,
      nuevaContrasena: newPassword,
    });
    return rta;
  }

  async reportOpinion(comentarioId:number,reportadorId:string){
    const rta = await this.api.post(URL_BACK + `valoracion/reportar/${comentarioId}/${reportadorId}`)
    return rta;
  }
  
  async sendSuggest(usuarioId: string, sugerencia: string) {
    return this.handleRequest(async () => {
      const response: AxiosResponse = await this.api.post(
        `/agregarSugerencia`,
        {
          usuarioId,
          sugerencia,
        }
      );
      return response.data;
    });
  }
}

export const userService = new UserService("/usuario");
