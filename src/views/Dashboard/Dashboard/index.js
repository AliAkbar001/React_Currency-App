
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
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
  MDBInputGroup,
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
  const [centredModal2, setCentredModal2] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
  const toggleShow2 = () => setCentredModal2(!centredModal2);



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



{/* --------------------Update payment by selected or new uer... also create new user here-------------------*/}

      <Grid
        templateColumns={{ md: "1fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
<>

<MDBCard>
      <MDBCardHeader>ADD User and its Data</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Select Person & Add record</MDBCardTitle>
        <MDBCardText>Add Personr if new, then select person and add record.</MDBCardText><br></br>
        
        <MDBRow className='g-3'>

<MDBCol size='sm'>
<Form.Select aria-label="Default select example">
      <option>select Person</option>
      <option value="USD">Walking person</option>
      <option value="PKR">Ali</option>
      <option value="AUD">Saad</option>
    </Form.Select>
</MDBCol>

<MDBCol size='sm'>
<Form.Select aria-label="Default select example">
      <option>select Currency</option>
      <option value="USD">USD</option>
      <option value="PKR">PKR</option>
      <option value="AUD">AUD</option>
    </Form.Select>
</MDBCol>
      <MDBCol size='sm'>
        <MDBInput id='form12Example2' label='Currency Rate' /><br></br>
      </MDBCol>
      <MDBCol size='sm'>
         <MDBInput id='form12Example1' label='Amount' />
      </MDBCol>
      <MDBCol size='sm'>
        <MDBInput id='form12Example2' label='Amount in PKR' /><br></br>
      </MDBCol>
      <MDBCol size='sm'>
      <MDBCheckbox name='inlineCheck' id='inlineCheckbox1' value='option1' label='Cash' inline />
      <MDBCheckbox name='inlineCheck' id='inlineCheckbox2' value='option2' label='Pending/Debt' inline /><br></br>
      </MDBCol>

    </MDBRow>
    <div className='me-1 d-grid gap-5 col-2'>
<MDBInput  id='form12Example2' label='Add Paid Amount' />  <MDBInput  id='form12Example2' label='Remaining Amount' />  <br></br>
    </div>

    <div className='d-flex align-items-center justify-content-center  ' >

    <MDBBtn className='me-1 d-grid gap-5 col-2' size= 'lg' onClick={toggleShow2}>Add new Person</MDBBtn>

<MDBModal tabIndex='-1' show={centredModal2} setShow={setCentredModal2}>
  <MDBModalDialog centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle></MDBModalTitle>
        <MDBBtn className=' btn-close'  color='none' onClick={toggleShow2}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <h5>Add New Person here</h5>
      <MDBInput id='form12Example2' label='Person Name' />
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={toggleShow2}>
          Close
        </MDBBtn>
        <MDBBtn>Add</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>


    <MDBBtn className='me-1 d-grid gap-5 col-2' color='success'size='lg'>
        Buy
      </MDBBtn>
      <MDBBtn className='me-1 d-grid gap-5 col-2' color='danger' size='lg'>
        Sell
      </MDBBtn>

    </div>
      </MDBCardBody>
    </MDBCard>
</>
      </Grid>

{/* --------------------------------------------Update Person Debt Record Here----------------------------------------------*/}

      <Grid
        templateColumns={{ md: "1fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
<>
<MDBCard>
      <MDBCardHeader>Person Debt and Paid Record</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Select person to ceck its payment record</MDBCardTitle>
        <MDBCardText>Use Buttons to update person's payment record.</MDBCardText><br></br>
        
        <MDBRow className='g-3'>

<MDBCol size='sm'>
<Form.Select aria-label="Default select example">
      <option>select Person</option>
      <option value="USD">ahmed</option>
      <option value="PKR">ali</option>
      <option value="AUD">saad</option>
    </Form.Select>
</MDBCol>

      <MDBCol size='sm'>
        <MDBInput id='form12Example2' label='Paid Amount' disabled /><br></br>
      </MDBCol>

      <MDBCol size='sm'>
         <MDBInput id='form12Example1' label='Remaining Amount'disabled />
      </MDBCol>

      <MDBCol size='sm'>
        <MDBInput id='form12Example2' label='Add new payment' /><br></br>
      </MDBCol>

    </MDBRow>


    <div className='d-flex align-items-center justify-content-center  ' >
      <MDBBtn className='me-1 d-grid gap-5 col-2' color='danger' size='lg'>
        Update Record
      </MDBBtn>
    </div>
      </MDBCardBody>
    </MDBCard>
</>
      </Grid>




{/* ====================================Charts===============================================*/}



      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }}>
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
