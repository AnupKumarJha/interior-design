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

interface ContactFormProps {
  isCompact?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isCompact = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    whatsappUpdates: false,
    countryCode: '+91',
    serviceType: '',
    budgetRange: '',
    timeline: '',
    city: ''
  });
  
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countries = [
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' },
    { name: 'Algeria', code: '+213', flag: '🇩🇿' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' }
  ];
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        from_phone: `${formData.countryCode} ${formData.phone}`,
        from_email: formData.email || 'No email provided',
        message: formData.message,
        whatsapp_updates: formData.whatsappUpdates ? 'Yes' : 'No',
        to_name: 'Anup Jha',
        to_email: 'anupjha099@gmail.com',
        reply_to: formData.email || `${formData.countryCode}${formData.phone}`,
        service_type: formData.serviceType || 'Not specified',
        budget_range: formData.budgetRange || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        city: formData.city || 'Not specified',
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
      setFormData({ name: '', phone: '', email: '', message: '', whatsappUpdates: false, countryCode: '+91', serviceType: '', budgetRange: '', timeline: '', city: '' });
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
        Have a project in mind? We&apos;d love to hear from you.
      </Text>

      <Box width="100%" maxW="600px">
        <form onSubmit={handleSubmit}>
          <FormControl id="serviceType" mb="6">
            <Select name="serviceType" placeholder="Service type" value={formData.serviceType} onChange={handleInputChange} size="lg" borderRadius="md" bg="white" border="2px solid" borderColor="gray.200" _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 1px orange.400' }}>
              <option>Residential — Full Home</option>
              <option>Residential — Room Makeover</option>
              <option>Kitchen</option>
              <option>Commercial</option>
              <option>E‑Design / Consultation</option>
            </Select>
          </FormControl>

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
            <Box position="relative">
              <InputGroup size="lg">
                <InputLeftElement width="auto" pl="3" pr="1">
                  <Box 
                    display="flex" 
                    alignItems="center" 
                    cursor="pointer"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    _hover={{ bg: "gray.50" }}
                    borderRadius="md"
                    p="1"
                  >
                    <Text fontSize="lg" mr="1">{getSelectedCountry().flag}</Text>
                    <Text fontSize="sm" color="gray.600">▼</Text>
                  </Box>
                </InputLeftElement>
                <Input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  pl="16"
                  borderRadius="md"
                  bg="white"
                  border="2px solid"
                  borderColor="gray.200"
                  _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px orange.400" }}
              />
            </InputGroup>
            
            {showCountryDropdown && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                right="0"
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="lg"
                zIndex="1000"
                maxH="200px"
                overflowY="auto"
              >
                {countries.map((country, index) => (
                  <Box
                    key={index}
                    p="3"
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => handleCountrySelect(country)}
                    display="flex"
                    alignItems="center"
                  >
                    <Text fontSize="lg" mr="3">{country.flag}</Text>
                    <Text fontSize="sm" flex="1">{country.name}</Text>
                    <Text fontSize="sm" color="gray.600">{country.code}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
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

          <FormControl id="city" mb="6">
            <Input 
              type="text" 
              name="city"
              placeholder="City / Location" 
              value={formData.city}
              onChange={handleInputChange}
              size="lg"
              borderRadius="md"
              bg="white"
              border="2px solid"
              borderColor="gray.200"
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px orange.400" }}
            />
          </FormControl>

          <FormControl id="budgetRange" mb="6">
            <Select name="budgetRange" placeholder="Budget range" value={formData.budgetRange} onChange={handleInputChange} size="lg" borderRadius="md" bg="white" border="2px solid" borderColor="gray.200" _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 1px orange.400' }}>
              <option>Under ₹2L</option>
              <option>₹2L – ₹5L</option>
              <option>₹5L – ₹10L</option>
              <option>₹10L – ₹20L</option>
              <option>₹20L+</option>
            </Select>
          </FormControl>

          <FormControl id="timeline" mb="6">
            <Select name="timeline" placeholder="Timeline" value={formData.timeline} onChange={handleInputChange} size="lg" borderRadius="md" bg="white" border="2px solid" borderColor="gray.200" _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 1px orange.400' }}>
              <option>ASAP (0–1 month)</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>Just exploring</option>
            </Select>
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
