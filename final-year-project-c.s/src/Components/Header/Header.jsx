import React, { useState } from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import headerlogo from '../../Images/headerLogo.png';
import '../../App.css';
import classes from './Header.module.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
            <div className=''><img src={headerlogo} alt="Header logo" />  ETHIOPIAN RAILWAYS</div>
            <div className='d-none d-md-flex pt-3'>
                <Link to="/" className={classes.linkHover}>BOOK</Link>
                <Link to="/" className={classes.linkHover}>MANAGE</Link>
                <Link to="/about-us" className={classes.linkHover}>ABOUT</Link>
                <Link to="/contact-us" className={classes.linkHover}>CONTACT US</Link>
            </div>
            
            <div className={classes.listAndSignin}>
              <div onClick={()=> setStatus(!status)} className='d-md-none'><MenuIcon/></div>
              <Link to="/login" className={classes.linkHover}>SIGN IN <AccountCircleIcon/></Link> 
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