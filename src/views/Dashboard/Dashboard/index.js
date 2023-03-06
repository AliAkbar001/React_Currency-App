
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
  AlertTitle,
  AlertDescription,
  Radio,
  HStack,
  RadioGroup,
  useColorModeValue,
  Button,
  Input,
  Stack
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React, { useState } from 'react';
import { url_path } from 'views/constants';


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [formData, setFormData] = useState({
    username: '0',
    currency:'USD',
    currency_amount: 0,
    currency_rate: 0,
    trade:'sell',
    payment:'cash',
    payed_amount: 0,
  })
  const [alertMsg, setAlertMsg] = useState(false)
  const [amounts, setAmounts] = useState({
    pending_amount: 0,
    total_amount: 0
  })

  const handleInputChange = event => {
    const name = event.target.name
    let value = event.target.value
    setFormData({ ...formData, [name]: value})  
  };

  const handleAmount = event =>{
    setAlertMsg(false)
    if(formData.payed_amount > amounts.total_amount){
      setAlertMsg({
        alert: 'error',
        msg: 'Payed Amount cannot be more then Total Amount'
      })
    }else{
      setAmounts({
        total_amount: (parseInt(formData.currency_amount) > 0 && parseInt(formData.currency_rate) > 0) ? (parseInt(formData.currency_rate) * parseInt(formData.currency_amount)) : 0,
        pending_amount: (parseInt(formData.currency_amount) > 0 && parseInt(formData.currency_rate) > 0 && parseInt(formData.payed_amount) > 0) ? (parseInt(amounts.total_amount) - parseInt(formData.payed_amount)) : 0
      })
    }
  }

  const handleClear = ()=>{
    setFormData({
      username: '0',
      currency:'USD',
      currency_amount: 0,
      currency_rate: 0,
      trade:'sell',
      payment:'cash',
      payed_amount: 0,
    })
    setAmounts({
      pending_amount: 0,
      total_amount: 0
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    let validation = true 
    if(formData.currency_amount <= 0 || formData.currency_rate <= 0){
      setAlertMsg({
          alert: 'error',
          msg: 'Currency amount and Currency rate cannot be 0 or negative'
      })
      validation = false
    }

    if(formData.payed_amount < 0){
      setAlertMsg({
        alert: 'error',
        msg: 'Payed amount cannot be 0 or negative'
      })
      validation = false
    }

    if(formData.payment === 'pending' && formData.payed_amount > amounts.total_amount){
      setAlertMsg({
        alert: 'error',
        msg: 'Payed Amount cannot be more then Total Amount'
      })
      validation = false
    }

    if(validation){
      setAlertMsg(false)
        const api = formData.trade === 'sell' ? 'sales' : 'purchases'
        const data = {
          username: formData.username,
          currency: formData.currency,
          currency_amount: parseInt(formData.currency_amount),
          currency_rate: parseInt(formData.currency_rate),
          payment: ((formData.payment === 'pending') && (amounts.total_amount === parseInt(formData.payed_amount))) ? 'cash' : formData.payment,
          payed_amount: formData.payment === 'cash' ? amounts.total_amount :parseInt(formData.payed_amount),
          pending_amount: amounts.pending_amount,
          total_amount: amounts.total_amount
        }
        axios.post(`${url_path}/${api}`, data).then(response => {
          console.log(response.data);
          handleClear()
        }).catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Card style={{'padding': '2rem', width:'100%', 'margin-top': '5rem'}}>
      <CardBody style={{width:'100%', flexDirection:'column'}}>
        <Box style={{width:'100%'}}>
          <Text style={{"fontWeight": "bold",'marginBottom':'2rem'}}>ADD Currency Record</Text>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Select User</FormLabel>
            <Select placeholder='Select Currency' name="username" value={formData.username} onChange={handleInputChange}>
              <option value="Walking">Walking</option>
              <option value="PKR">Ali</option>
              <option value="AUD">Ahmed</option>
            </Select>
          </FormControl>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Currency</FormLabel>
            <Select placeholder='Select Currency' name="currency" value={formData.currency} onChange={handleInputChange} >
              <option value="USD">USD</option>
              <option value="PKR">PKR</option>
              <option value="AUD">AUD</option>
            </Select>
          </FormControl>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Currency Amount</FormLabel>
            <Input min={1} name="currency_amount" value={formData.currency_amount} onChange={handleInputChange} onKeyUpCapture={handleAmount}/>
          </FormControl>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Currency Rate</FormLabel>
            <Input min={1} name="currency_rate" value={formData.currency_rate} onChange={handleInputChange} onKeyUpCapture={handleAmount}/>
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
            <RadioGroup>
              <HStack spacing='24px'>
                <Radio name="payment" onChange={handleInputChange} checked={formData.payment === 'cash'} value='cash'>Cash</Radio>
                <Radio name="payment" onChange={handleInputChange} checked={formData.payment === 'pending'} disabled={formData.username === 'Walking'} value='pending'>Pending</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          {formData.payment === 'pending' && 
          <>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
            <FormLabel>Payed Amount</FormLabel>
            <Input min={1} name="payed_amount" value={formData.payed_amount} onChange={handleInputChange} onKeyUpCapture={handleAmount}/>
          </FormControl>
          <Text style={{margin:'2rem 0',  background: '#e28743', padding: '1rem', borderRadius: '10px'}}>Pending Amount 
            <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{amounts.pending_amount} PKR</span>
          </Text>
          </>
          }
           {alertMsg &&
            <Stack spacing={3} style={{marginBottom:'1rem'}}>
              <Alert status={alertMsg.alert}>
                <AlertIcon />
                  {alertMsg.msg}
                </Alert>
              </Stack>
              }
          <Text style={{margin:'2rem 0'}}>Total Amount 
            <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>{amounts.total_amount} PKR</span>
          </Text>
          <Flex flexDirection={'row'} justifyContent={"end"}>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>Add</Button>
            <Button variant='ghost' onClick={handleClear}>Cancel</Button>
          </Flex>
        </Box>
      </CardBody>
    </Card>   
  );
}
