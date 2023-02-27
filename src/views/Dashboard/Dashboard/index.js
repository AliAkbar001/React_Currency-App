
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// Chakra imports
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  HStack,
  RadioGroup,
  useColorModeValue,
  Button
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import React, { useState } from 'react';


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const handlePayment = (e) => setPaymentMethod(e)

  return (
    
   
          <Card style={{'padding': '2rem', width:'100%', 'margin-top': '5rem'}}>
            <CardBody style={{width:'100%'}}>
              <Box style={{width:'100%'}}>
                <Text style={{"fontWeight": "bold",'marginBottom':'2rem'}}>ADD Currency Record</Text>
                <FormControl isRequired style={{'marginBottom': '1rem'}}>
                  <FormLabel>Select User</FormLabel>
                  <Select placeholder='Select Currency'>
                    <option value="USD">Walking</option>
                    <option value="PKR">Ali</option>
                    <option value="AUD">Ahmed</option>
                  </Select>
                </FormControl>
                <FormControl isRequired style={{'marginBottom': '1rem'}}>
                  <FormLabel>Currency</FormLabel>
                  <Select placeholder='Select Currency'>
                    <option value="USD">USD</option>
                    <option value="PKR">PKR</option>
                    <option value="AUD">AUD</option>
                  </Select>
                </FormControl>
                <FormControl isRequired style={{'marginBottom': '1rem'}}>
                  <FormLabel>Currency Amount</FormLabel>
                  <NumberInput max={50} min={10}>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired style={{'marginBottom': '1rem'}}>
                  <FormLabel>Currency Rate</FormLabel>
                  <NumberInput max={50} min={10}>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired as='fieldset' style={{'marginBottom': '1rem'}}>
                <FormLabel>Payment Method</FormLabel>
                <Select>
                    <option value="sell">Sell</option>
                    <option value="purchase" selected>Purchase</option>
                  </Select>
                </FormControl>
                <FormControl isRequired as='fieldset' style={{'marginBottom': '1rem'}}>
                <FormLabel>Payment</FormLabel>
                  <RadioGroup onChange={handlePayment} value={paymentMethod}>
                    <HStack spacing='24px'>
                      <Radio value='cash'>Cash</Radio>
                      <Radio value='pending'>Pending</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                {paymentMethod === 'pending' && 
                <>
                <FormControl isRequired style={{'marginBottom': '1rem'}}>
                  <FormLabel>Receiving Amount</FormLabel>
                  <NumberInput max={50} min={10}>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl isRequired style={{'marginBottom': '1rem'}}>
                  <FormLabel>Pending Amount</FormLabel>
                  <NumberInput max={50} min={10} isDisabled>
                    <NumberInputField/>
                    <NumberInputStepper>
                      <NumberIncrementStepper/>
                      <NumberDecrementStepper/>
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                </>
                }
                <Text style={{margin:'2rem 0'}}>Total Amount 
                  <span style={{"fontWeight": "bold",'float':'right', fontSize:'large'}}>0PKR</span>
                </Text>
                <Flex flexDirection={'row'} justifyContent={"end"}>
                  <Button colorScheme='blue' mr={3}>Add</Button>
                  <Button variant='ghost'>Cancel</Button>
                </Flex>
              </Box>
            </CardBody>
          </Card>
      
  );
}
