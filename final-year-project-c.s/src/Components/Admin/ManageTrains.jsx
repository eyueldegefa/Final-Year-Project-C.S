// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ManageTrains() {
//     const [trains, setTrains] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:7676/api/admin/trains")
//             .then((response) => {
//                 console.log("Fetched Trains (Raw):", response.data); // Log raw response
//                 if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
//                     setTrains(response.data[0]); // Extract first nested array
//                 } else {
//                     setTrains(response.data); // Use normally if it's already correct
//                 }
//             })
//             .catch((err) => console.error("Error fetching trains:", err));
//     }, []);
    
    
    

//     const deleteTrain = (id) => {
//         axios.delete(`/admin/delete-train/${id}`)
//             .then(() => setTrains(trains.filter(train => train.id !== id)))
//             .catch((err) => console.error('Error deleting train:', err));
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold">Manage Trains</h1>
//             <table className="mt-4 border-collapse border border-gray-300 w-full">
//                 <thead>
//                     <tr>
//                         <th className="border border-gray-300 p-2">Name</th>
//                         <th className="border border-gray-300 p-2">Source</th>
//                         <th className="border border-gray-300 p-2">Destination</th>
//                         <th className="border border-gray-300 p-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {trains.length > 0 ? (
//                         trains.map((train, index) => {
//                             console.log(`Rendering train #${index}:`, train); // Log each train
//                             return (
//                                 <tr key={train.id}>
//                                     <td className="border border-gray-300 p-2">{train.name}</td>
//                                     <td className="border border-gray-300 p-2">{train.source}</td>
//                                     <td className="border border-gray-300 p-2">{train.destination}</td>
//                                     <td className="border border-gray-300 p-2">
//                                         <button onClick={() => deleteTrain(train.id)} className="text-red-500">Delete</button>
//                                     </td>
//                                 </tr>
//                             );
//                         })
//                     ) : (
//                         <tr>
//                             <td colSpan="4" className="text-center p-4">No trains available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageTrains() {
    const [trains, setTrains] = useState([]);
    const [editingTrain, setEditingTrain] = useState(null);
    const [formData, setFormData] = useState({
        name: '', source: '', destination: '', departure_time: '', arrival_time: '', price: '', seats_available: ''
    });

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = async () => {
        try {
            const response = await axios.get("http://localhost:7676/api/admin/trains");
            setTrains(response.data);
        } catch (err) {
            console.error("Error fetching trains:", err);
        }
    };

    const deleteTrain = async (id) => {
        const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this Train?");
        if (!confirmDelete) return;
        
        try {
            await axios.delete(`http://localhost:7676/api/admin/delete-train/${id}`);
            setTrains(trains.filter(train => train.train_id !== id));
            alert("Train deleted successfully!");
        } catch (err) {
            console.error("Error deleting train:", err);
        }
    };

    const handleEditClick = (train) => {
        setEditingTrain(train.train_id);
        setFormData(train);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateTrain = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7676/api/admin/update-train/${editingTrain}`, formData);
            setTrains(trains.map(train =>
                train.train_id === editingTrain ? { ...train, ...formData } : train
            ));
            alert("Train updated successfully!");
            setEditingTrain(null); // Close the editing form after update
        } catch (err) {
            console.error("Error updating train:", err);
            alert("Failed to update train!");
        }
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
                        <tr key={train.train_id}>
                            <td className="border border-gray-300 p-2">{train.name}</td>
                            <td className="border border-gray-300 p-2">{train.source}</td>
                            <td className="border border-gray-300 p-2">{train.destination}</td>
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => handleEditClick(train)} className="text-blue-500 mr-2">Edit</button>
                                <button onClick={() => deleteTrain(train.train_id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingTrain && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="text-xl font-bold">Edit Train</h2>
                    <form onSubmit={updateTrain}>
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
                        <button type="submit" className="bg-green-500 p-2 rounded">Update Train</button>
                        <button onClick={() => setEditingTrain(null)} className="ml-2 bg-gray-500 p-2 rounded">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ManageTrains;


