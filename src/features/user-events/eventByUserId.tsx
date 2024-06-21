import { Box, Button, Heading, Stack, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SimpleEventCard } from "../../components/event-card/simple";
import { Evento } from "../../types/Event";
import eventService from "../../services/event-service";
import { useAuth } from "../../providers/auth/AuthContext";

export function EventByUserId({
  onRequestsOpen,
  onOpen,
  toggleOpenRequest,
}: {
  onRequestsOpen: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
  toggleOpenRequest: () => void;
}) {
  const { userId } = useAuth();
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventService.getFromUser(userId!!);
      setEvents(res);
    };
    getEvents();
  }, []);

  return (
    <>
      <VStack>
        <Heading pt={2}>Mis eventos</Heading>
        <Button
          onClick={onOpen}
          variant={"outline"}
          color="brand.300"
          _hover={{ bgColor: "brand.300", color: "white" }}
        >
          + Crear Evento
        </Button>
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
        {events?.map((e) => {
          return (
            <SimpleEventCard
              key={e.id}
              evento={e}
              handlerRequest={toggleOpenRequest}
              openRequests={onRequestsOpen}
            ></SimpleEventCard>
          );
        })}
      </Stack>
    </>
  );
}
