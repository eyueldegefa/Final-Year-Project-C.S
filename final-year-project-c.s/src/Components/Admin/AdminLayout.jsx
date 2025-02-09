import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import AirlineSeatReclineExtraTwoToneIcon from '@mui/icons-material/AirlineSeatReclineExtraTwoTone';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import './Admin.css';

const AdminLayout = () => {

    const location = useLocation();

    // Check if the user is NOT on the dashboard
    const isNotDashboard = location.pathname !== "/admin";
    return (
        <div className="admin-dashboard">
            {/* Left Sidebar (Static) */}
            <div className="admin-links text-start">
                <h3 className='my-5 fw-bold text-primary'>Ethiopian Railways</h3>
                <NavLink to="/admin" className={`nav-link ${isNotDashboard ? "dashboard-inactive" : "active"}`}><GridViewRoundedIcon className='m-2 nav-links'/>Admin Dashboard</NavLink>
                <NavLink to="/admin/manage-passengers" className="nav-link my-2"><AirlineSeatReclineExtraTwoToneIcon className='m-2 nav-links'/>Passengers Data</NavLink>
                <NavLink to="/admin/manage-trains" className="nav-link"><TrainRoundedIcon className='m-2 nav-links'/>Manage Trains</NavLink>
                <div className='border mt-5 py-4 px-3'>
                   <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque ab, possimus ipsam magnam sed quidem mollitia.</p>
                   <NavLink to="/admin/login" className="logout px-5"><LogoutIcon className='m-2 nav-links'/> Log out</NavLink>
                </div>
            </div>

            {/* Main Content (Changes with Routing) */}
            <div className="admin-content">
                <Outlet /> 
            </div>
        </div>
    );
};

export default AdminLayout;
