import {
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth/AuthContext";
import eventService from "../../services/event-service";
import { Evento } from "../../types/Event";
import { RoundedActivityIcon } from "../../ui/icons/ActivityIcon";

export function EventsAssisted() {
  const { userId } = useAuth();
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventService.getEventsAssisted(userId!!);
      console.log(res);

      setEvents(res);
    };
    getEvents();
  }, []);
  return (
    <>
      <VStack>
        <Heading pt={2}>Mis partipaciones</Heading>
      </VStack>
      <Stack
        as={Box}
        direction={"column"}
        justify={{ base: "none", md: "center" }}
        align={"center"}
        gap={2}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 18, md: 18 }}
        overflow={"auto"}
      >
        {events?.length > 0 ? (
          events?.map((e) => {
            return <SimpleEvent key={e.id} evento={e}></SimpleEvent>;
          })
        ) : (
          <Text>No tienes participaciones en eventos</Text>
        )}
      </Stack>
    </>
  );
}
const SimpleEvent = ({ evento }: { evento: Evento }) => {
  const { id, anfitrion, actividad, ubicacion } = evento;
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
        <HStack alignItems={"flex-start"} gap={6}>
          <RoundedActivityIcon act={"futbol"} />
          <Stack alignItems={"flex-start"}>
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
              textAlign={"left"}
              fontFamily={"body"}
            >
              Partido de {actividad.nombre} en {ubicacion.barrio}
            </Heading>
            <Text color={"gray.500"} textAlign={"left"}>
              {evento.descripcion}
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Center>
  );
};
