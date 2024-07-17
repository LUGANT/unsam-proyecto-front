import { useState } from "react";
import { TextField, TextFieldSecret } from "../../ui/text-field";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user-service";
import { useAuth } from "../../providers/auth/AuthContext";

export function LoginForm() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [touchedUsuario, setTouchedUsuario] = useState(false);
  const [touchedContrasenia, setTouchedContrasenia] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const auth = useAuth();

  const handlerUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value);
    setTouchedUsuario(true);
  };

  const handlerContrasenia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContrasenia(event.target.value);
    setTouchedContrasenia(true);
  };

  const validarCampo = (value: string) => {
    return value === "";
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const sendData = async () => {
    if (!validarCampo(usuario) && !validarCampo(contrasenia)) {
      setIsLoading(true);
      try {
        await userService.loggin({
          usuario: usuario.toLowerCase(),
          contrasenia,
        });
        const user = await userService.getUser();
        console.log(user)
        auth.login(user.id);
        auth.updateUser({ username: user.username, imgUrl: user.imgUrl });
        navigate("/");
      } catch (e) {
        setTimeout(() => {
          setIsLoading(false);
          toast({
            description: "El usuario o la contraseña son incorrectas",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }, 2000);
      }
    } else {
      setTouchedUsuario(true);
      setTouchedContrasenia(true);
    }
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={5} maxWidth={"33vw"}>
      <TextField
        isRequired={true}
        size="md"
        label="USUARIO"
        isError={validarCampo(usuario)}
        touched={touchedUsuario}
        errorMessage="Ingrese un usuario"
        onChange={handlerUsuario}
        handleKeyDown={handleKeyPress}
      />
      <TextFieldSecret
        isRequired={true}
        size="md"
        label="CONTRASEÑA"
        isError={validarCampo(contrasenia)}
        touched={touchedContrasenia}
        errorMessage="Ingrese una contraseña"
        onChange={handlerContrasenia}
        handleKeyDown={handleKeyPress}
      />
      <Button isLoading={isLoading} onClick={sendData} type="submit">
        Ingresar
      </Button>
    </Box>
  );
}
