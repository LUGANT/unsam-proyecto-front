import { Button, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <Flex
      minW={"full"}
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack>
        <Heading color={"brand.300"} size={"4xl"} mb={30}>
          Ups!
        </Heading>
        <Heading color={"black"}>404 Error not found</Heading>
        <Text>Lamentamos los inconvenientes</Text>
        <Button mt={10} bg={"brand.300"} color={"white"}>
          <Link href="/">Volver al inicio</Link>
        </Button>
      </VStack>
    </Flex>
  );
};
