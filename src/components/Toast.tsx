import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'


function Toast({ title, message, status }) {
    const toast = useToast()

    useEffect(() => {
        showToast()
    })

    const showToast = () => {
        toast({
            title: title,
            description: message,
            status: status,
            duration: 9000,
            isClosable: true,
        })

    }

    return (
        <>
        </>
    )
}

export default Toast