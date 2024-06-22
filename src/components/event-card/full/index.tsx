import {
  Avatar,
  Box,
  Button,
  Center,
  Link as ChakraLink,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAuth } from "../../../providers/auth/AuthContext";
import { userService } from "../../../services/user-service";
import { Evento } from "../../../types/Event";

export const EventCard = ({ evento }: { evento: Evento }) => {
  const toast = useToast();
  const { userId } = useAuth();
  const { id, anfitrion, actividad, fecha, ubicacion, capacidadMaxima } =
    evento;
  const handleRequest = () => {
    try {
      userService.sendRequest(id, userId!);
      toast({
        title: "Solicitud enviada.",
        description: "Debes esperar a que el anfitrión te acepte.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Algo inesperado ocurrió",
        description: "No pudimos enviar tu solicitud debido a un fallo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image
            src={
              "https://media.istockphoto.com/id/884279742/es/foto/actividades-recreativas.jpg?s=612x612&w=0&k=20&c=pbh6YIRBl6zB__ZR5_NISgyyWTpxbyYzn1F5aZnGONM="
            }
            w={"full"}
            height={"210px"}
            objectFit={"cover"}
            alt="Example"
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Partido
          </Text>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            <ChakraLink as={ReactRouterLink} to={`/evento/${id}`}>
              Partido de {actividad.nombre} en {ubicacion.barrio}
            </ChakraLink>
          </Heading>
          <Text color={"gray.500"}>{evento.descripcion}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{anfitrion.nombre}</Text>
            <Text color={"gray.500"}>
              {formatDate(fecha.toString())} · 18:00hs
            </Text>
          </Stack>
          <Spacer />
          <Button onClick={handleRequest}>Unirse</Button>
        </Stack>
      </Box>
    </Center>
  );
};

function formatDate(dateString: string): string {
  // Validar el formato de la cadena de entrada
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    throw new Error("Formato de fecha inválido. Debe ser yyyy-MM-dd.");
  }

  // Dividir la cadena en partes
  const [year, month, day] = dateString.split("-");

  // Retornar la cadena formateada
  return `${day}-${month}-${year}`;
}
