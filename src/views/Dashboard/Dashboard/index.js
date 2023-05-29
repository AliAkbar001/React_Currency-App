
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
// Chakra imports
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  useColorModeValue,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React, { useState } from 'react';
import { url_path } from 'views/constants';
import { useEffect } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [transection, setTransection] = useState({
    currency:'',
    currency_amount: 0,
    currency_rate: 0,
  })

  const [formData, setFormData] = useState({
    username: 'Walking',
    transections:[],
    trade:'sell',
    payment:'cash',
    payed_amount: 0,
  })

  const [transectionTotal, setTransectionTotal] = useState(0)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertMsg2, setAlertMsg2] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [amounts, setAmounts] = useState({
    pending_amount: 0,
    total_amount: 0
  })
  const toast = useToast()
  
  useEffect(() => {
    axios.get(`${url_path}/users`).then(response => setUsersList(response.data));
    axios.get(`${url_path}/currencies`).then(response => setCurrencies(response.data));
  }, [])
  
  const handleInputChange = event => {
    const name = event.target.name
    let value = event.target.value
    if(name === 'username' && value === 'Walking'){
      setFormData({...formData, payment: 'cash', [name]: value}) 
    }else{
      setFormData({...formData, [name]: value})
    }
  };

  const handleAmount = event =>{
    setTransectionTotal(parseInt(transection.currency_amount) * parseInt(transection.currency_rate))
  }

  const handlePayedAmount = event =>{
    setAmounts({...amounts, pending_amount: amounts.total_amount - parseInt(formData.payed_amount)})
    if(formData.payed_amount < 0){
      setFormData({...formData, payed_amount: 0})
    }
  }

  const clearTransection = ()=>{
    setTransection({
      currency: '',
      currency_amount: 0,
      currency_rate: 0,
    })
    setTransectionTotal(0)
  }

  const handleClear = ()=>{
    setFormData({
      username: 'Walking',
      transections:[],
      trade:'sell',
      payment:'cash',
      payed_amount: 0,
    })
    setAmounts({
      pending_amount: 0,
      total_amount: 0
    })
    setTransection({
      currency: '',
      currency_amount: 0,
      currency_rate: 0,
    })
    setTransectionTotal(0)
  }

  const handleTransection = event => {
    const name = event.target.name
    let value = event.target.value
    setTransection({...transection, [name]: value})
  }

  const AddTransection = () => {
    setAlertMsg(false)
    if(transection.currency_amount < 1 || transection.currency_rate < 1){
      setAlertMsg({
          alert: 'error',
          msg: 'Currency amount and Currency rate cannot be 0 or empty'
      })
    }else if(transection.currency === ''){
      setAlertMsg({
        alert: 'error',
        msg: 'Select Currency'
      })
    }else{
      if(formData.transections.length > 0){
        let validation = true
        formData.transections.map((data, index)=>{
          if(data.currency === transection.currency){
            validation = false
            setAlertMsg({
              alert: 'error',
              msg: transection.currency + ' is already added'
            })
          }else if(index === (formData.transections.length - 1) && validation){
            setAmounts({pending_amount:amounts.total_amount + parseInt(transectionTotal), total_amount: amounts.total_amount + parseInt(transectionTotal)})
            setFormData({
              ...formData, 
              payed_amount: 0, 
              transections: [...formData.transections, 
              {
                currency: transection.currency,
                currency_rate: parseInt(transection.currency_rate),
                currency_amount: parseInt(transection.currency_amount), 
                total_amount: parseInt(transectionTotal)
              }
              ]})
            setTransection({
              currency: '',
              currency_amount: 0,
              currency_rate: 0,
            })
            setTransectionTotal(0)

          }
        })
      }else{
        setAmounts({pending_amount:parseInt(transectionTotal), total_amount: parseInt(transectionTotal)})
        setFormData({
          ...formData, 
          payed_amount: 0, 
          transections: [...formData.transections, 
          {
            currency: transection.currency,
            currency_rate: parseInt(transection.currency_rate),
            currency_amount: parseInt(transection.currency_amount), 
            total_amount: parseInt(transectionTotal)
          }
        ]})
        setTransection({
          currency: '',
          currency_amount: 0,
          currency_rate: 0,
        })
        setTransectionTotal(0)
      }
    }
  }

  const deleteTransection = (index) =>{
    setAmounts({...amounts, total_amount: amounts.total_amount - parseInt(formData.transections[index].total_amount)})
    const data = formData.transections
    data.splice(index, 1);
    setFormData({...formData, transections: data})
  }

  const handleSubmit = event => {
    event.preventDefault();
    let validation = true 
    if(formData.payed_amount < 0 || formData.payed_amount === null || formData.payed_amount === ''){
      setAlertMsg2({
        alert: 'error',
        msg: 'Payed amount cannot be less than 0 or empty'
      })
      validation = false
    }else if(formData.payment === 'pending' && formData.payed_amount > amounts.total_amount){
      setAlertMsg2({
        alert: 'error',
        msg: 'Payed Amount cannot be more then Total Amount'
      })
      validation = false
    }else if(validation){
      setAlertMsg2(false)
      const data = {
        username: formData.username,
        transections: formData.transections,
        payment: ((formData.payment === 'pending') && (amounts.total_amount === parseInt(formData.payed_amount))) ? 'cash' : formData.payment,
        payed_amount: formData.payment === 'cash' ? amounts.total_amount :parseInt(formData.payed_amount),
        pending_amount: formData.payment === 'cash' ? 0 : parseInt(amounts.pending_amount),
        total_amount: amounts.total_amount,
        created_at: new Date(),
        trade: formData.trade === 'sell' ? 'sale' : 'purchase'
      }
      axios.post(`${url_path}/transections`, data).then(response => {
        if(response.data.acknowledged){
          toast({
            title: 'Transaction Complete.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        handleClear()
      });
    }
  };

  return (
    <Card style={{'padding': '2rem', width:'100%', 'margin-top': '5rem'}}>
      <CardBody style={{width:'100%', flexDirection:'column'}}>
        <Box style={{width:'100%'}}>
          <Text style={{"fontWeight": "bold",'marginBottom':'2rem'}}>ADD Currency Record</Text>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Currency</FormLabel>
            <Select placeholder='Select Currency' name="currency" value={transection.currency} onChange={handleTransection}>
              {currencies.map(data => <option value={data}>{data}</option>)}
            </Select>
          </FormControl>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Currency Amount</FormLabel>
            <Input min={1} name="currency_amount" value={transection.currency_amount} onChange={handleTransection} onKeyUpCapture={handleAmount}/>
          </FormControl>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Currency Rate</FormLabel>
            <Input min={1} name="currency_rate" value={transection.currency_rate} onChange={handleTransection} onKeyUpCapture={handleAmount}/>
          </FormControl>
           {alertMsg &&
            <Stack spacing={3} style={{marginBottom:'1rem'}}>
              <Alert status={alertMsg.alert}>
                <AlertIcon />
                  {alertMsg.msg}
                </Alert>
              </Stack>
              }
          <Text style={{margin:'2rem 0'}}>Total Amount 
            <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{transectionTotal.toLocaleString()} PKR</span>
          </Text> 
          <Flex flexDirection={'row'} justifyContent={"end"}>
            <Button colorScheme='blue' mr={3} onClick={AddTransection}>Add</Button>
            <Button variant='ghost' onClick={clearTransection}>Cancel</Button>
          </Flex>
        </Box>
      </CardBody>
      {formData.transections.length > 0 && <>
        <TableContainer marginTop={'4rem'} marginBottom={'4rem'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Currency</Th>
              <Th>Currency Amount</Th>
              <Th>Currency Rate</Th>
              <Th>Total Amount</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
          { formData.transections.map((data, index)=>
            <Tr>
              <Td>{data.currency}</Td>
              <Td>{data.currency_amount}</Td>
              <Td>{data.currency_rate}PKR</Td>
              <Td>{data.total_amount}PKR</Td>
              <Td style={{cursor:'pointer'}} onClick={()=>deleteTransection(index)}><DeleteIcon color="red.500"></DeleteIcon></Td>
            </Tr>
          )}
          </Tbody>
        </Table>
        </TableContainer>
        <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Select User</FormLabel>
            <Select name="username" value={formData.username} onChange={handleInputChange}>
              {usersList.length > 0 ? usersList.map((res)=> <option value={res.username}>{res.username}</option>):<option value="">No User Found</option>}
            </Select>
        </FormControl> 
        <FormControl isRequired as='fieldset' style={{'marginBottom': '1rem'}}>
          <FormLabel>Trade</FormLabel>
          <Select name="trade" value={formData.trade} onChange={handleInputChange} >
              <option value="sell">Sell</option>
              <option value="purchase">Purchase</option>
            </Select>
          </FormControl>
          <FormControl as='fieldset' style={{'marginBottom': '1rem'}}>
          <FormLabel>Payment</FormLabel>
            <div style={{display:'flex'}}>
              <div style={{marginRight: '1rem'}}>
                <input style={{marginRight: '0.2rem'}} type="radio" name="payment" onChange={handleInputChange} checked={formData.payment === "cash" || formData.username === 'Walking'} value='cash'/>
                <span>Cash</span>
              </div>
              <div>
                <input style={{marginRight: '0.2rem'}} type="radio" name="payment" onChange={handleInputChange} checked={formData.payment === "pending"} disabled={formData.username === 'Walking'} value='pending'/>
                <span>Pending</span>
              </div>
            </div>  
          </FormControl>
          {(formData.payment === 'pending' && formData.username !== 'Walking') && 
          <>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Payed Amount</FormLabel>
            <Input min={1} name="payed_amount" value={formData.payed_amount} onChange={handleInputChange} onKeyUpCapture={handlePayedAmount}/>
          </FormControl>
          <Text style={{margin:'2rem 0',  background: '#e28743', padding: '1rem', borderRadius: '10px'}}>Pending Amount 
            <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{amounts.pending_amount.toLocaleString()} PKR</span>
          </Text>
          </>
          }
          <Text style={{margin:'2rem 0'}}>Grand Total
          <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{amounts.total_amount.toLocaleString()} PKR</span>
        </Text>
        {alertMsg2 &&
            <Stack spacing={3} style={{marginBottom:'1rem'}}>
              <Alert status={alertMsg2.alert}>
                <AlertIcon />
                  {alertMsg2.msg}
                </Alert>
              </Stack>
              }
        <Flex flexDirection={'row'} justifyContent={"end"}>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>Confirm Transection</Button>
            <Button variant='ghost' onClick={handleClear}>Cancel</Button>
        </Flex> 
      </>
     }
    </Card>   
  );
}
