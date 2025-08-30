import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

interface ButtonProps {
  content: string;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ content, variant = 'primary', size = 'lg' }) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          bg: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          _hover: {
            bg: 'rgba(255,255,255,0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }
        };
      case 'secondary':
        return {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'purple.500',
          color: 'purple.500',
          _hover: {
            bg: 'purple.500',
            color: 'white',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(128, 90, 213, 0.3)'
          }
        };
      default:
        return {
          bgGradient: 'linear(45deg, purple.500, purple.600, orange.400)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(45deg, purple.600, purple.700, orange.500)',
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(128, 90, 213, 0.4)'
          }
        };
    }
  };

  return (
    <ChakraButton
      {...getButtonStyles()}
      size={size}
      borderRadius="xl"
      fontWeight="bold"
      px="8"
      py="6"
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
      width="fit-content"
    >
      {content}
    </ChakraButton>
  )
}

export default Button
