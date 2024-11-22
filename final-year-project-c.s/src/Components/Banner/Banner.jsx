import React from 'react'
import bannerSmalls from '../../Images/Banner1.jpg';
import bannerLarges from '../../Images/banner2.jpg';
import './Banner.css'

function Banner() {
  return (
    <div className='banner'>
      <img className='bannerSmall w-100 d-md-none' src={bannerSmalls} alt="#" />
      <img className='bannerLarge w-100 d-none d-md-block' src={bannerLarges} alt="#" />
    </div>
  )
}

export default Banner