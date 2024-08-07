import { Box, Heading, Spinner, Stack } from "@chakra-ui/react";
import { EventCard } from "../../components/event-card/full";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import eventService from "../../services/event-service";
import { Evento } from "../../types/Event";
import { useAuth } from "../../providers/auth/AuthContext";

export function FilterByEvent() {
  const { search } = useParams();
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { userId } = useAuth();

  const searchedEvents = async () => {
    setLoading(true);
    try {
      const response = await eventService.getSearchedEvents(userId!!, search!!);
      setEvents(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchedEvents();
  }, [location.pathname]);
  return (
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
  );
}
