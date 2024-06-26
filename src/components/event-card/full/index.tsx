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
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/auth/AuthContext";
import { userService } from "../../../services/user-service";
import { Evento } from "../../../types/Event";
import { ActivitiesPhotos, ActivityPhotoDefault } from "./Activities";
import { useEffect, useState } from "react";

export const EventCard = ({ evento }: { evento: Evento }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { userId, isLoggedIn } = useAuth();
  const { id, anfitrion, actividad, fecha, ubicacion, hora } = evento;
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    setEnabled(evento.habilitado!!);
  }, []);

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
      setEnabled(!enabled);
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
        maxW={"400px"}
        w={"full"}
        h={"md"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)"}}
      >
        <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image
            src={ActivitiesPhotos[actividad.nombre] || ActivityPhotoDefault}
            w={"full"}
            height={"210px"}
            objectFit={"cover"}
            alt={actividad.nombre}
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
            <ChakraLink as={ReactRouterLink} to={`/evento/${id}`} noOfLines={2} _hover={{textDecoration:"none"}}>
              <Text transition="color 0.5s" _hover={{color:"brand.300"}}>
                Partido de {actividad.nombre} en {ubicacion.barrio}
              </Text>
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
              {formatDate(fecha.toString())} · {formatHour(hora)}
            </Text>
          </Stack>
          <Spacer />
          {!isLoggedIn ? (
            <Button
              onClick={() => navigate("/auth/login")}
              noOfLines={2} // Define el número máximo de líneas
              overflow="hidden" // Oculta el texto que excede el contenedor
              textOverflow="ellipsis" // Muestra puntos suspensivos cuando el texto se corta
              whiteSpace="balance" // Evita que el texto se desborde al siguiente renglón
              maxWidth={32}
            >
              Ingresar para unirse
            </Button>
          ) : (
            <Button onClick={handleRequest} isDisabled={!enabled}>
              {!enabled ? `Pendiente` : `Unirse`}
            </Button>
          )}
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

function formatHour(hour: Date): string {
  const hourString = hour.toString();
  const regex = /^(\d{2}:\d{2}):\d{2}$/;
  const match = hourString.match(regex);
  return match[1];
}
