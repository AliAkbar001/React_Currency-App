import { SearchIcon } from '@chakra-ui/icons'
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
    Modal
} from '@chakra-ui/react'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import React from 'react'
import { useState } from 'react'
import '../../style.css'
export default function () {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currencySummaryType, setCurrencySummaryType] = useState('');

    function ToggleCurrency(currency){
        setCurrencySummaryType(currency)
        onOpen()
    }
  return (
    <>
    <Card>
    <CardBody style={{display:'block'}}>
        <Flex justifyContent={'space-between'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>Currencies</Text>
              <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Search Here' />
              </InputGroup>
            </Stack>
          </Flex>
        <TableContainer style={{width: '100%'}}>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>NO#</Th>
        <Th>Currency</Th>
        <Th isNumeric>Selling</Th>
        <Th isNumeric>Purchasing</Th>
        <Th isNumeric>In Stock</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr onClick={()=>ToggleCurrency('USD')}>
        <Td>1</Td>
        <Td>USD</Td>
        <Td isNumeric>
        <i class="fa fa-usd" style={{marginRight: '2px'}}></i>
          2500
        </Td>
        <Td isNumeric>
        <i class="fa fa-usd" style={{marginRight: '2px'}}></i>
          2000
        </Td>
        <Td isNumeric>
          <i class="fa fa-usd" style={{marginRight: '2px'}}></i>
          100
        </Td>
      </Tr>
      <Tr onClick={()=>ToggleCurrency('EUR')}>
        <Td>2</Td>
        <Td>EUR</Td>
        <Td isNumeric>
          <i class="fa fa-eur" style={{marginRight: '2px'}}></i>
          2500
        </Td>
        <Td isNumeric>
          <i class="fa fa-eur" style={{marginRight: '2px'}}></i>
          2000
        </Td>
        <Td isNumeric>
          <i class="fa fa-eur" style={{marginRight: '2px'}}></i>
          100
        </Td>
      </Tr>
      <Tr onClick={()=>ToggleCurrency('AUD')}>
        <Td>3</Td>
        <Td>AUD</Td>
        <Td isNumeric>
          <i class="fa fa-usd" style={{marginRight: '2px'}}></i>
          2500
        </Td>
        <Td isNumeric>
          <i class="fa fa-usd" style={{marginRight: '2px'}}></i>2000
        </Td>
        <Td isNumeric>
          <i class="fa fa-usd" style={{marginRight: '2px'}}></i>100
        </Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
        </CardBody>
    </Card>

<Modal onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex justifyContent={'space-between'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                {currencySummaryType} currencySummary
              </Text>
              <Stack spacing={4} style={{marginRight:'4rem'}}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Search Here' />
              </InputGroup>
            </Stack>
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
        <Th>User</Th>
        <Th>Action</Th>
        <Th>Payment Method</Th>
        <Th isNumeric>Amount</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr style={{cursor:'default'}}>
        <Td>1</Td>
        <Td>2/12/2023 3:30PM</Td>
        <Td>Walking</Td>
        <Td>
            <Badge variant='outline' colorScheme='green' fontSize='0.9em'>Sell</Badge>
        </Td>
        <Td>
            <Badge colorScheme='green' fontSize='0.9em'>Cash</Badge>
        </Td>
        <Td isNumeric>
            20000 RS
        </Td>
      </Tr>
      <Tr style={{cursor:'default'}}>
        <Td>2</Td>
        <Td>3/10/2023 6:30PM</Td>
        <Td>Ahmed</Td>
        <Td>
            <Badge variant='outline' colorScheme='gray' fontSize='0.9em'>Purchase</Badge>
        </Td>
        <Td>
            <Badge colorScheme='green' fontSize='0.9em'>Cash</Badge>
        </Td>
        <Td isNumeric>
            20000 RS
        </Td>
      </Tr>
      <Tr style={{cursor:'default'}}>
        <Td>3</Td>
        <Td>2/12/2023 5:30PM</Td>
        <Td>Ali</Td>
        <Td>
            <Badge variant='outline' colorScheme='green' fontSize='0.9em'>Sell</Badge>
        </Td>
        <Td>
            <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
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
    </>
  )
}
