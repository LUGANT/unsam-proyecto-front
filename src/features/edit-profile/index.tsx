import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import ImageUpload from "../../features/image-upload";
import { useAuth } from "../../providers/auth/AuthContext";
import { userService } from "../../services/user-service";
import { getUrlFromCloudinary } from "../../util/cloudinary";
export const EditProfile = ({
  isOpen,
  onClose,
  usuario,
}: {
  isOpen: boolean;
  onClose: () => void;
  usuario: UserData;
}) => {
  const {
    isOpen: actionAlertIsOpen,
    onOpen: actionAlertOnOpen,
    onClose: actionAlertOnClose,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [userData, setUserData] = useState<UserData>({ ...usuario }); // Inicializa userData con los datos del usuario recibido
  const [imgStatus, setImgStatus] = useState<{
    selectedFile: File | null;
    imgChanged: boolean;
  }>({ selectedFile: null, imgChanged: false });
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const auth = useAuth(); // Ajusta esta línea según cómo obtienes el objeto de autenticación

  // Manejador para cambios en el nombre de usuario
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, username: event.target.value });
  };

  // Manejador para enviar los cambios al backend
  const handleSubmit = async () => {
    const updatedFields: UserData = {
      username: "",
      imgUrl: "",
    };

    // Verifica qué campos han cambiado y actualiza el objeto a enviar
    if (userData.username !== usuario.username) {
      updatedFields.username = userData.username;
    }
    if (imgStatus.imgChanged) {
      try {
        updatedFields.imgUrl = await getUrlFromCloudinary(
          imgStatus.selectedFile!
        ); // Ajusta esta llamada según tu lógica para obtener la URL de Cloudinary
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar la imagen. Inténtelo más tarde.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Envía solo los datos que han cambiado al backend
      await userService.updateUser(auth.userId, updatedFields);

      // Actualiza los datos del usuario en el contexto de autenticación
      auth.updateUser({ ...usuario, ...updatedFields });

      toast({
        title: "Datos actualizados",
        description: "Los cambios se han guardado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Cierra sesión para aplicar los cambios
      auth.logout();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar los datos. Inténtelo más tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent
          height={"auto"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          m={"auto"}
        >
          <ModalHeader fontSize={"2xl"} textAlign={"center"} w={"full"}>
            Editar mis datos
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
              <ImageUpload
                imgUrl={userData.imgUrl}
                imgStatus={imgStatus}
                onImgChange={setImgStatus}
              />

              <FormControl
                flex={"1"}
                display={"flex"}
                flexDirection={"column"}
                mt={"20px"}
              >
                <FormLabel fontSize={"xs"} opacity={".5"}>
                  Usuario
                </FormLabel>
                <Input
                  onChange={handleUsernameChange}
                  defaultValue={userData.username}
                />
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter alignSelf={"flex-end"}>
            <Button
              variant="ghost"
              color="brand.300"
              mr={3}
              onClick={onClose}
              disabled={loading}
            >
              CANCELAR
            </Button>
            <Button
              _hover={{ bg: "purple.400" }}
              bg="brand.300"
              color="white"
              onClick={actionAlertOnOpen}
              isLoading={loading}
            >
              GUARDAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={actionAlertIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={actionAlertOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cambiar datos
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres cambiar tus datos? Tendrás que
              iniciar sesión con los nuevos cambios.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={actionAlertOnClose}>
                Cancelar
              </Button>
              <Button colorScheme="brand" onClick={handleSubmit} ml={3}>
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
