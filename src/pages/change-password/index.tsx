import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BrandIcon } from "../../ui/icons/BrandIcon";
import { useForm } from "react-hook-form";
import { userService } from "../../services/user-service";
import { useAuth } from "../../providers/auth/AuthContext";
import { useState } from "react";

export function ChangePasswordPage() {
  return (
    <Box
      display="flex"
      flexDir={"column"}
      justifyContent="center"
      alignItems="center"
      width={"100vw"}
      height={"86vh"}
      gap={10}
    >
      <VStack>
        <BrandIcon boxSize={24} />
        <Heading color="brand.300" size="xl">
          Yo me sumo
        </Heading>
        <Text fontSize="lg">Conectá, coordiná y divertite acompañado!</Text>
      </VStack>
      <ChangePassWordForm />
    </Box>
  );
}

function ChangePassWordForm() {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();
  const { userId } = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await userService.updatePassword(
        userId!!,
        values.currentPassword,
        values.newPassword
      );
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "La contraseña fue actualizada con éxito.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }, 2000);
    } catch (e) {
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          //@ts-ignore
          title: e.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Contraseña actual */}
      <FormControl isInvalid={errors.currentPassword} mb={4}>
        <FormLabel htmlFor="currentPassword">Contraseña Actual</FormLabel>
        <Input
          id="currentPassword"
          type="password"
          {...register("currentPassword", {
            required: "Este campo es obligatorio",
          })}
        />
        <FormErrorMessage>
          {errors.currentPassword && errors.currentPassword.message}
        </FormErrorMessage>
      </FormControl>
      {/* Nueva contraseña */}
      <FormControl isInvalid={errors.newPassword} mb={4}>
        <FormLabel htmlFor="newPassword">Nueva Contraseña</FormLabel>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword", {
            required: "Este campo es obligatorio",
          })}
        />
        <FormErrorMessage>
          {errors.newPassword && errors.newPassword.message}
        </FormErrorMessage>
      </FormControl>
      {/* Confirmar nueva contraseña */}
      <FormControl isInvalid={errors.confirmPassword} mb={4}>
        <FormLabel htmlFor="confirmPassword">
          Confirmar Nueva Contraseña
        </FormLabel>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              value === watch("newPassword") || "Las contraseñas no coinciden",
          })}
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
      {/* Boton para confirmar */}
      <Box display={"flex"} justifyContent={"center"}>
        <Button isLoading={isSubmitting} type="submit">
          Enviar
        </Button>
      </Box>
    </form>
  );
}
