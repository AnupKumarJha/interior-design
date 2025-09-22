import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Heading, Text, Image, Grid, VStack, HStack, Tag, List, ListItem, Divider } from '@chakra-ui/react'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { projects } from '../../data/projects'

const ProjectPage: React.FC = () => {
  const router = useRouter()
  const { slug } = router.query
  const project = projects.find(p => p.slug === slug)

  if (!project) return null

  return (
    <>
      <Head>
        <title>{project.title} | NamasteDesignStudios</title>
        <meta name="description" content={project.summary} />
      </Head>
      <Nav />
      <Box pt="28" px={['1.5em', '1.5em', '1.5em', '15%']}>
        <VStack align="flex-start" spacing="3" mb="6">
          <HStack spacing="2">
            <Tag colorScheme="purple" size="sm">{project.category}</Tag>
            <Text color="gray.600">{project.location}</Text>
          </HStack>
          <Heading as="h1" size="2xl" fontWeight="black">{project.title}</Heading>
          <Text color="gray.700">{project.summary}</Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="8" alignItems="start">
          <VStack align="flex-start" spacing="4">
            {project.images.map((src, idx) => (
              <Image key={idx} src={src} alt={`${project.title} image ${idx+1}`} borderRadius="lg" boxShadow="sm" />
            ))}
          </VStack>
          <VStack align="flex-start" spacing="6" bg="white" borderRadius="xl" border="1px solid" borderColor="gray.100" p="6" boxShadow="sm">
            <VStack align="flex-start" spacing="1">
              <Text fontSize="sm" color="gray.500">Duration</Text>
              <Text fontWeight="bold">{project.duration}</Text>
            </VStack>
            {project.budgetRange && (
              <VStack align="flex-start" spacing="1">
                <Text fontSize="sm" color="gray.500">Budget</Text>
                <Text fontWeight="bold">{project.budgetRange}</Text>
              </VStack>
            )}
            <Divider />
            <VStack align="flex-start" spacing="3">
              <Text fontWeight="bold">Scope & Deliverables</Text>
              <List spacing="2" styleType="disc" pl="5">
                {project.scope.map((item, idx) => (
                  <ListItem key={idx}>{item}</ListItem>
                ))}
              </List>
            </VStack>
            <Box as="a" href="#contact" bg="purple.500" color="white" px="6" py="3" borderRadius="lg" fontWeight="bold" _hover={{ bg: 'purple.600' }}>
              Start Your Project
            </Box>
            <Box as="a" href="https://wa.me/9972555787?text=Hi%20NamasteDesignStudios%2C%20I%20liked%20your%20project%3A%20" target="_blank" rel="noopener" color="purple.600" fontWeight="bold">
              Chat on WhatsApp →
            </Box>
          </VStack>
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

export default ProjectPage

