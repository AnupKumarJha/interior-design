import React, { useState } from 'react'
import Nav from '../components/nav'
import Header from '../components/header'
import Introduction from '../components/introduction'
import About from '../components/about'
import Service from '../components/service'
import ModernServices from '../components/modern-services'
import BlogSection from '../components/blog-section'
import Footer from '../components/footer'
import OurProjects from '../components/our-projects'
import { Divider, Box, Button, Flex, Text } from '@chakra-ui/react'
import ContactForm from '../components/contact-form'
import NamasteDesignStudio from '../components/namaste-design-studio'

const Home: React.FC = () => {
  const [useModernDesign, setUseModernDesign] = useState(false)

  // Modern Design Layout
  if (useModernDesign) {
    return (
      <>
        {/* Toggle Button for switching between designs */}
        <Box
          position="fixed"
          top="20px"
          right="20px"
          zIndex="9999"
          bg="rgba(255,255,255,0.9)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p="3"
          boxShadow="lg"
        >
          <Flex direction="column" align="center" gap="2">
            <Text fontSize="sm" fontWeight="medium">Design Mode</Text>
            <Button
              size="sm"
              colorScheme="purple"
              variant="outline"
              onClick={() => setUseModernDesign(false)}
            >
              Classic
            </Button>
          </Flex>
        </Box>
        <NamasteDesignStudio />
      </>
    )
  }

  // Original Design Layout (preserved exactly as it was)
  return (
    <>
      {/* Toggle Button for switching between designs */}
      <Box
        position="fixed"
        top="20px"
        right="20px"
        zIndex="9999"
        bg="rgba(255,255,255,0.9)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p="3"
        boxShadow="lg"
      >
        <Flex direction="column" align="center" gap="2">
          <Text fontSize="sm" fontWeight="medium">Design Mode</Text>
          <Button
            size="sm"
            colorScheme="purple"
            onClick={() => setUseModernDesign(true)}
          >
            Modern
          </Button>
        </Flex>
      </Box>
      
      {/* Original Layout - All existing wiring preserved */}
      <Nav />
      <Header />
      <Introduction />
      <About />
      <ModernServices />
      <OurProjects />
      <BlogSection />
      <Divider />
      <ContactForm />
      <Footer />
    </>
  )
}

export default Home
