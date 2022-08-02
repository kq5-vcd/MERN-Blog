import React from 'react'
import HeroSection from './home/HeroSection';
import Footer from './home/Footer';

function Home({isLoggedIn}) {
  return (
    <>
      <HeroSection
        isLoggedIn = {isLoggedIn}
      />
      <Footer />
    </>
  )
}

export default Home