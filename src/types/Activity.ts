const arrayDeOpciones = ["futbol", "basquet"] as const; //Array de actividades

/*[number] extrae los tipos de los elementos del array.*/
type nombreDeporte = (typeof arrayDeOpciones)[number];

export type Actividad = {
  id: number;
  nombre: nombreDeporte;
  esGrupal: boolean;
};
export type TipoActividad = "futbol" | "volley" | "null";
