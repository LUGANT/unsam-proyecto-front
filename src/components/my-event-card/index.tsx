import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MyEventCard({ handler }: any) {
  return (
    <Box bgColor="white" borderRadius="md" p="4" shadow="md" minWidth={"350px"}>
      <Box display={"flex"} flexDirection={"column"} gap={5}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar size={"md"} bg={"brand.300"} />
          <Box>
            <Heading as="h5" textAlign={"left"} size="md" mb="2">
              Card Title
            </Heading>
            <Text color="gray.500">Secondary Text</Text>
          </Box>
        </Flex>
        <Text color="gray.500">
          Greyhound divisively hello coldly wonderfully marginally far upon
          excluding.
        </Text>
      </Box>
      <Flex
        mt="4"
        justifyContent="space-between"
        paddingX={"10px"}
        alignItems="center"
      >
        <Flex gap={3}>
          <Text fontWeight={"bold"}>Solicitudes</Text>
          <Box>
            <Box position="relative">
              <Button size="xs" onClick={handler} color={"blue.500"}>
                <DragHandleIcon />
              </Button>
              <Box
                position="absolute"
                top="-6px"
                right="-12px"
                w="20px"
                h="20px"
                bgColor="brand.300"
                fontSize={"12px"}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="bold"
              >
                10
              </Box>
            </Box>
          </Box>
        </Flex>
        <IconButton
          aria-label="Search database"
          backgroundColor={"transparent"}
          icon={<DeleteIcon />}
        />
      </Flex>
    </Box>
  );
}
