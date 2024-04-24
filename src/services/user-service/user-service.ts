import axios from "axios";
import { URL_BACK } from "../configuration";
import { logginType } from "../../types";

class UserService {
  async loggin(data: logginType): Promise<boolean>{
    console.log("data que recibe el service", data)
    // await axios.post(URL_BACK + '/loggin', data)
    return true
  }
}

export const userService = new UserService()