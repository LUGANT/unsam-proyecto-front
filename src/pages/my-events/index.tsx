import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react";
import { MyEventCard } from "../../components/my-event-card";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";
import { RequestItem } from "../../components/request-item";

export function MyEventsPage() {
  const [open, setOpen] = useState(false);
  const handlerOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container maxW={"full"}>
        <Stack
          as={Box}
          justify={"center"}
          align={"center"}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          overflow={"scroll"}
          height={"86vh"}
        >
          <Button
            width="20%"
            variant="outline"
            paddingY={2}
            textAlign={"center"}
            borderRadius={"none"}
            borderColor={"brand.300"}
            color="brand.300"
          >
            + Crear
          </Button>
          <MyEventCard handler={handlerOpen}></MyEventCard>
          <MyEventCard handler={handlerOpen}></MyEventCard>
          <MyEventCard handler={handlerOpen}></MyEventCard>
          <Modal isOpen={open} onClose={handlerOpen}>
            <ModalOverlay />
            <ModalContent
              minHeight={"80%"}
              maxHeight={"90%"}
              overflowY={"scroll"}
              gap="10px"
            >
              <ModalHeader>Solicitudes</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex height="100%" direction={"column"} gap={10}>
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                  <RequestItem />
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Stack>
      </Container>
    </>
  );
}
