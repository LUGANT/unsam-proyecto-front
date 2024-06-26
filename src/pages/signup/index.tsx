import {
  Box,
  Heading,
  Link,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { BrandIcon } from "../../ui/icons/BrandIcon";
import { Link as ReactRouterLink } from "react-router-dom";
import { SignUpForm } from "../../components/signup-form";

export function SignUpPage() {
  return (
    <Box
      display="flex"
      flexDir={"column"}
      justifyContent="center"
      alignItems="center"
      width={"100vw"}
      height={"100%"}
      gap={10}
    >
      <VStack>
        <BrandIcon boxSize={24} />
        <Heading color="brand.300" size="xl">
          Yo me sumo
        </Heading>
        <Text fontSize="lg">Conectá, coordiná y divertite acompañado!</Text>
      </VStack>
      <SignUpForm />
      <ChakraLink
        as={ReactRouterLink}
        to={`/auth/login`}
        noOfLines={2}
        color={"blue"}
      >
        ¿Ya tenés cuenta? Ingresá acá!
      </ChakraLink>
    </Box>
  );
}
