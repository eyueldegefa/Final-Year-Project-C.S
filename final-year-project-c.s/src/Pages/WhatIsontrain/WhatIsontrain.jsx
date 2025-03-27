import React from 'react';
import './WhatIsontrain.css'; 
import trainInterior from '../../Images/train1.jpg'; 
import hardSeat from '../../Images/hardseat1.png'; 
import hardSleep from '../../Images/hardsleep1.png'; 
import Layout from '../../Components/Layout/Layout';

function WhatIsontrain() {
  return (
    <Layout>
    <section className="about-us-section mt-5">
      {/* Header Section */}
      <div className="header text-center mt-5">
        <h1 className="header-title pt-4 fw-bold text-success">Train Classes</h1>
        <p className="header-subtitle">Choose the class that suits your travel needs.</p>
        <img className="cityimage" src={trainInterior} alt="Train Interior" />
      </div>

      {/* Hard Seat Class Section */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center">
          <img className="story-image" src={hardSeat} alt="Hard Seat Class" />
          <div className="story-text text-center">
            <h1 className="section-title fw-bold text-success">Hard Seat Class</h1>
            <p className="section-description">
              Our Hard Seat class offers a budget-friendly option with basic amenities:
            </p>
            <ul className="class-features">
              <li>✅ Comfortable upright seating</li>
              <li>✅ Overhead luggage storage</li>
              <li>✅ Access to shared restrooms</li>
              <li>✅ Basic meal service available for purchase</li>
              <li>✅ Power outlets at select seats</li>
            </ul>
            <button className="cta-button">Book Hard Seat</button>
          </div>
        </div>
      </div>

      {/* Hard Sleep Class Section */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center hardSleep">
          <img className="story-image" src={hardSleep} alt="Hard Sleep Class" />
          <div className="story-text text-center">
            <h1 className="section-title fw-bold text-success">Hard Sleep Class</h1>
            <p className="section-description">
              Our Hard Sleep class provides a more comfortable overnight experience:
            </p>
            <ul className="class-features">
              <li>✅ Reclining bunk beds</li>
              <li>✅ Privacy curtains</li>
              <li>✅ Personal reading lights</li>
              <li>✅ Complimentary blanket and pillow</li>
              <li>✅ Access to upgraded restrooms</li>
            </ul>
            <button className="cta-button">Book Hard Sleep</button>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="our-values text-center my-5 pt-5">
        <h1 className="section-title fw-bold text-success">Class Comparison</h1>
        <div className="comparison-table">
          <table>
            <thead>
              <tr className='bg-green-500 '>
                <th className='border border-gray'><h3>Feature</h3></th>
                <th className='border border-gray'><h3>Hard Seat</h3></th>
                <th className='border border-gray'><h3>Hard Sleep</h3></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Seat Type</td>
                <td>Upright</td>
                <td>Reclining Bunk</td>
              </tr>
              <tr>
                <td>Meals</td>
                <td>Available for Purchase</td>
                <td>Complimentary Snack</td>
              </tr>
              <tr>
                <td>Luggage Storage</td>
                <td>Overhead</td>
                <td>Under Bed</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>from 250 ETB</td>
                <td>from 500 ETB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </Layout>
  );
}

export default WhatIsontrain;