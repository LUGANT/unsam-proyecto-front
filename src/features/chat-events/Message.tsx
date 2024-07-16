import { Box, Text } from "@chakra-ui/react"
import { useAuth } from "../../providers/auth/AuthContext";

function Message ({message, index}: {message: ChatMessage, index: number}) {
    const { userId } = useAuth();

    return (
        <>
        {message.usuarioId != parseInt(userId!!) ? (
            <Box marginBlock={"2px"} bg={"#ddd"} padding={'10px'} rounded={"0 10px 10px 10px"} key={index} alignSelf={'flex-start'}>
                <Text >{message.usuarioId}: {message.texto}</Text>
            </Box>
        ) : (
            <Box marginBlock={"2px"} bg={"#c29aff"} padding={'10px'} rounded={"10px 10px 0 10px"} key={index} alignSelf={'flex-end'}>
                <Text>{message.texto}</Text>
            </Box> //yo
        )}
        </>
        
    )
}

export default Message