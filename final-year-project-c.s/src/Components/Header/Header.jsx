import React from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../../App.css';
import './Header.css';

function Header() {
  return (
    <nav className=''>
      <section className=''>
        {/* Important updates part */}
        <div className='row d-flex bg-white px-5 pt-3 w-100'>
            <div className='col-9 d-flex text-wrap'>
               <ReportGmailerrorredIcon />
               <p className='text-danger'>Important:</p>
               <p className=''>Updates on rail to/from Diredawa and Djibouti</p>
            </div>
            <p className='col-3 text-end'>Show more</p>
        </div>

        {/* The header links */}
        <div className='row bg-dark text-white px-5 py-3 w-100'>
            <div className='pt-1 d-none d-md-block col-sm-8 col-md-9'>
              <div className='d-flex gap-5'>
                <p className='linkHover'>BOOK</p>
                <p className='linkHover'>MANAGE</p>
                <p className='linkHover'>LOYALITY</p>
                <p className='linkHover'>HELP</p>
              </div>
            </div>
            <div className='d-flex col-sm-4 col-md-3 gap-5 justify-content-end'>
              <SearchIcon className='linkHover' /> 
              <div className='d-flex gap-1 linkHover'><AccountCircleIcon /><p className='pt-1'>LOG IN</p></div>
            </div>
        </div>
      </section>
    </nav>
  )
}

export default Header