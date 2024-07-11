import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { StarRating } from "../../components/star-rating";
import { useAuth } from "../../providers/auth/AuthContext";
import { userService } from "../../services/user-service";
import { EditProfile } from "../../features/edit-profile";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuth();
  const [profile, setProfile] = useState<Profile>();
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  const getUserData = async () => {
    const profile = await userService.getUserData(auth.userId);
    console.log(profile);
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
            <ReviewMiniCard opinion={opinion} />
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
  return (
    <Flex w={"20rem"}>
      <Avatar size={"md"} bg={"brand.300"} />
      <Flex w={"100%"} gap={"10px"} px={"10px"} flexDirection={"column"}>
        <Flex justifyContent={"space-between"} w={"100%"} textAlign={"center"}>
          <Box>
            <Text fontSize={"sm"}>{opinion.opinante.username}</Text>
            {/* <Text fontSize={"xs"}>futbol?</Text> */}
          </Box>
          <Box>
            <HStack gap={"5px"}>
              <StarRating rating={opinion.puntaje} />
            </HStack>
            <Text>{opinion.fecha.toString()}</Text>
          </Box>
        </Flex>
        <Text>{opinion.comentario}</Text>
      </Flex>
    </Flex>
  );
};
