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
// import Header from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
import Banner from "./Components/Banner/Banner";
import Booking from "./Components/Booking/Booking";
import Home from "./Components/Home/Home";
// import { Auth } from "./Pages/Auth";
// import Check from "./Components/Check/Check";
// import BookingPage from "./Pages/BookingPage/BookingPage";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={
            <>
              <Banner />
              <Booking />
              <Home />
            </>
          }
        />
        {/* <Route path="/booking" element={<BookingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/check" element={<Check />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;



