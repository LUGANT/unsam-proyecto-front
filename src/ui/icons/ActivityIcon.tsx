import { Center, Icon } from "@chakra-ui/react";
import { FaVolleyballBall } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { TipoActividad } from "../../types/Activity";
const actividades = {
  futbol: GiSoccerBall,
  volley: FaVolleyballBall,
  null: MdOutlineQuestionMark,
};
const isActividad = (value: string): value is TipoActividad => {
  return value in actividades;
};
export const RoundedActivityIcon = ({ act }: { act: string }) => {
  if (!isActividad(act)) {
    // Maneja el caso donde act no es una actividad válida
    // Puedes devolver un icono por defecto o lanzar un error
    return (
      <Center rounded={"full"} bg="brand.300" p={1}>
        <Icon color={"white"} as={actividades["null"]} fontSize={"2xl"} />
      </Center>
    );
  }
  return (
    <Center rounded={"full"} bg="brand.300" p={1}>
      <Icon color={"white"} as={actividades[act]} fontSize={"2xl"} />
    </Center>
  );
};
