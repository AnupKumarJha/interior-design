import React from 'react'
import { Flex, Heading, Text, Box, Grid, Image, Link, VStack, HStack, Tag } from '@chakra-ui/react'
import Button from './button'
import { projects } from '../data/projects'

const OurProjects: React.FC = () => {
  const featured = projects.slice(0, 4)

  return (
    <Flex
      id="gallery"
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
        Recent Work
      </Heading>
      <Text fontSize="xl" mb="12" maxW="720px" textAlign="center">
        Explore a few residential transformations. See layouts, material palettes,
        and the finished spaces.
      </Text>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap="6"
        w="full"
      >
        {featured.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} _hover={{ textDecoration: 'none' }}>
            <VStack align="flex-start" spacing="3" bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm" border="1px solid" borderColor="gray.100">
              <Box w="full" h="180px" overflow="hidden">
                <Image src={p.coverImage} alt={p.title} w="100%" h="100%" objectFit="cover" transition="transform .3s" _hover={{ transform: 'scale(1.03)' }} />
              </Box>
              <VStack align="flex-start" spacing="1" p="4">
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

      <Box mt="12" as="a" href="/projects">
        <Button content='View All Projects' />
      </Box>
    </Flex>
  )
}

export default OurProjects
