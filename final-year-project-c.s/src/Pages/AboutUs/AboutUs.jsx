import React from 'react';
import './AboutUs.css'; // Ensure you have appropriate styles in about.css
import { Link } from 'react-router-dom';
import cityofadis from '../../image/image/cityofadis.jpg'; // Ensure you have appropriate image in your project
import train1 from '../../image/image/train1.jpg'; // Ensure you have appropriate image in your project
import djibouti from '../../image/image/djibuticity.jpg'; // Ensure you have appropriate image in your project
import cityofd from '../../image/image/cityofd.jpg'; // Ensure you have appropriate image in your project
import image1424 from '../../image/image/image1424.png'; // Ensure you have appropriate image in your project
import team from '../../image/image/team.png'; // Ensure you have appropriate image in your project
import meating from '../../image/image/meating.png'; // Ensure you have appropriate image in your project
import capitain from '../../image/image/capitain.png'; // Ensure you have appropriate image in your project
import image12 from '../../image/image/image12.png'; // Ensure you have appropriate image in your project
import team2 from '../../image/image/team2.png'; // Ensure you have appropriate image in your project

function AboutUs() {
  return (
    <section className="about-us-section mt-4">
      {/* Header Section */}
      <div className="header text-center">
        <h1 className="header-title">About Us</h1>
        <p className="header-subtitle">Discover our story, values, and commitment to excellence.</p>
        <img className="cityimage" src={image1424} alt="headerimage" />
      </div>

      {/* Our Story Section */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center">
          <img className="story-image" src={cityofadis} alt="City of Addis" />
          <div className="story-text">
            <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center">
          <div className="story-text">
            <h2 className="section-title">From Past to Present</h2>
            <p className="section-description">
              The Ethiopian Railway System began in 1894 with the construction of the Ethio-Djibouti Railway under Emperor Menelik II. This historic line connected Addis Ababa to the Port of Djibouti, revolutionizing trade and transportation in the region. After decades of decline, the 21st century marked a new era of modernization. The Addis Ababa Light Rail Transit (2015) and the new Addis Ababa–Djibouti  Railway (2016) are symbols of Ethiopia's commitment to progress and connectivity. Today, we are expanding our network to connect northern Ethiopia and neighboring countries, fostering economic growth and regional integration.
            </p>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>

      {/* Second Section with Right Image */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center flex-row-reverse">
          <img className="story-image" src={train1} alt="Train" />
          <div className="story-text">
            <h2 className="section-title">Our Vision</h2>
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
            <h2 className="section-title">Ethio-Djibouti Railway</h2>
            <p className="section-description">
              The Ethio-Djibouti Railway, a vital transportation artery, connects landlocked Ethiopia to the Port of Djibouti, providing crucial access to maritime trade.  Originally built in the late 19th century and later modernized with a standard gauge line in 2017, the railway facilitates the movement of goods and passengers, strengthening economic ties between the two nations and playing a key role in regional integration.
            </p>
          </div>
        </div>
      </div>

      {/* Fourth Section with Right Image */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center flex-row-reverse">
          <img className="story-image" src={cityofd} alt="City of Dreams" />
          <div className="story-text">
            <h2 className="section-title">Our Future</h2>
            <p className="section-description">
              The future of the Ethio-Djibouti Railway looks promising, with potential for increased freight and passenger traffic, further boosting regional trade and integration.  Planned infrastructure improvements, coupled with growing economies in both Ethiopia and Djibouti, suggest the railway will play an even greater role in facilitating efficient and cost-effective transport, solidifying its position as a crucial link in the Horn of Africa's development.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="our-values text-center my-5">
        <h2 className="section-title">Our Values</h2>
        <div className="values-container d-flex justify-content-center">
          <div className="value-item mx-3">
            <h3>Excellence</h3>
            <p>We strive for excellence in everything we do.</p>
          </div>
          <div className="value-item mx-3">
            <h3>Integrity</h3>
            <p>We act with integrity and transparency.</p>
          </div>
          <div className="value-item mx-3">
            <h3>Innovation</ h3>
            <p>We embrace innovation to enhance our services.</p>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="our-team text-center my-5">
          <div className="team-container d-flex justify-content-center">
            <div className="team-member mx-3">
            <img src={team} alt="Team Member 2" className="team-member-image" />
            <h4>Hostess </h4>
            <p>EMB</p>
          </div>
         <div className="team-member mx-3">
            <img src={meating} alt="Team Member 2" className="team-member-image" />
            <h4>Management</h4>
            <p>ADMIN</p>
          </div>
          <div className="team-member mx-3">
            <img src={capitain} alt="Team Member 2" className="team-member-image" />
            <h4>Captains</h4>
            <p>locomotive engineers</p>
          </div>
          <div className="team-member mx-7">
            <img src={image12} alt="Team Member 2" className="team-member-image" />
            <h4>Ato Alemu Sime</h4>
            <p>Ministry of Transport and Logistics</p>
          </div>
          <div className="team-member mx-9">
            <img src={team2} alt="Team Member 2" className="team-member-image" />
            <h4>Hostess </h4>
            <p>EMB</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="call-to-action text-center my-5">
        <h2 className="cta-title">Join Us on Our Journey</h2>
        <p className="cta-description">Experience the world with us. Book your next adventure today!</p>
        <Link to="/"  className="cta-button text-decoration-none text-white">Book Now</Link>
      </div>
    </section>
    
  );
}

export default AboutUs;