import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Grid, 
  Icon,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FaHome, FaBriefcase, FaDesktop, FaPaintBrush, FaCouch, FaLightbulb } from 'react-icons/fa';

interface ServiceCardProps {
  icon: any;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features }) => {
  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p="8"
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        borderColor: 'purple.200'
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgGradient: 'linear(to-r, purple.500, orange.400)',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(128, 90, 213, 0.03) 0%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}
      sx={{
        '&:hover::before': {
          opacity: 1
        },
        '&:hover::after': {
          opacity: 1
        }
      }}
    >
      <VStack align="flex-start" spacing="6" position="relative" zIndex="1">
        <Box
          bg="purple.50"
          borderRadius="xl"
          p="4"
          transition="all 0.3s ease"
          _groupHover={{
            bg: 'purple.100'
          }}
        >
          <Icon as={icon} fontSize="2xl" color="purple.500" />
        </Box>
        
        <VStack align="flex-start" spacing="3">
          <Heading as="h3" size="lg" color="gray.800" fontWeight="bold">
            {title}
          </Heading>
          <Text color="gray.600" fontSize="md" lineHeight="tall">
            {description}
          </Text>
        </VStack>

        <VStack align="flex-start" spacing="2" w="full">
          {features.map((feature, index) => (
            <HStack key={index} spacing="3">
              <Box
                w="2"
                h="2"
                borderRadius="full"
                bg="purple.400"
                flexShrink={0}
              />
              <Text fontSize="sm" color="gray.600">
                {feature}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

const ModernServices: React.FC = () => {
  const services = [
    {
      icon: FaHome,
      title: "Residential Design",
      description: "Transform your home into a personalized sanctuary that reflects your lifestyle and personality.",
      features: [
        "Complete home makeovers",
        "Room-by-room design",
        "Space optimization",
        "Color consultation"
      ]
    },
    {
      icon: FaBriefcase,
      title: "Commercial Spaces",
      description: "Create inspiring work environments that boost productivity and reflect your brand identity.",
      features: [
        "Office design & layout",
        "Retail space planning",
        "Restaurant interiors",
        "Brand integration"
      ]
    },
    {
      icon: FaPaintBrush,
      title: "Design Consultation",
      description: "Expert guidance to help you make informed decisions about your interior design project.",
      features: [
        "Design strategy sessions",
        "Material selection",
        "Budget planning",
        "Timeline management"
      ]
    },
    {
      icon: FaCouch,
      title: "Furniture Selection",
      description: "Curated furniture pieces that perfectly complement your space and lifestyle needs.",
      features: [
        "Custom furniture design",
        "Vendor coordination",
        "Quality assurance",
        "Installation services"
      ]
    },
    {
      icon: FaLightbulb,
      title: "Lighting Design",
      description: "Strategic lighting solutions that enhance ambiance and functionality in every room.",
      features: [
        "Natural light optimization",
        "Fixture selection",
        "Smart lighting systems",
        "Mood lighting design"
      ]
    },
    {
      icon: FaDesktop,
      title: "3D Visualization",
      description: "See your space come to life with photorealistic 3D renderings before construction begins.",
      features: [
        "3D floor plans",
        "Virtual walkthroughs",
        "Material previews",
        "Design iterations"
      ]
    }
  ];

  return (
    <Box id="services" py="20" px={['1.5em', '1.5em', '1.5em', '15%']} bg="gray.50">
      <VStack spacing="16" align="center">
        {/* Header */}
        <VStack spacing="6" textAlign="center" maxW="600px">
          <Box
            bg="purple.100"
            color="purple.600"
            px="4"
            py="2"
            borderRadius="full"
            fontSize="sm"
            fontWeight="medium"
          >
            Our Services
          </Box>
          
          <Heading
            as="h2"
            size="2xl"
            fontWeight="black"
            color="gray.800"
            lineHeight="shorter"
          >
            Comprehensive Design Solutions for{' '}
            <Text as="span" color="purple.500">
              Every Space
            </Text>
          </Heading>
          
          <Text fontSize="xl" color="gray.600" lineHeight="tall">
            From concept to completion, we offer a full range of interior design services 
            tailored to bring your vision to life.
          </Text>
        </VStack>

        {/* Services Grid */}
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap="8"
          w="full"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </Grid>

        {/* CTA */}
        <VStack spacing="6" textAlign="center">
          <Text fontSize="lg" color="gray.600">
            Ready to transform your space?
          </Text>
          <HStack spacing="4">
            <Box
              bg="purple.500"
              color="white"
              px="8"
              py="4"
              borderRadius="xl"
              fontWeight="bold"
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{
                bg: 'purple.600',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(128, 90, 213, 0.3)'
              }}
            >
              Schedule Consultation
            </Box>
            <Box
              border="2px solid"
              borderColor="purple.500"
              color="purple.500"
              px="8"
              py="4"
              borderRadius="xl"
              fontWeight="bold"
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{
                bg: 'purple.500',
                color: 'white',
                transform: 'translateY(-2px)'
              }}
            >
              View Portfolio
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ModernServices;
