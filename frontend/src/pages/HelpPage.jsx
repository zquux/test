import React from 'react'
import { Container, VStack, SimpleGrid, Box, Text, Button, Flex } from '@chakra-ui/react';
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const HelpPage = () => {
  return (
    <Container maxW={"container.xl"} py={12}>
        <Text
            fontSize={"25"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            marginBottom={10}
        >
            If you have any questions please contact us at:
        </Text>
        <Flex alignItems="center" marginBottom={2} marginLeft={10} fontWeight="bold">
        <Button marginRight={2}>
          <FaPhone />
        </Button>
            +353 87 777 77 77
        </Flex>
      
        <Flex alignItems="center" marginTop={2} marginLeft={10} fontWeight="bold">
        <Button marginRight={2}>
          <MdEmail />
        </Button>
            vladyslavgym@example.com
        </Flex>
    </Container>

  )
}

export default HelpPage;