import {
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BrandIcon } from "../../ui/icons/BrandIcon";

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      zIndex={9}
      position={"absolute"}
      bottom={0}
      right={0}
      left={0}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={"row"}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <HStack>
          <BrandIcon boxSize={5} />
          <Heading
            size="md"
            color={"brand.300"}
            display={{ base: "none", md: "inline" }}
          >
            Yo me sumo
          </Heading>
        </HStack>
        <Text>© 2024 Yo me sumo. Todos los derechos reservados</Text>
      </Container>
    </Box>
  );
};
