import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  Textarea,
  useNumberInput,
  useToast,
  VStack,
} from "@chakra-ui/react";
import MapComponent from "../../features/location-search";
import { useEffect, useState } from "react";
import eventService from "../../services/event-service";
import { useAuth } from "../../providers/auth/AuthContext";
import { Actividad } from "../../types/Activity";
import activityService from "../../services/activity-service";
import { EventoCreate } from "../../types/Event";
import { formatDate, formatTime } from "../../util/date";
import { useEventContext } from "../../providers/events/EventContext";
const initEventoCreate = {
  actividadId: "",
  anfitrionId: "", // Asigna un valor predeterminado si es undefined
  descripcion: "",
  fecha: "", // Puedes usar un valor predeterminado apropiado
  hora: "",
  ubicacion: { nombreCompletoLugar: "", barrio: "", lat: 0, lon: 0 }, // Proporciona un valor predeterminado adecuado para Ubicacion
  capacidadMaxima: 0, // O cualquier valor predeterminado adecuado
};
export const CreateEventPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { userId } = useAuth();
  const [formData, setFormData] = useState<EventoCreate>(initEventoCreate);
  const [activities, setActivities] = useState<Actividad[]>();
  const toast = useToast();
  const { toggleSomethingChange } = useEventContext();

  const handleCreate = async () => {
    try {
      const eventoData: EventoCreate = {
        actividadId: formData?.actividadId || "",
        anfitrionId: userId || "", // Asigna un valor predeterminado si es undefined
        descripcion: formData?.descripcion || "",
        fecha: formData?.fecha || "", // Puedes usar un valor predeterminado apropiado
        hora: formData?.hora || "",
        ubicacion: formData?.ubicacion || { lat: 0, lon: 0 }, // Proporciona un valor predeterminado adecuado para Ubicacion
        capacidadMaxima: formData?.capacidadMaxima || 0, // O cualquier valor predeterminado adecuado
      };
      console.log(eventoData);

      await eventService.create(eventoData);
      toast({
        title: "Evento creado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      toggleSomethingChange();
    } catch (error) {
      toast({
        title: "Algo inesperado ocurrió",
        description: "Ocurrió un error al intentar crear el evento",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await activityService.all();
      setActivities(res);
    };
    fetchActivities();
  }, []);

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
                <Select
                  placeholder="Elegí la actividad"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      actividadId: e.target.value,
                    })
                  }
                >
                  {activities?.map((a: Actividad) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Cantidad de participantes </FormLabel>
                <Incrementer
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, capacidadMaxima: value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Fecha y hora</FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fecha: formatDate(e.target.value),
                      hora: formatTime(e.target.value),
                    })
                  }
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  maxLength={200}
                  placeholder="Describe el evento"
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                />
              </FormControl>
            </VStack>

            <MapComponent
              onValuechange={(value: any) =>
                setFormData({ ...formData, ubicacion: value })
              }
            />
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent={{ base: "center", md: "flex-end" }}>
          <Button bg="brand.300" color={"white"} mr={3} onClick={handleCreate}>
            Crear
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function Incrementer({ onValueChange }: { onValueChange: any }) {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  useEffect(() => {
    onValueChange(Number(value));
  }, [value, onValueChange]);
  return (
    <HStack maxW="320px">
      <Input {...input} />
      <Button {...inc}>+</Button>
      <Button {...dec}>-</Button>
    </HStack>
  );
}
