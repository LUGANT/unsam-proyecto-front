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
    Input,
    Select,
    Flex,
    Textarea,
    NumberInput,
    NumberInputStepper,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
    Image,
} from '@chakra-ui/react'
import { useState } from 'react'

function NewEventModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [secondModal, setSecondModal] = useState(false)
    const [formData, setFormData] = useState({
        deporte: '',
        lugar: '',
        fecha: '',
        hora: ''
    })
    const [numParticipantes, setNumParticipantes] = useState(0)

    const handleFormChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleNext = () => {
        setSecondModal(true)
    }

    const handleCancel = () => {
        onClose()
        setSecondModal(false)
        setFormData({
            deporte: '',
            lugar: '',
            fecha: '',
            hora: ''
        })
        setNumParticipantes(0)
    }

    const handleParticipantesChange = (value) => {
        setNumParticipantes(value)
    }

    const renderParticipantesInputs = () => {
        const inputs = []
        const cantFilas = Math.ceil(numParticipantes / 2)
        for (let i = 0; i < cantFilas; i++) {
            
            const inputsFilas = []

            for (let j = 0; j < 2; j++) {
                const indexParticipante = i * 2 + j
                inputsFilas.push(
                    <Input key={indexParticipante} mb={2} placeholder={`Participante ${indexParticipante + 1}`} />
                )
            }
            inputs.push(
                <Flex key={i} justifyContent="space-between">
                    {inputsFilas}
                </Flex>
            )
        }
        return inputs
    }

    return (
        <div>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen && !secondModal} onClose={onClose} size={"4xl"}>
                <ModalOverlay />
                <ModalContent height={"80%"}>
                    <ModalHeader>Nuevo evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection={'column'}>
                        <Text mb={'1.5rem'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cumque facilis nihil nostrum id ducimus, animi libero eos corporis, consectetur earum quae recusandae molestias sunt saepe. Voluptatibus aut voluptate atque.</Text>
                        <Flex direction='column' gap={'2rem'} flex={'1'}>
                            <Flex gap={'6rem'}>
                                <FormControl>
                                    <FormLabel>Actividad</FormLabel>
                                    <Select size={'lg'} placeholder='Actividad' name='deporte' onChange={handleFormChange}>
                                        <option value="Basquet">Basquet</option>
                                        <option value="Futbol">Futbol</option>
                                        <option value="Tenis">Tenis</option>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Lugar</FormLabel>
                                    <Select size={'lg'} placeholder='Lugar' name='lugar' onChange={handleFormChange}>
                                        <option value="Plaza San Martin">Plaza San Martin</option>
                                        <option value="Club Las Heras">Club Las Heras</option>
                                        <option value="CEMEF">CEMEF</option>
                                    </Select>
                                </FormControl>
                            </Flex>

                            <Flex gap={'6rem'}>
                                <FormControl>
                                    <FormLabel>Fecha</FormLabel>
                                    <Input size={'lg'} type='date' name='fecha' onChange={handleFormChange} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Hora</FormLabel>
                                    <Input size={'lg'} type='time' name='hora' onChange={handleFormChange} />
                                </FormControl>
                            </Flex>

                            <FormControl flex={'1'} display={'flex'} flexDirection={'column'}>
                                <FormLabel>Descripcion</FormLabel>
                                <Textarea resize={'none'} flex={'1'} />
                            </FormControl>

                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' color='brand.300' mr={3} onClick={handleCancel}>
                            CANCELAR
                        </Button>
                        <Button _hover={{ bg: 'purple.400' }} bg='brand.300' color='white' onClick={handleNext}>SIGUIENTE</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpen && secondModal} onClose={onClose} size={"4xl"} motionPreset={"slideInRight"}>
                <ModalOverlay />
                <ModalContent display={"flex"} flexDirection={"row"} height={"80%"}>
                    <ModalCloseButton />
                    <Image w={"35%"} h={"100%"} opacity={'.25'} objectFit={"cover"} src="https://basquetlg.com/imgd/adn-seleccion-argentina-basquet-moderno-087730.jpg" alt="" />
                    <Flex direction={"column"}>
                        <ModalBody padding={"0"}>
                            <Flex flexDirection={"column"} alignItems={"center"} gap={"0"} paddingBlock={"1.25rem"} paddingInline={"5.25rem"}>
                                <Text fontWeight={"bold"} fontSize={"2xl"}>{formData.deporte} - {formData.lugar}</Text>
                                <Text fontSize={"md"}>{formData.fecha} - {formData.hora}</Text>
                                <Text marginBlock={'1.5rem'}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus illum, reprehenderit quae nihil quam rem sed incidunt et accusamus. Nihil eius nam quae nesciunt excepturi alias porro iusto corporis officia?</Text>

                                <FormControl display={"flex"} flexDirection={"column"} textAlign={"center"}>
                                    <FormLabel alignSelf={"center"} fontWeight={"normal"} >Nro Participantes</FormLabel>
                                    <NumberInput defaultValue={0} step={2} min={0} max={20} onChange={handleParticipantesChange}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Text opacity={".4"}>Recomendacion de “{formData.lugar}” - 10</Text>
                                </FormControl>

                                {renderParticipantesInputs()}
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant='ghost' color='brand.300' mr={3} onClick={handleCancel}>
                                CANCELAR
                            </Button>
                            <Button _hover={{ bg: 'purple.400' }} bg='brand.300' color='white'>ACEPTAR</Button>
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default NewEventModal
