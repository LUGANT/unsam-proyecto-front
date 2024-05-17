import { Box, Container, Stack } from "@chakra-ui/react";
import { EventCard } from "../../components/event-card/full";
// import { useEffect } from "react";
// import eventService from "../../services/event-service/event-service";

export const HomePage = () => {
  // useEffect(() => {
  //   const res = async () => {
  //     const res = await eventService.todas();
  //     console.log(res);
  //   };
  //   res();
  // }, []);
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
          <EventCard></EventCard>
          <EventCard></EventCard>
          <EventCard></EventCard>
        </Stack>
      </Container>
    </>
  );
};
