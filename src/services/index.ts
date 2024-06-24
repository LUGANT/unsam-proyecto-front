import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:8080";

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

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });


  }

  async handleRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      const response = await request();
      return response
    } catch (error) {
      console.error("Error en la solicitud:", error);
      if (error.response && error.response.status == 403) {
        window.location.href = '/auth/login';

      }
      throw error;
    }
  }
}

export default ApiService;