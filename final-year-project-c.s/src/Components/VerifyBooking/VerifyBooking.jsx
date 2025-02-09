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
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const VerifyBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  // Fix: Declare the ref at the component level
  const pageRef = useRef();

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  const handleDownload = async () => {
    if (!pageRef.current) return;

    const element = pageRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("downloaded-page.pdf");
  };

  const { bookingReference, passengerDetails, trainDetails, selectedSeats } = bookingDetails;

  return (
    <div ref={pageRef} style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", maxWidth: "400px", margin: "auto" }}>
      <h2>Booking Confirmed!</h2>
      <h3>Booking Reference: {bookingReference}</h3>
      <div>
        <h4>Passenger Details:</h4>
        <p><strong>Name:</strong> {passengerDetails.passengerf_name} {passengerDetails.passengerl_name}</p>
        <p><strong>Phone:</strong> {passengerDetails.passenger_phone}</p>
        <p><strong>Email:</strong> {passengerDetails.passenger_email}</p>
      </div>
      <div>
        <h4>Train Details:</h4>
        <p><strong>Train ID:</strong> {trainDetails.train_id}</p>
        <p><strong>Source:</strong>{trainDetails.source}</p>
        <p><strong>Destination:</strong>{trainDetails.destination}</p>
        <p>{trainDetails.departure_time.slice(0, 5)}</p>
        <p>{trainDetails.arrival_time.slice(0, 5)}</p>
        <p>{new Date(trainDetails.date).toLocaleDateString}</p>
      </div>
      <div>
        <h4>Selected Seats:</h4>
        <ul>
          {selectedSeats.map((seatId, index) => (
            <li key={index}>Seat {seatId}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => window.print()}>Print Ticket</button>
      <button onClick={handleDownload}>Download Ticket</button>
      <button onClick={() => navigate("/payment", { state: { bookingReference, passengerDetails, trainDetails, selectedSeats } })}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default VerifyBooking;
