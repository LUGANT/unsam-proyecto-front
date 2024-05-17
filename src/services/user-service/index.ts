import { logginType, signupType } from "../../types";

class UserService {
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
}

export const userService = new UserService();
