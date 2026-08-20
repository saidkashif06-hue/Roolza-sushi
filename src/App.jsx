import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "../components/Preloader";
import Home from "./pages/Home";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./pages/About";
import Menu from "./components/OurMenu";
import Beverages from "./pages/Bevrages";
import SushiAndFood from "./pages/ShushiFood";
import Contact from "./pages/Contact";
import Desserts from "./pages/Deserts";
import Soups from "./pages/Soup";

import OrderNow from "./pages/OrderNow";
import ScrollToTop from "./components/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Stop scrolling while preloader is active
    lenis.stop();
    document.body.style.overflow = "hidden";

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);

    // Unlock scrolling
    document.body.style.overflow = "";

    // Start Lenis
    lenisRef.current?.start();

    // Refresh ScrollTrigger after preloader is removed
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  };

  return (
    <div>
      {/* Preloader */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      <ScrollToTop/>
      {/* Navbar */}
      <div className="">
        <Navbar />
      </div>

      {/* Pages */}
     <main className="mt-30">
       <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/menu/beverages" element={<Beverages/>} />
          <Route path="/menu/sushi" element={<SushiAndFood/>} />
           <Route path="/menu/desserts" element={<Desserts/>} />
            <Route path="/menu/soups" element={<Soups/>} />
          <Route path="/order-now" element={<OrderNow/>} />
           <Route path="/contact" element={<Contact/>} />


      </Routes>
     </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default App;