import React from 'react'
import bannerSmalls from '../../Images/Banner1.jpg';
import bannerLarges from '../../Images/banner2.jpg';
import './Banner.module.css'

function Banner() {
  return (
    <div className='banner'>
      <img className='bannerSmall d-md-none' src={bannerSmalls} alt="#" />
      <img className='d-none d-md-block bannerLarge' src={bannerLarges} alt="#" />
    </div>
  )
}

export default Banner