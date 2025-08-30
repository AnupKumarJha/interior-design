import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import WhatsAppButton from '../components/whatsapp-button'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <WhatsAppButton />
    </ChakraProvider>
  )
}

export default MyApp
