import { Box, Heading, Stack, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth/AuthContext";
import eventService from "../../services/event-service";
import { Evento } from "../../types/Event";

export function EventsAssisted() {
  const { userId } = useAuth();
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventService.getEventsAssisted(userId!!);
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
            return <Box key={e.id}>{JSON.stringify(e)}</Box>;
          })
        ) : (
          <Text>No tienes participaciones en eventos</Text>
        )}
      </Stack>
    </>
  );
}
