import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { StarRating } from "../../components/star-rating";
import { EditProfile } from "../../features/edit-profile";
import { useAuth } from "../../providers/auth/AuthContext";
import { userService } from "../../services/user-service";
import { capitalLetter } from "../../util/capitalLetter";
import { castDate } from "../../util/date";

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
        <Avatar src={auth.imgUrl} size={"2xl"} bg={"brand.300"} />
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
      <EditProfile
        isOpen={isOpen}
        onClose={onClose}
        usuario={{ username: auth.username, imgUrl: auth.imgUrl }}
      />
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
      <Avatar src={opinion.opinante.imgUrl} size={"md"} bg={"brand.300"} />
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
