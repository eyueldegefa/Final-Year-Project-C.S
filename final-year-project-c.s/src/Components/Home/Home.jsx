import React from 'react'
import awash from '../../Images/Awash-Woldia1.jpg';
import djbouti from '../../Images/Djbouti1.jpg';
import studentSmall from '../../Images/students1a.jpg';
import students from '../../Images/students2.jpg';
import classs from '../../Images/class.jpg';
import classSmall from '../../Images/class1aSmall.jpg'
import food1 from '../../Images/F1.jpg';
import food2 from '../../Images/F2.jpg';
import food3 from '../../Images/F3.jpg';
import food4 from '../../Images/F4.jpg';
import ourTeam from '../../Images/our-team-circle.png';
import ourTrain from '../../Images/our-train-circle.png';
import '../../App.css';
import './Home.css';

function Home() {
  return (
    <section>
        {/* Featured Destination*/}
        <div className='my-5'>
            <h3 className='largeFont text-center'>Featured destinations from Addis Ababa</h3>
            <div className='row d-flex gap-5 m-5 justify-content-lg-center'>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={awash}  alt="#" />
                    <div className='text-center pt-5 px-3'>
                        <p className='largeFont'>Awash-weldia</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 24</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={djbouti} alt="#" />
                    <div className='text-center pt-5 px-3'>
                        <p className='largeFont'>Djibouti</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 24</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={awash}  alt="#" />
                    <div className='text-center pt-5 px-3'>
                        <p className='largeFont'>Awash-weldia</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 24</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
            </div>

            {/* Second row */}
            <div className='row d-flex gap-5 m-5 justify-content-lg-center'>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={awash}  alt="#" />
                    <div className='text-center pt-5 px-3'>
                        <p className='largeFont'>Awash-weldia</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 24</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={djbouti} alt="#" />
                    <div className='text-center pt-5 px-3'>
                        <p className='largeFont'>Djibouti</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 24</p>
                        <p>from 1,230 ETB</p>
                    </div>
                </div>
                <div className='col-md-12 col-lg-3 rounded homeShadow'>
                    <img  className='w-100' src={awash}  alt="#" />
                    <div className='text-center pt-5 px-3'>
                        <p className='largeFont'>Awash-weldia</p>
                        <p className='text-secondary'>Book Economy Class Return until 30 Nov 24</p>
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
        <div className='text-center'>
            <img className='d-none d-xl-block' src={students} alt="" />
            <img className='friendSmall w-100 d-xl-none' src={studentSmall} alt="#" />
            <div className='discountPromo pt-3'>
                <p className=''>SPECIAL OFFER FOR STUDENTS</p>
                <h3 className='largeFont fs-1 fh-75'>Students enjoy discounts and extras with us</h3>
                <p className=''>Book your travel with Ethiopian rail to enjoy special discount, extra baggage allowance and more</p>
                <button className='more px-4 py-2'>Learn more</button>
            </div>
        </div>

        {/* Train Class Area */}
        <div className='class row'>
            <div className='clasLeft col-md-12 col-lg-6'>
                <img className='d-none d-lg-block homeShadow border' src={classs} alt="#" />
                <img className='d-lg-none w-100 homeShadow border' src={classSmall} alt="#" />
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
                <h3 className='largeFont'>About us</h3>
                <p>Learn more about our history, our business and sustainability initiatives</p>
            </div>
            <div className='homeAbout d-flex gap-5'>
                <div className=''>
                    <img className='' src={ourTrain} alt="#" />
                    <p>Our Business</p>
                </div>
                <div className=''>
                    <img className='' src={ourTeam} alt="#" />
                    <p>Our Team</p>
                </div>
                <div className=''>
                    <img className='' src={ourTrain} alt="#" />
                    <p>Our Train</p>
                </div>
                 <div className=''>
                    <img className='' src={ourTeam} alt="#" />
                    <p>Our Team</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home