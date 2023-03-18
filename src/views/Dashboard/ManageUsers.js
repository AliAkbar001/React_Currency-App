import { AddIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
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
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
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
  const { isOpen, onOpen, onClose} = useDisclosure()
  const [disclosureType, setDisclosureType] = useState('');
  const [newUser, setNewUsername] = useState('');
  const [validation, setValidation] = useState({msg:''});
  const [usersList, setUsersList] = useState([])
  const [usersListBackup, setUsersListBackup] = useState([])
  const [userTransactions, setUserTransactions] = useState(null)
  const [selectedUserIndex, setSelectedUserIndex] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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
          onClose()
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
      if(index !== null){
        if(usersList[index].transactions.length > 0){
          setUserTransactions(usersList[index].transactions)
          setSelectedUserIndex(index)
          setDisclosureType(type)
          onOpen()
        }else{
          toast({
            title: 'No Transaction Found',
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
        }    
      }else{
        setDisclosureType(type)
        onOpen()
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
            <Button onClick={()=>ToggleDisclosure('new-user', null)} style={{marginLeft:'1rem', width:'200px'}}><PersonIcon/>New User</Button>
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
        <Th>Amount</Th>
        <Th>Currency</Th>
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
          <Td>{res.transactions.length === 0 ? '-' : res.transactions[res.transactions.length - 1].currency}</Td>
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
          <AlertDialogHeader>Pay Debt?</AlertDialogHeader>
          <AlertDialogCloseButton/>
          <AlertDialogBody>
            <Text style={{width: '100%', display:'flex', justifyContent:'space-between'}}><span style={{'fontWeight': 'bold'}}>Total Debt</span> <span style={{'fontWeight': '500'}}>19000 RS</span></Text>
            <FormControl isRequired style={{'marginTop': '1rem'}}>
                  <FormLabel>Enter Amount</FormLabel>
                  <NumberInput min={1}>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
            </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme='green'>
              Confirm
            </Button>
            <Button ref={cancelRef} ml={3} onClick={onClose}>
              Cancel
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
                  <Th>Amount</Th>
                  <Th>Currency</Th>
                  <Th>Transaction Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userTransactions.length > 0 ? userTransactions.map((res, index) =>
                  <Tr style={{cursor:'default'}}>
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
                    <Td>{res.currency}</Td>
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
              <Input placeholder='Full name' value={newUser} onChange={(e)=>setNewUsername(e.target.value)}/>
              {validation.msg !== '' && <small style={{color:'red'}}>{validation.msg}</small>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
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

