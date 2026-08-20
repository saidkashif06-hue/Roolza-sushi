import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sushiItems = [
  { name: "Classic Maki Rolls", image: "/menu/makiRool.png" },
  { name: "Sashimi & Nigiri Selection", image: "/menu/Shashmi and Nigiri.png" },
  { name: "Signature Sushi Platter", image: "/menu/shushi platter.png" },
  { name: "Special Maki Rolls", image: "/menu/specialMakiRoll.png" },
  { name: "Fresh Salmon Sashimi", image: "/menu/salmon.jpg" },
  { name: "Assorted Sushi Selection", image: "/menu/some shushi.jpg" },
  { name: "Shrimp & Sushi Combo", image: "/menu/shrink and shushi.jpg" },
  { name: "Classic Rice Sushi", image: "/menu/rice Shushi.jpg" },
  { name: "Japanese Beef Rice", image: "/menu/BeefRice.png" },
  { name: "Fish & Prawn Selection", image: "/menu/FishandPrawn.png" },
];

const FoodCard = ({ item, offset, cardRef }) => (
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

const SushiAndFood = () => {
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

      // Card grid reveal — one ScrollTrigger on the grid container drives
      // a staggered fade/rise across all cards as the section enters view.
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
          The Roolza Menu
        </span>
        <h2 className="font-grotesk mt-5 text-[13vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl">
          Sushi &amp;
          <br />
          <span className="text-[#ff3b30]">Food.</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-16 sm:gap-x-10 sm:gap-y-24 lg:grid-cols-3"
      >
        {sushiItems.map((item, i) => (
          <FoodCard key={item.name} item={item} offset={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default SushiAndFood;
