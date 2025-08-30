import React from 'react'
import { Flex, Grid, Heading, Text, Box, VStack, HStack } from '@chakra-ui/react'
import Button from './button'
import CompactContactForm from './compact-contact-form'

const Header: React.FC = () => {
  return (
    <Box id="home" position="relative" overflow="hidden">
      {/* Animated gradient background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(135deg, purple.900 0%, purple.600 25%, blue.500 50%, purple.400 75%, orange.300 100%)"
        backgroundSize="400% 400%"
        zIndex="0"
      />
      
      {/* Background image overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage="url(/25782.jpg)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        opacity="0.3"
        zIndex="1"
      />

      {/* Dark overlay for text readability */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0,0,0,0.4)"
        zIndex="2"
      />

      <Grid
        height={['70vh', '70vh', '80vh', '90vh']}
        templateColumns={['1fr', '1fr', '1fr', '1fr 400px']}
        templateRows="1fr 1fr 1fr"
        alignItems="center"
        position="relative"
        zIndex="3"
        paddingX={['1.5em', '1.5em', '1.5em', '15%']}
        gap="8"
      >
        <VStack
          gridRow="2 / 3"
          gridColumn={['1', '1', '1', '1']}
          spacing="6"
          align="flex-start"
          maxW="900px"
          w="full"
        >
          {/* Badge */}
          <Box
            bg="rgba(255,255,255,0.1)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255,255,255,0.2)"
            borderRadius="full"
            px="6"
            py="2"
            color="white"
            fontSize="sm"
            fontWeight="medium"
          >
            ✨ Premium Interior Design Studio
          </Box>

          <Heading
            as="h1"
            fontWeight="black"
            fontSize={['4xl', '5xl', '6xl', '7xl']}
            color="white"
            lineHeight="shorter"
            textShadow="2px 2px 4px rgba(0,0,0,0.3)"
          >
            Your Space, Your{' '}
            <Text 
              as="span" 
              bgGradient="linear(to-r, orange.300, yellow.300, orange.400)"
              bgClip="text"
              fontWeight="black"
            >
              Story
            </Text>
          </Heading>

          <Text 
            fontSize={['lg', 'xl', '2xl']} 
            color="gray.100" 
            maxW="600px"
            lineHeight="tall"
            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
          >
            We create personalized, beautiful, and functional living spaces that
            reflect your unique personality and enhance your lifestyle.
          </Text>

          <Flex 
            direction={['column', 'column', 'row']} 
            gap="4" 
            pt="2"
            align={['stretch', 'stretch', 'flex-start']}
            w={['full', 'full', 'auto']}
          >
            <Box
              bg="rgba(255,255,255,0.9)"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              px={['6', '8']}
              py="4"
              cursor="pointer"
              transition="all 0.3s ease"
              textAlign="center"
              minW={['auto', 'auto', '200px']}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                bg: 'white'
              }}
              border="1px solid rgba(255,255,255,0.2)"
            >
              <Text fontWeight="bold" color="purple.700" fontSize={['md', 'md']}>
                Get Free Consultation
              </Text>
            </Box>
            
            <Box
              border="2px solid rgba(255,255,255,0.3)"
              borderRadius="xl"
              px={['6', '8']}
              py="4"
              cursor="pointer"
              transition="all 0.3s ease"
              textAlign="center"
              minW={['auto', 'auto', '160px']}
              _hover={{
                bg: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.5)',
                transform: 'translateY(-2px)'
              }}
            >
              <Text fontWeight="bold" color="white" fontSize={['md', 'md']}>
                View Portfolio
              </Text>
            </Box>
          </Flex>

          {/* Stats */}
          <Flex 
            direction={['column', 'row']} 
            gap={['4', '8', '12']} 
            pt="6"
            align={['flex-start', 'center']}
            w="full"
          >
            <VStack spacing="1" align={['flex-start', 'center']}>
              <Text fontSize={['xl', '2xl']} fontWeight="bold" color="white">500+</Text>
              <Text fontSize="sm" color="gray.300">Projects Completed</Text>
            </VStack>
            <VStack spacing="1" align={['flex-start', 'center']}>
              <Text fontSize={['xl', '2xl']} fontWeight="bold" color="white">50+</Text>
              <Text fontSize="sm" color="gray.300">Happy Clients</Text>
            </VStack>
            <VStack spacing="1" align={['flex-start', 'center']}>
              <Text fontSize={['xl', '2xl']} fontWeight="bold" color="white">5★</Text>
              <Text fontSize="sm" color="gray.300">Average Rating</Text>
            </VStack>
          </Flex>
        </VStack>

        {/* Contact Form on the right */}
        <Box
          gridRow={['4', '4', '4', '1 / 4']}
          gridColumn={['1', '1', '1', '2']}
          display={['none', 'none', 'none', 'block']}
          position="relative"
          zIndex="4"
        >
          <Box
            bg="rgba(255,255,255,0.95)"
            backdropFilter="blur(20px)"
            borderRadius="2xl"
            p="6"
            boxShadow="0 20px 60px rgba(0,0,0,0.15)"
            border="1px solid rgba(255,255,255,0.2)"
            maxW="400px"
            w="full"
          >
            <CompactContactForm />
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default Header
