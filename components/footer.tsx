import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa'
import { Box, Flex, Heading, Text, Grid, Icon, Link, Stack, Divider } from '@chakra-ui/react'
import Logo from './logo'

const Footer: React.FC = () => {
  return (
    <Box as="footer" paddingX={['1.5em', '1.5em', '1.5em', '15%']} mt="24">
      <Grid
        templateColumns={[
          '1fr',
          '1fr',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          '2fr 1fr 1fr'
        ]}
        gap="8"
        py="16"
      >
        <Flex flexDirection="column" alignItems="flex-start">
          <Logo />
          <Text fontSize="md" mt="4" textAlign="left" lineHeight="22px">
            Creating beautiful and functional spaces that tell your story.
          </Text>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="8"
          >
            <Link href="#" isExternal>
              <Box as={FaFacebookF} size="22px" color="orange.500" mr="12px" />
            </Link>
            <Link href="#" isExternal>
              <Box as={FaTwitter} size="22px" color="orange.500" mr="12px" />
            </Link>
            <Link href="#" isExternal>
              <Box as={FaGoogle} size="22px" color="orange.500" mr="12px" />
            </Link>
            <Link href="#" isExternal>
              <Box as={FaInstagram} size="22px" color="orange.500" mr="12px" />
            </Link>
            <Link href="#" isExternal>
              <Box as={FaYoutube} size="22px" color="orange.500" />
            </Link>
          </Flex>
        </Flex>

        <Flex flexDirection="column" alignItems="flex-start">
          <Text color="orange.500" fontWeight="bold" fontSize="20px" mb="4">
            Navigation
          </Text>
          <Stack spacing={2}>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Services</Link>
            <Link>Portfolio</Link>
          </Stack>
        </Flex>

        <Flex flexDirection="column" alignItems="flex-start">
          <Text color="orange.500" fontWeight="bold" fontSize="20px" mb="4">
            Contact Us
          </Text>
          <Text mb="2">
            <strong>Phone:</strong> 7001837559
          </Text>
          <Text>
            <strong>Email:</strong> info@namastedesignstudios.com
          </Text>
        </Flex>
      </Grid>
      <Divider />
      <Text textAlign="center" py="8">
        © {new Date().getFullYear()} Namaste Design Studios. All Rights Reserved.
      </Text>
    </Box>
  )
}

export default Footer
