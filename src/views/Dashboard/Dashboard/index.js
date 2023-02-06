
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
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
//import React from "react";
import { dashboardTableData, timelineData } from "variables/general";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import Projects from "./components/Projects";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";

import React, { useState } from 'react';



import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput, 
  MDBRow, 
  MDBCol,
  MDBSwitch,
  MDBCheckbox,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,

}
from 'mdb-react-ui-kit';

import Form from 'react-bootstrap/Form';
import { Placeholder } from 'react-bootstrap';



export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [centredModal, setCentredModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const toggleShow = () => setCentredModal(!centredModal);
  const handlePayment = (e) => setPaymentMethod(e)

  return (
    
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"Today Sell"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today Purchase"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today Profit"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Remaining Capital"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }}
        style={{'padding': '2rem 0'}}
        >
          <Card style={{'padding': '2rem', width:'100%'}}>
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
        <ActiveUsers
          title={"Monthly Sales in PKR"}
          percentage={23}
          chart={<BarChart />}
        />
        <SalesOverview
          title={"Monthly Profit"}
          percentage={5}
          chart={<LineChart />}
        />
      </Grid>
    </Flex>
  );
}
