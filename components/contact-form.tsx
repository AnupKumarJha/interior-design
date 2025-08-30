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
  Checkbox,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    whatsappUpdates: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: 'Please fill in required fields',
        description: 'Name, Phone, and Message are required.',
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
        from_phone: formData.phone,
        from_email: formData.email || 'No email provided',
        message: formData.message,
        whatsapp_updates: formData.whatsappUpdates ? 'Yes' : 'No',
        to_name: 'Anup Jha',
        to_email: 'anupjha099@gmail.com',
        reply_to: formData.email || formData.phone
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
      setFormData({ name: '', phone: '', email: '', message: '', whatsappUpdates: false });
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
        Designs for Every Budget
      </Heading>
      <Text fontSize="xl" mb="16" maxW="560px" textAlign="center">
        Have a project in mind? We'd love to hear from you.
      </Text>

      <Box width="100%" maxW="600px">
        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb="6" isRequired>
            <Input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={handleInputChange}
              size="lg"
              borderRadius="md"
              bg="white"
              border="2px solid"
              borderColor="gray.200"
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px orange.400" }}
            />
          </FormControl>

          <FormControl id="phone" mb="6" isRequired>
            <InputGroup size="lg">
              <InputLeftElement>
                <Box display="flex" alignItems="center" pl="2">
                  <Box 
                    width="20px" 
                    height="15px" 
                    bg="linear-gradient(to bottom, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%)"
                    mr="2"
                    borderRadius="2px"
                  />
                  <Text fontSize="sm">+91</Text>
                </Box>
              </InputLeftElement>
              <Input 
                type="tel" 
                name="phone"
                placeholder="Phone number" 
                value={formData.phone}
                onChange={handleInputChange}
                pl="20"
                borderRadius="md"
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px orange.400" }}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="email" mb="6">
            <Input 
              type="email" 
              name="email"
              placeholder="Email (Optional)" 
              value={formData.email}
              onChange={handleInputChange}
              size="lg"
              borderRadius="md"
              bg="white"
              border="2px solid"
              borderColor="gray.200"
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px orange.400" }}
            />
          </FormControl>

          <FormControl id="message" mb="6" isRequired>
            <Textarea 
              name="message"
              placeholder="Tell us about your project" 
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              size="lg"
              borderRadius="md"
              bg="white"
              border="2px solid"
              borderColor="gray.200"
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px orange.400" }}
            />
          </FormControl>

          <FormControl id="whatsapp" mb="8">
            <Checkbox 
              name="whatsappUpdates"
              isChecked={formData.whatsappUpdates}
              onChange={handleInputChange}
              colorScheme="red"
              size="lg"
            >
              <Text fontSize="lg">Send me updates on WhatsApp</Text>
            </Checkbox>
          </FormControl>

          <Button 
            type="submit" 
            bg="linear-gradient(135deg, #ff6b6b, #ee5a52)"
            color="white"
            size="lg" 
            width="100%"
            height="60px"
            fontSize="xl"
            fontWeight="bold"
            borderRadius="full"
            isLoading={isLoading}
            loadingText="Sending..."
            _hover={{ 
              bg: "linear-gradient(135deg, #ff5252, #e53e3e)",
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s ease-in-out"
          >
            NEXT
          </Button>

          <Text fontSize="sm" textAlign="center" mt="6" color="gray.600">
            By submitting this form, you agree to the{' '}
            <Text as="span" color="red.400" textDecoration="underline" cursor="pointer">
              privacy policy
            </Text>
            {' & '}
            <Text as="span" color="red.400" textDecoration="underline" cursor="pointer">
              terms and conditions
            </Text>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactForm;
