import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAVORITES = ["Crazy Maki", "Dynamite Roll", "Volcano Maki", "Salmon Avocado"];

const FirstTimeHere = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0b0d10] px-6   text-white sm:px-10 lg:px-14  xl:px-20"
    >
      <div
        ref={contentRef}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <span className="font-montserrat text-[10px] font-bold uppercase tracking-[.32em] text-[#ff3b30]">
          First Time Here?
        </span>

        <h2 className="font-grotesk mt-5 text-[10vw] font-bold leading-[.95] tracking-[-.045em] sm:text-5xl md:text-6xl lg:text-[56px]">
          Start With
          <br />
          <span className="text-[#ff3b30]">Customer Favorites.</span>
        </h2>

        <p className="mt-6 max-w-lg font-montserrat text-sm leading-7 text-white/45 sm:text-base">
          New to sushi? Try our best-selling rolls loved by thousands of
          customers across Karachi &amp; Islamabad.
        </p>

        {/* Favorite tags */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {FAVORITES.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 px-5 py-2.5 font-montserrat text-xs font-semibold text-white/60 transition-colors duration-300 hover:border-[#ff3b30] hover:text-white"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/menu"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#ff3b30] px-8 py-4 font-montserrat text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5147]"
        >
          Explore Best Sellers
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FirstTimeHere;
