import { Box, Heading, VStack, Text, Link } from "@chakra-ui/react";
import { LoginForm } from "../../components/login-form";
import { BrandIcon } from "../../ui/icons/BrandIcon";

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
      <Link isExternal color={"blue"}>
        ¿No tenés cuenta? Registrate ahora!
      </Link>
    </Box>
  );
};
