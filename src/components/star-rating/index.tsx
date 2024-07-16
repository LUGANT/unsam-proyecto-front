import { Box, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  outline?: boolean;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  outline = false,
}: StarRatingProps) => {
  return (
    <Box display="flex" alignItems="center">
      {Array.from({ length: maxRating }, (_, index) => (
        <Icon
          key={index}
          as={FaStar}
          color={index < rating ? "yellow.300" : "gray.300"}
          boxSize={5}
          stroke={outline ? "black" : "none"}
          strokeWidth={outline ? 15 : 0}
        />
      ))}
    </Box>
  );
};
