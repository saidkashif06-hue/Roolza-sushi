import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS_ROW_1 = [
  { name: "Zara H.", initials: "ZH", review: "Fast delivery and food was still perfectly fresh. Impressed every time." },
  { name: "Nadia A.", initials: "NA", review: "The dynamite chicken is out of this world. Must try on every order!" },
  { name: "Hina S.", initials: "HS", review: "Quality consistent every single time. My go-to for every occasion." },
  { name: "Ayesha K.", initials: "AK", review: "Best sushi in Karachi, no comparison. The salmon melts in your mouth." },
  { name: "Omar F.", initials: "OF", review: "Presentation and taste both on point. Roolza never misses." },
];

const REVIEWS_ROW_2 = [
  { name: "Ali R.", initials: "AR", review: "Best Japanese food in Pakistan hands down. Nothing else comes close." },
  { name: "Kamran T.", initials: "KT", review: "Office orders from Roolza every Friday. Never disappoints the whole team." },
  { name: "Hassan M.", initials: "HM", review: "COD makes ordering so easy. Delivered hot and fresh every time." },
  { name: "Sana Q.", initials: "SQ", review: "Sashimi quality rivals what I've had in Dubai. Genuinely impressive." },
  { name: "Bilal N.", initials: "BN", review: "The maki rolls are packaging perfection. Nothing shifts, nothing spills." },
];

const Stars = ({ size = 12 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={size} fill="currentColor" className="text-[#ff3b30]" />
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="flex w-[320px] shrink-0 flex-col justify-between border border-white/10 bg-[#101318] p-6 sm:w-[360px] sm:p-7">
    <div>
      <Stars />
      <p className="mt-5 font-grotesk text-[15px] font-medium leading-relaxed text-white/80">
        "{review.review}"
      </p>
    </div>

    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#ff3b30] bg-[#0b0d10] font-montserrat text-[10px] font-bold text-white">
        {review.initials}
      </span>
      <p className="font-montserrat text-xs font-bold uppercase tracking-[.12em] text-white">
        {review.name}
      </p>
    </div>
  </div>
);

/**
 * Auto-scrolling marquee row. Duplicates the list once so the loop is
 * seamless, runs on a pure CSS animation (transform only — cheap, no JS
 * driving it every frame), and pauses on hover via the .marquee-row /
 * animation-play-state pairing defined in index.css.
 */
const MarqueeRow = ({ items, direction = "left" }) => (
  <div className="marquee-row marquee-fade overflow-hidden">
    <div
      className={`flex w-max gap-5 ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      }`}
    >
      {[...items, ...items].map((review, i) => (
        <ReviewCard key={`${review.name}-${i}`} review={review} />
      ))}
    </div>
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
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
      className="overflow-hidden w-full h-[175vh] bg-[#0b0d10] py-24 text-white lg:py-36"
    >
      <div className="mx-auto max-w-7xl  px-6 sm:px-10 lg:px-14 xl:px-20">

        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#ff3b30]" />
            <span className="font-montserrat text-[10px] font-bold uppercase tracking-[.32em] text-gray-300">
              Guest Notes
            </span>
            <span className="h-px w-8 " />
          </div>

          <h2 className="font-grotesk mt-6 text-[13vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl lg:text-[80px]">
            Loved By
            <br />
            <span className="text-[#ff3b30]">Good Taste.</span>
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <Stars size={15} />
            <span className="font-montserrat text-xs font-semibold text-white/50">
              4.9 out of 5 <span className="text-white/25">·</span> 1,200+ reviews
            </span>
          </div>
        </div>
      </div>

      {/* Marquee rows — intentionally full-bleed, outside the max-w container */}
      <div className="mt-16 space-y-5 lg:mt-20">
        <MarqueeRow items={REVIEWS_ROW_1} direction="left" />
        <MarqueeRow items={REVIEWS_ROW_2} direction="right" />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-16 flex max-w-7xl justify-center px-6 sm:px-10 lg:px-14 xl:px-20">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 font-montserrat text-xs font-bold uppercase tracking-[.15em] text-white/70 transition-all duration-300 hover:border-[#ff3b30] hover:text-white"
        >
          Share Your Experience
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-[#ff3b30] group-hover:bg-[#ff3b30]">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
