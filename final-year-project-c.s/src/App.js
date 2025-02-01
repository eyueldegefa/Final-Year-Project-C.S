import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Booking from "./Components/Booking/Booking";
import Home from "./Components/Home/Home";
import TrainSearch from "./Components/TrainSearch/TrainSearch";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails"; 
import Success from "./Components/Success/Success";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ManagePassengers from "./Components/Admin/ManagePassengers";
import ManageTrains from "./Components/Admin/ManageTrains";
import AddNewTrain from "./Components/Admin/AddNewTrain";
import SeatMap from "./Components/SeatMap/SeatMap";
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
        <Route path="/personal-details/:trainId" element={<PersonalDetails />} /> 
        <Route path="/seat-selection/:trainId" element={<SeatMap />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-passengers" element={<ManagePassengers />} />
        <Route path="/admin/manage-trains" element={<ManageTrains />} />
        <Route path="/admin/add-train" element={<AddNewTrain />} />
        {/* <Route path="/booking" element={<BookingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/check" element={<Check />} /> */}
      </Routes>
    </Router>
  );
}

export default App;



