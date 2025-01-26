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
        const response = await axios.get("/api/admin/passengers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setPassengers(response.data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };

    fetchPassengers();
  }, []);

  // Filter passengers based on search term
  const filteredPassengers = passengers.filter((passenger) =>
    passenger.passenger_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      onClick={() => alert(`Delete passenger ${passenger.id}`)}
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
