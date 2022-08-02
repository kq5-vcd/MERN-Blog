import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Destinations!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/da95f2c9bf47f86b75e842a9fe729b19~c5_720x720.jpeg?x-expires=1659542400&x-signature=fRlO%2BbdpbdAA2WcPXNRYBa7PYR4%3D'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Adventure'
              path='/services'
            />
            <CardItem
              src='https://i.pinimg.com/originals/ff/c7/68/ffc7681ad9a71ea838521178eac9bc2a.jpg'
              text='Travel through the Islands of Bali in a Private Cruise'
              label='Luxury'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://i.kym-cdn.com/photos/images/facebook/001/482/050/e7a.jpg'
              text='Without news to feed it, the biggest story starves.'
              label='Newest'
              path='/blogs'
            />
            <CardItem
              src='https://media.makeameme.org/created/welcome-to-5a1cdf.jpg'
              text='Experience own heaven'
              label='My Blogs'
              path='/myBlogs'
            />
            <CardItem
              src='https://i.imgflip.com/k6coi.jpg?a460560'
              text='Add to your heaven'
              label='Create Blog'
              path='/blogs/add'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
