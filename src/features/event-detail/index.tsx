import {
  AspectRatio,
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/event-service";
import { RoundedActivityIcon } from "../../ui/icons/ActivityIcon";
import { FaCrown } from "react-icons/fa";
import { Evento, Participante } from "../../types/Event";
import { MapRender } from "../../components/map-render";
import { useAuth } from "../../providers/auth/AuthContext";
import { userService } from "../../services/user-service";

export const FullEventDetail = () => {
  const [evento, setEvento] = useState<Evento>();
  const [isLoading, setIsLoading] = useState(true);
  const { idEvento } = useParams();
  const toast = useToast();
  const { userId } = useAuth();

  const handleJoin = () => {
    try {
      userService.sendRequest(idEvento, userId!);
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

  const disableEnviarSolicitud = () => {
    return evento?.anfitrion.id == userId
  }

  function avaiableSlot() {
    return !(evento?.participantes?.length === evento?.capacidadMaxima);
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventService.getById(userId!!, idEvento!!);
        console.log(res);
        setEvento(res);
        console.log(evento);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el evento.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [idEvento, toast]);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!evento) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text>No se encontró el evento.</Text>
      </Flex>
    );
  }

  return (
    <Flex
      py={10}
      gap={10}
      flexDir={"column"}
      w={{ base: "full", md: "80%", xl: "50%" }}
      margin={{ base: 0, md: "0 auto" }}
    >
      <Flex
        w={"full"}
        flexDir={{ base: "column", md: "row" }}
        alignItems={"center"}
        gap={5}
        justifyContent={"space-between"}
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems={"center"}
          gap={2}
        >
          <RoundedActivityIcon act={evento.actividad.nombre.toLowerCase()} />
          <Heading size={"md"}>
            Partido de {evento.actividad.nombre} en {evento.ubicacion.barrio}
          </Heading>
        </Flex>
        <Button
          onClick={handleJoin}
          color={"white"}
          bgColor="brand.300"
          colorScheme="brand"
          hidden={disableEnviarSolicitud()}
        >
          Yo me sumo
        </Button>
      </Flex>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-between" }}
        margin={{ base: "0 auto", md: "0" }}
        gap={10}
      >
        <VStack alignItems={"flex-start"} gap={14}>
          <VStack alignItems={"flex-start"}>
            <Heading size={"md"}>Creador</Heading>
            <Text>{evento.anfitrion.username}</Text>
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Heading size={"md"}>Tipo de actividad</Heading>
            <Text>{evento.actividad.nombre}</Text>
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Heading size={"md"}>Descripción</Heading>
            <Text>{evento.descripcion}</Text>
          </VStack>
          <VStack alignItems={"flex-start"} gap={6}>
            <HStack>
              <Heading size={"md"}>Participantes</Heading>
              <Text
                fontWeight={"bold"}
                color={avaiableSlot() ? "green.400" : "red.300"}
              >{`${evento.participantes?.length}/${evento.capacidadMaxima}`}</Text>
            </HStack>
            <HStack>
              {evento.participantes?.map((p: Participante) => (
                <ParticipantItem
                  key={p.id}
                  user={p}
                  isOwner={p.id == evento.anfitrion.id}
                />
              ))}
            </HStack>
          </VStack>
        </VStack>

        <VStack alignItems={"flex-start"}>
          <Heading size={"md"}>Ubicación</Heading>
          <Text>{evento.ubicacion.barrio}</Text>
          <MapRender position={[evento.ubicacion.lat, evento.ubicacion.lon]} />
        </VStack>
      </Flex>
    </Flex>
  );
};

const ParticipantItem = ({
  user,
  isOwner,
}: {
  user: Participante;
  isOwner: boolean;
}) => {
  return (
    <VStack w={"70px"}>
      <Avatar
        position={"relative"}
        size={"xs"}
        src={user.imgUrl || "https://bit.ly/broken-link"}
      >
        {isOwner && (
          <Icon
            as={FaCrown}
            pos={"absolute"}
            top={-2}
            right={-1.5}
            boxSize={4}
            color={"gold"}
          ></Icon>
        )}
      </Avatar>
      <Text maxW={"full"} textOverflow={"clip"} isTruncated fontSize={"xs"}>
        {user.username}
      </Text>
    </VStack>
  );
};
