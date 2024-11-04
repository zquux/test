import React, { useState } from 'react';
import {
  Box, Image, Text, IconButton, HStack, Heading, useColorModeValue, useToast, Modal, useDisclosure, Input,
  ModalContent, ModalHeader, ModalOverlay, ModalBody, VStack, ModalCloseButton, ModalFooter, Button
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSessionStore } from '../store/session.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SessionCard = ({ session }) => {
  const [updatedSession, setUpdatedSession] = useState(session);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const { deleteSession, updateSession } = useSessionStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formattedDate = session.sessionDate ? new Date(session.sessionDate).toLocaleDateString('en-GB') : "N/A";

  const formattedCreatedAt = session.createdAt
    ? new Date(session.createdAt).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A';

  const handleDeleteSession = async (pid) => {
    const { success, message } = await deleteSession(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };

  const handleUpdateSession = async (pid, updatedSession) => {
    const { success, message } = await updateSession(pid, updatedSession);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Session Updated Successfully",
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src="https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png" alt="Test Image" width="100%" objectFit="cover" h={48} />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {session.name}
        </Heading>
        <Text fontWeight='bold' fontSize='17' color={textColor} mb={2}>
          {formattedDate}
        </Text>
        <Text fontWeight='bold' fontSize='17' color={textColor} mb={4}>
          ID: {session.personId}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme='blue' />
          <IconButton icon={<FaTrash />} onClick={() => handleDeleteSession(session._id)} colorScheme='red' />
          <Text fontSize='sm' color='gray.500' mb={4} marginLeft={48} position="relative" top={4}>
            {formattedCreatedAt}
          </Text>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Booked Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
              placeholder='Your Name'
              name='name'
              value={updatedSession.name} 
              onChange={(e) => setUpdatedSession({...updatedSession, name: e.target.value })}
              />
              <Input
                placeholder='Your Id'
                name='id'
                type='number'
                value={updatedSession.personId} 
                onChange={(e) => setUpdatedSession({...updatedSession, personId: e.target.value })}
              />
              <DatePicker
                selected={updatedSession.sessionDate}
                onChange={(date) => setUpdatedSession({ ...updatedSession, sessionDate: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select session date"
                customInput={<Input placeholder="Select session date" width="100%" />}
              />
              
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => { handleUpdateSession(session._id, updatedSession) }}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SessionCard;
