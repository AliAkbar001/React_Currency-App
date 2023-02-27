import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { 
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Badge,
    Text,
    Flex,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    ModalFooter,
    Button,
    ModalHeader,
    Modal,
    FormControl,
    FormLabel,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { PersonIcon } from 'components/Icons/Icons'
import React from 'react'
import { useState } from 'react'
import './style.css'
export default function ManageUsers() {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [disclosureType, setDisclosureType] = useState('');
  const cancelRef = React.useRef()

    function ToggleDisclosure(type){
      setDisclosureType(type)
      onOpen()
    }

  return (
    <div style={{marginTop:'5rem'}}>
    <Card>
    <CardBody style={{display:'block'}}>
        <Flex justifyContent={'space-between'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>Users</Text>
              <Flex>
              <Stack spacing={4} alignItems={'center'}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Search Here' />
              </InputGroup>
            </Stack>
            <Button onClick={()=>ToggleDisclosure('new-user')} style={{marginLeft:'1rem'}}><PersonIcon/>New User</Button>
            </Flex>
          </Flex>
        <TableContainer style={{width: '100%'}}>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>NO#</Th>
        <Th>Users</Th>
        <Th>Payment</Th>
        <Th>Payment Method</Th>
        <Th>Last Date</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr onClick={()=>ToggleDisclosure('user-summary')}>
        <Td>1</Td>
        <Td>Walking</Td>
        <Td>
            <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge>
        </Td>
        <Td>
          <Badge variant='solid' colorScheme='green'>Sell</Badge>
        </Td>
        <Td>7/12/2023 10:30AM</Td>
      </Tr>
      <Tr onClick={()=>ToggleDisclosure('user-summary')}>
        <Td>2</Td>
        <Td>Ali</Td>
        <Td>
            <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge>
        </Td>
        <Td>
          <Badge variant='solid' colorScheme='yellow'>Purchase</Badge>
        </Td>
        <Td>2/12/2023 3:30PM</Td>
      </Tr>
      <Tr onClick={()=>ToggleDisclosure('user-summary')}>
        <Td>3</Td>
        <Td>Ahmed</Td>
        <Td>
            <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
        </Td>
        <Td>
          <Badge variant='solid' colorScheme='green'>Sell</Badge>
        </Td>
        <Td>15/10/2023 2:00PM</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
        </CardBody>
    </Card>
{disclosureType === 'alert' && 
    <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Complete Payment?</AlertDialogHeader>
          <AlertDialogCloseButton/>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
}
{disclosureType === 'user-summary' &&
<Modal onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                User Summary
              </Text>
            <Flex justifyContent={'space-between'} alignItems={'end'} gap={'0.5rem'}>
              <FormControl>
                <FormLabel>Search User</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                  />
                <Input type='tel' placeholder='Search Here' />
              </InputGroup>
              </FormControl>
              <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input type='datetime-local'/>
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type='datetime-local'/>
              </FormControl>
            </Flex>
          </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <TableContainer style={{width: '100%'}}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NO#</Th>
                  <Th>Date</Th>
                  <Th>Currency</Th>
                  <Th>Payment</Th>
                  <Th>Payment Method</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr style={{cursor:'default'}}>
                  <Td>1</Td>
                  <Td>2/12/2023 3:30PM</Td>
                  <Td>EUR</Td>
                  <Td>
                    <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge>
                  </Td>
                  <Td>
                    <Badge variant='solid' colorScheme='green'>Sell</Badge>
                  </Td>
                  <Td isNumeric>
                      20000 RS
                  </Td>
                </Tr>
                <Tr style={{cursor:'default'}}>
                  <Td>2</Td>
                  <Td>3/10/2023 6:30PM</Td>
                  <Td>AUD</Td>
                  <Td>
                    <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge>
                  </Td>
                  <Td>
                    <Badge variant='solid' colorScheme='yellow'>Purchase</Badge>
                  </Td>
                 
                  <Td isNumeric>
                      20000 RS
                  </Td>
                </Tr>
                <Tr style={{cursor:'default'}}>
                  <Td>3</Td>
                  <Td>2/12/2023 5:30PM</Td>
                  <Td>USD</Td>
                  <Td>
                    <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
                  </Td>
                  <Td>
                    <Badge variant='solid' colorScheme='green'>Sell</Badge>
                  </Td>
                  
                  <Td isNumeric>
                      20000 RS
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
}
{disclosureType === 'new-user' &&
      <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
      }
    </div>
  )
}

