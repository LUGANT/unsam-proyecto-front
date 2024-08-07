import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useNumberInput,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import MapComponent from "../../features/location-search";
import { useAuth } from "../../providers/auth/AuthContext";
import { useEventContext } from "../../providers/events/EventContext";
import eventService from "../../services/event-service";
import { EventoCreate } from "../../types/Event";
import { formatDate, formatTime } from "../../util/date";
import { ChevronDownIcon } from "@chakra-ui/icons";
import activityService from "../../services/activity-service";
import { Actividad } from "../../types/Activity";

export const CreateEventPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { userId } = useAuth();
  const { toggleSomethingChange } = useEventContext();

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

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const toast = useToast();

  const onSubmit = async (data: EventoCreate) => {
    if (typeof data.ubicacion == "string") {
      methods.setError("ubicacion", {
        type: "manual",
        message: "Búsqueda inválida",
      });
      return;
    }
    console.log(data);

    try {
      data.hora = formatTime(data.fecha);
      data.fecha = formatDate(data.fecha);
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <FormProvider {...methods}>
        <ModalContent as="form" maxW="900px" onSubmit={handleSubmit(onSubmit)}>
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
                <ActivitySelect name="actividadId" label="Tipo de actividad" />
                <FormControl isInvalid={!!errors.capacidadMaxima}>
                  <FormLabel>Cantidad de participantes </FormLabel>
                  <Incrementer
                    onValueChange={(value: any) =>
                      setValue("capacidadMaxima", value)
                    }
                  />
                  <FormErrorMessage>
                    {errors.capacidadMaxima?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.fecha}>
                  <FormLabel>Fecha y hora</FormLabel>
                  <Input
                    id={"fecha"}
                    type="datetime-local"
                    {...methods.register("fecha", {
                      required: "Debes brindar una fecha",
                    })}
                  ></Input>
                  <FormErrorMessage>{errors.fecha?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.descripcion}>
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
                    {errors.descripcion?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
              <VStack>
                <MapComponent
                  onValuechange={(value: any) => setValue("ubicacion", value)}
                  id={"ubicacion"}
                />
              </VStack>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={{ base: "center", md: "flex-end" }}>
            <Button type="submit" bg="brand.300" color={"white"} mr={3}>
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
interface ActivitySelectProps {
  name: keyof EventoCreate;
  label: string;
}

const ActivitySelect = ({ name, label }: ActivitySelectProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<EventoCreate>();
  const [activities, setActivities] = useState<Actividad[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Actividad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await activityService.all();
      setActivities(res);
      setFilteredActivities(res);
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    if (activities) {
      setFilteredActivities(
        activities.filter((activity) =>
          activity.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, activities]);

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedActivity || "Selecciona una actividad"}
        </MenuButton>
        <MenuList maxH="300px" overflowY="auto" overflowX={"clip"}>
          <InputGroup mx={2} mb={2}>
            <Input
              placeholder="Buscar actividad"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement>
              <ChevronDownIcon />
            </InputRightElement>
          </InputGroup>
          {filteredActivities.map((a) => (
            <MenuItem
              key={a.id}
              onClick={() => {
                setValue(name, a.id, { shouldValidate: true });
                setSelectedActivity(a.nombre);
                setSearchTerm("");
              }}
            >
              {a.nombre}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        type="hidden"
        {...register(name, {
          required: "Debes brindar un tipo de actividad",
        })}
      />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};
