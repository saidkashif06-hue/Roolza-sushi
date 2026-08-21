import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import About from "./pages/About";
import Menu from "./components/OurMenu";
import Beverages from "./pages/Bevrages";
import SushiAndFood from "./pages/ShushiFood";
import Contact from "./pages/Contact";
import Desserts from "./pages/Deserts";
import Soups from "./pages/Soup";

import OrderNow from "./pages/OrderNow";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/PreLoader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  return (
    <div>
      {/* Preloader */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <ScrollToTop />
      {/* Navbar */}
      <div className="">
        <Navbar />
      </div>

      {/* Pages */}
      <main className="mt-30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/sushi" element={<SushiAndFood />} />
          <Route path="/desserts" element={<Desserts />} />
          <Route path="/soups" element={<Soups />} />
          <Route path="/order-now" element={<OrderNow />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;