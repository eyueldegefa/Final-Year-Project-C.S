import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import axios from "axios";

const ManagePassengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch passengers from the backend
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get("http://localhost:7676/api/admin/passengers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // Fetch admin token from localStorage
          },
        });
        setPassengers(response.data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
        alert("Failed to fetch passenger data. Please check your connection or try again.");
      }
    };

    fetchPassengers();
  }, []);

  // Filter passengers based on search term
  const filteredPassengers = passengers.filter((passenger) =>
    passenger.passenger_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete passenger handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this passenger?")) return;

    try {
      await axios.delete(`http://localhost:7676/api/admin/passenger/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      // Update the passenger list after deletion
      setPassengers((prev) => prev.filter((passenger) => passenger.id !== id));
      alert("Passenger deleted successfully.");
    } catch (error) {
      console.error("Error deleting passenger:", error);
      alert("Failed to delete passenger. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Manage Passengers</h1>

          <div className="flex items-center justify-between mb-4">
            <Input
              type="text"
              placeholder="Search by passenger name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3"
            />
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold">ID</TableCell>
                <TableCell className="font-semibold">Name</TableCell>
                <TableCell className="font-semibold">Age</TableCell>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell className="font-semibold">Phone</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPassengers.map((passenger) => (
                <TableRow key={passenger.id}>
                  <TableCell>{passenger.id}</TableCell>
                  <TableCell>{passenger.passenger_name}</TableCell>
                  <TableCell>{passenger.passenger_age}</TableCell>
                  <TableCell>{passenger.passenger_email}</TableCell>
                  <TableCell>{passenger.passenger_phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => alert(`Edit passenger ${passenger.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(passenger.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePassengers;
