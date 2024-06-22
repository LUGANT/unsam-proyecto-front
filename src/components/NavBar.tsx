import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth/AuthContext";
import { BrandIcon } from "../ui/icons/BrandIcon";
import { capitalLetter } from "../util/capitalLetter";

interface Props {
  children: React.ReactNode;
  route: string;
}

const Links = [
  { name: "Acerca", route: "/about" },
  { name: "Mis eventos", route: "/mis-eventos" },
  { name: "Equipos", route: "/equipos" },
];

const NavLink = (props: Props) => {
  const { children, route } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={route}
    >
      <ChakraLink
        as={ReactRouterLink}
        to={route}
        _hover={{
          textDecoration: "none",
        }}
      >
        {children}
      </ChakraLink>
    </Box>
  );
};

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [islogged, setIsLogged] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn, logout, username } = useAuth();

  useEffect(() => {
    setIsLogged(isLoggedIn);
  }, []);

  const handlerLogOut = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position={"sticky"}
        top={0}
        left={0}
        zIndex={9}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={{ base: 1, md: 8 }} alignItems={"center"}>
            <ChakraLink as={ReactRouterLink} to={"/"}>
              <BrandIcon boxSize={10} color="#341c54" />
            </ChakraLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, id) => (
                <NavLink key={id} route={link.route}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
            <SearchInput />
          </HStack>
          <Flex alignItems={"center"} gap={4}>
            <Text display={{ base: "none", md: "inline" }}>
              {capitalLetter(username)}
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {islogged ? <Avatar size={"sm"} bg={"brand.300"} /> : <></>}
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactRouterLink} to={`/profile/` + username}>
                  Ver perfil
                </MenuItem>
                <MenuItem as={ReactRouterLink} to={"/profile/change-password"}>
                  Cambiar contraseña
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handlerLogOut}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, id) => (
                <NavLink key={id} route={link.route}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/buscar-eventos/" + search);
  };

  return (
    <form onSubmit={(e) => handlerSubmit(e)}>
      <HStack>
        <Input
          placeholder="Busca una actividad"
          bg={"gray.50"}
          boxShadow={"base"}
          border={0}
          color={"gray.500"}
          _placeholder={{
            color: "gray.500",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="submit"
          aria-label={"search-icon"}
          icon={<FaSearch />}
        ></IconButton>
      </HStack>
    </form>
  );
};
