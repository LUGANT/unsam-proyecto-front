import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RequestItem } from "../../components/request-item";
import eventService from "../../services/event-service";
import { Solicitud } from "../../types/Event";

export const RequestsForAnEvent = ({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [requests, setRequests] = useState<Solicitud[]>();
  const fetchRequests = async () => {
    const res = await eventService.getRequests(id);
    setRequests(res);
  };
  useEffect(() => {
    if (id) {
      fetchRequests();
    }
  }, [id, onClose]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minHeight={"80%"}
        maxHeight={"90%"}
        overflowY={"auto"}
        gap="10px"
      >
        <ModalHeader>Solicitudes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex height="100%" direction={"column"} gap={10}>
            {requests?.map((r) => (
              <RequestItem
                key={r.id}
                id={r.id}
                request={r}
                onAction={onClose}
              />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
