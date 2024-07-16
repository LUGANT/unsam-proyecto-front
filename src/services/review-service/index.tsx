import { AxiosResponse } from "axios";
import ApiService from "..";

class ReviewService extends ApiService {
  async create(data: RatingData): Promise<any> {
    return this.handleRequest<any>(async () => {
      const response: AxiosResponse<any> = await this.api.post(`/nueva`, data);
      return response.data;
    });
  }
}
// return new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("");
//   }, 1000); // Simula un retraso de 1 segundo
// });

export default new ReviewService("/valoracion");
