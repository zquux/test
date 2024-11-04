import React from 'react';
import { Container, HStack, Flex, Button, Text, useColorMode } from '@chakra-ui/react';
import { CiSquarePlus } from "react-icons/ci"; 
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import SessionReportModal from '../components/SessionReport.jsx';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  

  return <Container maxW={"1140px"} px={4} >
  <Flex
    h = {16}
    alignItems={"center"}
    justifyContent={"space-between"}
    flexDir={{
      base: "column",
      sm: "row"
    }}
  >

  <Text
    bgGradient='linear(to-l, #26C6DA, blue.500)'
    bgClip='text'
    fontSize='3xl'
    fontWeight='extrabold'
  >
    <Link to={"/"}>GYM HOME</Link>
  </Text>

  <HStack spacing={2} alignItems={"center"}>
    <SessionReportModal />
    <Link to={"/help"}>
    <Button>
      Help page
    </Button>
    </Link>
    <Link to={"/about"}>
    <Button marginRight={10}>
      About Page
    </Button>
    </Link>
    <Link to={"/create"}>                  
    <Button>
      <CiSquarePlus />
    </Button>
    </Link> 
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? <FaMoon /> : <FaSun />}
    </Button>
  </HStack>

  </Flex>
  </Container>
};

export default Navbar;