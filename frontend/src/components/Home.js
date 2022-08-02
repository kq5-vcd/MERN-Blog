import React from 'react'
import HeroSection from './home/HeroSection';
import Footer from './home/Footer';
import Cards from './home/Cards';

function Home({isLoggedIn}) {
  return (
    <>
      <HeroSection
        isLoggedIn = {isLoggedIn}
      />
      <Cards />
      <Footer />
    </>
  )
}

export default Home