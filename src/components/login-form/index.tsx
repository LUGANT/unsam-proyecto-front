import { useState } from "react"
import { TextField } from "../../ui/text-field"
import { ButtonUi } from "../../ui/button"
import { Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { userService } from "../../services/user-service/user-service"

export function LoginForm(){
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [touchedUsuario, setTouchedUsuario] = useState(false)
  const [touchedContrasenia, setTouchedContrasenia] = useState(false)

  const handlerUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value)
    setTouchedUsuario(true)
  }

  const handlerContrasenia = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContrasenia(event.target.value)
    setTouchedContrasenia(true)
  }

  const validarCampo = (value: string) => {
    return value === ''
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { sendData(); }
  }

  const sendData = async () => {
    if(!validarCampo(usuario) && !validarCampo(contrasenia) && await userService.loggin({usuario,contrasenia})){
      navigate('/home')
    }else{
      setTouchedUsuario(true)
      setTouchedContrasenia(true)
    }
  }
  
  return <Box display={"flex"} flexDir={"column"} gap={5} maxWidth={"33vw"}>
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
    <TextField 
      isRequired={true} 
      size="md" 
      inputType="password"
      label="CONTRASEÑA" 
      isError={validarCampo(contrasenia)} 
      touched={touchedContrasenia} 
      errorMessage="Ingrese una contraseña" 
      onChange={handlerContrasenia} 
      handleKeyDown={handleKeyPress}
    />
    <ButtonUi onClick={sendData} type="submit">Ingresar</ButtonUi>
  </Box>
}