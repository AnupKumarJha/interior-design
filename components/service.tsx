import React from 'react'
import { Box, Flex, Heading, Text, Grid, Icon } from '@chakra-ui/react'

const Service: React.FC = () => {
  return (
    <Box
      as="section"
      paddingX={['1.5em', '1.5em', '1.5em', '15%']}
      paddingY="24"
      textAlign="center"
    >
      <Heading
        as="h2"
        fontSize={['4xl', '4xl', '5xl', '5xl', '5xl']}
        fontWeight="black"
        mb="4"
      >
        Our Services
      </Heading>
      <Text fontSize="xl" mb="16">
        We offer a range of services to meet your design needs.
      </Text>
      <Grid
        templateColumns={['1fr', '1fr', '1fr', 'repeat(3, 1fr)']}
        gap="8"
      >
        <ServiceCard
          icon="home"
          title="Residential Design"
          description="From single rooms to full home renovations, we create beautiful and functional spaces for you to live in."
        />
        <ServiceCard
          icon="business"
          title="Commercial Design"
          description="We design inspiring and productive office spaces, retail stores, and other commercial properties."
        />
        <ServiceCard
          icon="email"
          title="E-Design"
          description="Our virtual design services allow us to work with you remotely to create the space of your dreams."
        />
      </Grid>
    </Box>
  )
}

interface ServiceCardProps {
  icon: any
  title: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      p="8"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="lg"
    >
      <Icon name={icon} size="48px" color="orange.500" mb="4" />
      <Heading as="h3" fontSize="2xl" mb="4">
        {title}
      </Heading>
      <Text>{description}</Text>
    </Flex>
  )
}

export default Service
