import React from 'react'
import { Box, Flex, Link, Button, Stack } from '@chakra-ui/react'
import Logo from './logo'

interface MenuItem {
  link?: string;
  children: React.ReactNode;
}

const MenuItems: React.FC<MenuItem> = ({ children, link }) => (
  <Link
    href={link}
    mr={'36px'}
    display="block"
    fontWeight="medium"
    fontSize="md"
    _hover={{ color: 'purple.600' }}
  >
    {children}
  </Link>
)

const Nav: React.FC = () => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      position="fixed"
      top="0"
      zIndex="999"
      width="100%"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingX={['1.5em', '1.5em', '1.5em', '15%']}
      paddingY="1.2em"
      bg="rgba(255,255,255,.95)"
      backdropFilter="blur(10px)"
      color="black"
      textTransform="uppercase"
      boxShadow="0 2px 20px rgba(0,0,0,0.1)"
    >
      <Flex align="center" mr={5}>
        <Logo />
      </Flex>

      <Box display={['block', 'block', 'none', 'none']} onClick={handleToggle}>
        <svg
          fill="#FBA442"
          width="22px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Flex
        display={[
          show ? 'flex' : 'none',
          show ? 'flex' : 'none',
          'flex',
          'flex'
        ]}
        width={['full', 'full', 'auto', 'auto']}
        marginTop={['20px', '20px', '0', '0']}
        textAlign="center"
        alignItems="center"
        direction={['column', 'column', 'row', 'row']}
        gap={['2', '2', '0', '0']}
      >
        <MenuItems link="#home">Home</MenuItems>
        <MenuItems link="#about">About</MenuItems>
        <MenuItems link="#services">Services</MenuItems>
        <MenuItems link="#gallery">Gallery</MenuItems>
        <MenuItems link="#blog">Blog</MenuItems>
        <Link 
          href="#contact" 
          mr={['0', '0', '6', '6']} 
          display="block" 
          fontWeight="medium" 
          _hover={{ color: 'purple.600' }}
          mt={['2', '2', '0', '0']}
        >
          Contact
        </Link>
      </Flex>
    </Flex>
  )
}

export default Nav
