import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../providers/auth/AuthContext';
import { IoIosSend } from "react-icons/io";

function Chat({isOpen, onClose, eventoId, userIds }) {

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { userId } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);

    //UI
    // const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {

        const socket = io('http://localhost:9092');
        socket.connect();
        setSocket(socket)

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('eventoId', eventoId)
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        socket.on("chat message", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socket.on("initial messages", (messages) => {
            console.log('Mensajes anteriores:', messages);
            setMessages(messages);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            const newMessage: ChatMessage = {
                texto: inputRef.current.value,
                usuarioId: userId,
                eventoId: eventoId,
                userIds: userIds
                // Otras propiedades
            };
            socket.emit('chat message', newMessage);
            inputRef.current.value = '';
        }
    };

    return (
        <div>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}

            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Chat</DrawerHeader>

                    <DrawerBody>
                        <Flex flexDirection={"column"}>
                            {messages.map((msg, index) => (
                                msg.usuarioId != userId ? (
                                    <Box marginBlock={"2px"} bg={"#ddd"} padding={'10px'} rounded={"0 10px 10px 10px"} key={index} alignSelf={'flex-start'}>
                                        <Text >{msg.usuarioId}: {msg.texto}</Text>
                                    </Box>
                                ) : (
                                    <Box marginBlock={"2px"} bg={"#c29aff"} padding={'10px'} rounded={"10px 10px 0 10px"} key={index} alignSelf={'flex-end'}>
                                        <Text>{msg.texto}</Text>
                                    </Box> //yo
                                )
                            ))}
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <form onSubmit={handleSubmit}>
                            <Flex gap={'10px'}>
                                <Input type="text" ref={inputRef} />
                                <IconButton type='submit' aria-label='Enviar mensaje' color={'white'} bg={'brand.300'} _hover={{background: '#c29aff', color: 'white'}} icon={<IoIosSend size={'25px'}/> } />
                            </Flex>
                        </form>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Chat;