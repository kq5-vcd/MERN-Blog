import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <h2>Social Media</h2>
          <div class='footer-link-items'>
            <a href='https://www.instagram.com/'>Instagram</a>
            <a href='https://www.facebook.com/'>Facebook</a>
            <a href='https://www.youtube.com/'>Youtube</a>
            <a href='https://twitter.com/'>Twitter</a>
            <a href='https://www.linkedin.com/'>LinkedIn</a>
            <a href='https://www.patreon.com/'>Patreon</a>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div>
          <small class='website-rights'>PT © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
