import React, { useState } from 'react';
import axios from 'axios';

export default function AddTrainForm() {
    const [formData, setFormData] = useState({
        name: '',
        source: '',
        destination: '',
        departure: '',
        arrival: '',
        price: '',
        seatsAvailable: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/admin/add-train', formData)
            .then(() => alert('Train added successfully!'))
            .catch((err) => console.error('Error adding train:', err));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Add New Train</h1>
            <form className="mt-4" onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-sm font-medium">{key}</label>
                        <input
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Train</button>
            </form>
        </div>
    );
}
