
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

  MDBBadge, MDBTable, MDBTableHead, MDBTableBody

}
from 'mdb-react-ui-kit';

import Form from 'react-bootstrap/Form';
import { Placeholder } from 'react-bootstrap';



export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  const [centredModalUR, setCentredModalUR] = useState(false);
  const updaterecord = () => setCentredModalUR(!centredModalUR);



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
      <MDBCardHeader style={{fontWeight: 'bold', fontSize: '20px'}}>ADD Currency Record</MDBCardHeader>
      <MDBCardBody>
      
        <br></br>
    
<MDBRow className='g-1'>
<h1 style={{fontWeight: 'bold', fontSize: '16px'}}>Select Person</h1>
   <MDBCol size='sm'>
      <Form.Select aria-label="Default select example">
      <option>select Person</option>
      <option value="USD">Walking person</option>
      <option value="PKR">Ali</option>
      <option value="AUD">Saad</option>
      </Form.Select>
    </MDBCol>

<MDBRow size='sm' className='g-1' style={{marginTop:20}}>
<h1 style={{fontWeight: 'bold', fontSize: '16px'}}>Select Currency</h1>
<Form.Select aria-label="Default select example">
      <option>select Currency</option>
      <option value="USD">USD</option>
      <option value="PKR">PKR</option>
      <option value="AUD">AUD</option>
    </Form.Select>
</MDBRow>
      <MDBRow size='sm' className='g-1' style={{marginTop:20}}>
      <h1 style={{fontWeight: 'bold', fontSize: '16px'}}>Add Currency Rate</h1>
        <MDBInput id='form12Example2' label='Currency Rate' /><br></br>
      </MDBRow>
      <MDBRow size='sm' className='g-1' style={{marginTop:20}}>
      <h1 style={{fontWeight: 'bold', fontSize: '16px'}}>Total Amount</h1>
         <MDBInput id='form12Example1' label='Amount' />
      </MDBRow>
      <MDBRow size='sm' className='g-1' style={{marginTop:40}}>
        <h1 style={{fontWeight: 'bold', fontSize: '23px'}}>Your Total Amount in PKR</h1>
        <MDBInput id='form12Example2' label='Amount in PKR' disabled style={{fontWeight: 'bold', fontColor: 'red'}}/><br></br>
      </MDBRow>

    </MDBRow>

    <MDBRow style={{marginBottom:50, marginTop:50}}>
    <MDBRow>
      <MDBCheckbox name='inlineCheck' id='inlineCheckbox2' value='option2' label='Pending/Debt' inline /><br></br>
      </MDBRow>
    <MDBCol size='md-4'>
        <MDBInput  id='form12Example2' label='Add Paid Amount' />
    </MDBCol>

    <MDBCol size='md-4'>
        <MDBInput  id='form12Example2' label='Your Remaining Amount is' disabled />
    </MDBCol>

    </MDBRow>
    

    <div className='d-flex align-items-center justify-content-center  ' >

    <MDBBtn className='me-1 d-grid gap-5 col-2' size= 'lg' onClick={toggleShow}>Add new Person</MDBBtn>

<MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
  <MDBModalDialog centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle></MDBModalTitle>
        <MDBBtn className=' btn-close'  color='none' onClick={toggleShow}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <h5>Add New Person here</h5>
      <MDBInput id='form12Example2' label='Person Name' />
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={toggleShow}>
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









{/* -=========================================================================TABLE=============================================================== */}




<MDBCard>
      <MDBCardHeader style={{fontWeight: 'bold', fontSize: '20px'}}>Manage Users</MDBCardHeader>
      <MDBCardBody>
      <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Currency</th>
          <th scope='col'>Total Amount</th>
          <th scope='col'>Paid Amount</th>
          <th scope='col'>Debt/Pending Amount</th>
          <th scope='col'>Status</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div>
                <p className='fw-bold mb-1'>John Doe</p>
              </div>
            </div>
          </td>

          <td>
            <p className='fw-normal mb-1'>USD</p>
          </td>

          <td>
            <p className='fw-normal mb-1'>100</p>
          </td>


          <td>
          <p className='fw-normal mb-1'>100</p>
          </td>
          <td>
          <p className='fw-normal mb-1'>0</p>
          </td>
 
          <td>
            <MDBBadge color='success' pill style={{fontSize: '14px'}}>
              Paid
            </MDBBadge>
          </td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Remove User
            </MDBBtn>

          </td>
        </tr>


        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div>
                <p className='fw-bold mb-1'>Saad</p>
              </div>
            </div>
          </td>

          <td>
            <p className='fw-normal mb-1'>PKR</p>
          </td>

          <td>
            <p className='fw-normal mb-1'>1400</p>
          </td>

          <td>
          <p className='fw-normal mb-1'>1400</p>
          </td>
          <td>
          <p className='fw-normal mb-1'>0</p>
          </td>
 
          <td>
            <MDBBadge color='success' pill style={{fontSize: '14px'}}>
              Paid
            </MDBBadge>
          </td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Remove User
            </MDBBtn>

          </td>
        </tr>

        
        <tr>
        <td>
            <div className='d-flex align-items-center'>
              <div>
                <p className='fw-bold mb-1'>Ahmed</p>
              </div>
            </div>
          </td>

          <td>
            <p className='fw-normal mb-1'>AUD</p>
          </td>

          <td>
            <p className='fw-normal mb-1'>1200</p>
          </td>


          <td>
          <p className='fw-normal mb-1'>750</p>
          </td>
          <td>
          <p className='fw-normal mb-1'>450</p>
          </td>
 
          <td>
            <MDBBadge color='warning' pill style={{fontSize: '14px'}}>
              Pending
            </MDBBadge>
          </td>
          <td>
            <MDBBtn color='link' rounded size='sm' onClick={updaterecord}>
              Update Record
            </MDBBtn>
            <MDBModal tabIndex='-1' show={centredModalUR} setShow={setCentredModalUR}>
  <MDBModalDialog centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle></MDBModalTitle>
        <MDBBtn className=' btn-close'  color='none' onClick={updaterecord}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <h2 style={{fontWeight: 'bold', fontSize:'20px'}}>Update Person Amount</h2><br></br>
        
        <MDBInput id='form12Example2' label='Update Payment Record' />
      
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={updaterecord}>
          Close
        </MDBBtn>
        <MDBBtn color='danger'>Update Amount</MDBBtn>

      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

            <MDBBtn color='link' rounded size='sm'>
              Remove User
            </MDBBtn>

          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
        </MDBCardBody>
        </MDBCard>



    </Flex>
  );
}
