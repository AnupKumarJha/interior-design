import React from 'react'
import {
  ThemeProvider,
  CSSReset
} from '@chakra-ui/react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { theme } from '../../styles'

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider value="light">
        <EmotionThemeProvider theme={theme}>
          <CSSReset />
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  )
}

export default ThemeContainer
