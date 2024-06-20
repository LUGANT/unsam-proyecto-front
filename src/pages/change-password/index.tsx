import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BrandIcon } from "../../ui/icons/BrandIcon";
import { useForm, Validate } from "react-hook-form";
import { userService } from "../../services/user-service";
import { useAuth } from "../../providers/auth/AuthContext";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

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
    reset,
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
        reset();
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
      <InputSecret
        id="currentPassword"
        label="Contraseña Actual"
        error={errors.currentPassword}
        errorMessage={errors.currentPassword?.message}
        register={register}
      />
      <InputSecret
        id="newPassword"
        label="Nueva Contraseña"
        error={errors.newPassword}
        errorMessage={errors.newPassword?.message}
        register={register}
      />
      <InputSecret
        id="confirmPassword"
        label="Confirmar Nueva Contraseña"
        error={errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        register={register}
        validate={(value) =>
          value === watch("newPassword") || "Las contraseñas no coinciden"
        }
      />
      {/* Boton para confirmar */}
      <Box display={"flex"} justifyContent={"center"}>
        <Button isLoading={isSubmitting} type="submit">
          Enviar
        </Button>
      </Box>
    </form>
  );
}

type InputSecretType = {
  register: any;
  error: any;
  errorMessage: any;
  id: string;
  label: string;
  validate?: Validate<any, any> | Record<string, Validate<any, any>>;
};

function InputSecret({
  id,
  label,
  register,
  error,
  errorMessage,
  validate,
}: InputSecretType) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlerShowPassword = () => setShowPassword(!showPassword);

  return (
    <FormControl isInvalid={error} mb={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          {...register(id, {
            required: "Este campo es obligatorio",
            validate: validate,
          })}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handlerShowPassword}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{error && errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
