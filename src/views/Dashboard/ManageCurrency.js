import { useColorModeValue,  Text } from '@chakra-ui/react';
import React from 'react'

export default function ManageCurrency() {
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  return (
    <div>
      <Text color={mainText}>
        ManageCurrency
      </Text>
    </div>
  )
}
