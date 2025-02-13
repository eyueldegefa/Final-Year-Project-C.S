// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
// import Banner from "./Components/Banner/Banner";
// import Booking from "./Components/Booking/Booking";
// import Home from "./Components/Home/Home";
// import AboutUs from "./Pages/AboutUs/AboutUs";
// import TrainSearch from "./Pages/TrainSearch/TrainSearch";
// import ManageTicket from "./Pages/ManageTicket/ManageTicket";
// import PersonalDetails from "./Pages/PersonalDetails/PersonalDetails";
// import SeatSelection from "./Pages/SeatSelection/SeatSelection"; 
// import VerifyBooking from "./Pages/VerifyBooking/VerifyBooking";
// import Payment from "./Pages/Payment/Payment";
// import PaymentFailed from "./Pages/PaymentFailed/PaymentFailed";
// import Success from "./Pages/Success/Success";
// import AdminLogin from "./Pages/Admin/AdminLogin";
// import AdminLayout from "./Pages/Admin/AdminLayout";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import ManagePassengers from "./Pages/Admin/ManagePassengers";
// import ManageTrains from "./Pages/Admin/ManageTrains";
// import AddNewTrain from "./Pages/Admin/AddNewTrain";


// // import { Auth } from "./Pages/Auth";
// // import Check from "./Components/Check/Check";
// // import BookingPage from "./Pages/BookingPage/BookingPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={
//             <>
//               <Header />
//               <Banner />
//               <Booking />
//               <Home />
//               {/* <SeatMap /> */}
//               <Footer />
//             </>
//           }
//         />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/search-results" element={<TrainSearch />} />
//         <Route path="/manage-ticket" element={<ManageTicket />} />
//         <Route path="/personal-details/:trainId?" element={<PersonalDetails />} /> 
//         <Route path="/seat-selection/:trainId?" element={<SeatSelection />} />
//         <Route path="/verify-booking" element={<VerifyBooking />} />
//         <Route path="/payment" element={<Payment />} /> 
//         <Route path="/success" element={<Success />} />
//         <Route path="/payment-failed" element={<PaymentFailed />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         {/* <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/manage-passengers" element={<ManagePassengers />} />
//         <Route path="/admin/manage-trains" element={<ManageTrains />} />
//         <Route path="/admin/add-train" element={<AddNewTrain />} /> */}
//                         {/* Admin Section with Static Sidebar */}
//         <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="manage-passengers" element={<ManagePassengers />} />
//             <Route path="manage-trains" element={<ManageTrains />} />
//             <Route path="add-train" element={<AddNewTrain />} />
//         </Route>
        
//         {/* <Route path="/booking" element={<BookingPage />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/check" element={<Check />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// --------------------------------------------------------------------------------------
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Booking from "./Components/Booking/Booking";
import Home from "./Components/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
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
import Login from "../src/Pages/LogIn/Login";
import Register from "../src/Pages/LogIn/Register";
import ConductorDashboard from './Pages/Conductor/Conductor';



function App() {

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main layout route */}
        <Route path="/" element={
          <>
            <Header />
            <Banner />
            <Booking />
            <Home />
            <Footer />
          </>
        }/>

        {/* Regular public routes */}
        <Route path="/about-us" element={<AboutUs />} />
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
        </Route>
        
        <Route path="/conductor" element={<ConductorDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;