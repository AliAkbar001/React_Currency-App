import { AddIcon, SearchIcon } from '@chakra-ui/icons'
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
} from '@chakra-ui/react'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import React from 'react'

export default function Expences() {
  return (
    <Card style={{marginTop:'5rem'}}>
    <CardBody style={{display:'block'}}>
    <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                Expenses Summary
              </Text>
            <Flex justifyContent={'space-between'} alignItems={'end'} gap={'0.5rem'}>
              <FormControl>
                <FormLabel>Search Expense</FormLabel>
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
          <TableContainer style={{width: '100%', marginTop:'2rem'}}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NO#</Th>
                  <Th>Date</Th>
                  <Th>Title</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr style={{cursor:'default'}}>
                  <Td>1</Td>
                  <Td>2/12/2023 3:30PM</Td>
                  <Td>Bill</Td>
                  <Td isNumeric>
                      20000 RS
                  </Td>
                </Tr>
                <Tr style={{cursor:'default'}}>
                  <Td>2</Td>
                  <Td>3/10/2023 6:30PM</Td>
                  <Td>Tea</Td>
                  <Td isNumeric>
                      20000 RS
                  </Td>
                </Tr>
                <Tr style={{cursor:'default'}}>
                  <Td>3</Td>
                  <Td>2/12/2023 5:30PM</Td>
                  <Td>Food</Td>
                  <Td isNumeric>
                      20000 RS
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
    </CardBody>
    </Card>
  )
}
