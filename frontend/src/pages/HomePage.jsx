import React from 'react';
import { Container, VStack, SimpleGrid, Box, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useSessionStore } from '../store/session.js';
import { useEffect } from 'react';
import SessionCard from '../components/SessionCard.jsx';


const HomePage = () => {
  const { fetchSessions, sessions } = useSessionStore();
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);
  
  console.log("sessions", sessions);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>

      <Text 
        fontSize={"30"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
      >
        Current Bookings
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        spacing={10}
        w={"full"}
      >
        {sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))}
      </SimpleGrid>

      {sessions.length === 0 && (
      <Text
        fontSize={"xl"}
        fontWeight={"bold"}
        textAlign={"center"}
        color={"gray.500"}
      >
      No bookings found  {""}
        <Link to={"/create"}>
          <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>
            Book a session
          </Text>
        </Link>
      </Text>)}
      </VStack>
    </Container>
  );
}

export default HomePage;