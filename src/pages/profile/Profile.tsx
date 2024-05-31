import { StarIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import { RiPencilFill } from "react-icons/ri";

function Profile() {
    return (
        <Flex flexDirection={'column'} flex={'1'}>
            <Flex flexGrow={'1'} bg={'gray.200'} alignItems={'center'} justifyContent={'center'} gap={'20px'}>
                <Image src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" boxSize={'200px'} objectFit={'cover'} borderRadius={'full'} />
                <Box>
                    <Text fontSize={'3xl'} fontWeight={'semibold'}>Jose1371</Text>
                    <Text fontSize={'xl'}>Jose Lopez</Text>
                </Box>
            <Icon as={RiPencilFill} boxSize={'35px'}/>
            </Flex>
            <Flex flexGrow={'4'} flexDirection={'column'} alignItems={'center'}>
                <Text fontSize={'xl'} fontWeight={'semibold'} my={'50px'}>Ultimas reseñas</Text>
                <VStack spacing={'50px'}>
                    <ReviewMiniCard />
                    <ReviewMiniCard />
                    <ReviewMiniCard />
                </VStack>
            </Flex>
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
