import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';

function AddNewTrain({ onTrainAdded }) {
    const [formData, setFormData] = useState({
        train_name: '',
        source: '',
        destination: '',
        departure_time: '',
        arrival_time: '',
        seats_available: '',
        price: '',
        date: '',
        class: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:7676/api/admin/add-train', formData);
            alert('Train added successfully!');
            setFormData({
                train_name: '',
                source: '',
                destination: '',
                departure_time: '',
                arrival_time: '',
                seats_available: '',
                price: '',
                date: '',
                class: '',
            });
            if (onTrainAdded) onTrainAdded(); // Refresh train list
        } catch (err) {
            console.error('Error adding train:', err);
            alert('Failed to add train!');
        }
    };

    return (
        <div className="p-4 add-train-wrapper">
            <h1 className="text-2xl font-bold mb-4 text-center">Add New Train</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Train Name</label>
                    <input
                        type="text"
                        name="train_name"
                        value={formData.train_name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Source</label>
                    <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Departure Time</label>
                    <input
                        type="time"
                        name="departure_time"
                        value={formData.departure_time}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Arrival Time</label>
                    <input
                        type="time"
                        name="arrival_time"
                        value={formData.arrival_time}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Seats Available</label>
                    <input
                        type="number"
                        name="seats_available"
                        value={formData.seats_available}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className='d-flex my-3'>
                    <label className="block text-sm font-medium">Class</label>
                    <input
                        type="text"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="py-2 ">
                    Add Train
                </button>
            </form>
        </div>
    );
}

export default AddNewTrain;
