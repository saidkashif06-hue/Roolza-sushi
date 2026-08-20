import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const soups = [
  { name: "Spicy Chicken Soup", image: "/soup/chicken soup.jpg" },
  { name: "Creamy Mushroom Soup", image: "/soup/creamy soup.jpg" },
  { name: "Makhni Corn Soup", image: "/soup/makhnii shoup.jpg" },
  { name: "Classic Vegetable Soup", image: "/soup/pexels-fajrinugroho-16811680.jpg" },
  { name: "Yakhni Mutton Soup", image: "/soup/yahni soup.jpg" },
  { name: "Tangy Chatni Soup", image: "/soup/chatni soup.jpg" },
];

const SoupCard = ({ item, offset, cardRef }) => (
  <div
    ref={cardRef}
    className={`group flex flex-col items-center ${
      offset ? "sm:translate-y-10" : "sm:-translate-y-0"
    }`}
  >
    <div className="relative h-72 w-full max-w-[320px] overflow-hidden rounded-2xl bg-[#12151a] sm:h-80 lg:h-96 lg:max-w-[360px]">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-[#ff3b30]/40" />
    </div>

    <h3 className="font-grotesk mt-5 text-center text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
      {item.name}
    </h3>
  </div>
);

const Soups = () => {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        introRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 80%" },
        }
      );

      // Card grid reveal — staggered, each card fades + rises into place
      // as the grid scrolls into view.
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: {
            each: 0.08,
            grid: "auto",
            from: "start",
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b0d10] px-6 py-20 text-white sm:px-10 lg:px-14 xl:px-20"
    >
      <div ref={introRef} className="mx-auto mb-14 max-w-3xl text-center">
        <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.32em] text-gray-300">
          Warm &amp; Comforting
        </span>
        <h2 className="font-grotesk mt-5 text-[13vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl">
          Soups &amp;
          <br />
          <span className="text-[#ff3b30]">Broths.</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-16 sm:gap-x-10 sm:gap-y-24 lg:grid-cols-3"
      >
        {soups.map((item, i) => (
          <SoupCard key={item.name} item={item} offset={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default Soups;
