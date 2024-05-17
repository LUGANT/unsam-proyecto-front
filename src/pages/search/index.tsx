import { Box, Container, Stack } from "@chakra-ui/react";
import { EventCard } from "../../components/event-card/full";

export const Search = () => {
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