import { Box, Button, useToast } from "@chakra-ui/react";
import { TextField } from "../../ui/text-field";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userService } from "../../services/user-service";
import { useAuth } from "../../providers/auth/AuthContext";

export function SignUpForm() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  //
  const [touchedNombre, setTouchedNombre] = useState(false);
  const [touchedApellido, setTouchedApellido] = useState(false);
  const [touchedUsuario, setTouchedUsuario] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedContrasenia, setTouchedContrasenia] = useState(false);
  const [touchedConfirmarContrasenia, setTouchedConfirmarContrasenia] =
    useState(false);
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  //
  const auth = useAuth();
  //
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    touchedSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(event.target.value);
    touchedSetter(true);
  };
  //
  const handlerNombre = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange(event, setNombre, setTouchedNombre);
  const handlerApellido = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange(event, setApellido, setTouchedApellido);
  const handlerUsuario = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange(event, setUsuario, setTouchedUsuario);
  const handlerEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange(event, setEmail, setTouchedEmail);
  const handlerContrasenia = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleInputChange(event, setContrasenia, setTouchedContrasenia);
  const handlerConfirmarContrasenia = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    handleInputChange(
      event,
      setConfirmarContrasenia,
      setTouchedConfirmarContrasenia
    );

  //
  const validarCampo = (value: string): boolean => value === "";
  const validarContrasenia = (passUno: string, passDos: string): boolean =>
    passUno != passDos;
  const validarFormatoEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  };

  //
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  //
  const sendData = async () => {
    if (
      !validarCampo(nombre) &&
      !validarCampo(apellido) &&
      !validarCampo(usuario) &&
      !validarFormatoEmail(email) &&
      !validarCampo(contrasenia) &&
      !validarCampo(confirmarContrasenia)
    ) {
      try {
        const rta = await userService.singUp({
          nombre,
          apellido,
          email,
          usuario,
          contrasenia,
        });
        auth.login(rta.id);
        auth.changeUsername(rta.username);
        navigate("/");
      } catch (e) {
        setTimeout(() => {
          setIsLoading(false);
          toast({
            description: "Hubo con error al registrarse. Inténtelo más tarde.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }, 2000);
      }
    } else {
      setTouchedNombre(true);
      setTouchedApellido(true);
      setTouchedUsuario(true);
      setTouchedEmail(true);
      setTouchedContrasenia(true);
      setTouchedConfirmarContrasenia(true);
    }
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={1} maxWidth={"33vw"}>
      <Box display={"flex"} gap={5} maxWidth={"33vw"}>
        <TextField
          isRequired={true}
          size="md"
          label="Nombre"
          isError={validarCampo(nombre)}
          touched={touchedNombre}
          errorMessage="Ingrese nombre"
          onChange={handlerNombre}
          handleKeyDown={handleKeyPress}
        />
        <TextField
          isRequired={true}
          size="md"
          label="Apellido"
          isError={validarCampo(apellido)}
          touched={touchedApellido}
          errorMessage="Ingrese apellido"
          onChange={handlerApellido}
          handleKeyDown={handleKeyPress}
        />
      </Box>
      <TextField
        isRequired={true}
        size="md"
        label="Usuario"
        isError={validarCampo(usuario)}
        touched={touchedUsuario}
        errorMessage="Ingrese el nombre de usuario"
        onChange={handlerUsuario}
        handleKeyDown={handleKeyPress}
      />
      <TextField
        isRequired={true}
        size="md"
        label="Email"
        isError={validarFormatoEmail(email)}
        touched={touchedEmail}
        errorMessage="Ingrese un e-mail válido"
        onChange={handlerEmail}
        handleKeyDown={handleKeyPress}
      />
      <TextField
        isRequired={true}
        size="md"
        inputType="password"
        label="Contraseña"
        isError={validarCampo(contrasenia)}
        touched={touchedContrasenia}
        errorMessage="Ingrese una contraseña"
        onChange={handlerContrasenia}
        handleKeyDown={handleKeyPress}
      />
      <TextField
        isRequired={true}
        size="md"
        inputType="password"
        label="Confirmar contraseña"
        isError={validarContrasenia(contrasenia, confirmarContrasenia)}
        touched={touchedConfirmarContrasenia}
        errorMessage="Las contraseñas deben ser iguales"
        onChange={handlerConfirmarContrasenia}
        handleKeyDown={handleKeyPress}
      />
      <Button isLoading={isLoading} onClick={sendData} type="submit">
        Registrarse
      </Button>
    </Box>
  );
}
