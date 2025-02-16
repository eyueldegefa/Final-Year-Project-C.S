import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import './Admin.css';

function ManagePassengers() {
    const [passengers, setPassengers] = useState([]);
    const [editingPassenger, setEditingPassenger] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        passengerf_name: '',
        passengerl_name: '',
        passenger_dateofbirth: '',
        passenger_phone: '',
        passenger_email: '',
        booking_reference: ''
    });
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('');

    useEffect(() => {
        fetchPassengers();
    }, [paymentStatusFilter]);

    const fetchPassengers = async () => {
        try {
            const url = paymentStatusFilter
                ? `http://localhost:7676/api/admin/passengers?payment_status=${paymentStatusFilter}`
                : "http://localhost:7676/api/admin/passengers";
            const response = await axios.get(url);
            setPassengers(response.data);
        } catch (err) {
            console.error("Error fetching passengers:", err);
        }
    };

    const searchPassenger = async () => {
        if (!searchQuery) {
            fetchPassengers();
            return;
        }
        
        try {
            const encodedSearchQuery = encodeURIComponent(searchQuery);  // URL encode the search query
            console.log("Search URL:", `http://localhost:7676/api/admin/passengers/search?booking_reference=${encodedSearchQuery}`); // Log the request URL
            const response = await axios.get(`http://localhost:7676/api/admin/passengers/search?booking_reference=${encodedSearchQuery}`);
            console.log("Search Response:", response.data); // Log the response data
            setPassengers(response.data);
        } catch (err) {
            console.error("Error searching passenger:", err);
        }
    };
    
    

    const deletePassenger = async (id) => {
        const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this Passenger?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:7676/api/admin/delete-passenger/${id}`);
            setPassengers(passengers.filter(passenger => passenger.booking_id !== id));
            alert("Passenger deleted successfully!");
        } catch (err) {
            console.error("Error deleting passenger:", err);
        }
    };

    const handleEditClick = (passenger) => {
        setEditingPassenger(passenger.booking_id);
        setFormData({
            Passenger_First_name: passenger.passengerf_name,
            Passenger_Last_name: passenger.passengerl_name,
            Passenger_Date_of_birth: new Date(passenger.passenger_dateofbirth).toLocaleDateString(),
            Passenger_Phone: passenger.passenger_phone,
            Passenger_Email: passenger.passenger_email
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updatePassenger = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7676/api/admin/update-passenger/${editingPassenger}`, formData);
            setPassengers(passengers.map(passenger =>
                passenger.booking_id === editingPassenger ? { ...passenger, ...formData } : passenger
            ));
            alert("Passenger updated successfully!");
            setEditingPassenger(null);
        } catch (err) {
            console.error("Error updating passenger:", err);
            alert("Failed to update passenger!");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Manage Passengers</h1>

            <div className="mt-4 d-flex">
                <div className='m-2'>
                    <label htmlFor="paymentStatusFilter" className="block text-sm font-medium text-gray-700">
                        Filter by Payment Status
                    </label>
                    <select
                        id="paymentStatusFilter"
                        value={paymentStatusFilter}
                        onChange={(e) => setPaymentStatusFilter(e.target.value)}
                        className="mt-1 py-3 p-2 border border-success rounded bg-white text-dark"
                    >
                        <option value="">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
                <div className='align-center m-2'>
                    <label htmlFor="search">Search by booking reference</label>
                    <div className='d-flex'>
                        <input
                            className='bg-white p-3 text-dark border border-success rounded mt-1'
                            type="text"
                            placeholder='Search by Booking-reference'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className='w-25 m-1 bg-green-500' onClick={searchPassenger}><SearchIcon /></button>
                    </div>
                </div>
            </div>

            {editingPassenger && (
                <div className="mt-4 p-4 border border-dark rounded w-50">
                    <h2 className="text-xl font-bold">Edit Passenger</h2>
                    <form onSubmit={updatePassenger}>
                        {Object.keys(formData).map((key) => (
                            <div key={key} className='d-flex my-3 w-75'>
                            <input
                                type={
                                    key === "date" ? "date" :
                                    key.includes("time") ? "time" :
                                    key.includes("price") || key.includes("seats") ? "number" : "text"
                                }
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleChange}
                                className="border border-dark p-2 rounded"
                                required
                            />
                            <label className="block text-start ps-3">{key.replace('_', ' ')}</label>
                        </div>
                        ))}
                        <div className='d-flex'>
                           <button type="submit" className="bg-green-500 py-3 rounded">Update Passenger</button>
                           <button type="button" onClick={() => setEditingPassenger(null)} className="ml-2 bg-gray-500 p-2 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {passengers.length === 0 && <p>No passenger found with this booking reference.</p>}

            <table className="mt-4 border border-gray">
                <thead>
                    <tr>
                        <th className="border border-dark bg-white text-dark p-2">Given Name</th>
                        <th className="border border-dark bg-white text-dark p-2">LastName</th>
                        <th className="border border-dark bg-white text-dark p-2">DateOfBirth</th>
                        <th className="border border-dark bg-white text-dark p-2">Email</th>
                        <th className="border border-dark bg-white text-dark p-2">Phone</th>
                        <th className="border border-dark bg-white text-dark p-2">BookingReference</th>
                        <th className="border border-dark bg-white text-dark p-2">Actions</th>
                    </tr>
                </thead>
                <tbody className='admin-inner-contents'>
                    {passengers.map(passenger => (
                        <tr key={passenger.booking_id}>
                            <td className="border border-dark p-2">{passenger.passengerf_name}</td>
                            <td className="border border-dark p-2">{passenger.passengerl_name}</td>
                            <td className="border border-dark p-2">{new Date(passenger.passenger_dateofbirth).toLocaleDateString()}</td>
                            <td className="border border-dark p-2">{passenger.passenger_email}</td>
                            <td className="border border-dark p-2">{passenger.passenger_phone}</td>
                            <td className="border border-dark p-2">{passenger.booking_reference}</td>
                            <td className="border border-dark p-2">
                                <div className='d-flex text-white'>
                                    <p onClick={() => handleEditClick(passenger)} className="m-1 rounded bg-success p-2 admin-buttons">Update</p>
                                    <p onClick={() => deletePassenger(passenger.booking_id)} className="m-1 rounded bg-danger p-2 admin-buttons">Delete</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagePassengers;
