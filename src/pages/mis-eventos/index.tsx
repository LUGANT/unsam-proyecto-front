import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { RequestsForAnEvent } from "../../features/event-requests";
import { EventByUserId } from "../../features/user-events/eventByUserId";
import { CreateEventPopup } from "../../features/create-event";
import { EventsAssisted } from "../../features/user-events/eventsAssisted";
import { EventsToAssist } from "../../features/user-events/eventsToAssist";

export const MisEventos = () => {
  const [eventRequestSelected, setEventRequestSelected] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openRequest, setOpenRequest] = useState(false);

  const toggleOpenRequest = () => {
    setOpenRequest(!openRequest);
  };
  return (
    <Container minHeight={"86vh"} maxW={"full"}>
      <Tabs variant={"soft-rounded"} colorScheme="brand" isFitted>
        <TabList>
          <Tab>Mis eventos</Tab>
          <Tab>Proximos eventos</Tab>
          <Tab>Eventos finalizados</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <EventsToAssist />
          </TabPanel>
          <TabPanel>
            <EventsAssisted />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
{
}
