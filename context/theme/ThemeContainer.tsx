import React from 'react'
import {
  ChakraProvider,
  ColorModeScript
} from '@chakra-ui/react'
import theme from '../../styles/theme'

const ThemeContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
      {children}
    </ChakraProvider>
  )
}

export default ThemeContainer
