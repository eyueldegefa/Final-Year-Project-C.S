// import './App.css';
// import Header from './Components/Header/Header';
// import Booking from './Components/Booking/Booking';
// import Banner from './Components/Banner/Banner';
// import Home from './Components/Home/Home';
// import Footer from './Components/Footer/Footer';
// import { Auth } from './Pages/Auth';
// import Check from './Components/Check/Check';

// function App() {
//   return (
//     <div>
//       <Header />
//       <Banner />
//       <Booking />
//       <Home />
//       <Auth />
//       <Check />
//       <Footer />
//     </div>
//   );
// }

// export default App;

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
        <Route path="/success" element={<Success />} />
        {/* <Route path="/booking" element={<BookingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/check" element={<Check />} /> */}
      </Routes>
    </Router>
  );
}

export default App;



