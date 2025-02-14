
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { Link } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import '../../App.css';
import './Booking.css';

function Booking() {
  const [activeTab, setActiveTab] = useState("search"); 
  const [formData, setFormData] = useState({ source: "", destination: "", date: "" });
  const [manageData, setManageData] = useState({ lastName: "", bookingReference: "" });
  const [error, setError] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "search") {
      setFormData({ ...formData, [name]: value });
    } else {
      setManageData({ ...manageData, [name]: value });
    }
  };

  const handleSearch = () => {
    if (!formData.source || !formData.destination || !formData.date) {
      setError("Please fill out all fields before searching.");
      return;
    }
    setError("");
    navigate("/search-results", { state: { searchCriteria: formData } });
  };

// Navigate to the new page where passenger details are shown
const handleManageBooking = async () => {
  try {
    const response = await axios.get("http://localhost:7676/api/bookings/get-bookings", {
      params: {
        booking_reference: manageData.bookingReference, // ✅ Make sure these match your backend query keys
        passengerl_name: manageData.lastName, // ✅ Exact column name
      },
      headers: { "Cache-Control": "no-cache" }, // 🚀 Prevents 304 error
    });

    if (response.status === 200) {
      navigate("/manage-ticket", { state: { passengerData: response.data } });
    } else {
      setError("No booking found. Please check your details.");
    }
  } catch (error) {
    setError("Error fetching booking details.");
  }
};



  const handleCancelBooking = async () => {
    if (!bookingDetails) return;

    try {
      await axios.post("http://localhost:7676/api/bookings/cancel-booking", { bookingId: bookingDetails.booking_id });
      alert("Booking canceled successfully.");
      setBookingDetails(null);
    } catch (error) {
      setError("Error canceling booking.");
    }
  };

  return (
    <section className='bookingWrapper bg-white text-dark pb-5 text-center'>
      <div className='d-flex row ms-1'>
        <p className={`col-4 py-4 bottomRed ${activeTab === "search" ? "bottomRed" : ""}`} onClick={() => setActiveTab("search")}>
          <TrainIcon /> Search trains
        </p>
        <p className={`col-4 py-4 bottomRed${activeTab === "manage" ? "bottomRed" : ""}`} onClick={() => setActiveTab("manage")}>
          <BookmarksIcon /> Manage booking
        </p>
        <Link to="/ontrain" className='col-4 py-4 text-dark mb-3 bottomRed text-decoration-none'><DoubleArrowRoundedIcon /> What's on your train rail</Link>
      </div>

      {activeTab === "search" ? (
        <div className='search-input-container text-center'>
          <div className='row ms-1 gap-2'>
            <input className='col-3 py-3 px-5 inputs' name="source" type="text" placeholder='From station' value={formData.source} onChange={handleChange} />
            <CompareArrowsIcon className='col-1'/>
            <input className='col-3 py-3 px-5 inputs' name="destination" type="text" placeholder='To station' value={formData.destination} onChange={handleChange}/>
            <input className='col-3 py-3 px-5 ms-4 text-secondary inputs' type="date" name="date" value={formData.date} onChange={handleChange} />
            <button className='col-2 buttons py-3 text-white rounded fs-5 inputs' onClick={handleSearch}>Search</button>
          </div>
        </div>
      ) : (
        <div className='search-input-container text-center d-flex gap-2 p-2'>
          <input className="p-3 inputs" type="text" name="lastName" placeholder="Last Name" value={manageData.lastName} onChange={handleChange} />
          <input className="p-3 inputs" type="text" name="bookingReference" placeholder="Booking Reference" value={manageData.bookingReference} onChange={handleChange} />
          <button className="buttons inputs py-3 fs-5" onClick={handleManageBooking}>Fetch Booking</button>

          {bookingDetails && (
            <div>
              <h3>Booking Details</h3>
              <p>{bookingDetails.passengerf_name} {bookingDetails.passengerl_name}</p>
              <button className="btn btn-danger" onClick={handleCancelBooking}>Cancel Ticket</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Booking;
