import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Cancelation from "./scenes/checkout/Cancelation";
import Footer from "./scenes/global/Footer";
import Contact from "./scenes/contact/Contact";
import Shop from "./scenes/shop/Shop";
import About from "./scenes/about/About";
import NoPage from "./scenes/noPage/NoPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])
  
  return null;
}


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar/>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="checkout/error" element={<Cancelation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;