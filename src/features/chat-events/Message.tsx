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

    const sameHour = () => {
        return timeSplitParam(message.hora) === timeSplitParam(previousMessage?.hora)
    }

    const timeSplitParam = (hora: string) => {
        if (hora === undefined)
            return undefined
        const time = hora.split(':')
        return time[0] + ':' + time[1]
    }

    return (
        <>
            {sameUser() ? <SenderMessage message={message} index={index} sameHour={sameHour()}/> : <RecieverMessage message={message} disabledName={sameUserPrevMessage()} index={index} sameHour={sameHour()}/>}
        </>            
    )
}

function SenderMessage({message, index, sameHour}: {message: ChatMessage, index: number, sameHour: boolean}){
    return( 
    <Box marginBlock={"2px"} bg={"#ddd"} padding={'10px'} rounded={"10px 0 10px 10px"} key={index} alignSelf={'flex-end'}>
        <Text>{message.texto}</Text>
        {sameHour ? '' : <Text fontSize={'2xs'}>{message.hora}</Text>}
    </Box>
    )
}

function RecieverMessage({message, index, disabledName, sameHour}: {message: ChatMessage, index: number, disabledName: boolean, sameHour: boolean}){
    
    return (
    <Box display={"flex"} gap={"10px"} paddingLeft={disabledName ? '40px' : '' }>
        {disabledName ? "" : <Avatar src={message.imgUrl} size={"sm"} bg={"brand.300"}/>}
        <Box marginBlock={"2px"} bg={"#c29aff"} padding={'10px'} rounded={disabledName ? "10px" : "0 10px 10px 10px"} key={index} alignSelf={'flex-start'}>
            {disabledName ? "" : <Text fontWeight={"bold"}>{message.username}</Text>}
            <Text>{message.texto}</Text>
            {sameHour ? '' : <Text fontSize={'2xs'}>{message.hora}</Text>}
        </Box>
    </Box>
    )
}

export default Message