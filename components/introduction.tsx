import React from 'react'
import { Grid, Heading, Text, Flex, Box } from '@chakra-ui/react'
import Button from './button'

const Introduction: React.FC = () => {
  return (
    <Grid
      templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      gap={['2em', '2em', '2em', '8em']}
      paddingX={['1.5em', '1.5em', '1.5em', '15%']}
      mt="24"
      alignItems="center"
    >
      <Flex
        flexDirection="column"
        width="100%"
        justifyContent="center"
        alignItems={['center', 'center', 'center', 'start']}
      >
        <Heading
          as="h2"
          fontWeight="black"
          fontSize={['4xl', '4xl', '5xl', '5xl', '5xl']}
          textAlign={['center', 'center', 'center', 'left']}
        >
          Welcome to NamasteDesignStudios
        </Heading>
        <Text
          mt="8"
          fontSize="xl"
          textAlign={['center', 'center', 'center', 'left']}
        >
          At NamasteDesignStudios, we believe that your home should be a
          reflection of your unique personality and lifestyle. Our mission is to
          collaborate with you to create a space that is not only beautiful and
          functional but also tells your story.
        </Text>
        <Box
          as="a"
          href="#about"
          mt="8"
        >
          <Button content="Learn More" />
        </Box>
      </Flex>
      <Flex
        backgroundImage="url(/about-us-bg.png)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        height="500px"
        width="100%"
        display={['none', 'none', 'none', 'flex']}
      />
    </Grid>
  )
}
export default Introduction
