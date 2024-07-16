import { Box, Container, HStack, Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { textType } from "../../types/Text";
import { technologies } from "./technologies";
import {
  Heading,
  Avatar,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { team } from "./members";
import { BrandIcon } from "../../ui/icons/BrandIcon";

export function AboutPage() {
  return (
    <Container
      maxW={"full"}
      height={"86vh"}
      overflow={"auto"}
      px={{ base: 0, md: 50, xl: 80 }}
    >
      <Box display={"flex"} flexDirection={"column"} gap={8}>
        <Box display={"flex"} flexDir={"column"} pt={8} gap={5}>
          <HStack justifyContent={"center"} gap={10}>
            <Title text="Yo me sumo" />
            <BrandIcon boxSize={24} />
          </HStack>
          <ItalicDescription text="`¿Te falta uno? ¡Yo me sumo!`" />
        </Box>
        <Box display={"flex"} flexDir={"column"} gap={5}>
          <Subtitle text="Objetivo" />
          <NormalText text="Nuestra aplicación busca resolver una problemática proporcionando una plataforma donde los usuarios puedan crear perfiles, especificar sus intereses deportivos y de ocio, y buscar compañeros de juego o eventos locales basados en sus preferencias. Al hacerlo, la aplicación facilita la conexión entre personas con intereses similares, promoviendo la participación en actividades deportivas y recreativas y fomentando un estilo de vida activo y socialmente conectado." />
        </Box>
        <Subtitle text="Nuestro equipo" />
        <Team />
        <Box display={"flex"} flexDir={"column"} gap={5} mb={10}>
          <Subtitle text="Tecnologias" />
          <Technologies />
        </Box>
      </Box>
    </Container>
  );
}

function Team() {
  return (
    <Stack
      as={Box}
      direction={{ base: "column", md: "row" }}
      justify={{ base: "none", md: "center", sm: "center" }}
      align={"center"}
      wrap={{ base: "nowrap", md: "wrap" }}
      spacing={{ base: 8, md: 14 }}
    >
      {team.map((member) => (
        <Member
          name={member.name}
          role={member.role}
          photo={member.photo}
          github={member.github}
          linkedIn={member.linkedIn}
        />
      ))}
    </Stack>
  );
}

type memberType = {
  name: string;
  role: string;
  photo: string;
  github: string;
  linkedIn: string;
};

export default function Member({
  name,
  role,
  photo,
  github,
  linkedIn,
}: memberType) {
  return (
    <Box
      minW={"260px"}
      maxW={"260px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      textAlign={"center"}
    >
      <Avatar size={"xl"} src={photo} mb={4} pos={"relative"} />
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {name}
      </Heading>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        {role}
      </Text>
      <Stack mt={8} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          as="a"
          target="_blank"
          href={github}
          textColor={"white"}
          rounded={"full"}
          backgroundColor={"#2b3137"}
          _hover={{
            bg: "#24292e",
          }}
          _focus={{
            bg: "#24292e",
          }}
        >
          Github
        </Button>
        <Button
          as="a"
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          target="_blank"
          href={linkedIn}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          LinkedIn
        </Button>
      </Stack>
    </Box>
  );
}

function Technologies() {
  return (
    <Stack
      as={Box}
      direction={{ base: "column", md: "row", sm: "row" }}
      justify={{ base: "none", md: "center", sm: "center" }}
      align={"center"}
      wrap={{ base: "nowrap", sm: "wrap" }}
      spacing={{ base: 8, md: 14 }}
    >
      <Icon
        src={technologies["React"]}
        alt="ts_icon"
        description="React"
      ></Icon>
      <Icon
        src={technologies["TypeScript"]}
        alt="ts_icon"
        description="TypeScript"
      ></Icon>
      <Icon
        src={technologies["ChakraUI"]}
        alt="ts_icon"
        description="Chakra UI"
      ></Icon>
      <Icon
        src={technologies["Kotlin"]}
        alt="ts_icon"
        description="Kotlin"
      ></Icon>
      <Icon
        src={technologies["SpringBoot"]}
        alt="ts_icon"
        description="SpringBoot"
      ></Icon>
      <Icon
        src={technologies["PostgreSQL"]}
        alt="ts_icon"
        description="PostgreSQL"
      ></Icon>
    </Stack>
  );
}

type iconType = {
  src: string;
  alt: string;
  description: string;
};

function Icon({ src, alt, description }: iconType) {
  return (
    <Box className="animacion" textAlign={"center"}>
      <Image
        marginX={"auto"}
        maxH="50px"
        maxW="50px"
        src={src}
        alt={alt}
      ></Image>
      <Description>{description}</Description>
    </Box>
  );
}

function Description({ children }: any) {
  return (
    <Text as="samp" color="fontColor">
      {children}
    </Text>
  );
}

/* Texts*/
function Title({ text }: textType) {
  return (
    <Heading color="brand.300" textAlign="center" fontSize="5xl">
      {text}
    </Heading>
  );
}
function ItalicDescription({ text }: textType) {
  return (
    <Text fontSize="lg" fontStyle={"italic"} align="center">
      {text}
    </Text>
  );
}
function Subtitle({ text }: textType) {
  return (
    <Heading color="brand.400" fontSize="3xl" fontWeight={"semibold"}>
      {text}
    </Heading>
  );
}
function NormalText({ text }: textType) {
  return <Text fontSize="lg">{text}</Text>;
}

/* */
