import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Header from '../components/header'
import Introduction from '../components/introduction'
import About from '../components/about'
import ModernServices from '../components/modern-services'
import Footer from '../components/footer'
import OurProjects from '../components/our-projects'
import { Divider } from '@chakra-ui/react'
import ContactForm from '../components/contact-form'
import Testimonials from '../components/testimonials'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>NamasteDesignStudios | Warm, Modern Residential Interiors</title>
        <meta name="description" content="Residential interior design studio delivering warm, modern homes end-to-end. Concept to turnkey execution in 6–10 weeks. Free consultation." />
        <meta property="og:title" content="NamasteDesignStudios" />
        <meta property="og:description" content="Warm, modern residential interiors. Free design consultation." />
      </Head>
      <Nav />
      <Header />
      <Introduction />
      <About />
      <ModernServices />
      <OurProjects />
      <Testimonials />
      <Divider />
      <ContactForm />
      <Footer />
    </>
  )
}

export default Home
