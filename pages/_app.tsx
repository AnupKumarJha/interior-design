import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import WhatsAppButton from '../components/whatsapp-button'
import ChatAssistant from '../components/chat-assistant'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <WhatsAppButton />
      <ChatAssistant />
    </ChakraProvider>
  )
}

export default MyApp
