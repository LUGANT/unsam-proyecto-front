import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaHandSparkles } from "react-icons/fa";
import eventService from "../../../services/event-service";
import { Evento } from "../../../types/Event";
import { RoundedActivityIcon } from "../../../ui/icons/ActivityIcon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimpleEventCard = ({
  evento,
  handlerRequest,
  openRequests,
}: {
  evento: Evento;
  handlerRequest: () => void;
  openRequests: (id: string) => void;
}) => {
  const { id, anfitrion, actividad, fecha, ubicacion, capacidadMaxima } =
    evento;
  const handleOpenRequests = () => {
    handlerRequest();
    openRequests(id);
  };
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <HStack alignItems={"flex-start"} gap={6}>
          <RoundedActivityIcon act={"futbol"} />
          <Stack alignItems={"flex-start"}>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Partido
            </Text>
            <Heading
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              textAlign={"left"}
              fontFamily={"body"}
            >
              Partido de {actividad.nombre} en {ubicacion.barrio}
            </Heading>
            <Text color={"gray.500"} textAlign={"left"}>
              {evento.descripcion}
            </Text>
          </Stack>
        </HStack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"row"} spacing={0} align={"center"} gap={3}>
            <Text fontWeight={600}>Solicitudes</Text>
            <Box position={"relative"} onClick={handleOpenRequests}>
              <IconButton
                icon={<FaHandSparkles />}
                fontSize={"xl"}
                aria-label={"applications"}
              ></IconButton>
              <Badge
                variant="solid"
                colorScheme="green"
                rounded={"full"}
                w={5}
                h={5}
                p={0}
                position={"absolute"}
                top={0}
                right={-2}
                zIndex={9}
              >
                {evento.solicitudes || 0}
              </Badge>
            </Box>
          </Stack>
          <Spacer />
          <DeleteEventButton eventId={id} />
        </Stack>
      </Box>
    </Center>
  );
};

interface DeleteEventButtonProps {
  eventId: string;
}

const DeleteEventButton: React.FC<DeleteEventButtonProps> = ({ eventId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await eventService.delete(eventId);
      toast({
        title: "Evento eliminado",
        description: "El evento ha sido eliminado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      } as UseToastOptions);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al intentar eliminar el evento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      } as UseToastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        icon={<DeleteIcon />}
        fontSize={"xl"}
        aria-label={"delete-event"}
        _hover={{ bgColor: "red", color: "white" }}
        onClick={onOpen}
      ></IconButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Evento
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres eliminar este evento? Esta acción no
              se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} disabled={loading}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={loading}
              >
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
