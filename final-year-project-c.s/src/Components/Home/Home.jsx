import React from 'react'
import one from '../../Images/home1.jpg';
import two from '../../Images/home2.jpg';
import three from '../../Images/home3.jpg';
import four from '../../Images/home4.jpg';
import five from '../../Images/home5.jpg';
import classs from '../../Images/class.jpg';
import classSmall from '../../Images/class1aSmall.jpg'
import food1 from '../../Images/F1a.jpg';
import food2 from '../../Images/F2a.jpg';
import food3 from '../../Images/F3a.jpg';
import food4 from '../../Images/F4a.jpg';
import meting from '../../Images/meating.png'; 
import capitan from '../../Images/capitain.png'; 
import image12 from '../../Images/image12.png'; 
import team2 from '../../Images/team2.png';
import '../../App.css';
import './Home.css';

function Home() {
  return (
    <section className='homeBg'>
        {/* Featured Destination*/}
        <div className='my-5'>
            <h3 className='largeFont text-center text-dark'>Featured destinations from Addis Ababa</h3>
            <div className='row d-flex gap-5 m-5 justify-content-center'>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={five}  alt="#" />
                    <div className='text-center pt-3 px-3'>
                        <div className='text-secondary'>Ethiopian Rail</div>
                        <p className='largeFontm text-dark'>Awash-weldia</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 25</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={one} alt="#" />
                    <div className='text-center pt-3 px-3'>
                        <div className='text-secondary'>Ethiopian Rail</div>
                        <p className='largeFontm text-dark'>Djibouti</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 25</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={three}  alt="#" />
                    <div className='text-center pt-3 px-3'>
                        <div className='text-secondary'>Ethiopian Rail</div>
                        <p className='largeFontm text-dark'>Diredawa</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 25</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
            </div>

            {/* Second row */}
            <div className='row d-flex gap-5 m-5 justify-content-lg-center'>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={two}  alt="#" />
                    <div className='text-center pt-3 px-3'>
                        <div className='text-secondary'>Ethiopian Rail</div>
                        <p className='largeFontm text-dark'>Hareri</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 25</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={four} alt="#" />
                    <div className='text-center pt-3 px-3'>
                        <div className='text-secondary'>Ethiopian Rail</div>
                        <p className='largeFontm text-dark'>Hossana</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 25</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={five}  alt="#" />
                    <div className='text-center pt-3 px-3'>
                        <div className='text-secondary'>Ethiopian Rail</div>
                        <p className='largeFontm text-dark'>Awash-weldia</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 25</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
            </div>

            {/* See more part */}
            <div className=' see d-flex row text-center m-5 justify-content-lg-center'>
                <p className='col-md-12 col-lg-3 py-3 text-secondary'>Explore more destination</p>
                <p className='col-md-12 col-lg-3 py-3 border rounded homeShadow'>See more fares</p>
                <p className='col-md-12 col-lg-3 py-3 text-secondary'>Be inspired by our route map</p>
            </div>
        </div>
        
        {/* Special Discount */}
        <div className='text-center special ms-4'>
            <div className=''>
                <h2>Rail With Ethiopian Railways</h2>
                <h1 className='largeFont text-white fw-bold'>Special Discount For Students </h1>
                <h2 >Enjoy with Extra Package With Us!</h2>
                <button className='mt-5'>Learn more</button>
            </div>
        </div>

        {/* Train Class Area */}
        <div className='class row mt-5'>
        <div className='text-center mb-3'>
                <p className='text-secondary'>Railing With Ethiopians</p>
                <h1 className='largeFont text-dark fw-bold'>Make it an incredible journey</h1>
                <p className='text-secondary'>Explore the Ethiopians experience and plan an unforgettable trip beyond your rail.</p>
            </div>
            <div className='classLeft col-md-12 col-lg-6'>
                <img className='d-none d-lg-block homeShadow border' src={classs} alt="#" />
                <img className='d-lg-none homeShadow border w-100' src={classSmall} alt="#" />
            </div>
            <div className='classRight col-md-12 col-lg-6 row gap-2 justify-content-center'>
                <img className='o col-md-6 p-1 homeShadow border' src={food1} alt="#" />
                <img className='o col-md-6 p-1 homeShadow border' src={food2} alt="#" />
                <img className='o col-md-6 p-1 homeShadow border' src={food3} alt="#" />
                <img className='o col-md-6 p-1 homeShadow border' src={food4} alt="#" />
            </div>
        </div>

        {/* About Area */}
        <div className='text-center my-5 container'>
            <div className=''>
                <h1 className='largeFont text-dark'>About us</h1>
                <p className='text-secondary'>Learn more about our history, our business and sustainability initiatives</p>
            </div>
      {/* Our Team Section Container */}
      <div className="our-team text-center my-5 overflow-scroll">
          <div className=" d-flex justify-content-center">
            <div className="team-member d-md-none">
            </div>
            <div className="team-member">
               <img src={meting} alt="Team Member 2" className="team-member-image" />
               <h4 className='fw-bold pt-2'>Management</h4>
               <p>ADMIN</p>
            </div>
            <div className="team-member">
              <img src={capitan} alt="Team Member 2" className="team-member-image" />
              <h4 className='fw-bold pt-2'>Captains</h4>
              <p>locomotive engineers</p>
            </div>
            <div className="team-member">
              <img src={image12} alt="Team Member 2" className="team-member-image" />
              <h4 className='fw-bold pt-2'>Ato Alemu Sime</h4>
              <p>Ministry of Transport and Logistics</p>
            </div>
            <div className="team-member">
              <img src={team2} alt="Team Member 2" className="team-member-image" />
              <h4 className='fw-bold pt-2'>Hostess </h4>
              <p>EMB</p>
            </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Home