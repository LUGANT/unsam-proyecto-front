import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../providers/auth/AuthContext";
import { userService } from "../../services/user-service";

interface SuggestionFormValues {
  suggestion: string;
}

export const SuggestActivity = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userId } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SuggestionFormValues>();

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<SuggestionFormValues> = async (data) => {
    console.log("Suggested Activity:", data.suggestion);
    try {
      await userService.sendSuggest(userId!, data.suggestion);
      handleClose();
      toast({
        title: "Sugerencia enviada.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Algo inesperado ocurrió",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ bgColor: "brand.300", color: "white" }}
      >
        Sugerila acá
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          w="full"
          maxW="500px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalHeader>¿Qué actividad debería estar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              justify={"center"}
              align={{ base: "center", md: "stretch" }}
              gap={5}
            >
              <VStack maxW={"full"} gap={8}>
                <FormControl isInvalid={!!errors.suggestion}>
                  <FormLabel>Actividad</FormLabel>
                  <Input
                    w={"full"}
                    minW={"sm"}
                    placeholder="ejemplo: Running"
                    {...register("suggestion", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.suggestion && errors.suggestion.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={{ base: "center", md: "flex-end" }}>
            <Button type="submit" bg="brand.300" color={"white"} mr={3}>
              Enviar
            </Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
