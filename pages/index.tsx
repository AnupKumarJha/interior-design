import React from 'react'
import Nav from '../components/nav'
import Header from '../components/header'
import Introduction from '../components/introduction'
import About from '../components/about'
import Service from '../components/service'
import ModernServices from '../components/modern-services'
import BlogSection from '../components/blog-section'
import Footer from '../components/footer'
import OurProjects from '../components/our-projects'
import { Divider } from '@chakra-ui/react'
import ContactForm from '../components/contact-form'
 
const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Header />
      <Introduction />
      <About />
      <ModernServices />
      <OurProjects />
      <BlogSection />
      <Divider />
      <ContactForm />
      <Footer />
    </>
  )
}

export default Home
