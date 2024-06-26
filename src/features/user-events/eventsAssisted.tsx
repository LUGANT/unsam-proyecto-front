import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import UserReview from "../../components/UserReview";
import { useAuth } from "../../providers/auth/AuthContext";
import eventService from "../../services/event-service";
import { Evento, Participante } from "../../types/Event";
import { RoundedActivityIcon } from "../../ui/icons/ActivityIcon";

export function EventsAssisted() {
  const { userId } = useAuth();
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const res = await eventService.getEventsAssisted(userId!!);
      console.log(res);

      setEvents(res);
    };
    getEvents();
  }, []);
  return (
    <>
      <VStack>
        <Heading pt={2}>Eventos finalizados</Heading>
      </VStack>
      <Stack
        as={Box}
        direction={"column"}
        justify={{ base: "none", md: "center" }}
        align={"center"}
        gap={2}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 18, md: 18 }}
        overflow={"auto"}
      >
        {events?.length > 0 ? (
          events?.map((e) => {
            return <SimpleEvent key={e.id} evento={e}></SimpleEvent>;
          })
        ) : (
          <Text>No tienes participaciones en eventos</Text>
        )}
      </Stack>
    </>
  );
}
const SimpleEvent = ({ evento }: { evento: Evento }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, anfitrion, actividad, ubicacion, participantes, fecha } = evento;
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
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
      >
        <HStack alignItems={"flex-start"} gap={6}>
          <RoundedActivityIcon act={"futbol"} />
          <Stack alignItems={"flex-start"}>
            <HStack justifyContent={"space-between"} width={"full"}>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                Partido
              </Text>
              <Text>{fecha.toString()}</Text>
            </HStack>
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
            <Button
              onClick={onOpen}
              rightIcon={<FaUsers />}
              variant={"outline"}
              color="brand.300"
              _hover={{ bgColor: "brand.300", color: "white" }}
            >
              Ver participantes
            </Button>
            <ParticipantsPopup
              id={evento.id}
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
            />
          </Stack>
        </HStack>
      </Box>
    </Center>
  );
};
export const ParticipantsPopup = ({
  id,
  onOpen,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [participantes, setParticipantes] = useState<Participante[]>();
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participante | null>(null);
  const { userId } = useAuth();
  const {
    isOpen: isRatingOpen,
    onOpen: onRatingOpen,
    onClose: onRatingClose,
  } = useDisclosure();
  const fetchParticipants = async () => {
    const res = await eventService.getEventParticipant(id, userId!!);
    setParticipantes(res);
  };
  const handleRateClick = (participant: Participante) => {
    setSelectedParticipant(participant);
    onRatingOpen();
  };

  useEffect(() => {
    fetchParticipants();
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          minHeight={"80%"}
          maxHeight={"90%"}
          overflowY={"auto"}
          gap="10px"
        >
          <ModalHeader>Participantes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex height="100%" direction={"column"} gap={3}>
              {participantes?.length ? (
                participantes?.map((r) => (
                  <Participant
                    key={r.id}
                    participante={r}
                    onRateClick={handleRateClick}
                  />
                ))
              ) : (
                <Text textAlign={"center"}>No hay participantes</Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {selectedParticipant && (
        <UserReview
          userId={userId!!}
          isOpen={isRatingOpen}
          onClose={onRatingClose}
          participant={selectedParticipant}
        />
      )}
    </>
  );
};

function Participant({
  participante,
  onRateClick,
}: {
  participante: Participante;
  onRateClick: (p: Participante) => void;
}) {
  const handleRate = () => {
    onRateClick(participante);
  };

  return (
    <Card padding={2}>
      <Flex justifyContent="space-between" alignItems={"center"} gap={2}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar size={"md"} bg={"brand.300"} />
          <Flex direction={"column"}>
            <Heading as="h5" textAlign={"left"} size="md">
              {/* {participante.nombre +
                " " +
                participante.apellido +
                `(${participante.username})`} */}
              {participante.username}
            </Heading>
          </Flex>
        </Flex>
        <Button
          onClick={handleRate}
          variant={"outline"}
          color="brand.300"
          _hover={{ bgColor: "brand.300", color: "white" }}
        >
          Calificar
        </Button>
      </Flex>
    </Card>
  );
}
