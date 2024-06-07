import { Container, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { RequestsForAnEvent } from "../../features/event-requests";
import { EventByUserId } from "../../features/event-requests/eventByUserId";
import { CreateEventPopup } from "../../features/create-event";

export const MisEventos = () => {
  const [eventRequestSelected, setEventRequestSelected] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openRequest, setOpenRequest] = useState(false);

  const toggleOpenRequest = () => {
    setOpenRequest(!openRequest);
  };
  return (
    <Container minHeight={"86vh"} maxW={"full"}>
      <EventByUserId
        onRequestsOpen={setEventRequestSelected}
        onOpen={onOpen}
        toggleOpenRequest={toggleOpenRequest}
      />
      <CreateEventPopup isOpen={isOpen} onClose={onClose} />
      <RequestsForAnEvent
        id={eventRequestSelected}
        isOpen={openRequest}
        onClose={toggleOpenRequest}
      />
    </Container>
  );
};
{
}
