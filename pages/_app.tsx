import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import WhatsAppButton from '../components/whatsapp-button'
import ChatAssistant from '../components/chat-assistant'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Offset for fixed navigation */
      #about, #services, #gallery, #blog, #contact {
        scroll-margin-top: 100px;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <WhatsAppButton />
      <ChatAssistant />
    </ChakraProvider>
  )
}

export default MyApp
