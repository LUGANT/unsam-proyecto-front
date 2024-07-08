import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { Participante } from "../types/Event";
import reviewService from "../services/review-service";
import { useNavigate } from "react-router-dom";

function UserReview({
  userId,
  isOpen,
  onClose,
  participant,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  participant: Participante;
}) {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RatingData>({
    defaultValues: {
      usuarioId: participant.id,
      usuarioOpinadorId: userId!!,
      puntaje: 0,
      comentario: "",
    },
  });
  const handleCancel = () => {
    reset();
    onClose();
  };
  const onSubmit = async (data: RatingData) => {
    if (data.puntaje === 0) {
      setError("puntaje", {
        type: "manual",
        message: "La calificación es requerida",
      });
      return;
    }
    try {
      await reviewService.create(data);
      toast({
        title: "Calificacion enviada.",
        description: `Has calificado correctamente a ${participant.username}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Algo inesperado ocurrió",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    onClose();
    reset();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
      <ModalOverlay />
      <ModalContent
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        height={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        m={"auto"}
      >
        <ModalHeader fontSize={"2xl"} textAlign={"center"} w={"full"}>
          ¡Califica a tu compañero!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} w={"full"}>
          <Flex
            direction="column"
            gap={"1rem"}
            flex={"1"}
            alignItems={"center"}
            w={"full"}
          >
            <Avatar size={"xl"} bg={"brand.300"} />
            <Text>{`${participant.username}`}</Text>
            <VStack gap={"10px"}>
              <FormControl isInvalid={!!errors.puntaje}>
                <FormLabel>Calificación</FormLabel>
                <Controller
                  name="puntaje"
                  control={control}
                  rules={{ required: "La calificación es requerida" }}
                  render={({ field }) => (
                    <Rating
                      rating={field.value}
                      setRating={(rating) => setValue("puntaje", rating)}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.puntaje && errors.puntaje.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.comentario}>
                <FormLabel>Comentarios</FormLabel>
                <Controller
                  name="comentario"
                  control={control}
                  rules={{ required: "El comentario es requerido" }}
                  render={({ field }) => (
                    <Textarea
                      placeholder="Escribe tu calificación aquí..."
                      resize={"none"}
                      w={"xs"}
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.comentario && errors.comentario.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter alignSelf={"flex-end"}>
          <Button
            variant="ghost"
            color="brand.300"
            mr={3}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            _hover={{ bg: "purple.400" }}
            bg="brand.300"
            color="white"
          >
            Aceptar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const Rating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <HStack>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <IconButton
            key={ratingValue}
            icon={<FaStar />}
            color={ratingValue <= (hover || rating) ? "yellow.400" : "gray.300"}
            variant="ghost"
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Rate ${ratingValue}`}
          />
        );
      })}
    </HStack>
  );
};

export default UserReview;
