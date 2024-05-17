import axios, { AxiosInstance } from "axios";
const API_URL = "http://tu-backend.com/api";

class ApiService {
  api: AxiosInstance;

  constructor(root: string) {
    this.api = axios.create({
      baseURL: API_URL + root,
      headers: {
        "Content-Type": "application/json",
        // Aquí podrías incluir cualquier otra configuración de encabezado que necesites
      },
    });
  }

  async handleRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      return await request();
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }
}

export default ApiService;
