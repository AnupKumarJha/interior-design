import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '7001837559';
  const message = "Hello! I'm interested in your interior design services.";
  
  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      isExternal
      position="fixed"
      bottom="30px"
      right="30px"
      zIndex="1000"
    >
      <Box
        as={FaWhatsapp}
        size="60px"
        color="white"
        bg="green.500"
        borderRadius="full"
        p="12px"
        boxShadow="lg"
        transition="all 0.2s ease-in-out"
        _hover={{ transform: 'scale(1.1)', boxShadow: 'xl' }}
      />
    </Link>
  );
};

export default WhatsAppButton;
