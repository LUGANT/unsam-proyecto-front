import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../providers/auth/AuthContext';
import { messageService } from '../../services/message-service';
import Message from './Message';

function Chat({isOpen, onClose, eventoId }: { isOpen: boolean, onClose: () => void, eventoId: string | undefined }) {

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { userId, username } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        
        
        // getMessages    

        const socket = io('http://localhost:9092');
        setSocket(socket)
        
        // Handshake - Begin
        
        socket.connect();

        socket.on('connect', () => {
            socket.emit('initial message', eventoId)
            socket.emit('joinRoom', eventoId)
            console.log('Connected to WebSocket server');
        });
        // Handshake - End

        // Listeners
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
        // Listeners

        return () => {
            socket.disconnect();
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            const newMessage: ChatMessage = {
                texto: inputRef.current.value,
                username: username,
                userProfile: "",
                usuarioId: parseInt(userId!!),
                eventoId: parseInt(eventoId!!),
                fecha: "",
                hora: ""
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
                size={"sm"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Chat</DrawerHeader>

                    <DrawerBody>
                        <Flex flexDirection={"column"}>
                            {messages.map((msg, index) => <Message message={msg} index={index}></Message>)}
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <form onSubmit={handleSubmit} className='max-width'>
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