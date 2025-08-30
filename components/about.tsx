import React from 'react'
import { Box, Flex, Heading, Text, Image, Grid } from '@chakra-ui/react'
import Button from './button'

const About: React.FC = () => {
  return (
    <Grid
      id="about"
      templateColumns={['1fr', '1fr', '1fr', 'repeat(6, 1fr)']}
      marginY="24"
      alignItems="center"
      paddingX={['1.5em', '1.5em', '1.5em', '15%']}
    >
      <Box gridColumn={['1 / 1', '1 / 1', '1 / 1', '1 / 4']}>
        <Image
          src="/about-us-bg.png"
          alt="About Namaste Design Studios"
          display={['none', 'none', 'none', 'block', 'block']}
          width="100%"
          borderRadius="md"
          boxShadow="lg"
        />
      </Box>
      <Flex
        flexDirection="column"
        flexWrap="nowrap"
        gridColumn={['1 / 1', '1 / 1', '1 / 1', '4 / 7']}
        alignItems={['center', 'center', 'center', 'flex-start']}
        paddingLeft={['0', '0', '0', '12']}
        textAlign={['center', 'center', 'center', 'left']}
      >
        <Heading
          as="h2"
          fontSize={['4xl', '4xl', '5xl', '5xl', '5xl']}
          fontWeight="black"
          mb="4"
        >
          About Us
        </Heading>
        <Text fontSize="xl" mb="6">
          Namaste Design Studios is led by our passionate founder,{' '}
          <strong>Rishu Sandilya</strong>. With a keen eye for detail and a
          commitment to creating spaces that are both beautiful and functional,
          Rishu and her team work closely with each client to bring their vision
          to life.
        </Text>
        <Text fontSize="lg" mb="6">
          Our collaborative approach ensures that every project is a true
          reflection of our client&apos;s personality and lifestyle. We are dedicated
          to delivering exceptional design and a seamless experience from start
          to finish.
        </Text>
        <Text fontSize="lg" mb="8" fontWeight="bold">
          Contact Rishu: 7001837559
        </Text>
        <Box
          as="a"
          href="#services"
        >
          <Button content="Learn More" />
        </Box>
      </Flex>
    </Grid>
  )
}

export default About
