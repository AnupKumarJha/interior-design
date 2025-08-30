import React from 'react'
import { Flex, Heading, Text, Box } from '@chakra-ui/react'
import Button from './button'
import Carousel from './carousel'

const OurProjects: React.FC = () => {
  const projectImages = [
    '/grid/1.png',
    '/grid/2.png',
    '/grid/3.png',
    '/grid/4.png',
    '/grid/5.png',
    '/grid/6.png'
  ];

  return (
    <Flex
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
        Featured Projects
      </Heading>
      <Text fontSize="xl" mb="16" maxW="560px" textAlign="center">
        A glimpse into our portfolio of bespoke designs and transformative
        spaces.
      </Text>
      <Box width="100%">
        <Carousel images={projectImages} />
      </Box>
      <Box mt="16">
        <Button content='View All Projects' />
      </Box>
    </Flex>
  )
}

export default OurProjects
