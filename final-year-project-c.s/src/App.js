import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Booking from "./Components/Booking/Booking";
import Home from "./Components/Home/Home";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails"; // Import the component
import SearchResults from "./Components/SearchResult/SearchResults";
import Success from "./Components/Success/Success";
import AdminLogin from "./Components/Admin/AdminLogin";
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
              <Footer />
            </>
          }
        />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/personal-details/:trainId" element={<PersonalDetails />} />    {/* Personal details form */}
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



