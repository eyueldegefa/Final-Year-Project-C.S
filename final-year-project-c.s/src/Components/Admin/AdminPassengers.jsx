// import React, { useEffect, useState } from "react";
// import { Table, Button } from "@/components/ui";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import axios from "axios";

// const AdminPassengers = () => {
//   const [passengers, setPassengers] = useState([]);
//   const [search, setSearch] = useState("");
//   const { toast } = useToast();

//   // Fetch passengers from API
//   useEffect(() => {
//     const fetchPassengers = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");
//         const response = await axios.get("/api/admin/passengers", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setPassengers(response.data);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch passenger data.",
//           status: "error",
//         });
//       }
//     };

//     fetchPassengers();
//   }, [toast]);

//   // Filter passengers based on search input
//   const filteredPassengers = passengers.filter((passenger) =>
//     passenger.passenger_name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Manage Passenger Data</h1>

//       {/* Search Input */}
//       <div className="mb-4 flex items-center">
//         <Input
//           type="text"
//           placeholder="Search by passenger name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full max-w-md mr-2"
//         />
//       </div>

//       {/* Passengers Table */}
//       <Table>
//         <thead>
//           <tr>
//             <th>Booking ID</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPassengers.map((passenger) => (
//             <tr key={passenger.booking_id}>
//               <td>{passenger.booking_id}</td>
//               <td>{passenger.passenger_name}</td>
//               <td>{passenger.passenger_age}</td>
//               <td>{passenger.passenger_phone}</td>
//               <td>{passenger.passenger_email}</td>
//               <td>
//                 <Button
//                   variant="secondary"
//                   className="mr-2"
//                   onClick={() => console.log("Edit", passenger)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   onClick={() => console.log("Delete", passenger)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {filteredPassengers.length === 0 && (
//         <p className="mt-4">No passengers found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminPassengers;
