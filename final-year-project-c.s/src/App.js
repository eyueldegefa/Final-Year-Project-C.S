import './App.css';
import Header from './Components/Header/Header';
import Booking from './Components/Booking/Booking';
import Banner from './Components/Banner/Banner';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Booking />
      <Home />
      <Footer />
      <Login />
    </div>
  );
}

export default App;
