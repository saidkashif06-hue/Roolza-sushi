import React, { useRef, useLayoutEffect } from "react";
import {
  GiSushis,
  GiChopsticks,
  GiFamilyHouse,
  GiCook,
  GiDeliveryDrone,
} from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: GiSushis,
    title: "Live Sushi Counter",
    description:
      "Watch our chefs craft your order fresh right in front of you — an experience as memorable as the food itself.",
    highlight: false,
  },
  {
    icon: GiChopsticks,
    title: "Japanese Ambience",
    description:
      "Minimalist decor, warm lighting and a calm atmosphere inspired by the finest Japanese dining culture.",
    highlight: true,
  },
  {
    icon: GiFamilyHouse,
    title: "Perfect for Groups",
    description:
      "Ideal for family dinners, date nights and corporate lunches — we make every occasion unforgettable.",
    highlight: false,
  },
  {
    icon: FaLeaf,
    title: "100% Halal",
    description:
      "Every ingredient we use is fully halal certified — dine with complete peace of mind.",
    highlight: false,
  },
  {
    icon: GiCook,
    title: "Expert Chefs",
    description:
      "Our trained Japanese cuisine specialists bring passion and precision to every dish.",
    highlight: false,
  },
  {
    icon: GiDeliveryDrone,
    title: "Also Delivery",
    description:
      "Can't dine in? We deliver fresh across Karachi and Islamabad with Cash on Delivery available.",
    highlight: false,
  },
];

const WhatMakesUsDifferentSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { opacity: 0, y: 24 });
      gsap.set(cardRefs.current, { opacity: 0, y: 36 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.7 }).to(
        cardRefs.current,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "-=0.35"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="different-heading"
      className="relative overflow-hidden bg-[#0b0d10] px-6 py-24 text-white sm:px-10 lg:px-14 xl:px-20"
    >
      {/* Grain texture, matching Hero / AboutHero / Instagram */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <h2
          id="different-heading"
          ref={headingRef}
          className="font-grotesk text-center text-4xl font-bold tracking-[-0.03em] sm:text-5xl"
        >
          What Makes Us <span className="text-[#ff3b30]">Different</span>
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map(({ icon: Icon, title, description, highlight }) => (
            <div
              key={title}
              ref={addCardRef}
              className={`group relative rounded-2xl border bg-white/[0.03] p-8 transition-colors duration-500 hover:bg-white/[0.05] ${
                highlight
                  ? "border-[#ff3b30]/70"
                  : "border-white/10"
              }`}
            >
              {highlight && (
                <span className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-[#ff3b30]" />
              )}

              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff3b30]/15 text-[#ff3b30] transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} />
              </span>

              <h3 className="font-grotesk mt-6 text-xl font-bold tracking-[-0.01em]">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/50">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifferentSection;
