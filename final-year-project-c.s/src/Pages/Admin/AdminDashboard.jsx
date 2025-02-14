import React from 'react';
import './Admin.css';
import AdminBanner from '../../Images/banner2.jpg';

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            
            <img src={AdminBanner} alt="Image" />
            <div className='d-flex p-5'>
                <p className='border border-gray mx-4 p-4'>Total Passengers</p>
                <p className='border border-gray mx-4 p-4'>Trains</p>
                <p className='border border-gray mx-4 p-4'>Destinations</p>
            </div>
        </div>
    );
}

export default AdminDashboard;
