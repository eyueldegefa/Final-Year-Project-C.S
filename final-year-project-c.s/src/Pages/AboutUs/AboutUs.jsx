import React from 'react';
import './AboutUs.css'; 
import { Link } from 'react-router-dom';
import train1 from '../../Images/train1.jpg'; 
import djibouti from '../../Images/djibuticity.jpg'; 
import cityofd from '../../Images/cityofd.jpg'; 
import image1424 from '../../Images/image1424.png'; 
import meating from '../../Images/meating.png'; 
import capitain from '../../Images/capitain.png'; 
import image12 from '../../Images/image12.png'; 
import team2 from '../../Images/team2.png'; 
import Layout from '../../Components/Layout/Layout';

function AboutUs() {
  return (
    <Layout>
    <section className="about-us-section mt-5">
      {/* Header Section */}
      <div className="header text-center pt-4">
        <h1 className="header-title mt-5 fw-bold text-success">About Us</h1>
        <p className="header-subtitle">Discover our story, values, and commitment to excellence.</p>
        <img className="cityimage" src={image1424} alt="headerimage" />
      </div>

            {/* First Section with Left Image */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center">
          <img className="story-image" src={djibouti} alt="Djibouti" />
          <div className="story-text">
            <h1 className="section-title fw-bold text-center">From Past to Present</h1>
            <p className="section-description">
            The Ethiopian Railway System began in 1894 with the construction of the Ethio-Djibouti Railway under Emperor Menelik II. This historic line connected Addis Ababa to the Port of Djibouti, revolutionizing trade and transportation in the region. After decades of decline, the 21st century marked a new era of modernization. The Addis Ababa Light Rail Transit (2015) and the new Addis Ababa–Djibouti  Railway (2016) are symbols of Ethiopia's commitment to progress and connectivity. Today, we are expanding our network to connect northern Ethiopia and neighboring countries, fostering economic growth and regional integration.
            </p>
          </div>
        </div>
      </div>

      {/* Second Section with Right Image */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center flexReverse">
          <img className="story-image" src={train1} alt="Train" />
          <div className="story-text">
            <h1 className="section-title fw-bold text-center">Our Vision</h1>
            <p className="section-description">
              We aim to create a sustainable, integrated railway 
              network that connects Ethiopia and beyond. Our focus is on 
              enhancing connectivity, promoting sustainability, and empowering communities.
            </p>
          </div>
        </div>
      </div>

      {/* Third Section with Left Image */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center">
          <img className="story-image" src={djibouti} alt="Djibouti" />
          <div className="story-text">
            <h1 className="section-title fw-bold text-center">Ethio-Djibouti Railway</h1>
            <p className="section-description">
              The Ethio-Djibouti Railway, a vital transportation artery, connects landlocked Ethiopia to the Port of Djibouti, providing crucial access to maritime trade.  Originally built in the late 19th century and later modernized with a standard gauge line in 2017, the railway facilitates the movement of goods and passengers, strengthening economic ties between the two nations and playing a key role in regional integration.
            </p>
          </div>
        </div>
      </div>

      {/* Fourth Section with Right Image */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center flexReverse">
          <img className="story-image" src={cityofd} alt="City of Dreams" />
          <div className="story-text">
            <h1 className="section-title fw-bold text-center">Our Future</h1>
            <p className="section-description">
              The future of the Ethio-Djibouti Railway looks promising, with potential for increased freight and passenger traffic, further boosting regional trade and integration.  Planned infrastructure improvements, coupled with growing economies in both Ethiopia and Djibouti, suggest the railway will play an even greater role in facilitating efficient and cost-effective transport, solidifying its position as a crucial link in the Horn of Africa's development.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="our-values text-center">
        <h1 className="section-title fw-bold text-center">Our Values</h1>
        <div className="values-container d-flex justify-content-center">
          <div className="value-item mx-3">
            <h3 className='fw-bold text-success'>Excellence</h3>
            <p>We strive for excellence in everything we do.</p>
          </div>
          <div className="value-item mx-3">
            <h3 className='fw-bold text-success'>Integrity</h3>
            <p>We act with integrity and transparency.</p>
          </div>
          <div className="value-item mx-3">
            <h3 className='fw-bold text-success'>Innovation</ h3>
            <p>We embrace innovation to enhance our services.</p>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="our-team text-center my-5">
          <div className="team-container d-flex justify-content-center">
            <div className="team-member mx-3 d-md-none">
            </div>
         <div className="team-member mx-3">
            <img src={meating} alt="Team Member 2" className="team-member-image" />
            <h4 className='fw-bold pt-2'>Management</h4>
            <p>ADMIN</p>
          </div>
          <div className="team-member mx-3">
            <img src={capitain} alt="Team Member 2" className="team-member-image" />
            <h4 className='fw-bold pt-2'>Captains</h4>
            <p>locomotive engineers</p>
          </div>
          <div className="team-member mx-7">
            <img src={image12} alt="Team Member 2" className="team-member-image" />
            <h4 className='fw-bold pt-2'>Ato Alemu Sime</h4>
            <p>Ministry of Transport and Logistics</p>
          </div>
          <div className="team-member mx-9">
            <img src={team2} alt="Team Member 2" className="team-member-image" />
            <h4 className='fw-bold pt-2'>Hostess </h4>
            <p>EMB</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="call-to-action text-center my-5 rounded">
        <h2 className="cta-title">Join Us on Our Journey</h2>
        <p className="cta-description mb-5">Experience the world with us. Book your next adventure today!</p>
        <Link to="/" ><button className="buttons w-25">Book Now</button></Link>
      </div>
    </section>
    </Layout>
  );
}

export default AboutUs;