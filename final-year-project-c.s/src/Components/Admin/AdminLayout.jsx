import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './Admin.css';

const AdminLayout = () => {

    const location = useLocation();

    // Check if the user is NOT on the dashboard
    const isNotDashboard = location.pathname !== "/admin";
    return (
        <div className="admin-dashboard">
            {/* Left Sidebar (Static) */}
            <div className="admin-links text-center">
                <h2 className='my-5 text-success'>Ethiopian Railways</h2>
                <NavLink to="/admin" className={`nav-link ${isNotDashboard ? "dashboard-inactive" : "active"}`}>Admin Dashboard</NavLink>
                <NavLink to="/admin/manage-passengers" className="nav-link my-2">Passengers Data</NavLink>
                <NavLink to="/admin/manage-trains" className="nav-link">Manage Trains</NavLink>
                <NavLink to="/admin/add-train" className="nav-link my-2">Add New Train</NavLink>
                <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque ab, possimus ipsam magnam sed quidem mollitia.</p>
                <NavLink to="#" className="nav-link">Log out</NavLink>
            </div>

            {/* Main Content (Changes with Routing) */}
            <div className="admin-content">
                <Outlet /> 
            </div>
        </div>
    );
};

export default AdminLayout;
