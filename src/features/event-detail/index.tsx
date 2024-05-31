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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/event-service";
import { RoundedActivityIcon } from "../../ui/icons/ActivityIcon";

export const FullEventDetail = () => {
  const [evento, setEvento] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { idEvento } = useParams();
  const toast = useToast();

  const handleJoin = () => {
    toast({
      title: "Solicitud enviada.",
      description: "Debes esperar a que el anfitrión te acepte.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  function avaiableSlot() {
    return !(evento?.participantes.length === evento?.maximoParticipantes);
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventService.getById(idEvento!!);
        console.log(res);
        setEvento(res);
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
            Partido de {evento.actividad.nombre} en {evento.direccion}
          </Heading>
        </Flex>
        <Button
          onClick={handleJoin}
          color={"white"}
          bgColor="brand.300"
          colorScheme="brand"
        >
          Yo me sumo
        </Button>
      </Flex>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-between" }}
        margin={{ base: "0 30px", md: "0" }}
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
              >{`${evento.participantes.length}/${evento.maximoParticipantes}`}</Text>
            </HStack>
            <HStack>
              {evento.participantes.map((p: any) => (
                <ParticipantItem key={p.id} user={p} />
              ))}
            </HStack>
          </VStack>
        </VStack>

        <VStack alignItems={"flex-start"}>
          <Heading size={"md"}>Ubicación</Heading>
          <Text>{"por ahi 333"}</Text>
          <AspectRatio w="xs" h={"xs"} ratio={4 / 3}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
          </AspectRatio>
        </VStack>
      </Flex>
    </Flex>
  );
};

const ParticipantItem = ({
  user,
}: {
  user: { id: string; username: string; imgUrl?: string };
}) => {
  return (
    <VStack w={"70px"}>
      <Avatar
        size={"xs"}
        src={user.imgUrl || "https://bit.ly/broken-link"}
      ></Avatar>
      <Text maxW={"full"} textOverflow={"clip"} isTruncated fontSize={"xs"}>
        {user.username}
      </Text>
    </VStack>
  );
};
