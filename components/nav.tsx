import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Flex, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Logo from './logo'

interface MenuItem {
  link: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

const MenuItems: React.FC<MenuItem> = ({ children, link, onClick, active }) => {
  const href = link.startsWith('#') ? `/${link}` : link
  return (
    <Link
      as={NextLink}
      href={href}
      mr={'36px'}
      display="block"
      fontWeight="medium"
      fontSize="md"
      position="relative"
      _hover={{ color: 'purple.600' }}
      _after={{
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '-8px',
        height: '2px',
        bg: 'purple.400',
        width: 0,
        transition: 'width .25s ease',
      }}
      sx={{ '&:hover::after': { width: '100%' } }}
      onClick={onClick}
    >
      {active && (
        <Box
          as={motion.div}
          layoutId="nav-underline"
          position="absolute"
          left={0}
          right={0}
          bottom="-8px"
          height="2px"
          bg="purple.600"
          borderRadius="full"
        />
      )}
      {children}
    </Link>
  )
}

const Nav: React.FC = () => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)
  const router = useRouter()

  const links = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'Contact', href: '/#contact' },
  ]

  const isActive = (href: string) => {
    const asPath = router.asPath || ''
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1]
      if (hash === 'home') return asPath === '/' || asPath.startsWith('/#home')
      return asPath.includes(`#${hash}`)
    }
    return asPath === href || asPath.startsWith(`${href}`)
  }

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
        {links.map((l) => (
          <MenuItems key={l.href} link={l.href} onClick={() => setShow(false)} active={isActive(l.href)}>
            {l.label}
          </MenuItems>
        ))}
      </Flex>
    </Flex>
  )
}

export default Nav
