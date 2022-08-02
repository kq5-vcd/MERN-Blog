import React from 'react';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection({isLoggedIn}) {
  return (
    <div className='hero-container'>
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          link={isLoggedIn? "/blogs":"/login"}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
