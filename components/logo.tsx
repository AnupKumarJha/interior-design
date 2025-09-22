import React from 'react'
import { Heading, Text, Flex, Image } from '@chakra-ui/react'

const Logo: React.FC = () => {
  return (
    <Flex align="center">
      <Image 
        src="/icon/image.png" 
        alt="NamasteDesignStudios Logo" 
        height="50px" 
        width="auto"
        mr="3" 
      />
      <Heading as="h1" size="lg" fontWeight="bold">
        <Text as="span" color="purple.600">Namaste</Text>
        <Text as="span" color="gray.700">DesignStudios</Text>
      </Heading>
    </Flex>
  )
}

export default Logo
