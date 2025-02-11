import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Booking from "./Components/Booking/Booking";
import Home from "./Components/Home/Home";
import TrainSearch from "./Components/TrainSearch/TrainSearch";
import ManageTicket from "./Pages/ManageTcket/ManageTicket";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import SeatSelection from "./Components/SeatSelection/SeatSelection"; 
import VerifyBooking from "./Components/VerifyBooking/VerifyBooking";
import Payment from "./Components/Payment/Payment";
import Success from "./Components/Success/Success";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ManagePassengers from "./Components/Admin/ManagePassengers";
import ManageTrains from "./Components/Admin/ManageTrains";
import AddNewTrain from "./Components/Admin/AddNewTrain";


// import { Auth } from "./Pages/Auth";
// import Check from "./Components/Check/Check";
// import BookingPage from "./Pages/BookingPage/BookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <>
              <Header />
              <Banner />
              <Booking />
              <Home />
              {/* <SeatMap /> */}
              <Footer />
            </>
          }
        />
        <Route path="/search-results" element={<TrainSearch />} />
        <Route path="/manage-ticket" element={<ManageTicket />} />
        <Route path="/personal-details/:trainId?" element={<PersonalDetails />} /> 
        <Route path="/seat-selection/:trainId?" element={<SeatSelection />} />
        <Route path="/verify-booking" element={<VerifyBooking />} />
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/success" element={<Success />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-passengers" element={<ManagePassengers />} />
        <Route path="/admin/manage-trains" element={<ManageTrains />} />
        <Route path="/admin/add-train" element={<AddNewTrain />} /> */}
                        {/* Admin Section with Static Sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="manage-passengers" element={<ManagePassengers />} />
            <Route path="manage-trains" element={<ManageTrains />} />
            <Route path="add-train" element={<AddNewTrain />} />
        </Route>
        {/* <Route path="/booking" element={<BookingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/check" element={<Check />} /> */}
      </Routes>
    </Router>
  );
}

export default App;



