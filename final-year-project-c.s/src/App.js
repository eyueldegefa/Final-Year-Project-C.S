// --------------------------------------------------------------------------------------
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AboutUs from "./Pages/AboutUs/AboutUs";
import Contact from "./Pages/ContactUs/ContactUs";
import Ontrain from "./Pages/WhatIsontrain/WhatIsontrain"

import TrainSearch from "./Pages/TrainSearch/TrainSearch";
import ManageTicket from "./Pages/ManageTicket/ManageTicket";
import PersonalDetails from "./Pages/PersonalDetails/PersonalDetails";
import SeatSelection from "./Pages/SeatSelection/SeatSelection";
import VerifyBooking from "./Pages/VerifyBooking/VerifyBooking";
import Payment from "./Pages/Payment/Payment";
import PaymentFailed from "./Pages/PaymentFailed/PaymentFailed";
import Success from "./Pages/Success/Success";

import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManagePassengers from "./Pages/Admin/ManagePassengers";
import ManageTrains from "./Pages/Admin/ManageTrains";
import ManageConductor from "./Pages/Admin/ManageConductor";

import LogIn from "./Pages/LogIn/LogIn";
import AdminLogin from './Pages/LogIn/AdminLogin';
import Register from "../src/Pages/LogIn/Register";
import ConductorDashboard from './Pages/Conductor/Conductor';
import Landing from "./Pages/Landing/Landing";



function App() {

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Main layout route */}
        <Route path="/" element={<Landing />}/>

        {/* Regular public routes */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/ontrain" element={<Ontrain />} />
        <Route path="/search-results" element={<TrainSearch />} />
        <Route path="/manage-ticket" element={<ManageTicket />} />
        <Route path="/personal-details/:trainId?" element={<PersonalDetails />} />
        <Route path="/seat-selection/:trainId?" element={<SeatSelection />} />
        <Route path="/verify-booking" element={<VerifyBooking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-passengers" element={<ManagePassengers />} />
          <Route path="manage-trains" element={<ManageTrains />} />
          <Route path="manage-conductors" element={<ManageConductor />} />
        </Route>

        {/* Conductor routes */}
        <Route path="/conductor" element={<ConductorDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;