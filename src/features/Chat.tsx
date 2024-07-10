import { Button, Input } from '@chakra-ui/react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '../providers/auth/AuthContext';

function Chat({eventoId, userIds}) {
    const socket = io('http://localhost:9092');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { userId } = useAuth();

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        socket.on("chat message", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('chat message')
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            const newMessage: ChatMessage = {
                texto: inputRef.current.value,
                usuarioId: userId, // Reemplaza con el ID real del usuario
                eventoId: 1,
                userIds: [1,2]
                // Otras propiedades según tu estructura de datos
            };
            socket.emit('chat message', newMessage);
            inputRef.current.value = '';
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input type="text" ref={inputRef} w={'md'} />
                <Button type="submit">Enviar</Button>
            </form>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.texto}, {msg.usuarioId}</div>
                ))}
            </div>
        </div>
    );
}

export default Chat;