import React from 'react';
import './ContactUs.css';
import contactImage from '../../Images/cityofadis.jpg'; 
import Layout from '../../Components/Layout/Layout';

function ContactUs() {
  return (
    <Layout>
    <section className="about-us-section mt-5">
      {/* Header Section */}
      <div className="header text-center pt-5 text-success">
        <h1 className="header-title mt-5 fw-bold">Contact Us</h1>
        <p className="header-subtitle">Get in touch with our team for any inquiries or support.</p>
      </div>

      {/* Contact Information Section */}
      <div className="our-story text-center my-5">
        <div className="story-container d-flex justify-content-between align-items-center">
          <div className="story-text">
            <h2 className="section-title text-center">Our Office</h2>
            <div className="contact-info">
              <div className="contact-item">
                <span role="img" aria-label="location">📍</span>
                <p>123 Travel Street<br/>Addis Ababa, Ethiopia</p>
              </div>
              <div className="contact-item">
                <span role="img" aria-label="phone">📞</span>
                <p>+251 123 456 789</p>
              </div>
              <div className="contact-item">
                <span role="img" aria-label="email">✉️</span>
                <p>info@f-project.com</p>
              </div>
            </div>
          </div>
          <img className="story-image" src={contactImage} alt="Office location" />
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="our-values text-center my-5">
        <h2 className="section-title">Send Us a Message</h2>
        <div className="contact-form">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="our-team text-center my-5">
        <h2 className="section-title">Find Us</h2>
        <div className="map-container">
          <iframe 
            title="office-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.923284702509!2d38.75735141478401!3d8.980609093548117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85e43d9d602d%3A0x9e3b1e74a6d8091c!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1623942345678!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{border:0}}
            allowFullScreen=""
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>
    </Layout>
  );
}

export default ContactUs;