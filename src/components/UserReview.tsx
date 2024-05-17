import { StarIcon } from '@chakra-ui/icons'
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
    Flex,
    Textarea,
    Text,
    Image,
} from '@chakra-ui/react'

function UserReview() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
                <ModalOverlay />
                <ModalContent height={"auto"} display={'flex'} justifyContent={'center'} alignItems={'center'} m={'auto'}>
                    <ModalHeader fontSize={'2xl'} textAlign={'center'} w={'full'}>¡Califica a tu compañero!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'} w={'full'}>
                        <Flex direction='column' gap={'1rem'} flex={'1'} alignItems={'center'} w={'full'}>
                            <Image boxSize={'200px'} borderRadius={'full'} src='https://cdn-icons-png.flaticon.com/512/3135/3135768.png'></Image>
                            <Text>NOMBRE APELLIDO</Text>
                            <Flex gap={'10px'}>
                                <StarIcon boxSize={8} color={'brand.300'} />
                                <StarIcon boxSize={8} color={'brand.300'} />
                                <StarIcon boxSize={8} color={'brand.300'} />
                                <StarIcon boxSize={8} color={'brand.300'} />
                                <StarIcon boxSize={8} color={'brand.300'} />
                            </Flex>


                            <FormControl flex={'1'} display={'flex'} flexDirection={'column'} mt={'40px'}>
                                <Textarea resize={'none'} flex={'1'} />
                                <FormLabel fontSize={'xs'} opacity={'.5'}>¡Deja un comentario!</FormLabel>
                            </FormControl>

                        </Flex>
                    </ModalBody>

                    <ModalFooter alignSelf={'flex-end'}>
                        <Button variant='ghost' color='brand.300' mr={3} onClick={onClose}>
                            CANCELAR
                        </Button>
                        <Button _hover={{ bg: 'purple.400' }} bg='brand.300' color='white' onClick={onClose}>ACEPTAR</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default UserReview
