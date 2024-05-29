import { Box, Button, Heading, Stack, VStack } from "@chakra-ui/react";
import { SimpleEventCard } from "../../components/event-card/simple";
import { Evento } from "../../types/Event";
import { useEffect, useState } from "react";
import requestService from "../../services/request-service";

export function EventByUserId({ onOpen, toggleOpenRequest }: any) {
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await requestService.getEventByUserId(1);
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
            ></SimpleEventCard>
          );
        })}
      </Stack>
    </>
  );
}
