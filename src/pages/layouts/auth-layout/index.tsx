import { Outlet } from "react-router-dom";
import { Footer } from "../../../components/footer";
import { Box, Flex } from "@chakra-ui/react";

export function AuthLayout() {
  return (
    <Flex flexDir={"column"} height={"100vh"} justify={"space-between"}>
      <Outlet />
      <Footer />
    </Flex>
  );
}
