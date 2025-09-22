import React from 'react'
import Head from 'next/head'
import { Box, Heading, Text, Grid, Image, VStack, HStack, Tag, Link, Flex } from '@chakra-ui/react'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { projects } from '../../data/projects'

const ProjectsIndex: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portfolio | NamasteDesignStudios</title>
        <meta name="description" content="Browse residential interior design projects by NamasteDesignStudios. Modern, warm, and functional spaces delivered end-to-end." />
      </Head>
      <Nav />
      <Box pt="28" px={['1.5em', '1.5em', '1.5em', '15%']}>
        <Heading as="h1" size="2xl" fontWeight="black" mb="3">Portfolio</Heading>
        <Text color="gray.600" mb="8">Selected residential projects — layouts, palettes, and finished spaces.</Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="8">
          {projects.map(p => (
            <Link key={p.slug} href={`/projects/${p.slug}`} _hover={{ textDecoration: 'none' }}>
              <VStack align="flex-start" bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm" border="1px solid" borderColor="gray.100" spacing="0">
                <Box w="full" h="220px" overflow="hidden">
                  <Image src={p.coverImage} alt={p.title} w="100%" h="100%" objectFit="cover" transition="transform .3s" _hover={{ transform: 'scale(1.03)' }} />
                </Box>
                <VStack align="flex-start" spacing="2" p="5">
                  <HStack spacing="2">
                    <Tag colorScheme="purple" size="sm">{p.category}</Tag>
                    <Text fontSize="sm" color="gray.500">{p.location}</Text>
                  </HStack>
                  <Text fontWeight="bold">{p.title}</Text>
                  <Text fontSize="sm" color="gray.600">{p.summary}</Text>
                </VStack>
              </VStack>
            </Link>
          ))}
        </Grid>

        <Flex justify="center" my="16">
          <Box as="a" href="#contact">
            <Box bg="purple.500" color="white" px="8" py="4" borderRadius="xl" fontWeight="bold" _hover={{ bg: 'purple.600' }}>Start Your Project</Box>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  )
}

export default ProjectsIndex

