import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useToast } from '@chakra-ui/react';

const SessionReportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reportData, setReportData] = useState({
    personId: '',
    startDate: null,
    endDate: null,
  });
  const [reportResult, setReportResult] = useState(null); // Store the result, including personId and dates
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (field, value) => {
    setReportData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleGenerateReport = async () => {
    const { personId, startDate, endDate } = reportData;

    if (!personId || !startDate || !endDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (startDate > endDate) {
      toast({
        title: 'Error',
        description: 'Start date must be before end date.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/sessions/report?personId=${personId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const data = await response.json();

      if (response.ok) {
        setReportResult({
          count: data.count,
          personId: personId,
          startDate: startDate,
          endDate: endDate,
        });
        setReportData({
          personId: '',
          startDate: null,
          endDate: null,
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to generate report.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setReportResult(null); 
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue'>
        Generate Report
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Training Session Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {reportResult === null ? (
              <VStack spacing={4}>
                <Input
                  placeholder='Your Id'
                  name='personId'
                  type='number'
                  value={reportData.personId}
                  onChange={(e) => handleInputChange('personId', e.target.value)}
                />
                <DatePicker
                  selected={reportData.startDate}
                  onChange={(date) => handleInputChange('startDate', date)}
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Select start date'
                  customInput={<Input placeholder='Select start date' width='100%' />}
                />
                <DatePicker
                  selected={reportData.endDate}
                  onChange={(date) => handleInputChange('endDate', date)}
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Select end date'
                  customInput={<Input placeholder='Select end date' width='100%' />}
                />
              </VStack>
            ) : (
              <Box mt={4}>
                <Heading as='h2' size='md' mb={4}>
                  Report Results
                </Heading>
                <Text fontSize='lg' fontWeight='bold' mb={4}>
                  {`User ID ${reportResult.personId} attended ${reportResult.count} session${
                    reportResult.count !== 1 ? 's' : ''
                  } between ${reportResult.startDate ? reportResult.startDate.toLocaleDateString('en-GB') : ''} and ${
                    reportResult.endDate ? reportResult.endDate.toLocaleDateString('en-GB') : ''
                  }.`}
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            {reportResult === null ? (
              <>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={handleGenerateReport}
                  isLoading={isLoading}
                >
                  Generate Report
                </Button>
                <Button variant='ghost' onClick={handleCloseModal}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={() => setReportResult(null)} 
                >
                  New Report
                </Button>
                <Button variant='ghost' onClick={handleCloseModal}>
                  Close
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SessionReportModal;
