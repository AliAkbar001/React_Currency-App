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
import axios from 'axios'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { url_path } from 'views/constants'
let startD = ''
let endD = ''
export default function Expences() {
  const [expensesBackup, setExpensesBackup] = useState([])
  const [expenses, setExpenses] = useState([])
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    axios.get(`${url_path}/expenses`).then(response => {
      let sum = 0
      response.data.map((res)=> sum = sum + res.amount)
      setTotalExpenses(sum)
      setExpenses(response.data)
      setExpensesBackup(response.data)
    });
  }, [])

  const filterExpenses = (event)=>{
    const value = event.target.value
    if(value === ''){
      setExpenses(expensesBackup)
    }else{
      const data =  expensesBackup.filter((e)=>{
        return JSON.stringify(e).toLowerCase().indexOf(value.toLowerCase()) > -1 
      })
      setExpenses(data)
    }
  }

  const handleDateRange = (event)=>{
    const value = event.target.value
    const name = event.target.name
    if(name === 'startDate'){
      setStartDate(value)
      startD = value
      handleDateRangeData()
    }else if(name === 'endDate'){
      setEndDate(value)
      endD = value
      handleDateRangeData()
    }
  }

  const handleDateRangeData = async()=>{
    if(startD !== '' && endD !== ''){
      const date1 = new Date(startD).toISOString()
      const date2 = new Date(endD).toISOString()
      axios.post(`${url_path}/expenses/date-range`, {start: date1, end: date2}).then(response => {
        let sum = 0
        response.data.map((res)=> sum = sum + res.amount)
        setTotalExpenses(sum)
        setExpenses(response.data)
        setExpensesBackup(response.data)
      })
    }
  }

  const TimeFormate = (date) =>{
    let today = new Date(date);
    today = today.getTime()
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today)
  }
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
        <InputGroup onChange={filterExpenses}>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
          />
        <Input type='tel' placeholder='Search Here' />
      </InputGroup>
      </FormControl>
      <FormControl>
      <FormLabel>Start Date</FormLabel>
      <Input type='datetime-local' name="startDate" value={startDate} onChange={handleDateRange}/>
      </FormControl>
      <FormControl>
        <FormLabel>End Date</FormLabel>
        <Input type='datetime-local' name="endDate" value={endDate} min={startDate} onChange={handleDateRange}/>
      </FormControl>
    </Flex>
  </Flex>
  <Text style={{margin:'2rem 0',  background: '#e28743', padding: '1rem', borderRadius: '10px'}}>Total Expenses 
    <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{totalExpenses} PKR</span>
  </Text>
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
        {expenses.length > 0 ? 
        expenses.map((res, index)=>
        <Tr style={{cursor:'default'}}>
        <Td>{index + 1}</Td>
        <Td>{TimeFormate(res.created_at)}</Td>
        <Td>{res.name}</Td>
        <Td isNumeric>{res.amount} PKR</Td>
      </Tr>):<Tr>
            <Td colspan="4">No Data Found</Td>
        </Tr>}
      </Tbody>
    </Table>
  </TableContainer>
    </CardBody>
    </Card>
  )
}
