import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Text,
  useColorModeValue,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

// Custom Icons
import { ProfileIcon } from "components/Icons/Icons";
// Custom Components
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";
import { url_path } from "views/constants";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  if (secondary) {
    navbarIcon = "gray";
  }

  const [expenses, setExpenses] = useState({
    name: '',
    amount: 0
  });
  const [validation, setValidation] = useState({name_msg: true, amount_msg: true});
  const toast = useToast()

  const handleInputChange = event => {
    const name = event.target.name
    let value = event.target.value
    setExpenses({...expenses, [name]: value})
  };

  const handleSubmit = event => {
    if(expenses.name === ''){
      setValidation({...validation, name_msg : false})
    }else if(parseInt(expenses.amount) < 1){
      setValidation({...validation, amount_msg: false})
    }else{
      setValidation({name_msg: true, amount_msg: true})
      const data = {
        name: expenses.name,
        amount: parseInt(expenses.amount),
        created_at: new Date()
      }
      axios.post(`${url_path}/expenses`, data).then(response => {
        if(response.data.error === 0 && response.data.acknowledged){
          onClose()
          toast({
            title: 'Expense ' + expenses.name + ' add successfully.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setExpenses({name: '', amount: 0})
          onClose()
          window.location.reload(false);
        }
      })
    }
  }

  const navigateLogin = () =>{
    sessionStorage.clear()
    location.reload()
  }
  
  return (
    <>
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Button onClick={onOpen} style={{marginRight:'1rem'}}>
      <Text  display={{ sm: "none", md: "flex" }}>Add Expense</Text>
      </Button>
     
        <Button
        onClick={navigateLogin}
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
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl isRequired style={{'marginBottom': '1rem'}}>
              <FormLabel>Expense Title</FormLabel>
              <Input name="name" value={expenses.name} onChange={handleInputChange}/>
              {!validation.name_msg && <small style={{color:'red'}}>Title cannot be empty</small>}
            </FormControl>
            <FormControl isRequired style={{'marginBottom': '1rem'}}>
              <FormLabel>Amount</FormLabel>
              <Input name="amount" value={expenses.amount} onChange={handleInputChange}/>
              {!validation.amount_msg && <small style={{color:'red'}}>Amount cannot be less then 1</small>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Add
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
