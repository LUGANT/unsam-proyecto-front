import { Button, Flex, Heading, Link, VStack } from "@chakra-ui/react";

export const PageNotFound = () => {
  return (
    <Flex
      minW={"full"}
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack>
        <Heading color={"black"}>Pagina no encontrada</Heading>
        <Link href="/" color={"brand.300"} fontSize={"xl"} fontWeight={"bold"}>
          Volver al inicio
        </Link>
      </VStack>
    </Flex>
  );
};
