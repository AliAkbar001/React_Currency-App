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
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    ModalFooter,
    Button,
    ModalHeader,
    Modal,
    useToast,
} from '@chakra-ui/react'
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

export default function Debits() {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [dataBackup, setDataBackup] = useState([])
  const [data, setData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [payment, setPayment] = useState({})
  const [pendingAmount, setPendingAmount] = useState(0)
  const [validation, setValidation] = useState({msg:''});
  const toast = useToast()

  useEffect(() => {
    FetchData()
  }, [])

  function FetchData(){
    axios.get(`${url_path}/purchases/pending`).then(response => {
      let sum = 0
      response.data.map((res)=> sum = sum + res.pending_amount)
      setTotalAmount(sum)
      setData(response.data)
      setDataBackup(response.data)
    });
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
      const date1 = new Date(startD + ' 00:00').toISOString()
      const date2 = new Date(endD + ' 24:00').toISOString()
      axios.post(`${url_path}/purchases/pending/date-range`, {start: date1, end: date2}).then(response => {
        let sum = 0
        response.data.map((res)=> sum = sum + res.pending_amount)
        setTotalAmount(sum)
        setData(response.data)
        setDataBackup(response.data)
      });
    }
  }

  const TimeFormate = (dateA) =>{
    if(dateA !== undefined){
      let today = new Date(dateA);
      today = today.getTime()
      return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today)
    }
  }

  function ToggleDisclosure(data){
    setPayment(data)
    onOpen()
  }

  const handleSubmit = ()=>{
    setPendingAmount(parseInt(pendingAmount))
    setValidation({msg: ''})
    let check = true
    if(parseInt(pendingAmount) <= 0){
      setValidation({msg: 'Minimum pending amount must be 1'})
      check = false
    }

    if(parseInt(pendingAmount) > parseInt(payment.total_amount)){
      setValidation({msg: 'Pending amount cannot be more then total amount'})
      check = false
    }

    if(check){
      let obj = {}
      if(parseInt(pendingAmount) === payment.pending_amount){
        obj = {
          username: payment.username,
          payment: "cash",
          pending_amount: 0,
          payed_amount: parseInt(payment.total_amount),
      }
      }else{
        obj = {
          username: payment.username,
          pending_amount: parseInt(payment.pending_amount) - parseInt(pendingAmount),
          payed_amount: parseInt(payment.payed_amount) + parseInt(pendingAmount),
        }
      }
      axios.put(`${url_path}/purchases/pending-payments`, {_id: payment._id, obj}).then(response => {
        if(response.data.acknowledged){
          if(startD !== '' && endD !== ''){
            handleDateRangeData()
          }else{
            FetchData()
          }
          setPayment({})
          setPendingAmount(0)
          onClose()
          toast({
            title: payment.username +  ' Debit ' + pendingAmount + ' PKR',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      })
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
      <Input type='date' name="startDate" value={startDate} max={today} onChange={handleDateRange}/>
      </FormControl>
      <FormControl>
        <FormLabel>End Date</FormLabel>
        <Input type='date' name="endDate" value={endDate} min={startDate} max={today} onChange={handleDateRange}/>
      </FormControl>
    </Flex>
  </Flex>
  <Text style={{margin:'2rem 0',  background: '#e28743', padding: '1rem', borderRadius: '10px'}}>Total Payment 
    <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{totalAmount.toLocaleString()} PKR</span>
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
        <Tr style={{cursor:'pointer'}} onClick={()=>ToggleDisclosure(res)}>
        <Td>{index + 1}</Td>
        <Td>{TimeFormate(res.created_at)}</Td>
        <Td>{res.username}</Td>
        <Td isNumeric>{res.pending_amount.toLocaleString()} PKR</Td>
        <Td isNumeric>{res.total_amount.toLocaleString()} PKR</Td>
      </Tr>):<Tr>
            <Td colspan="5">No Data Found</Td>
        </Tr>}
      </Tbody>
    </Table>
  </TableContainer>
  <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Pay Debit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex style={{justifyContent:'space-between'}}>
              <Text style={{fontWeight:'bold'}}>{payment.username}</Text>
              <Text style={{fontWeight:'bold'}}>{TimeFormate(payment.created_at)}{'   '}</Text>
            </Flex>
          <FormControl style={{margin:'1rem 0'}}>
              <FormLabel>Enter Amount</FormLabel>
              <input type='number' className="form-control" min="0" value={pendingAmount} onChange={(e)=>setPendingAmount(e.target.value)}/>
              {validation.msg !== '' && <small style={{color:'red'}}>{validation.msg}</small>}
            </FormControl>
            <Flex style={{marginBottom:'0.5rem',   background: 'red', color:'white', padding: '1rem', borderRadius: '10px', justifyContent:'space-between'}}>
              <Text>Pending Amount</Text>
              <Text style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{payment.pending_amount !== undefined && payment.pending_amount.toLocaleString()} PKR</Text>
            </Flex>
            <Flex style={{marginBottom:'0.5rem',  background: 'green', color:'white', padding: '1rem', borderRadius: '10px', justifyContent:'space-between'}}>
              <Text>Payed Amount</Text>
              <Text style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{payment.payed_amount !== undefined && payment.payed_amount.toLocaleString()} PKR</Text>
            </Flex>
            <Flex style={{marginBottom:'0.5rem',  background: '#e28743', padding: '1rem', borderRadius: '10px', justifyContent:'space-between'}}>
              <Text>Total Amount</Text>
              <Text style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{payment.total_amount !== undefined && payment.total_amount.toLocaleString()} PKR</Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    </CardBody>
    </Card>
  )
}

