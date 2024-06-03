import { Box, Image } from "@chakra-ui/react";
import { FullEventDetail } from "../../features/event-detail";

export const EventoDetail = () => {
  return (
    <Box w={"full"} m={0} h={"full"}>
      <Box w={"full"} h={"full"}>
        <Image
          h={"200px"}
          w={"full"}
          src={"https://www.wallpaperuse.com/wallp/53-530523_m.jpg"}
          objectFit="cover"
          alt="#"
        />
      </Box>
      <FullEventDetail />
    </Box>
  );
};
