import React from 'react';
// import { Link } from 'react-router-dom';
import './Admin.css';
import AdminBanner from '../../Images/banner2.jpg';

function AdminDashboard() {
    return (
        <div className="bg-dark admin-dashboard">
            
            <img src={AdminBanner} alt="Image" />
            <div className='text-white d-flex'>
                <p>Total Passengers</p>
                <p>Trains</p>
                <p>Destinations</p>
            </div>
        </div>
    );
}

export default AdminDashboard;
