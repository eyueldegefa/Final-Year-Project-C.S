import React from 'react'
import banner from '../../Images/cc.jpg';
import banner2 from '../../Images/dd.jpg';

function Banner() {
  return (
    <div className='mt-5 pt-1 ms-4'>
      <img className='w-100 mt-5 pt-5 d-xl-none' src={banner} alt="#" />
      <img className='d-none d-xl-block h-75' src={banner2} alt="#" />
    </div>
  )
}

export default Banner