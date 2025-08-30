import React, { useState } from 'react';
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
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_ax7g3no'; // You'll need to replace this
      const templateId = 'template_355itln'; // Replace this with your actual template ID from EmailJS dashboard
      const publicKey = 'ROmkUq835qVWPKFTU'; // You'll need to replace this

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Anup Jha',
        to_email: 'anupjha099@gmail.com',
        reply_to: formData.email
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again or contact us directly.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <Alert status="info" mb="6" maxW="600px">
        <AlertIcon />
        <Box>
          <Text fontSize="sm">
            <strong>Note:</strong> To complete the email setup, you'll need to configure EmailJS with your account details. 
            For now, the form will show a demo of the functionality.
          </Text>
        </Box>
      </Alert>

      <Box width="100%" maxW="600px">
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb="4" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="email" mb="4" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="message" mb="4" isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea 
              name="message"
              placeholder="Tell us about your project" 
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
            />
          </FormControl>
          <Button 
            type="submit" 
            colorScheme="orange" 
            size="lg" 
            width="100%"
            isLoading={isLoading}
            loadingText="Sending..."
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactForm;
