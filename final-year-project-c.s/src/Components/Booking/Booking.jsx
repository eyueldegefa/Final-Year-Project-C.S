import React from 'react'
import TrainIcon from '@mui/icons-material/Train';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import '../../App.css';
import './Booking.css'

function Booking() {
  return (
    <section className='container bookingWrapper bg-white text-dark pb-5 text-center'>
        <div className='d-flex row'>
            <p className='col-4 py-4 bottomRed'><TrainIcon/> Search trains</p>
            <p className='col-4 py-4 bottomRed'><BookmarksIcon/> Manage booking / Check-in</p>
            <p className='col-4 py-4 bottomRed'><DoubleArrowRoundedIcon />Multi-city</p>
        </div>
        <div className='text-center gap-3 d-none d-md-block'>
          <div>
            <input className='inputs py-3 px-5' type="text"  placeholder='From station'/>
            <CompareArrowsIcon />
            <input className='inputs py-3 px-5' type="text" placeholder='To station'/>
            <input className='inputs py-3 px-5 ms-4 text-secondary' type="date" name="date" id="date" placeholder='Departing' />
          </div>
          <div className='row gap-3 justify-content-center mt-3'>
            <input className='inputs col-md-3 py-3 px-5' type="text"  placeholder='From station'/>
            <input className='inputs col-md-3 py-3 px-5' type="text"  placeholder='From station'/>
            <p className='inputs col-md-3 buttons bg-danger py-3 text-white rounded fs-5'>Continue</p>
          </div>
        </div>
    </section>
  )
}

export default Booking