import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0b0d10] px-6  text-white sm:px-10 lg:px-14 pb-15 xl:px-20"
    >
      <div
        ref={contentRef}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <span className="font-montserrat text-[10px] font-bold uppercase tracking-[.32em] text-[#ff3b30]">
          Ready To Order?
        </span>

        <h2 className="font-grotesk mt-5 text-[11vw] font-bold leading-[.92] tracking-[-.05em] sm:text-5xl md:text-6xl lg:text-[60px]">
          Your Next Favorite Roll
          <br />
          <span className="text-[#ff3b30]">Is One Order Away.</span>
        </h2>

        <p className="mt-6 max-w-lg font-montserrat text-sm leading-7 text-white/45 sm:text-base">
          Fresh, handcrafted sushi delivered across Karachi &amp; Islamabad.
          Order online or book a table for the full Roolza experience.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/order"
            className="group inline-flex items-center gap-3 rounded-full bg-[#ff3b30] px-8 py-4 font-montserrat text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5147]"
          >
            <ShoppingBag size={16} />
            Order Now
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 font-montserrat text-sm font-bold text-white/85 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
          >
            <Phone size={15} />
            Book a Table
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
