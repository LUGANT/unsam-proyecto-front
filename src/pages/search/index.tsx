import { Container } from "@chakra-ui/react";
import { FilterByEvent } from "../../features/filter-by-event";

export const SearchPage = () => {
  return (
    <>
      <Container maxW={"full"}>
        <FilterByEvent />
      </Container>
    </>
  );
};
