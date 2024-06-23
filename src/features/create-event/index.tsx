import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MapComponent from "../../features/location-search";
import { useAuth } from "../../providers/auth/AuthContext";
import { useEventContext } from "../../providers/events/EventContext";
import activityService from "../../services/activity-service";
import eventService from "../../services/event-service";
import { Actividad } from "../../types/Activity";
import { EventoCreate } from "../../types/Event";
import { formatDate, formatTime } from "../../util/date";

export const CreateEventPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { userId } = useAuth();
  const { toggleSomethingChange } = useEventContext();
  const [activities, setActivities] = useState<Actividad[]>();
  const methods = useForm<EventoCreate>({
    defaultValues: {
      actividadId: "",
      anfitrionId: userId || "",
      descripcion: "",
      fecha: "",
      hora: "",
      ubicacion: "",
      capacidadMaxima: 0,
    },
  });
  const toast = useToast();
  const onSubmit = async (data: EventoCreate) => {
    if (typeof data.ubicacion == "string") {
      methods.setError("ubicacion", {
        type: "manual",
        message: "Búsqueda inválida",
      });
      return;
    }

    try {
      data.fecha = formatDate(data.fecha);
      data.hora = formatTime(data.fecha);
      await eventService.create(data);
      onClose();
      toggleSomethingChange();
      methods.reset();
    } catch (error) {
      toast({
        title: "Algo inesperado ocurrió",
        description: "No pudimos crear el evento debido a un fallo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleClose = () => {
    onClose();
    methods.reset();
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
      <FormProvider {...methods}>
        <ModalContent
          as="form"
          maxW="900px"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
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
                <FormControl isInvalid={!!methods.formState.errors.actividadId}>
                  <FormLabel>Tipo de actividad</FormLabel>
                  <Select
                    id={"actividadId"}
                    {...methods.register("actividadId", {
                      required: "Debes brindar un tipo de actividad",
                    })}
                  >
                    {activities?.map((a: Actividad) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {methods.formState.errors.actividadId?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!methods.formState.errors.capacidadMaxima}
                >
                  <FormLabel>Cantidad de participantes </FormLabel>
                  <Incrementer
                    onValueChange={(value: any) =>
                      methods.setValue("capacidadMaxima", value)
                    }
                  />
                  <FormErrorMessage>
                    {methods.formState.errors.capacidadMaxima?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!methods.formState.errors.fecha}>
                  <FormLabel>Fecha y hora</FormLabel>
                  <Input
                    id={"fecha"}
                    type="datetime-local"
                    {...methods.register("fecha", {
                      required: "Debes brindar una fecha",
                    })}
                  ></Input>
                  <FormErrorMessage>
                    {methods.formState.errors.fecha?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!methods.formState.errors.descripcion}>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea
                    id={"descripcion"}
                    maxLength={200}
                    placeholder="Describe el evento"
                    {...methods.register("descripcion", {
                      required: "Descripcion es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {methods.formState.errors.descripcion?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
              <VStack>
                <MapComponent
                  onValuechange={(value: any) =>
                    methods.setValue("ubicacion", value)
                  }
                  id={"ubicacion"}
                />
              </VStack>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={{ base: "center", md: "flex-end" }}>
            <Button
              type="submit"
              bg="brand.300"
              color={"white"}
              mr={3}
              // onClick={dirtyUbicacionCheck}
            >
              Crear
            </Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </FormProvider>
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
