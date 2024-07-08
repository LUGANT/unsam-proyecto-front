import { WarningTwoIcon } from "@chakra-ui/icons";
import { RiPencilFill } from "react-icons/ri";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  Input,
  useToast,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  IconButton,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { userService } from "../../services/user-service";
import { useAuth } from "../../providers/auth/AuthContext";
import Toast from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { StarRating } from "../../components/star-rating";
import { castDate } from "../../util/date";
import { capitalLetter } from "../../util/capitalLetter";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const [profile, setProfile] = useState<Profile>();
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  const getUserData = async () => {
    const profile = await userService.getUserData(auth.userId);
    setProfile(profile);
    setOpinions(profile.opiniones);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Flex flexDirection={"column"} flex={"1"}>
      <Flex
        flexGrow={"1"}
        bg={"gray.200"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"20px"}
      >
        <Avatar size={"2xl"} bg={"brand.300"} />
        <VStack alignItems={"flex-start"}>
          <Text fontSize={"3xl"} fontWeight={"semibold"}>
            {auth.username}
          </Text>
          <Text fontSize={"xl"}>
            {profile?.usuario.nombre} {profile?.usuario.apellido}
          </Text>
          <StarRating rating={profile?.usuario.puntuacion || 0} outline />
        </VStack>
        <Icon
          as={RiPencilFill}
          boxSize={"35px"}
          onClick={onOpen}
          cursor={"pointer"}
        />
      </Flex>
      <Flex flexGrow={"4"} flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={"xl"} fontWeight={"semibold"} my={"50px"}>
          Ultimas reseñas
        </Text>
        <VStack spacing={"50px"}>
          {opinions.map((opinion) => (
            <ReviewMiniCard key={opinion.id} opinion={opinion} />
          ))}
        </VStack>
      </Flex>
      <EditProfile isOpen={isOpen} onClose={onClose} usuario={auth.username} />
    </Flex>
  );
}

export default Profile;

const ReviewMiniCard = ({ opinion }: { opinion: Opinion }) => {
  const toast = useToast();
  const [reportExist, setReportExist] = useState<boolean>(
    opinion.existeReporte
  );
  const handlerReport = async () => {
    try {
      await userService.reportOpinion(opinion.id, opinion.opinado.id);
      toast({
        title: "Reporte enviado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setReportExist(!reportExist);
    } catch (e) {
      toast({
        title: "Ocurrió un error.",
        description: "No se puede reportar el comentario más de una vez.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex w={"20rem"}>
      <Avatar size={"md"} bg={"brand.300"} />
      <Flex w={"100%"} gap={"10px"} px={"10px"} flexDirection={"column"}>
        <Flex justifyContent={"space-between"} w={"100%"} textAlign={"center"}>
          <Box>
            <Text fontSize={"sm"}>
              {capitalLetter(opinion.opinante.username)}
            </Text>
            {/* <Text fontSize={"xs"}>futbol?</Text> */}
          </Box>
          <Flex gap={"10px"} px={"10px"} justifyContent={"space-between"}>
            <Box>
              <HStack gap={"5px"}>
                <StarRating rating={opinion.puntaje} />
              </HStack>
              <Text>{castDate(opinion.fecha)}</Text>
            </Box>
            <IconButton
              aria-label="warning"
              icon={<WarningTwoIcon />}
              size="sm"
              onClick={handlerReport}
              isDisabled={reportExist}
            />
          </Flex>
        </Flex>
        <Text>{opinion.comentario}</Text>
      </Flex>
    </Flex>
  );
};

const EditProfile = ({
  isOpen,
  onClose,
  usuario,
}: {
  isOpen: boolean;
  onClose: () => void;
  usuario: string;
}) => {
  const {
    isOpen: actionAlertIsOpen,
    onOpen: actionAlertOnOpen,
    onClose: actionAlertOnClose,
  } = useDisclosure();
  const [nuevoUsername, setNuevoUsername] = useState(usuario);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNuevoUsername(event.target.value);
  };

  const handlerSubmit = async () => {
    setLoading(true);
    try {
      await userService.updateUsername(auth.userId, nuevoUsername);
      auth.changeUsername(nuevoUsername);
      toast({
        title: "El nombre del usuario fue cambiado con éxito",
        description: "Necesita iniciar sesión nuevamente para efectuar cambios",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      auth.logout();
    } catch (e) {
      Toast({
        title: "Error 500",
        message:
          "No se pudo actualiza el nombre del usuario, intentelo mas tarde",
        status: "error",
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
              <Avatar size={"2xl"} bg={"brand.300"} />
              <FormControl
                flex={"1"}
                display={"flex"}
                flexDirection={"column"}
                mt={"20px"}
              >
                <FormLabel fontSize={"xs"} opacity={".5"}>
                  Usuario
                </FormLabel>
                <Input onChange={handlerChange} defaultValue={usuario}></Input>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter alignSelf={"flex-end"}>
            <Button variant="ghost" color="brand.300" mr={3} onClick={onClose}>
              CANCELAR
            </Button>
            <Button
              _hover={{ bg: "purple.400" }}
              bg="brand.300"
              color="white"
              onClick={actionAlertOnOpen}
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
              Cambiar username
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de que quieres cambiarte el username? Tendrás que
              iniciar sesión con los nuevos cambios.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={actionAlertOnClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="brand"
                onClick={handlerSubmit}
                ml={3}
                isLoading={loading}
              >
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
