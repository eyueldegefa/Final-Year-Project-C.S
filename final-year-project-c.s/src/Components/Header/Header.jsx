import React, { useState } from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import headerlogo from '../../Images/headerLogo.png';
import '../../App.css';
import classes from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import 'https://fonts.googleapis.com/css2?family=Pacifico&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap';

function Header() {
  const [status, setStatus] = useState(false);

  return (
    <nav className='header-wrapper'>
      <section className=''>
        {/* Important updates part */}
        <div className='py-3 d-flex bg-white px-3 pt-3'>
            <div className='text-wrap ps-4'>
               <div className='text-danger'><ReportGmailerrorredIcon />Important: <span className='text-dark'>Updates on rail to/from Diredawa and Djibouti</span></div>
            </div>
            <div className='text-end linkHover text-dark pe-4'>Show more</div>
        </div>

        {/* The header links */}
        <div className={classes.headerWrapper}>
            <Link to="/" className='headerLogo d-flex text-decoration-none text-white'><img src={headerlogo} alt="Header logo" /> <h2 className='fw-bold pt-3 px-3'>Ethiopian Railways</h2></Link>
            <div className='d-none d-md-flex pt-4'>
                <Link to="/" className={classes.linkHover}>BOOK</Link>
                <Link to="/" className={classes.linkHover}>MANAGE</Link>
                <Link to="/about-us" className={classes.linkHover}>ABOUT</Link>
                <Link to="/contact-us" className={classes.linkHover}>CONTACT US</Link>
            </div>
            
            <div className={classes.listAndSignin}>
              <Link to="/login" className={classes.linkHover}><button className='buttons'>SIGN IN <AccountCircleIcon/></button></Link> 
              <div onClick={()=> setStatus(!status)} className='d-md-none pt-3'><MenuIcon/></div>
            </div>

                    {/* Only show on mobile (small devices) */}
        <section className=''>
          {
            status? 
            <div className={classes.listShow}>
              <div onClick={()=> setStatus(!status)} className={classes.close}><CloseIcon/></div>
                <Link to="/" className={classes.linkHover}>BOOK</Link>
                <Link to="/" className={classes.linkHover}>MANAGE</Link>
                <Link to="/about-us" className={classes.linkHover}>ABOUT</Link>
                <Link to="/contact-us" className={classes.linkHover}>CONTACT US</Link>
            </div> : null
          }
        </section>
        </div>
      </section>
    </nav>
  )
}

export default Header