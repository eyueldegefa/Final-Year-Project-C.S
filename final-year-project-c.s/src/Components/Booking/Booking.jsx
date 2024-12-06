// import React from 'react'
// import TrainIcon from '@mui/icons-material/Train';
// import BookmarksIcon from '@mui/icons-material/Bookmarks';
// import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import '../../App.css';
// import './Booking.css';

// function Booking() {
//   return (
//     <section className='container bookingWrapper bg-white text-dark pb-5 text-center'>
//         <div className='d-flex row'>
//             <p className='col-4 py-4 bottomRed'><TrainIcon/> Search trains</p>
//             <p className='col-4 py-4 bottomRed'><BookmarksIcon/> Manage booking / Check-in</p>
//             <p className='col-4 py-4 bottomRed'><DoubleArrowRoundedIcon />Multi-city</p>
//         </div>
//         <div className='text-center gap-3 d-none d-md-block'>
//           <div>
//             <input className='inputs py-3 px-5' type="text"  placeholder='From station'/>
//             <CompareArrowsIcon />
//             <input className='inputs py-3 px-5' type="text" placeholder='To station'/>
//             <input className='inputs py-3 px-5 ms-4 text-secondary' type="date" name="date" id="date" placeholder='Departing' />
//           </div>
//           <div className='row gap-3 justify-content-center mt-3'>
//             <input className='inputs col-md-3 py-3 px-5' type="text"  placeholder='passenger'/>
//             <input className='inputs col-md-3 py-3 px-5' type="text"  placeholder='class'/>
//             <p className='inputs col-md-3 buttons bg-danger py-3 text-white rounded fs-5'>Continue</p>
//           </div>
//         </div>
//     </section>
//   )
// }

// export default Booking



import React, { useState } from "react";
import axios from "axios";
import TrainIcon from "@mui/icons-material/Train";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import "../../App.css";
import "./Booking.css";

function Booking() {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    passengerNumber: 1,
    class: ""
  });

  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSearch = async () => {
    try {
      console.log("Form Data Sent:", formData); // Debugging
      const response = await axios.post("http://localhost:7676/api/search-trains", formData);
      setSearchResults(response.data);
      setError(""); // Clear previous errors
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message); // Debugging
      setError(err.response?.data?.error || "An error occurred while searching for trains.");
      setSearchResults([]);
    }
    console.log("Form Data Sent:", formData);
  };

  return (
    <section className="container bookingWrapper bg-white text-dark pb-5 text-center">
      <div className="d-flex row">
        <p className="col-4 py-4 bottomRed">
          <TrainIcon /> Search trains
        </p>
        <p className="col-4 py-4 bottomRed">
          <BookmarksIcon /> Manage booking / Check-in
        </p>
        <p className="col-4 py-4 bottomRed">
          <DoubleArrowRoundedIcon /> Multi-city
        </p>
      </div>

      <div className="text-center gap-3 d-none d-md-block">
        <div>
          <input
            className="inputs py-3 px-5"
            type="text"
            name="source"
            placeholder="From station"
            value={formData.source}
            onChange={handleChange}
          />
          <CompareArrowsIcon />
          <input
            className="inputs py-3 px-5"
            type="text"
            name="destination"
            placeholder="To station"
            value={formData.destination}
            onChange={handleChange}
          />
          <input
            className="inputs py-3 px-5 ms-4 text-secondary"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="row gap-3 justify-content-center mt-3">
          <input
            className="inputs col-md-3 py-3 px-5"
            type="number"
            name="passengerNumber"
            placeholder="Passenger"
            min="1"
            value={formData.passengerNumber}
            onChange={handleChange}
          />
          <select
            className="inputs col-md-3 py-3 px-5"
            name="class"
            value={formData.class}
            onChange={handleChange}
          >
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
          <button
            className="inputs col-md-3 buttons bg-danger py-3 text-white rounded fs-5"
            onClick={handleSearch}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Display search results */}
      <div className="mt-5">
        {error && <p className="text-danger">{error}</p>}
        {searchResults.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Seats Available</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((train) => (
                <tr key={train.train_id}>
                  <td>{train.name}</td>
                  <td>{train.source}</td>
                  <td>{train.destination}</td>
                  <td>{train.departure_time}</td>
                  <td>{train.arrival_time}</td>
                  <td>{train.seats_available}</td>
                  <td>{train.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <p>No results found. Try a different search.</p>
        )}
      </div>
    </section>
  );
}

export default Booking;
