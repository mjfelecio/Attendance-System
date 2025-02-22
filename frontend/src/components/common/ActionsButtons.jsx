import {Button, HStack} from '@chakra-ui/react'

const ActionsButtons = () => {

    return (
        <HStack wrap="wrap" gap="2">
        <Button size="xs" bg="blue" color="white"> Present</Button>
        <Button size="xs" bg="red" color="white"> Absent</Button>

    </HStack>
    );

}

export default ActionsButtons;