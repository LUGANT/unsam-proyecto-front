import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHandSparkles } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimpleEventCard = ({ handlerRequest }: any) => {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <HStack alignItems={"flex-start"} gap={6}>
          <Center rounded={"full"} bg="brand.300" p={1}>
            <Icon color={"white"} as={GiSoccerBall} fontSize={"2xl"} />
          </Center>
          <Stack alignItems={"flex-start"}>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Partido
            </Text>
            <Heading
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              textAlign={"left"}
              fontFamily={"body"}
            >
              Partido de Basquet en Plaza Mitre
            </Heading>
            <Text color={"gray.500"} textAlign={"left"}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </Text>
          </Stack>
        </HStack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"row"} spacing={0} align={"center"} gap={3}>
            <Text fontWeight={600}>Solicitudes</Text>
            <Box position={"relative"} onClick={handlerRequest}>
              <IconButton
                icon={<FaHandSparkles />}
                fontSize={"xl"}
                aria-label={"applications"}
              ></IconButton>
              <Badge
                variant="solid"
                colorScheme="green"
                rounded={"full"}
                w={5}
                h={5}
                p={0}
                position={"absolute"}
                top={0}
                right={-2}
                zIndex={9}
              >
                1
              </Badge>
            </Box>
          </Stack>
          <Spacer />
          <IconButton
            icon={<DeleteIcon />}
            fontSize={"xl"}
            aria-label={"delete-event"}
            _hover={{ bgColor: "red", color: "white" }}
          ></IconButton>
        </Stack>
      </Box>
    </Center>
  );
};
