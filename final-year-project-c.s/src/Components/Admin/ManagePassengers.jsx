import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManagePassengers() {
    const [passengers, setPassengers] = useState([]);
    const [editingPassenger, setEditingPassenger] = useState(null);
    const [formData, setFormData] = useState({
        passenger_name: '',
        passenger_age: '',
        passenger_phone: '',
        passenger_email: ''
    });
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(''); // State for payment status filter

    useEffect(() => {
        fetchPassengers();
    }, [paymentStatusFilter]); // Fetch passengers when the filter changes

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

    const deletePassenger = async (id) => {
        const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this Passenger?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:7676/api/admin/delete-passenger/${id}`);
            setPassengers(passengers.filter(passenger => passenger.id !== id));
            alert("Passenger deleted successfully!");
        } catch (err) {
            console.error("Error deleting passenger:", err);
        }
    };

    const handleEditClick = (passenger) => {
        setEditingPassenger(passenger.id);
        setFormData(passenger);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updatePassenger = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7676/api/admin/update-passenger/${editingPassenger}`, formData);
            setPassengers(passengers.map(passenger =>
                passenger.id === editingPassenger ? { ...passenger, ...formData } : passenger
            ));
            alert("Passenger updated successfully!");
            setEditingPassenger(null); // Close the editing form after update
        } catch (err) {
            console.error("Error updating passenger:", err);
            alert("Failed to update passenger!");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Manage Passengers</h1>

            {/* Filter by Payment Status */}
            <div className="mt-4">
                <label htmlFor="paymentStatusFilter" className="block text-sm font-medium text-gray-700">
                    Filter by Payment Status
                </label>
                <select
                    id="paymentStatusFilter"
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">All</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                </select>
            </div>

            {/* Passengers Table */}
            <table className="mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Age</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Payment Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map(passenger => (
                        <tr key={passenger.id}>
                            <td className="border border-gray-300 p-2">{passenger.passenger_name}</td>
                            <td className="border border-gray-300 p-2">{passenger.passenger_age}</td>
                            <td className="border border-gray-300 p-2">{passenger.passenger_phone}</td>
                            <td className="border border-gray-300 p-2">{passenger.passenger_email}</td>
                            <td className="border border-gray-300 p-2">{passenger.payment_status}</td>
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => handleEditClick(passenger)} className="text-blue-500 mr-2">Edit</button>
                                <button onClick={() => deletePassenger(passenger.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Passenger Form */}
            {editingPassenger && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="text-xl font-bold">Edit Passenger</h2>
                    <form onSubmit={updatePassenger}>
                        {Object.keys(formData).map((key) => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium">{key.replace('_', ' ')}</label>
                                <input
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="bg-green-500 p-2 rounded">Update Passenger</button>
                        <button type="button" onClick={() => setEditingPassenger(null)} className="ml-2 bg-gray-500 p-2 rounded">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ManagePassengers;