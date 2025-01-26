import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageTrains() {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        axios.get('/admin/view-trains')
            .then((response) => setTrains(response.data))
            .catch((err) => console.error('Error fetching trains:', err));
    }, []);

    const deleteTrain = (id) => {
        axios.delete(`/admin/delete-train/${id}`)
            .then(() => setTrains(trains.filter(train => train.id !== id)))
            .catch((err) => console.error('Error deleting train:', err));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Manage Trains</h1>
            <table className="mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Source</th>
                        <th className="border border-gray-300 p-2">Destination</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map(train => (
                        <tr key={train.id}>
                            <td className="border border-gray-300 p-2">{train.name}</td>
                            <td className="border border-gray-300 p-2">{train.source}</td>
                            <td className="border border-gray-300 p-2">{train.destination}</td>
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => deleteTrain(train.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
