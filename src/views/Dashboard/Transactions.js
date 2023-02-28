import React from 'react'
import { 
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  FormLabel,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Divider,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'

export default function Transactions() {
  return (
    <div style={{marginTop:'6rem'}}>
      <div>
        <Flex justifyContent={'space-between'} alignItems={'center'} style={{marginBottom:'2rem'}}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                Summary
              </Text>
            <Flex justifyContent={'space-between'} alignItems={'end'} gap={'0.5rem'}>
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
          <Divider orientation='horizontal' />
          <Card style={{margin:'1rem 0'}}>
            <CardBody>
          <Stat>
              <StatLabel>Sales</StatLabel>
              <StatNumber>45</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Purchases</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
          <Stat>
              <StatLabel>Available Cash</StatLabel>
              <StatNumber>45</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Profit</StatLabel>
              <StatNumber>345,670</StatNumber>
            </Stat>
            </CardBody>
          </Card>

          <Card style={{margin:'1rem 0'}}>
            <CardBody>
              <Stat>
                <StatLabel>Debits</StatLabel>
                <StatNumber>345,670</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pending Payments</StatLabel>
                <StatNumber>45</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Expenses</StatLabel>
                <StatNumber>345,670</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          
          
          {/* <p>Sales: 0</p>
          <p>Purchases: 0</p>
          <p>Debits: 0</p>
          <p>Pending Payments: 0</p>
          <p>Expenses: 0</p>
          <p>Available Cash: 0</p>
          <p>Profit: 0</p> */}
          </div>
          <Divider orientation='horizontal' />
          <Card style={{margin:'1rem 0'}}>
            <CardBody>
              <div style={{width:'100%'}}>
          <Flex justifyContent={'space-between'} alignItems={'center'} style={{paddingTop:'2rem'}}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                  Transactions
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
            </Flex>
          </Flex>
          <TableContainer style={{width: '100%', marginTop:'2rem'}}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NO#</Th>
                  <Th>Date</Th>
                  <Th>Username</Th>
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
                  <Td>Walking</Td>
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
                  <Td>Ahmed</Td>
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
                  <Td>Ali</Td>
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
          </div>
          </CardBody>
          </Card>
    </div>
  )
}
