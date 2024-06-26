import {
  Box,
  Center,
  Heading,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAuth } from "../../providers/auth/AuthContext";
import eventService from "../../services/event-service";
import { Evento } from "../../types/Event";
import { RoundedActivityIcon } from "../../ui/icons/ActivityIcon";

export function EventsToAssist() {
  const { userId } = useAuth();
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventService.getEventsToAssist(userId!!);
      console.log(res);

      setEvents(res);
    };
    getEvents();
  }, []);
  return (
    <>
      <VStack>
        <Heading pt={2}>Próximos eventos</Heading>
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
          <Text>No hay eventos finalizados</Text>
        )}
      </Stack>
    </>
  );
}
const SimpleEvent = ({ evento }: { evento: Evento }) => {
  const { id, anfitrion, actividad, ubicacion, fecha, hora } = evento;
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
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
      >
        <HStack alignItems={"flex-start"} gap={6}>
          <RoundedActivityIcon act={"futbol"} />
          <Stack alignItems={"flex-start"}>
            <HStack justifyContent={"space-between"} width={"full"}>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                Partido
              </Text>
              <Text>{fecha.toString()}</Text>
              <Text>{hora?.toString()}</Text>
            </HStack>
            <Heading
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              textAlign={"left"}
              fontFamily={"body"}
            >
              <ChakraLink
                as={ReactRouterLink}
                to={`/evento/${id}`}
                noOfLines={2}
                maxW={"300px"}
                _hover={{textDecoration:"none"}}
              >
                <Text transition="color 0.5s" _hover={{color:"brand.300"}}>
                  Partido de {actividad.nombre} en {ubicacion.barrio}
                </Text>
              </ChakraLink>
            </Heading>
            <Text color={"gray.500"} textAlign={"left"}>
              {evento.descripcion}
            </Text>
            <Stack direction={"row"} spacing={0} align={"center"} gap={3}>
              <Text fontWeight={600} color={"gray.600"}>
                <Box as="span" color="brand.300" fontWeight={"bold"}>
                  Anfitrión:{" "}
                </Box>
                {`${anfitrion.nombre} ${anfitrion.apellido} (${anfitrion.username})`}
              </Text>
            </Stack>
          </Stack>
        </HStack>
      </Box>
    </Center>
  );
};
