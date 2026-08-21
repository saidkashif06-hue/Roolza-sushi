import React, { useEffect, useRef } from 'react'
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from '../components/Hero'
import Menu from '../components/OurMenu'
import OurStory from '../components/OurStory'
import Testimonials from '../components/Testimonials'
import FirstTimeHere from '../components/FirstTImeHere'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
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
      // which forces `overflow: hidden` globally via Lenis's own CSS. If
      // destroy() runs while that class is still attached (or a previous
      // instance wasn't torn down cleanly), every other route inherits a
      // scroll lock since <html> is shared across the whole SPA.
      lenis.start();
      lenis.destroy();

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
      <Hero/>
      <Menu/>
      <OurStory/>
      <Testimonials/>
      <FirstTimeHere/>
      <FAQ/>
      <CTA/>
    </div>
  )
}

export default Home