import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
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

  const {
    bookingReference,
    passengerDetails,
    trainDetails,
    selectedSeats,
    source, // Access source
    destination, // Access destination
    price, // Access price
  } = bookingDetails;

  return (
    <div className="ticket-container" ref={pageRef}>
      <div className="d-flex gap-2 justify-content-end w-25">
        <button onClick={() => window.print()}> <PrintIcon/> </button>
        <button onClick={handleDownload}> <DownloadIcon/> </button>
      </div>
      <div className="ticket-header text-white py-2">Booking Confirmed!</div>
      <div className="ticket-body">
        <div className="ticket-section">
          <span>Booking Reference:</span>
          <strong>{bookingReference}</strong>
        </div>
        <div className="ticket-section">
          <span>Passenger:</span>
          <strong>{passengerDetails.passengerf_name}</strong>
          <strong>{passengerDetails.passengerl_name}</strong>
        </div>
        <div className="ticket-section">
          <span>Phone:</span>
          <strong>{passengerDetails.passenger_phone}</strong>
        </div>
        <div className="ticket-section">
          <span>Train ID:</span>
          <strong>{trainDetails.train_id}</strong>
        </div>
        <div className="ticket-section">
          <span>From:</span>
          <strong>{source}</strong> {/* Display source */}
        </div>
        <div className="ticket-section">
          <span>To:</span>
          <strong>{destination}</strong> {/* Display destination */}
        </div>
        <div className="ticket-section">
          <span>Price:</span>
          <strong>{price} ETB</strong> {/* Display price */}
        </div>
        <div className="ticket-section">
          <span>Selected Seats:</span>
          <strong>{selectedSeats.join(", ")}</strong>
        </div>
      </div>
      <div className="ticket-footer">Thank you for booking with us!</div>
      <div className="button-container">
        <button onClick={() => navigate("/payment", { state: bookingDetails })}>Proceed to Payment</button>
      </div>
      <p className="bg-success w-100"></p>
    </div>
  );
};

export default VerifyBooking;