import { Box, Container, Heading, Spinner, Stack } from "@chakra-ui/react";
import { EventCard } from "../../components/event-card/full";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import eventService from "../../services/event-service";
import { Evento } from "../../types/Event";

export const Search = () => {
  const { search } = useParams();
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchedEvents = async () => {
      try {
        const response = await eventService.getSearchedEvents(search!!);
        setEvents(response);
      } finally {
        setLoading(false);
      }
    };

    searchedEvents();
  }, [location.pathname]);

  return (
    <>
      <Container maxW={"full"}>
        <Stack
          as={Box}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "none", md: "center" }}
          align={"center"}
          textAlign={"center"}
          wrap={{ base: "nowrap", md: "wrap" }}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          overflow={"scroll"}
          height={"86vh"}
        >
          {loading ? (
            <Spinner size="xl" />
          ) : events.length > 0 ? (
            events.map((evento: Evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))
          ) : (
            <Heading size={"lg"}>
              No se encontraron actividades del tipo "{search}"
            </Heading>
          )}
        </Stack>
      </Container>
    </>
  );
};
