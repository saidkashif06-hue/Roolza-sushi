import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1,
      
    });

    lenisRef.current = lenis;
    window.lenis = lenis; // expose so other components (ScrollToTop) can drive it

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);

      // Make sure Lenis never leaves the page in a "stopped" state before
      // destroying — lenis.stop() adds a `lenis-stopped` class to <html>
      // which forces `overflow: hidden` globally via Lenis's own CSS.
      lenis.start();
      lenis.destroy();
      window.lenis = null;

      document.documentElement.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-scrolling",
        "lenis-stopped"
      );
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

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