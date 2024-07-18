import { Avatar, Box, Text } from "@chakra-ui/react"
import { useAuth } from "../../providers/auth/AuthContext";
import { useState } from "react";

function Message ({message, index, previousMessage}: {message: ChatMessage, index: number, previousMessage: ChatMessage | undefined}) {
    const { userId } = useAuth();

    const sameUser = () => {
        return message.usuarioId == parseInt(userId!!)
    }

    const sameUserPrevMessage = () => {
        return (previousMessage) ? previousMessage.usuarioId == message.usuarioId : false
    }

    const timeSplitParam = (hora: string) => {
        if (hora === undefined)
            return undefined
        const time = hora.split(':')
        return time[0] + ':' + time[1]
    }

    return (
        <>
            {sameUser() ? <SenderMessage message={message} index={index} disableStyle={sameUserPrevMessage()}/> : <RecieverMessage message={message} disabledName={sameUserPrevMessage()} index={index}/>}
        </>            
    )
}

function SenderMessage({message, index, disableStyle}: {message: ChatMessage, index: number, disableStyle: boolean}){
    return( 
    <Box display={'flex'} marginBlock={"2px"} gap={'10px'} bg={"#ddd"} padding={'10px'} rounded={disableStyle ? "10px" :"10px 0 10px 10px"} key={index} alignSelf={'flex-end'}>
        <Text>{message.texto}</Text>
        <Text display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} fontSize={'2xs'}>{message.hora}</Text>
    </Box>
    )
}

function RecieverMessage({message, index, disabledName}: {message: ChatMessage, index: number, disabledName: boolean}){
    
    return (
    <Box display={"flex"} gap={"10px"} paddingLeft={disabledName ? '40px' : '' }>
        {disabledName ? "" : <Avatar src={message.imgUrl} size={"sm"} bg={"brand.300"}/>}
        <Box display={'flex'} gap={'10px'} marginBlock={"2px"} bg={"#c29aff"} padding={'10px'} rounded={disabledName ? "10px" : "0 10px 10px 10px"} key={index} alignSelf={'flex-start'}>
            <Box>
                {disabledName ? "" : <Text fontWeight={"bold"}>{message.username}</Text>}
                <Text>{message.texto}</Text>
            </Box>
            <Text display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} fontSize={'2xs'}>{message.hora}</Text>
        </Box>
    </Box>
    )
}

export default Message