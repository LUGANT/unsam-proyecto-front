import { StarIcon } from "@chakra-ui/icons"
import { RiPencilFill } from "react-icons/ri";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Box,
    Flex, 
    HStack, 
    Icon, 
    Image, 
    Text, 
    VStack,
    Input
} from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useState } from "react";

function Profile() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { username } = useParams();

    const [usuario, setUsuario] = useState(username)


    return (
        <Flex flexDirection={'column'} flex={'1'}>
            <Flex flexGrow={'1'} bg={'gray.200'} alignItems={'center'} justifyContent={'center'} gap={'20px'}>
                <Image src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" boxSize={'200px'} objectFit={'cover'} borderRadius={'full'} />
                <Box>
                    <Text fontSize={'3xl'} fontWeight={'semibold'}>{usuario}</Text>
                    <Text fontSize={'xl'}>Jose Lopez</Text>
                </Box>
                <Icon as={RiPencilFill} boxSize={'35px'} onClick={onOpen} cursor={'pointer'}/>
            </Flex>
            <Flex flexGrow={'4'} flexDirection={'column'} alignItems={'center'}>
                <Text fontSize={'xl'} fontWeight={'semibold'} my={'50px'}>Ultimas reseñas</Text>
                <VStack spacing={'50px'}>
                    <ReviewMiniCard />
                    <ReviewMiniCard />
                    <ReviewMiniCard />
                </VStack>
            </Flex>
            <EditProfile isOpen={isOpen} onClose={onClose} usuario={usuario}/>
        </Flex>
    )
}

export default Profile


const ReviewMiniCard = () => {
    return (
        <Flex w={'20rem'}>
            <Image src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" boxSize={'50px'} objectFit={'cover'} borderRadius={'full'} />
            <Flex w={'100%'} gap={'10px'} px={'10px'} flexDirection={'column'}>
                <Flex justifyContent={'space-between'} w={'100%'} textAlign={'center'}>
                    <Box>
                        <Text fontSize={'sm'}>PepeJ</Text>
                        <Text fontSize={'xs'}>futbol</Text>
                    </Box>
                    <Box>
                        <HStack gap={'5px'}>
                            <StarIcon boxSize={5} color={'brand.300'} />
                            <StarIcon boxSize={5} color={'brand.300'} />
                            <StarIcon boxSize={5} color={'brand.300'} />
                            <StarIcon boxSize={5} color={'brand.300'} />
                            <StarIcon boxSize={5} color={'brand.300'} />
                        </HStack>
                        <Text>24 de mar 2024</Text>
                    </Box>
                </Flex>
                <Text>Un capo!</Text>
            </Flex>
        </Flex>
    )
}

const EditProfile = ({ isOpen, onClose, usuario }) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
            <ModalOverlay />
            <ModalContent height={"auto"} display={'flex'} justifyContent={'center'} alignItems={'center'} m={'auto'}>
                <ModalHeader fontSize={'2xl'} textAlign={'center'} w={'full'}>Editar mis datos</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDirection={'column'} w={'full'}>
                    <Flex direction='column' gap={'1rem'} flex={'1'} alignItems={'center'} w={'full'}>
                        <Image boxSize={'200px'} objectFit={'cover'} borderRadius={'full'} src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'></Image>
                        <FormControl flex={'1'} display={'flex'} flexDirection={'column'} mt={'20px'}>
                            <FormLabel fontSize={'xs'} opacity={'.5'}>Usuario</FormLabel>
                            <Input defaultValue={usuario}></Input>
                        </FormControl>
                    </Flex>
                </ModalBody>

                <ModalFooter alignSelf={'flex-end'}>
                    <Button variant='ghost' color='brand.300' mr={3} onClick={onClose}>
                        CANCELAR
                    </Button>
                    <Button _hover={{ bg: 'purple.400' }} bg='brand.300' color='white' onClick={onClose}>GUARDAR</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
