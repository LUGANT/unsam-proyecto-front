import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { userService } from "../../services/user-service";
import { Solicitud } from "../../types/Event";
import { StarRating } from "../star-rating";

export function RequestItem({
  id,
  request,
  onAction,
}: {
  id: string;
  request: Solicitud;
  onAction: () => void;
}) {
  const toast = useToast();
  const { usuario } = request;
  const handleAccept = async () => {
    try {
      await userService.answerRequest(id, true);
      onAction();
    } catch (e: any) {
      toast({
        description: e.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleReject = async () => {
    await userService.answerRequest(id, false);
    onAction();
  };
  return (
    <Card padding={2}>
      <Flex justifyContent="space-between" alignItems={"center"} gap={2}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={request.usuario.imgUrl} size={"md"} bg={"brand.300"} />
          <Flex direction={"column"}>
            <Heading as="h5" textAlign={"left"} size="md">
              {usuario.nombre +
                " " +
                usuario.apellido +
                `(${usuario.username})`}
            </Heading>
            <HStack>
              <Text color="gray.500">{request.puntajeUsuario}</Text>
              <StarRating rating={request.puntajeUsuario} />
            </HStack>
          </Flex>
        </Flex>
        <Flex gap={5}>
          <IconButton
            onClick={handleAccept}
            borderRadius={"50%"}
            bg={"#47d247"}
            aria-label="Search database"
            icon={<CheckIcon />}
            size={"sm"}
            _hover={{ backgroundColor: "#84e184" }}
          />
          <IconButton
            onClick={handleReject}
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
