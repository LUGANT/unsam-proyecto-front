type Opinion = {
  id: number;
  opinante: Usuario;
  opinado: Usuario;
  comentario: string;
  puntaje: number;
  fecha: Date;
};
interface RatingData {
  puntaje: number;
  comentario: string;
  usuarioId: string;
  usuarioOpinadorId: string;
}
