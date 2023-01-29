
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";


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


// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {

  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "gray";
    mainText = "gray";
  }
  const settingsRef = React.useRef();


  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >

      
      {/* <Button style={{marginRight:'1rem'}}>
      <Text display={{ sm: "none", md: "flex" }}>Update Currency</Text>
      </Button> */}
      
      <MDBBtn style={{marginRight:'1rem'}}  size= 'mg' onClick={toggleShow}>Add Currency</MDBBtn>

      <MDBModal  show={centredModal} setShow={setCentredModal}>
  <MDBModalDialog centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle></MDBModalTitle>
        <MDBBtn  className=' btn-close'  color='none' onClick={toggleShow}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>


 
      

<MDBCard>
      <MDBCardHeader style={{ fontSize: 21, fontWeight: 'bold' }} >ADD Currency</MDBCardHeader>
      <MDBCardBody>
        
        <MDBRow className='g-1'>
<MDBCol size='sm'>
<Form.Select aria-label="Default select example"  textBefore='$'>
  
      <option>select Currency</option>
      <option value="USD">USD</option>
      <option value="PKR">PKR</option>
      <option value="AUD">AUD</option>
    </Form.Select>
</MDBCol>

      
      <MDBInput id='form12Example2' label='Currency Rate' textBefore='$'/><br />
      <MDBInput id='form12Example1' label='Amount' /><br />
      <MDBInput id='form12Example2' label='Amount in PKR' disabled /><br />
      <MDBCheckbox  name='inlineCheck' id='inlineCheckbox2' value='option2' label='Pending' inline /><br />

    </MDBRow>
    
    <MDBInput  id='form12Example2' label='Add Pending Amount' /><br></br>
    <div className='d-flex align-items-center justify-content-center  ' >
    <MDBBtn  color='success'size='lg'>
    Add Currency
      </MDBBtn>
    </div>
      </MDBCardBody>
    </MDBCard>

      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='danger' onClick={toggleShow}>
          Close
        </MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>


      <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
            ) : (
              ""
            )
          }
        >
          <Text display={{ sm: "none", md: "flex" }}>Logout</Text>
        </Button>
      </NavLink>
        <Button onClick={toggleColorMode}>
          Theme {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
