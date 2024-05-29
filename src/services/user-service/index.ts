import axios from "axios";
import { logginType, signupType } from "../../types";
import { URL_BACK } from "../configuration";

class UserService {
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
}

export const userService = new UserService();
