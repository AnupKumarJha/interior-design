import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

const ContactForm: React.FC = () => {
  return (
    <Flex
      id="contact"
      flexDirection="column"
      alignItems="center"
      mt="24"
      paddingX={['1.5em', '1.5em', '1.5em', '15%']}
    >
      <Heading
        as="h2"
        fontSize={['4xl', '4xl', '5xl', '5xl', '5xl']}
        fontWeight="black"
        mb="4"
      >
        Get in Touch
      </Heading>
      <Text fontSize="xl" mb="16" maxW="560px" textAlign="center">
        Have a project in mind? We'd love to hear from you.
      </Text>
      <Box width="100%" maxW="600px">
        <form>
          <FormControl id="name" mb="4">
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Your Name" />
          </FormControl>
          <FormControl id="email" mb="4">
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your Email" />
          </FormControl>
          <FormControl id="message" mb="4">
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Tell us about your project" />
          </FormControl>
          <Button type="submit" colorScheme="orange" size="lg" width="100%">
            Send Message
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactForm;
