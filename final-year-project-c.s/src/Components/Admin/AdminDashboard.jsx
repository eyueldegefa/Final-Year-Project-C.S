import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="mt-4 space-y-2">
                <Link to="/admin/manage-trains" className="block text-blue-500 hover:underline">Manage Trains</Link>
                <Link to="/admin/add-train" className="block text-blue-500 hover:underline">Add Train</Link>
            </div>
        </div>
    );
}
