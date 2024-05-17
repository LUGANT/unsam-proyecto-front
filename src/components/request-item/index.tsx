import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

export function RequestItem() {
  return (
    <Card padding={2}>
      <Flex justifyContent="space-between" alignItems={"center"} gap={2}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar size={"md"} bg={"brand.300"} />
          <Flex direction={"column"}>
            <Heading as="h5" textAlign={"left"} size="md">
              Usuario
            </Heading>
            <Text color="gray.500">5 estrellas</Text>
          </Flex>
        </Flex>
        <Flex gap={5}>
          <IconButton
            borderRadius={"50%"}
            bg={"#47d247"}
            aria-label="Search database"
            icon={<CheckIcon />}
            size={"sm"}
            _hover={{ backgroundColor: "#84e184" }}
          />
          <IconButton
            borderRadius={"50%"}
            bg={"#ff4d4d"}
            aria-label="Search database"
            icon={<CloseIcon />}
            size={"sm"}
            _hover={{ backgroundColor: "#ff6767" }}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
