import React from 'react'
import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import Button from './button'

const Header: React.FC = () => {
  return (
    <Grid
      backgroundImage="url(/header-bg.png)"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={['60vh', '60vh', '60vh', '80vh']}
      templateRows="1fr 1fr 1fr"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        gridRow="2 / 3"
        paddingX={['1.5em', '1.5em', '1.5em', '15%']}
      >
        <Heading
          as="h1"
          fontWeight="black"
          fontSize={['5xl', '5xl', '7xl', '7xl', '7xl']}
          color="white"
          mb="3"
          width="fit-content"
          textShadow="2px 2px 4px rgba(0,0,0,0.5)"
        >
          Your Space, Your Story.
        </Heading>
        <Text
          color="white"
          fontSize={['lg', 'lg', '2xl', '2xl', '2xl']}
          width={['100%', '100%', '100%', '75%', '60%']}
          mb="8"
          textShadow="1px 1px 2px rgba(0,0,0,0.5)"
        >
          We create personalized, beautiful, and functional living spaces that
          reflect your unique personality.
        </Text>
        <Button>Get in Touch</Button>
      </Flex>
    </Grid>
  )
}

export default Header
