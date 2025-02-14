import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import './Admin.css';

function ManageTrains() {
    const [trains, setTrains] = useState([]);
    const [editingTrain, setEditingTrain] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', source: '', destination: '', departure_time: '', arrival_time: '', price: '', seats_available: '', date: '', class: ''
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
        setShowAddForm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddTrain = async (e) => {
        e.preventDefault();
        console.log("Adding Train:", formData);

        if (!formData.name) {
            alert("⚠️ Train name is required!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:7676/api/admin/add-train', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log("Add Train Response:", response.data); 
            alert('Train added successfully!');
            fetchTrains();

            setFormData({ name: '', source: '', destination: '', departure_time: '', arrival_time: '', price: '', seats_available: '', date: '', class: '' });
            setShowAddForm(false);
        } catch (err) {
            console.error('Error adding train:', err);
            alert('Failed to add train!');
        }
    };

    const handleEditTrain = async (e) => {
        e.preventDefault();
        console.log("Editing Train:", formData);

        if (!editingTrain) {
            alert("⚠️ No train selected for editing!");
            return;
        }

        try {
            await axios.put(`http://localhost:7676/api/admin/update-train/${editingTrain}`, formData);
            setTrains(trains.map(train => (train.train_id === editingTrain ? { ...train, ...formData } : train)));

            alert("Train updated successfully!");
            setEditingTrain(null);
            setShowAddForm(false);
        } catch (err) {
            console.error("Error updating train:", err);
            alert("Failed to update train!");
        }
    };

    return (
        <div className="p-4">
            <h1 className=" font-bold text-center">Manage Trains</h1>

            <button onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingTrain(null);
                setFormData({ name: '', source: '', destination: '', departure_time: '', arrival_time: '', price: '', seats_available: '', date: '', class: '' });
            }} className="bg-green-500 p-2 my-3 w-25">
                <AddTwoToneIcon /> {showAddForm ? "Close Form" : "Add New Train"}
            </button>

            {showAddForm && (
                <div className="mt-4 border border-dark p-4 w-50">
                    <h2 className="text-xl fw-bold text-success text-center mb-4">{editingTrain ? "Edit Train" : "Add New Train"}</h2>
                    <form onSubmit={editingTrain ? handleEditTrain : handleAddTrain} className="text-center">
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
                        <button type="submit" className="py-2 bg-green-500 text-white p-2 rounded">
                            {editingTrain ? "Update Train" : "Add Train"}
                        </button>
                    </form>
                </div>
            )}

            <table className="mt-4 border border-dark text-start">
                <thead>
                    <tr className=''>
                        <th className="border border-dark bg-white text-dark  p-2">Name</th>
                        <th className="border border-dark bg-white text-dark  p-2">Source</th>
                        <th className="border border-dark bg-white text-dark  p-2">Destination</th>
                        <th className="border border-dark bg-white text-dark  p-2">Date</th>
                        <th className="border border-dark bg-white text-dark  p-2">Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {trains.length > 0 ? (
                        trains.map((train) => (
                            <tr key={train.train_id}>
                                <td className="border border-dark p-2">{train.name}</td>
                                <td className="border border-dark p-2">{train.source}</td>
                                <td className="border border-dark p-2">{train.destination}</td>
                                <td className="border border-dark p-2">{new Date(train.date).toLocaleDateString()}</td>
                                <td className="border border-dark p-2">
                                <div className='d-flex text-white'>
                                    <p onClick={() => handleEditClick(train)} className="bg-success m-1 p-2 rounded">Update</p>
                                    <p onClick={() => deleteTrain(train.train_id)} className="bg-danger m-1 p-2 rounded">Delete</p>
                                </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="border border-gray p-2 text-center">No trains available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageTrains;
