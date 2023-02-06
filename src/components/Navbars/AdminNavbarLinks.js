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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  HStack,
  RadioGroup,
} from "@chakra-ui/react";

// Custom Icons
import { ProfileIcon } from "components/Icons/Icons";
// Custom Components
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  let navbarIcon = useColorModeValue("gray.500", "gray.200");

  if (secondary) {
    navbarIcon = "gray";
    mainText = "gray";
  }
  const settingsRef = React.useRef();
  return (
    <>
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <Button onClick={onOpen} style={{marginRight:'1rem'}}>
      <Text  display={{ sm: "none", md: "flex" }}>Update Currency</Text>
      </Button>
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
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Currency</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired style={{'marginBottom': '1rem'}}>
              <FormLabel>Currency</FormLabel>
              <Select placeholder='Select Currency'>
                <option value="USD">USD</option>
                <option value="PKR">PKR</option>
                <option value="AUD">AUD</option>
              </Select>
            </FormControl>
            <FormControl isRequired style={{'marginBottom': '1rem'}}>
              <FormLabel>Amount</FormLabel>
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
            <FormControl isRequired as='fieldset'>
              <RadioGroup>
                <HStack spacing='24px'>
                  <Radio value='cask'>Cash</Radio>
                  <Radio value='pending'>Pending</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Update
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
  // onOpen: PropTypes.func,
};
