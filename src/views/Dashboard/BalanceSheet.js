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
  Select,
  StatHelpText,
  StatArrow,
  StatGroup,
  Divider,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { useEffect, useState } from 'react'
import { url_path } from 'views/constants'
let startD = ''
let endD = ''
let today = new Date()
let month = today.getMonth() > 9 ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))
today = today.getFullYear() + '-' + month + '-' + today.getDate()

export default function BalanceSheet() {
  const [dataBackup, setDataBackup] = useState([])
  const [data, setData] = useState([])
  const [details, setDetails] = useState({
    sales: 0,
    purchases: 0,
    available_cash: 0,
    profit: 0,
    debit: 0,
    pending_payments: 0,
    expenses: 0,
    total_transactions: 0
  })
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    FetchData(false)
  }, [])

  async function FetchData(check){
    let date1 = new Date(today + ' 00:00');
    date1 =  new Date(date1).toISOString()
    let date2 = new Date().toISOString()
    if(check === true){
      date1 = new Date(startD + ' 00:00').toISOString()
      date2 = new Date(endD + ' 24:00').toISOString()
    }
    const dataList = []
    const balanceSheetObj = {
      sales: 0,
      purchases: 0,
      available_cash: 0,
      profit: 0,
      debit: 0,
      pending_payments: 0,
      expenses: 0,
      total_transactions: 0
    }

    await axios.post(`${url_path}/purchases/date-range`, {start: date1, end: date2}).then(response => {   
      response.data.map((res)=> {
        dataList.push({...res, trade: 'purchase'})
        balanceSheetObj.purchases = balanceSheetObj.purchases + res.total_amount
        balanceSheetObj.debit = balanceSheetObj.debit + res.pending_amount
      })
    });

    await axios.post(`${url_path}/sales/date-range`, {start: date1, end: date2}).then(response => {
      response.data.map((res)=> {
        dataList.push({...res, trade: 'sale'})
        balanceSheetObj.sales = balanceSheetObj.sales + res.total_amount
        balanceSheetObj.pending_payments = balanceSheetObj.pending_payments + res.pending_amount
      })
    });

    await axios.post(`${url_path}/expenses/date-range`, {start: date1, end: date2}).then(response => {
      response.data.map((res)=> balanceSheetObj.expenses = balanceSheetObj.expenses + res.amount)
    })

    balanceSheetObj.profit = balanceSheetObj.sales - (balanceSheetObj.purchases + balanceSheetObj.expenses)
    balanceSheetObj.total_transactions = dataList.length
    balanceSheetObj.available_cash = balanceSheetObj.profit - balanceSheetObj.debit

    dataList.sort(function(a,b){
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setDetails(balanceSheetObj)
    setData(dataList)
    setDataBackup(dataList)
  }

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
      FetchData(true)
    }
  }

  const TimeFormate = (dateA) =>{
    if(dateA !== undefined){
      let today = new Date(dateA);
      today = today.getTime()
      return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today)
    }
  }

  const ConvertPositive = (number) =>{
    return (number * -1).toLocaleString()
  }
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
              <Input type='date' name="startDate" value={startDate} max={today} onChange={handleDateRange}/>
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type='date' name="endDate" value={endDate} min={startDate} max={today} onChange={handleDateRange}/>
              </FormControl>
            </Flex>
          </Flex>
          <Divider orientation='horizontal' />
          <Card style={{margin:'1rem 0'}}>
            <CardBody>
          <Stat>
              <StatLabel>Sales</StatLabel>
              <StatNumber>{details.sales.toLocaleString()}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Purchases</StatLabel>
              <StatNumber>{details.purchases.toLocaleString()}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel>Expenses</StatLabel>
                <StatNumber>{details.expenses.toLocaleString()}</StatNumber>
              </Stat>
            <Stat style={{'color': details.profit > 0 ? 'green' : 'red'}}>
              <StatLabel>{details.profit > 0 ? 'Profit' : 'Loss'}</StatLabel>
              <StatNumber>{details.profit > 0 ? details.profit.toLocaleString() : ConvertPositive(details.profit)}{}</StatNumber>
            </Stat>
            </CardBody>
          </Card>

          <Card style={{margin:'1rem 0'}}>
            <CardBody>
              <Stat>
                <StatLabel>Debits</StatLabel>
                <StatNumber>{details.debit.toLocaleString()}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Pending Payments</StatLabel>
                <StatNumber>{details.pending_payments.toLocaleString()}</StatNumber>
              </Stat>
              <Stat>
              <StatLabel>Available Cash</StatLabel>
              <StatNumber>{details.available_cash < 0 ? 0 : details.available_cash.toLocaleString()}</StatNumber>
            </Stat>
              <Stat>
                <StatLabel>Total Transactions</StatLabel>
                <StatNumber>{details.total_transactions.toLocaleString()}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
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
                <FormLabel>Search</FormLabel>
                <InputGroup onChange={filterData}>
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
                  <Th>Payment</Th>
                  <Th>Payment Method</Th>
                  <Th isNumeric>Total Amount</Th>
                </Tr>
              </Thead>
              <Tbody>  
              {
              data.length > 0 ? 
                data.map((res, index)=>
                <Tr style={{cursor:'pointer'}} onClick={()=>ToggleDisclosure(res)}>
                <Td>{index + 1}</Td>
                <Td>{TimeFormate(res.created_at)}</Td>
                <Td>{res.username}</Td>
                <Td>{res.trade === 'sale' ? <Badge variant='solid' colorScheme='green'>Sell</Badge>:<Badge variant='solid' colorScheme='yellow'>Purchase</Badge>}</Td>
                <Td>{res.payment === 'cash' ? <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge> : (
                      res.trade === 'sale' ? <Badge colorScheme='red' fontSize='0.9em'>Debt</Badge> : <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
                    )}
                </Td>
                <Td isNumeric>{res.total_amount.toLocaleString()} PKR</Td>
                </Tr>):<Tr>
                    <Td colspan="7">No Data Found</Td>
                </Tr>
                }
              </Tbody>
            </Table>
          </TableContainer>
          </div>
          </CardBody>
          </Card>
    </div>
  )
}
