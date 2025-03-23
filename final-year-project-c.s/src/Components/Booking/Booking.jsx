
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { Link } from 'react-router-dom';
import TrainIcon from '@mui/icons-material/Train';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import '../../App.css';
import classes from './Booking.module.css';

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
    <section className={classes.bookingWrapper}>
      <div className={classes.linksWrapper}>
        <Link className={`${classes.bookingPrtLinks} ${activeTab === "search" ? "bottomRed" : ""}`} onClick={() => setActiveTab("search")}>
          <TrainIcon /> Search trains
        </Link>
        <Link className={`${classes.bookingPrtLinks} ${activeTab === "manage" ? "bottomRed" : ""}`} onClick={() => setActiveTab("manage")}>
          <BookmarksIcon /> Manage booking
        </Link>
        <Link to="/ontrain" className={classes.bookingPrtLinks}><DoubleArrowRoundedIcon /> What's on Train</Link>
      </div>

      {activeTab === "search" ? (
        <div className={classes.inputsWrapper}>
            <div>
              <div className=''><input name="source" type="text" placeholder='From station' value={formData.source} onChange={handleChange} /></div>
              <div className={classes.arrow}><CompareArrowsIcon /></div>
              <div className=''><input name="destination" type="text" placeholder='To station' value={formData.destination} onChange={handleChange}/></div>
            </div>
            <div>
              <div className=''><input type="date" name="date" value={formData.date} onChange={handleChange} /></div>            
              <div className='ms-4'><button onClick={handleSearch}>Search</button></div>
            </div>
        </div>
      ) : (
        <div className='d-flex p-3 gap-3'>
          <input className="p-3 inputs" type="text" name="lastName" placeholder="Last Name" value={manageData.lastName} onChange={handleChange} />
          <input className="p-3 inputs" type="text" name="bookingReference" placeholder="Booking Reference" value={manageData.bookingReference} onChange={handleChange} />
          <button className="buttons inputs py-3 fs-5" onClick={handleManageBooking}>Fetch</button>

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
