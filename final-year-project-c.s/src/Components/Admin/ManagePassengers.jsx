// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "../../components/ui/table";
// import { getPassengers } from "../../api/adminApi"; // ✅ Fix import path

// const ManagePassengers = () => {
//     const [passengers, setPassengers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         const fetchPassengers = async () => {
//             try {
//                 const data = await getPassengers();
//                 console.log("🚀 API Response:", data); // Debugging
//                 if (Array.isArray(data) && data.length === 0) {
//                     console.log("⚠️ No passengers found in the database.");
//                 }
//                 setPassengers(data);
//             } catch (error) {
//                 console.error("❌ Error fetching passengers:", error.response ? error.response.data : error);
//             }
//         };
//         fetchPassengers();
//     }, []);
    
    

//     const filteredPassengers = passengers.filter((passenger) =>
//         passenger.passenger_name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="p-4">
//             <div></div>
//             <Card>
//                 <CardContent>
//                     <h1 className="text-2xl font-bold mb-4">Manage Passengers</h1>
//                     <div className="flex items-center justify-between mb-4">
//                         <Input
//                             type="text"
//                             placeholder="Search by passenger name"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-1/3"
//                         />
//                     </div>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell className="font-semibold">ID</TableCell>
//                                 <TableCell className="font-semibold">Name</TableCell>
//                                 <TableCell className="font-semibold">Age</TableCell>
//                                 <TableCell className="font-semibold">Email</TableCell>
//                                 <TableCell className="font-semibold">Phone</TableCell>
//                                 <TableCell className="font-semibold">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {filteredPassengers.length > 0 ? (
//                                 filteredPassengers.map((passenger) => (
//                                     <TableRow key={passenger.id}>
//                                         <TableCell>{passenger.id}</TableCell>
//                                         <TableCell>{passenger.passenger_name}</TableCell>
//                                         <TableCell>{passenger.passenger_age}</TableCell>
//                                         <TableCell>{passenger.passenger_email}</TableCell>
//                                         <TableCell>{passenger.passenger_phone}</TableCell>
//                                         <TableCell>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="mr-2"
//                                                 onClick={() => alert(`Edit passenger ${passenger.id}`)}
//                                             >
//                                                 Edit
//                                             </Button>
//                                             <Button
//                                                 variant="destructive"
//                                                 size="sm"
//                                                 onClick={() => alert(`Delete passenger ${passenger.id}`)}
//                                             >
//                                                 Delete
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan="6" className="text-center py-4">
//                                         No passengers found.
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default ManagePassengers;


// -----------------------------------------------------------------------------
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

    useEffect(() => {
        fetchPassengers();
    }, []);

    const fetchPassengers = async () => {
        try {
            const response = await axios.get("http://localhost:7676/api/admin/passengers");
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
            <table className="mt-4 border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Age</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Email</th>
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
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => handleEditClick(passenger)} className="text-blue-500 mr-2">Edit</button>
                                <button onClick={() => deletePassenger(passenger.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
