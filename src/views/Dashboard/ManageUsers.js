import { AddIcon, EditIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
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
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import { PersonIcon } from 'components/Icons/Icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { url_path } from 'views/constants'
import './style.css'
let startD = ''
let endD = ''
export default function ManageUsers() {
  const newUserModal = useDisclosure()
  const userSummaryModal = useDisclosure()
  const userTransectionModal = useDisclosure()
  const receivePaymentModal = useDisclosure()
  const [disclosureType, setDisclosureType] = useState('');
  const [newUser, setNewUsername] = useState('');
  const [validation, setValidation] = useState({msg:''});
  const [usersList, setUsersList] = useState([])
  const [usersListBackup, setUsersListBackup] = useState([])
  const [userTransactions, setUserTransactions] = useState(null)
  const [userTransaction, setUserTransaction] = useState(null)
  const [selectedUserIndex, setSelectedUserIndex] = useState(null)
  const [selectedTransectionIndex, setSelectedTransectionIndex] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [pendingPayment, setPendingPayment] = useState(0)
  const cancelRef = React.useRef()
  const toast = useToast()
  
  useEffect(() => {
    axios.get(`${url_path}/users`).then(response => {
      setUsersList(response.data)
      setUsersListBackup(response.data)
    });
  }, [newUser])

  const handleSubmit = ()=>{
    const nameRegex = /^[a-zA-Z0-9_-]+$/
    if(newUser.length < 4 || !nameRegex.test(newUser)){
      setValidation({msg:'The username must contain at least 4 characters Valid characters are A-Z, a-z, 0-9, (_)underscore, (-) hyphen and unicode characters'})
    }else{
      setValidation({msg:''})
      const data = {
        username: newUser,
        transactions: [],
        created_at: new Date()
      }
      axios.post(`${url_path}/users`, data).then(response => {
        if(response.data.error === 0 && response.data.acknowledged){
          newUserModal.onClose()
          toast({
            title: 'New user ' + newUser + ' create successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setNewUsername('')
        }else{
          setValidation({msg:response.data.msg})
        }
      })
    }
  }
    function ToggleDisclosure(type, index){
      if(type === 'user-summary'){
        if(usersList[index].transactions.length > 0){
          setUserTransactions(usersList[index].transactions)
          setSelectedUserIndex(index)
          setDisclosureType(type)
          userSummaryModal.onOpen()
        }else{
          toast({
            title: 'No Transaction Found',
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
        }    
      }else if(type === 'user-transection-detail'){
        setUserTransaction(userTransactions[index].transections)
        setSelectedTransectionIndex(index)
        setDisclosureType(type)
        userTransectionModal.onOpen()
      }
    }

    const filterUsers = (event)=>{
      const value = event.target.value
      if(value === ''){
        setUsersList(usersListBackup)
      }else{
        const data =  usersListBackup.filter((e)=>{
          return JSON.stringify(e).toLowerCase().indexOf(value.toLowerCase()) > -1 
        })
        setUsersList(data)
      }
    }

    const filterTransactions = (event)=>{
      const value = event.target.value
      if(value === ''){
        setUserTransactions(usersList[selectedUserIndex].transactions)
      }else{
        const data =  usersList[selectedUserIndex].transactions.filter((e)=>{
          return JSON.stringify(e).toLowerCase().indexOf(value.toLowerCase()) > -1 
        })
        setUserTransactions(data)
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
        const start = new Date(startD)
        const end = new Date(endD)
        const data = await usersList[selectedUserIndex].transactions.filter(item => {
        const date = new Date(item.created_at);
          return date >= start && date <= end;
        });
        setUserTransactions(data)
      }
    }

    const confirmPendingPayment = ()=>{
      setPendingPayment(parseInt(pendingPayment))
      if(parseInt(pendingPayment) < 0 || parseInt(pendingPayment) === null || isNaN(parseInt(pendingPayment))){
        toast({
          title: 'Invalid Payment',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }else if(parseInt(pendingPayment) > userTransactions[selectedTransectionIndex].pending_amount){
        toast({
          title: 'Pending amount cannot be more than total amount',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }else{
        const data = {
          userID: usersList[selectedUserIndex]._id,
          transectionID: userTransactions[selectedTransectionIndex]._id,
          pending_amount: userTransactions[selectedTransectionIndex].pending_amount - parseInt(pendingPayment),
          payed_amount: parseInt(pendingPayment) + userTransactions[selectedTransectionIndex].payed_amount,
          payment: (parseInt(pendingPayment) + userTransactions[selectedTransectionIndex].payed_amount) === userTransactions[selectedTransectionIndex].total_amount ? 'cash' : 'pending'
        }
        axios.put(`${url_path}/transections`, data).then(response => {
          if(response.data.modifiedCount === 1){
            toast({
              title: 'Payment update successfully.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            axios.get(`${url_path}/users`).then(response => {
              setUsersList(response.data)
              setUsersListBackup(response.data)
              setUserTransactions(response.data[selectedUserIndex].transactions)
              setUserTransaction(response.data[selectedUserIndex].transactions[selectedTransectionIndex].transections)
            });
          }
        })
        receivePaymentModal.onClose()
      }
    }

    const TimeFormate = (date) =>{
      let today = new Date(date);
      today = today.getTime()
      return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(today)
    }

  return (
    <div style={{marginTop:'5rem'}}>
    <Card>
    <CardBody style={{display:'block'}}>
        <Flex justifyContent={'space-between'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>Users</Text>
              <Flex>
              <Stack spacing={4} alignItems={'center'}>
              <InputGroup onChange={filterUsers}>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input type='tel' placeholder='Search Here' />
              </InputGroup>
            </Stack>
            <Button onClick={newUserModal.onOpen} style={{marginLeft:'1rem', width:'200px'}}><PersonIcon/>New User</Button>
            </Flex>
          </Flex>
        <TableContainer style={{width: '100%', marginTop:'2rem'}}>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>NO#</Th>
        <Th>Users</Th>
        <Th>Created At</Th>
        <Th>Trade</Th>
        <Th>Payment</Th>
        <Th>Total Amount</Th>
        <Th>Transaction Date</Th>
        <Th>Summary</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        usersList.length > 0 ? usersList.map((res, index) =>
        <Tr style={{cursor:'default'}}>
          <Td>{index + 1}</Td>
          <Td>{res.username}</Td>
          <Td>{TimeFormate(res.created_at)}</Td>
          <Td>
            {res.transactions.length === 0 ? '-' : (res.transactions[res.transactions.length - 1].trade === 'sale' ? <Badge variant='solid' colorScheme='green'>Sell</Badge>:<Badge variant='solid' colorScheme='yellow'>Purchase</Badge>)}
          </Td>
          <Td>
            {res.transactions.length === 0 ? '-' : (
              res.transactions[res.transactions.length - 1].payment === 'cash' ? <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge> : (
                res.transactions[res.transactions.length - 1].trade === 'sale' ? <Badge colorScheme='red' fontSize='0.9em'>Debt</Badge> : <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
              )
            )}
          </Td>
          <Td>{res.transactions.length === 0 ? '-' : res.transactions[res.transactions.length - 1].total_amount + ' PKR'}</Td>
          <Td>{res.transactions.length === 0 ? '-' : TimeFormate(res.transactions[res.transactions.length - 1].created_at)}</Td>
          <Td style={{cursor:'pointer'}} onClick={()=>ToggleDisclosure('user-summary', index)}><ViewIcon boxSize={6} /></Td>
        </Tr> ) : <Tr>
            <Td colspan="9">No Data Found</Td>
        </Tr>
      }
    </Tbody>
  </Table>
</TableContainer>
        </CardBody>
    </Card>
{selectedUserIndex !== null && 
<Modal onClose={userSummaryModal.onClose} size={'full'} isOpen={userSummaryModal.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                {usersList[selectedUserIndex].username} Summary
              </Text>
            <Flex justifyContent={'space-between'} alignItems={'end'} gap={'0.5rem'}>
              <FormControl>
                <FormLabel>Search Transactions</FormLabel>
                <InputGroup onChange={filterTransactions}>
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
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <TableContainer style={{width: '100%'}}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NO#</Th>
                  <Th>Trade</Th>
                  <Th>Payment</Th>
                  <Th>Debit/Pending</Th>
                  <Th>Total Amount</Th>
                  <Th>Transaction Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userTransactions.length > 0 ? userTransactions.map((res, index) =>
                  <Tr style={{cursor:'default'}} onClick={()=>ToggleDisclosure('user-transection-detail', index)}>
                    <Td>{index + 1}</Td>
                    <Td>{res.trade === 'sale' ? <Badge variant='solid' colorScheme='green'>Sell</Badge>:<Badge variant='solid' colorScheme='yellow'>Purchase</Badge>}</Td>
                    <Td>{res.payment === 'cash' ? <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge> : (
                          res.trade === 'sale' ? <Badge colorScheme='red' fontSize='0.9em'>Debt</Badge> : <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
                        )}
                    </Td>
                    <Td>{res.pending_amount + ' PKR'}</Td>
                    <Td>
                      {res.total_amount + ' PKR'}
                    </Td>
                    <Td>{TimeFormate(res.created_at)}</Td>
                  </Tr> 
                  ): <Tr>
                  <Td colspan="7">No Data Found</Td>
              </Tr>}
              </Tbody>
            </Table>
          </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={userSummaryModal.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
}{ selectedTransectionIndex !== null &&
<Modal onClose={userTransectionModal.onClose} size={'full'} isOpen={userTransectionModal.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                {selectedTransectionIndex + 1} - {usersList[selectedUserIndex].username}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize:'large'}}>
                {TimeFormate(userTransactions[selectedTransectionIndex].created_at)}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize:'large', marginRight: '2rem'}}>
                {userTransactions[selectedTransectionIndex].trade === 'sale' ? <Badge variant='solid' colorScheme='green' fontSize='large'>Sell</Badge>:<Badge variant='solid' colorScheme='yellow' fontSize='large'>Purchase</Badge>}
              </Text>
          </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <TableContainer style={{width: '100%'}}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>NO#</Th>
                  <Th>Currency</Th>
                  <Th>Currency Rate</Th>
                  <Th>Currency Amount</Th>
                  <Th>Total Amount</Th>
                  <Th>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userTransaction.length > 0 ? userTransaction.map((res, index) =>
                  <Tr style={{cursor:'default'}}>
                    <Td>{index + 1}</Td>
                    <Td>{res.currency}</Td>
                    <Td>{res.currency_rate + ' PKR'}</Td>
                    <Td>{res.currency_amount}</Td>
                    <Td>{res.total_amount + ' PKR'}</Td>
                    <Th><EditIcon boxSize={5}></EditIcon></Th>
                  </Tr> 
                  ): <Tr>
                  <Td colspan="7">No Data Found</Td>
              </Tr>}
              </Tbody>
            </Table>
          </TableContainer>
          <Text style={{margin:'2rem 0', "fontWeight": "bold", border: '2px solid gray', padding:'2rem'}}>Total Amount 
            <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{userTransactions[selectedTransectionIndex].total_amount.toLocaleString()} PKR</span>
          </Text> 
          <Text onClick={receivePaymentModal.onOpen} style={{margin:'2rem 0', "fontWeight": "bold", border: '2px solid gray', padding:'2rem', cursor:'pointer'}}>Payment 
            <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{userTransactions[selectedTransectionIndex].payment === 'cash' ? <Badge colorScheme='green' fontSize='0.9em'>Complete</Badge> : (
                userTransactions[selectedTransectionIndex].trade === 'sale' ? <Badge colorScheme='red' fontSize='0.9em'>Debt</Badge> : <Badge colorScheme='yellow' fontSize='0.9em'>Pending</Badge>
              )}</span>
          </Text>
          {userTransactions[selectedTransectionIndex].pending_amount > 0 && 
          <Text style={{margin:'2rem 0', "fontWeight": "bold", border: '2px solid gray', padding:'2rem'}}>Pending Amount
          <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{userTransactions[selectedTransectionIndex].pending_amount.toLocaleString()} PKR</span>
        </Text>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={userTransectionModal.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
}

      <Modal
      isOpen={receivePaymentModal.isOpen}
      onClose={receivePaymentModal.onClose}
    >
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Enter Pending Amount</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input placeholder='Amount' value={pendingPayment} onChange={(e)=>setPendingPayment(e.target.value)}/>
              {validation.msg !== '' && <small style={{color:'red'}}>{validation.msg}</small>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={confirmPendingPayment}>
              Confirm Payment
            </Button>
            <Button onClick={receivePaymentModal.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
      
      <Modal
      isOpen={newUserModal.isOpen}
      onClose={newUserModal.onClose}
    >
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input placeholder='Full name' value={newUser} onChange={(e)=>setNewUsername(e.target.value)}/>
              {validation.msg !== '' && <small style={{color:'red'}}>{validation.msg}</small>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={newUserModal.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    </div>
  )
}

