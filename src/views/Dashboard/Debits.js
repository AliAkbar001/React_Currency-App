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
import { useEffect, useState } from 'react'
import { url_path } from 'views/constants'
let startD = ''
let endD = ''
export default function Debits() {
  const [dataBackup, setDataBackup] = useState([])
  const [data, setData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    axios.get(`${url_path}/purchases/pending`).then(response => {
      let sum = 0
      response.data.map((res)=> sum = sum + res.pending_amount)
      setTotalAmount(sum)
      setData(response.data)
      setDataBackup(response.data)
    });
  }, [])

  const filterData = (event)=>{
    const value = event.target.value
    if(value === ''){
      setData(dataBackup)
    }else{
      const dataTemp =  dataBackup.filter((e)=>{
        return JSON.stringify(e).toLowerCase().indexOf(value.toLowerCase()) > -1 
      })
      setData(dataTemp)
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

  const handleDateRangeData = ()=>{
    if(startD !== '' && endD !== ''){
      const start = new Date(startD)
      const end = new Date(endD)
      const dataTemp = dataBackup.filter(item => {
      const date = new Date(item.created_at);
        return date >= start && date <= end;
      });
      setData(dataTemp)
    }
  }

  const TimeFormate = (dateA) =>{
    if(dateA !== undefined){
      let today = new Date(dateA);
      today = today.getTime()
      return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today)
    }
  }

  return (
    <Card style={{marginTop:'5rem'}}>
    <CardBody style={{display:'block'}}>
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Text style={{fontWeight: 'bold', fontSize:'large'}}>
        Debit Summary
      </Text>
    <Flex justifyContent={'space-between'} alignItems={'end'} gap={'0.5rem'}>
      <FormControl>
        <FormLabel>Search Debit Payments</FormLabel>
        <InputGroup onChange={filterData}>
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
  <Text style={{margin:'2rem 0',  background: '#e28743', padding: '1rem', borderRadius: '10px'}}>Total Payment 
    <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{totalAmount} PKR</span>
  </Text>
  <TableContainer style={{width: '100%', marginTop:'2rem'}}>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>NO#</Th>
          <Th>Date</Th>
          <Th>Name</Th>
          <Th isNumeric>Debit Amount</Th>
          <Th isNumeric>Total Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
      {data.length > 0 ? 
        data.map((res, index)=>
        <Tr style={{cursor:'default'}}>
        <Td>{index + 1}</Td>
        <Td>{TimeFormate(res.created_at)}</Td>
        <Td>{res.username}</Td>
        <Td isNumeric>{res.pending_amount} PKR</Td>
        <Td isNumeric>{res.total_amount} PKR</Td>
      </Tr>):<Tr>
            <Td colspan="5">No Data Found</Td>
        </Tr>}
      </Tbody>
    </Table>
  </TableContainer>
    </CardBody>
    </Card>
  )
}

