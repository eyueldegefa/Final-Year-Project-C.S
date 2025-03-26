import React from 'react'
import headerLogo from '.././../Images/headerLogo.png';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css'

function Footer() {
  return (
    <section className='row bg-dark text-white text-center footer-container p-4'>
        <div className='col-sm-12 col-md-4 d-flex gap-2'>
            <img src={headerLogo} alt="" />
            <div className='left-side'>
                <h2 className='fw-bold'>Ethiopian Railways</h2>
                <div className='ps-5 d-flex gap-5'> 
                    <FacebookTwoToneIcon className='linkHover'/>
                    <TelegramIcon className='linkHover'/>
                    <InstagramIcon className='linkHover'/>
                </div>
            </div>
        </div>

        <div className='col-sm-12 col-md-5'>
            <h2 className='fw-bold'>Useful Links</h2>
            <p>Destinations</p>
            <p>Train Station</p>
            <p>Sites</p>
        </div>

        <div className='col-sm-12 col-md-3'>
            <h2 className='fw-bold'>Contact info</h2>
            <p><PhoneIcon className='me-2 text-white'/>+251 123 456 789</p>
            <p><EmailIcon className='me-2 text-white'/>finalProject.com</p>
        </div>
    </section>
  )
}

export default Footer