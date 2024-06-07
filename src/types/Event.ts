import { Actividad } from "./Activity";

type Usuario = any;

export type Evento = {
  id: string;
  anfitrion: Usuario;
  actividad: Actividad;
  fecha: Date;
  direccion: string;
  capacidadMaxima: number;
  descripcion?: string;
  participantes?: Participante[];
  solicitudes?: number;
};
export type EventoCreate = {
  anfitrionId: string;
  actividadId: string;
  descripcion: string;
  fecha: string;
  hora: String;
  ubicacion: Ubicacion;
  capacidadMaxima: number;
};
export type Ubicacion = {
  nombreCompletoLugar: string;
  barrio: string;
  lat: number;
  lon: number;
};
export type Participante = {
  id: string;
  username: string;
  imgUrl?: string;
};
export type Solicitud = {
  id: string;
  usuario: Usuario;
  puntajeUsuario: number;
  evento: Evento;
};
/* 
---------Ejemplo de respuesta evento
{
    "id": 1,
    "anfitrion": {
        "id": 1,
        "nombre": "Felipe",
        "apellido": "Gamalleri",
        "username": "feli",
        "password": "1234"
    },
    "actividad": {
        "id": 2,
        "nombre": "Futbol",
        "esGrupal": true
    },
    "fecha": "2024-05-10",
    "direccion": "calle trucha 123"
},
---------Ejemplo de respuesta Usuario
{
        "id": 1,
        "nombre": "Felipe",
        "apellido": "Gamalleri",
        "username": "feli"
    },

---------Ejemplo de respuesta Actividad
{
        "id": 1,
        "nombre": "Basquet",
        "esGrupal": true
    },
*/
