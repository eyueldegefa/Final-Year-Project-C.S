import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

function AdminDashboard() {
    return (
        <div className="p-4 bg-dark">
            <h1 className="font-bold text-center text-white">Admin Dashboard</h1>
            <div className="">
                <Link to="/admin/manage-passengers" className="d-block my-5 admin-links ">Passengers Data</Link>
                <Link to="/admin/manage-trains" className="d-block my-5 admin-links">Manage Trains</Link>
                <Link to="/admin/add-train" className="d-block my-5 admin-links">Add New Train</Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
