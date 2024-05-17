import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import { RequestItem } from "../../components/request-item";
import { useEffect, useState } from "react";
import requestService from "../../services/request-service";

export const RequestsForAnEvent = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [requests, setRequests] = useState<Solicitud[]>();
  useEffect(() => {
    const res = async () => {
      const res = await requestService.getByEvent();
      setRequests(res);
    };
    res();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
