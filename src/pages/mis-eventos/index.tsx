import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure,
  useNumberInput,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SimpleEventCard } from "../../components/event-card/simple";
import { RequestsForAnEvent } from "../../features/event-requests";
import eventService from "../../services/event-service";
import { useAuth } from "../../providers/auth/AuthContext";

export const MisEventos = () => {
  const { userId } = useAuth();
  const [eventRequestSelected, setEventRequestSelected] = useState<string>("");
  const [userEvents, setUserEvents] = useState<Evento[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openRequest, setOpenRequest] = useState(false);

  const toggleOpenRequest = () => {
    setOpenRequest(!openRequest);
  };
  const apiCall = async () => {
    const res = await eventService.getFromUser(userId!!);
    setUserEvents(res);
  };
  useEffect(() => {
    if (userId) {
      apiCall();
    }
  }, []);
  return (
    <>
      <Container maxW={"full"}>
        <VStack>
          <Heading pt={2}>Mis eventos</Heading>
          <Button
            onClick={onOpen}
            variant={"outline"}
            color="brand.300"
            _hover={{ bgColor: "brand.300", color: "white" }}
          >
            + Crear Evento
          </Button>
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
          {userEvents?.map((e) => (
            <SimpleEventCard
              key={e.id}
              evento={e}
              handlerRequest={toggleOpenRequest}
              openRequests={setEventRequestSelected}
            ></SimpleEventCard>
          ))}
        </Stack>
      </Container>
      <CreateEventPopup isOpen={isOpen} onClose={onClose} />
      <RequestsForAnEvent
        id={eventRequestSelected}
        isOpen={openRequest}
        onClose={toggleOpenRequest}
      />
    </>
  );
};

const CreateEventPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="900px">
        <ModalHeader>Crear evento</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justify={"center"}
            align={{ base: "center", md: "stretch" }}
            gap={5}
          >
            <VStack maxW={"sm"} gap={8}>
              <FormControl>
                <FormLabel>Tipo de actividad</FormLabel>
                <Select placeholder="Elegí la actividad">
                  <option value="option1">Fútbol</option>
                  <option value="option2">Basquet</option>
                  <option value="option3">Ajedrez</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Cantidad de participantes </FormLabel>
                <Incrementer />
              </FormControl>
              <FormControl>
                <FormLabel>Fecha y hora</FormLabel>
                <Input type="datetime-local"></Input>
              </FormControl>
            </VStack>
            <VStack maxW={"sm"} gap={8}>
              <FormControl>
                <FormLabel>Ubicación</FormLabel>
                <Input type="text" />
              </FormControl>
              <AspectRatio w="xs" h={"xs"} ratio={4 / 3}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
              </AspectRatio>
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent={{ base: "center", md: "flex-end" }}>
          <Button bg="brand.300" color={"white"} mr={3}>
            Crear
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
function Incrementer() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Input {...input} />
      <Button {...inc}>+</Button>
      <Button {...dec}>-</Button>
    </HStack>
  );
}
