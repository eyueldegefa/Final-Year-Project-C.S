import React from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import headerlogo from '../../Images/headerLogo.png';
import '../../App.css';
import './Header.css';

function Header() {
  return (
    <nav className='header-wrapper'>
      <section className=''>
        {/* Important updates part */}
        <div className='py-3 d-flex bg-white px-5 pt-3'>
            <div className='text-wrap ps-5'>
               <div className='text-danger'><ReportGmailerrorredIcon />Important: <span className='text-dark'>Updates on rail to/from Diredawa and Djibouti</span></div>
            </div>
            <div className='text-end linkHover text-dark pe-4'>Show more</div>
        </div>

        {/* The header links */}
        <div className='row d-flex bg-dark text-white px-5 py-2'>
            <div className='col-4 ps-5'><img src={headerlogo} alt="Header logo" /> ETHIOPIAN RAILWAYS</div>
            <div className='col-5 d-flex gap-5 pt-3'>
                <p className='linkHover'>BOOK</p>
                <p className='linkHover'>MANAGE</p>
                <Link to="/about-us" className='linkHover'>ABOUT</Link>
                <p className='linkHover'>CONTACT US</p>
            </div>
            <div className='col-3 text-end pt-3'>
            <Link to="/login" className='linkHover'>LOG IN <AccountCircleIcon/></Link> 
            </div>
        </div>
      </section>
    </nav>
  )
}

export default Header