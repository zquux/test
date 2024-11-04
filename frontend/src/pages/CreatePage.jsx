import React from 'react'
import { Box, Container, Heading, useColorModeValue, VStack, Input, Button, HStack } from '@chakra-ui/react';
import { useSessionStore } from '../store/session.js';
import { useToast } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CreatePage = () => {
  const [newSession, setNewSession] = React.useState({
    name: '',
    personId: '',
    sessionDate: null,
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
  });
  const toast = useToast();

  const { createSession } = useSessionStore();

  const handleAddSession = async() => {
    const { success, message} = await createSession(newSession);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewSession({ name: '', personId: '', sessionDate: null, cardNumber: '', expiryDate: '', securityCode: '',});
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack 
      spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} marginTop={20}>
          Book a new session
        </Heading>

        <Box
        w={"full"} bg={useColorModeValue("White", "gray.800") }
        p={6} rounded={"lg"} shadow={"md"} 
        >
          <VStack spacing={4}>
            <Input
              placeholder='Your Name'
              name='name'
              value={newSession.name} 
              onChange={(e) => setNewSession({...newSession, name: e.target.value })}
            />
            <Input
              placeholder='Your Id'
              name='personId'
              type='text'
              value={newSession.personId}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setNewSession({ ...newSession, personId: value });
                }
              }}
            />
            <DatePicker
              selected={newSession.sessionDate}
              onChange={(date) => setNewSession({ ...newSession, sessionDate: date })}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select session date"
              customInput={<Input placeholder="Select session date" width={560} />}
            />
            <Input
              placeholder='Card Number'
              name='cardNumber'
              type='number'
              value={newSession.cardNumber} 
              onChange={(e) => setNewSession({...newSession, cardNumber: e.target.value })}
            />
            <HStack>
              <Input
                placeholder='Expiry Date'
                name='expiryDate'
                type='number'
                value={newSession.expiryDate} 
                onChange={(e) => setNewSession({...newSession, expiryDate: e.target.value })}
              />
              <Input
                placeholder='Security Code'
                name='securityCode'
                type='number'
                value={newSession.securityCoder} 
                onChange={(e) => setNewSession({...newSession, securityCode: e.target.value })}
              />
            </HStack>
            <Button colorScheme='blue' onClick={handleAddSession} w='full'>Create new Session</Button>

          </VStack>

        </Box>

      </VStack>
    </Container>
  );
}
export default CreatePage;