import { Activity } from "./Activity";

type Usuario = any;

type Evento = {
  id: number;
  anfitrion: Usuario;
  actividad: Activity;
  fecha: Date;
  direccion: string;
  capacidadMaxima: number;
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
