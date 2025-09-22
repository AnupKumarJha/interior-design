import React from 'react'
import { Box, VStack, HStack, Heading, Text, Avatar, Grid } from '@chakra-ui/react'

interface Testimonial {
  name: string
  role: string
  quote: string
  avatar?: string
  rating?: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Anita Sharma',
    role: 'Homeowner, Gurgaon',
    quote:
      'NamasteDesignStudios transformed our 2BHK into a warm, modern home. The process was smooth and the result exceeded expectations.',
    rating: 5,
  },
  {
    name: 'Rohan & Meera',
    role: 'Apartment Owners, Bengaluru',
    quote:
      'Great layouts and material suggestions. The team handled vendors and timelines professionally — minimal hassle for us.',
    rating: 5,
  },
  {
    name: 'Sneha Patil',
    role: 'Homeowner, Pune',
    quote:
      'Loved the 3D renders and how closely the execution matched them. Highly recommend for residential projects.',
    rating: 5,
  },
  {
    name: 'Karan Malhotra',
    role: 'Villa Owner, Noida',
    quote:
      'Attention to detail was top notch — lighting plan and storage solutions made everyday living much easier.',
    rating: 5,
  },
]

const StarRow: React.FC<{ rating?: number }> = ({ rating = 5 }) => (
  <HStack spacing="1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Box key={i} color={i < rating ? 'orange.400' : 'gray.300'}>★</Box>
    ))}
  </HStack>
)

const Testimonials: React.FC = () => {
  return (
    <Box id="testimonials" py="20" px={['1.5em', '1.5em', '1.5em', '15%']} bg="gray.50">
      <VStack spacing="10" align="center">
        <VStack spacing="3" textAlign="center">
          <Heading as="h2" size="2xl" fontWeight="black">What Clients Say</Heading>
          <Text color="gray.600">Real homeowners on their experience working with us</Text>
        </VStack>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="6"
          w="full"
        >
          {testimonials.map((t, idx) => (
            <VStack
              key={idx}
              align="flex-start"
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="xl"
              p="6"
              boxShadow="sm"
              spacing="4"
            >
              <StarRow rating={t.rating} />
              <Text color="gray.700">“{t.quote}”</Text>
              <HStack spacing="3">
                <Avatar size="sm" name={t.name} src={t.avatar} />
                <VStack spacing="0" align="flex-start">
                  <Text fontWeight="bold">{t.name}</Text>
                  <Text fontSize="sm" color="gray.500">{t.role}</Text>
                </VStack>
              </HStack>
            </VStack>
          ))}
        </Grid>
      </VStack>
    </Box>
  )
}

export default Testimonials

