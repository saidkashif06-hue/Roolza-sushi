import React, { useRef, useLayoutEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Swap this for your real handle
const INSTAGRAM_HANDLE = "roolzasushi";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

const feedImages = [
  { src: "/insta/1.jpg", alt: "Fresh sushi roll plated at Roolza Sushi" },
  { src: "/insta/2.jpg", alt: "Chef's special roll at Roolza Sushi" },
  { src: "/insta/3.jpg", alt: "Signature nigiri from Roolza Sushi" },
];

const InstagramSection = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [eyebrowRef.current, headingRef.current, paraRef.current],
        { opacity: 0, y: 24 }
      );
      gsap.set(cardRefs.current, { opacity: 0, y: 40, scale: 0.97 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(
          cardRefs.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="instagram-heading"
      className="relative overflow-hidden bg-[#0b0d10] px-6 py-24 text-white sm:px-10 lg:px-14 xl:px-20"
    >
      {/* Grain texture, matching Hero / AboutHero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        <span
          ref={eyebrowRef}
          className="font-montserrat text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff3b30]"
        >
          Follow Us
        </span>

        <h2
          id="instagram-heading"
          ref={headingRef}
          className="font-grotesk mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl"
        >
          @{INSTAGRAM_HANDLE}
        </h2>

        <p
          ref={paraRef}
          className="mx-auto mt-4 max-w-md text-sm text-white/50 sm:text-base"
        >
          Real rolls. Real customers. Real sushi cravings.
        </p>

        {/* Feed grid: 3 photos + follow card — even 4-up, matches reference layout */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {feedImages.map((img) => (
            <a
              key={img.src}
              ref={addCardRef}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 sm:aspect-[4/5]"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#0b0d10]/0 transition-colors duration-500 group-hover:bg-[#0b0d10]/30" />
              <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 -translate-y-2 items-center justify-center rounded-full bg-white/90 text-[#0b0d10] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <FiArrowUpRight size={16} />
              </div>
            </a>
          ))}

          {/* 4th card — Follow us on Instagram CTA */}
          <a
            ref={addCardRef}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:bg-white/[0.06] sm:aspect-[4/5]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff3b30]/15 text-[#ff3b30] transition-transform duration-300 group-hover:scale-110">
              <FaInstagram size={18} />
            </span>
            <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
              View More
            </span>
            <span className="font-grotesk text-lg font-bold text-white">
              Instagram
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
