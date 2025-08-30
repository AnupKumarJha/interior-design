import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

interface ButtonProps {
  content: string
}

const Button: React.FC<ButtonProps> = ({ content }) => {
  return (
    <ChakraButton
      fontWeight="bold"
      textTransform="uppercase"
      colorScheme="orange"
      size="lg"
      letterSpacing="1px"
      width="fit-content"
    >
      {content}
    </ChakraButton>
  )
}

export default Button
