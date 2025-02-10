// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const VerifyBooking = () => {
//   const navigate = useNavigate();
//   const [bookingReference, setBookingReference] = useState("");
//   const [passengerDetails, setPassengerDetails] = useState(null);
//   const [error, setError] = useState("");

//   const fetchPassengerDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:7676/api/booking/${bookingReference}`);
//       setPassengerDetails(response.data);
//       setError("");
//     } catch (error) {
//       setError("Booking not found. Please check the reference and try again.");
//       setPassengerDetails(null);
//     }
//   };

//   const proceedToPayment = () => {
//     if (!passengerDetails) {
//       alert("Please verify your booking first.");
//       return;
//     }

//     // Proceed to Chapa payment
//     navigate("/payment", { state: { bookingReference, passengerDetails } });
//   };

//   return (
//     <div>
//       <h1>Verify Booking</h1>
//       <input
//         type="text"
//         placeholder="Enter Booking Reference"
//         value={bookingReference}
//         onChange={(e) => setBookingReference(e.target.value)}
//       />
//       <button onClick={fetchPassengerDetails}>Verify</button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {passengerDetails && (
//         <div>
//           <p>Name: {passengerDetails.passengerf_name} {passengerDetails.passengerl_name}</p>
//           <p>Email: {passengerDetails.passenger_email}</p>
//           <p>Phone: {passengerDetails.passenger_phone}</p>
//           <button onClick={proceedToPayment}>Proceed to Payment</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyBooking;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const VerifyBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { bookingReference } = location.state || {}; // Access bookingReference from state

//   const [passengerDetails, setPassengerDetails] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!bookingReference) return;

//     const fetchPassengerDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:7676/api/booking/${bookingReference}`);
//         setPassengerDetails(response.data);
//         setError("");
//       } catch (error) {
//         setError("Booking not found. Please check the reference and try again.");
//         setPassengerDetails(null);
//       }
//     };

//     fetchPassengerDetails();
//   }, [bookingReference]);

//   const proceedToPayment = () => {
//     if (!passengerDetails) {
//       alert("Please verify your booking first.");
//       return;
//     }

//     // Proceed to Chapa payment
//     navigate("/payment", { state: { bookingReference, passengerDetails } });
//   };

//   return (
//     <div>
//       <h1>Verify Booking</h1>
//       {bookingReference ? (
//         <>
//           <p>Booking Reference: {bookingReference}</p>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           {passengerDetails && (
//             <div>
//               <p>Name: {passengerDetails.passengerf_name} {passengerDetails.passengerl_name}</p>
//               <p>Date of Birth: {passengerDetails.passenger_dateofbirth}</p>
//               <p>Email: {passengerDetails.passenger_email}</p>
//               <p>Phone: {passengerDetails.passenger_phone}</p>
//               <button onClick={proceedToPayment}>Proceed to Payment</button>
//             </div>
//           )}
//         </>
//       ) : (
//         <p>No booking reference found. Please go back to seat selection.</p>
//       )}
//     </div>
//   );
// };

// export default VerifyBooking;


import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./VerifyBooking.css"; // Ensure this file contains the styles

const VerifyBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  const pageRef = useRef();

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const handleDownload = async () => {
    if (!pageRef.current) return;
    const canvas = await html2canvas(pageRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("ticket.pdf");
  };

  const { bookingReference, passengerDetails, trainDetails, selectedSeats } = bookingDetails;

  return (
    <div className="ticket-container" ref={pageRef}>
      <div className="ticket-header">Booking Confirmed</div>
      <div className="ticket-body">
        <div className="ticket-section">
          <span>Booking Reference:</span>
          <strong>{bookingReference}</strong>
        </div>
        <div className="ticket-section">
          <span>Passenger:</span>
          <strong>{passengerDetails.passengerf_name} {passengerDetails.passengerl_name}</strong>
        </div>
        <div className="ticket-section">
          <span>Phone:</span>
          <strong>{passengerDetails.passenger_phone}</strong>
        </div>
        <div className="ticket-section">
          <span>Train ID:</span>
          <strong>{trainDetails.train_id}</strong>
        </div>
        {/* <div className="ticket-section">
          <span>From:</span>
          <strong>{trainDetails.source}</strong>
        </div>
        <div className="ticket-section">
          <span>To:</span>
          <strong>{trainDetails.destination}</strong>
        </div> */}
        <div className="ticket-section">
          <span>Selected Seats:</span>
          <strong>{selectedSeats.join(", ")}</strong>
        </div>
      </div>
      <div className="ticket-footer">Thank you for booking with us!</div>
      <div className="button-container">
        <button onClick={() => window.print()}>Print Ticket</button>
        <button onClick={handleDownload}>Download Ticket</button>
        <button onClick={() => navigate("/payment", { state: bookingDetails })}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default VerifyBooking;
