import React from 'react'
import {
  Flex,
  Text,
  Heading,
  Grid,
  Image,
  Box
} from '@chakra-ui/react'
import Button from './button'

const OurProject: React.FC = () => {
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
      <Grid
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap="8"
        width="100%"
      >
        <ProjectCard image="/grid/1.png" />
        <ProjectCard image="/grid/2.png" />
        <ProjectCard image="/grid/3.png" />
        <ProjectCard image="/grid/4.png" />
        <ProjectCard image="/grid/5.png" />
        <ProjectCard image="/grid/6.png" />
      </Grid>
      <Button mt="16">View All Projects</Button>
    </Flex>
  )
}

const ProjectCard = ({ image }) => (
  <Box
    as="div"
    overflow="hidden"
    borderRadius="md"
    boxShadow="lg"
    transition="all 0.2s ease-in-out"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
  >
    <Image src={image} alt="Project" width="100%" height="100%" objectFit="cover" />
  </Box>
)

export default OurProject
