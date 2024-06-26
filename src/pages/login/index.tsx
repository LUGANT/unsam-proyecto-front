import {
  Box,
  Heading,
  VStack,
  Text,
  Icon,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import { LoginForm } from "../../components/login-form";
import { Link as ReactRouterLink } from "react-router-dom";
import { BrandIcon } from "../../ui/icons/BrandIcon";
import { FaArrowRight } from "react-icons/fa6";

export const LoginPage = () => {
  return (
    <Box
      display="flex"
      flexDir={"column"}
      justifyContent="center"
      alignItems="center"
      width={"100vw"}
      height={"80vh"}
      gap={10}
    >
      <VStack>
        <BrandIcon boxSize={24} />
        <Heading color="brand.300" size="xl">
          Yo me sumo
        </Heading>
        <Text fontSize="lg">Conectá, coordiná y divertite acompañado!</Text>
      </VStack>
      <LoginForm />
      <ChakraLink as={ReactRouterLink} to={`/auth/signup`} noOfLines={2}>
        <Text color={"blue"}>¿No tenés cuenta? Registrate ahora!</Text>
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to={`/`} noOfLines={2} maxW={"300px"}>
        <HStack alignItems={"center"}>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            fontSize={"xl"}
            textAlign={"left"}
            fontFamily={"body"}
          >
            Continuar sin cuenta
          </Heading>
          <Icon as={FaArrowRight}></Icon>
        </HStack>
      </ChakraLink>
    </Box>
  );
};
