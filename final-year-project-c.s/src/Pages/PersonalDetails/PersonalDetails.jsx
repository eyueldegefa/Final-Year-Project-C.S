import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import './PersonalDetails.css';

const PersonalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trainId: paramTrainId } = useParams(); // Get trainId from URL if available
  const trainId = location.state?.trainId || paramTrainId; // Prefer state over params

  // Access source, destination, and price from location.state
  const { source, destination, price } = location.state || {};

  if (!trainId) {
    console.error("🚨 Train ID is missing in PersonalDetails");
  }

  const [details, setDetails] = useState({
    passengerf_name: "",
    passengerl_name: "",
    passenger_dateofbirth: "",
    passenger_phone: "",
    passenger_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const proceedToSeatSelection = () => {
    if (!details.passengerf_name || !details.passengerl_name || !details.passenger_dateofbirth || !details.passenger_phone || !details.passenger_email) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    if (!trainId) {
      alert("🚨 Train ID is missing. Please select a train first.");
      return;
    }

    // Navigate to the next page (SeatSelection) and pass all required data
    navigate("/seat-selection", {
      state: {
        passengerDetails: details,
        trainId, //pass trainId
        source, // Pass source
        destination, // Pass destination
        price, // Pass price
      },
    });
  };

  return (
    <div className="personal-details-container">
      <form>
        <h3>Enter Personal Details</h3>
        <select className="w-50 p-3" name="passenger_title" id="#">
          <option value="#">Mr</option>
          <option value="#">Mrs</option>
          <option value="#">Ms</option>
          <option value="#">Dr.</option>
          <option value="#">Prof.</option>
          <option value="#">Capitain</option>
          <option value="#">Colonel</option>
        </select>
        <div className="d-flex gap-2 my-3">
          <input className="w-50 p-3" type="text" name="passengerf_name" placeholder="Given name (First Name & Middle name) *" value={details.passengerf_name} onChange={handleChange} required />
          <input className="w-50 p-3" type="text" name="passengerl_name" placeholder="Last Name (Surname or Family name) *" value={details.passengerl_name} onChange={handleChange} required />
        </div>
        <div className="d-flex gap-2 my-3">
          <input className="w-50 p-3" type="date" name="passenger_dateofbirth" placeholder="Date of Birth *" value={details.passenger_dateofbirth} onChange={handleChange} required />
          <select className="w-50 p-3" name="gender">
            <option value="#">Male</option>
            <option value="#">Female</option>
          </select>
        </div>
        <h3 className="mt-5">Contact information</h3>
        <input className="m-2 p-3 w-50" type="text" name="passenger_phone" placeholder="Phone *" value={details.passenger_phone} onChange={handleChange} required />
        <input className="m-2 p-3 w-50" type="email" name="passenger_email" placeholder="Email *" value={details.passenger_email} onChange={handleChange} required />
        <button className="bg-primary text-white w-50 py-3 m-2" type="button" onClick={proceedToSeatSelection}>Proceed to Seat Selection</button>
      </form>
    </div>
  );
};

export default PersonalDetails;