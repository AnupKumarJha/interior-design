import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  FormControl,
  Input,
  Textarea,
  Button,
  useToast,
  Checkbox,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

const CompactContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    whatsappUpdates: false,
    countryCode: '+91'
  });
  
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const countries = [
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
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

  const handleCountrySelect = (country: { name: string; code: string; flag: string }) => {
    setFormData(prev => ({
      ...prev,
      countryCode: country.code
    }));
    setShowCountryDropdown(false);
  };

  const getSelectedCountry = () => {
    return countries.find(country => country.code === formData.countryCode) || countries[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const serviceId = 'service_ax7g3no';
      const templateId = 'template_355itln';
      const publicKey = 'ROmkUq835qVWPKFTU';

      const templateParams = {
        from_name: formData.name,
        from_phone: `${formData.countryCode} ${formData.phone}`,
        from_email: formData.email || 'No email provided',
        message: formData.message,
        whatsapp_updates: formData.whatsappUpdates ? 'Yes' : 'No',
        to_name: 'Anup Jha',
        to_email: 'anupjha099@gmail.com',
        reply_to: formData.email || `${formData.countryCode}${formData.phone}`
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast({
        title: 'Message Sent!',
        description: 'Thank you for your inquiry. We\'ll get back to you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        whatsappUpdates: false,
        countryCode: '+91'
      });

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="full">
      <Box textAlign="center" mb="6">
        <Text fontSize="xs" color="purple.600" fontWeight="medium" mb="1">
          1 / 2
        </Text>
        <Heading
          as="h3"
          size="md"
          fontWeight="bold"
          color="gray.800"
          mb="2"
        >
          Designs for Every Budget
        </Heading>
      </Box>

      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb="4" isRequired>
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
            fontSize="sm"
            py="3"
            _focus={{
              borderColor: 'purple.500',
              boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.6)',
            }}
          />
        </FormControl>

        <FormControl id="phone" mb="4" isRequired>
          <Box position="relative">
            <InputGroup size="md">
              <InputLeftElement width="auto" pl="3" pr="1">
                <Box
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  px="2"
                  py="1"
                  borderRadius="md"
                  _hover={{ bg: 'gray.100' }}
                >
                  <Text fontSize="sm" mr="1">{getSelectedCountry().flag}</Text>
                  <Text fontSize="xs" color="gray.600">▼</Text>
                </Box>
              </InputLeftElement>
              <Input
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                pl="14"
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="lg"
                fontSize="sm"
                py="3"
                _focus={{
                  borderColor: 'purple.500',
                  boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.6)',
                }}
              />
            </InputGroup>
            {showCountryDropdown && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                right="0"
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="lg"
                mt="1"
                maxH="200px"
                overflowY="auto"
                zIndex="10"
                boxShadow="lg"
              >
                {countries.map((country, index) => (
                  <Box
                    key={index}
                    onClick={() => handleCountrySelect(country)}
                    cursor="pointer"
                    px="3"
                    py="2"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: 'gray.100' }}
                    fontSize="sm"
                  >
                    <Text fontSize="sm" mr="3">{country.flag}</Text>
                    <Text fontSize="sm" flex="1">{country.name}</Text>
                    <Text fontSize="xs" color="gray.600">{country.code}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </FormControl>

        <FormControl id="message" mb="4" isRequired>
          <Textarea
            name="message"
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={handleInputChange}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="lg"
            fontSize="sm"
            rows={3}
            _focus={{
              borderColor: 'purple.500',
              boxShadow: '0 0 0 1px rgba(128, 90, 213, 0.6)',
            }}
          />
        </FormControl>

        <FormControl id="whatsapp" mb="6">
          <Checkbox
            name="whatsappUpdates"
            isChecked={formData.whatsappUpdates}
            onChange={handleInputChange}
            colorScheme="purple"
            size="sm"
          >
            <Text fontSize="sm">Send me updates on WhatsApp</Text>
          </Checkbox>
        </FormControl>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Sending..."
          bg="purple.500"
          color="white"
          size="md"
          width="full"
          borderRadius="lg"
          fontWeight="bold"
          py="3"
          _hover={{
            bg: 'purple.600',
            transform: 'translateY(-1px)',
          }}
          _active={{
            bg: 'purple.700',
          }}
        >
          NEXT
        </Button>

        <Text fontSize="xs" color="gray.500" textAlign="center" mt="4" lineHeight="tall">
          By submitting this form, you agree to the{' '}
          <Text as="span" color="purple.500" cursor="pointer">
            privacy policy
          </Text>{' '}
          &{' '}
          <Text as="span" color="purple.500" cursor="pointer">
            terms and conditions
          </Text>
        </Text>
      </form>
    </Box>
  );
};

export default CompactContactForm;
