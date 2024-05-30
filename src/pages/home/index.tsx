import { Container } from "@chakra-ui/react";
import { SearchEvents } from "../../features/search-events";

export const HomePage = () => {
  return (
    <>
      <Container maxW={"full"}>
        <SearchEvents />
      </Container>
    </>
  );
};
