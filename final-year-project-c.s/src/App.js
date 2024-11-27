import './App.css';
import Header from './Components/Header/Header';
import Booking from './Components/Booking/Booking';
import Banner from './Components/Banner/Banner';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import { Auth } from './Pages/Auth';
import Check from './Components/Check/Check';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Booking />
      <Home />
      <Auth />
      <Check />
      <Footer />
    </div>
  );
}

export default App;


