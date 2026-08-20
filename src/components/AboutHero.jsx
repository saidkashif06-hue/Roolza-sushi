import React, { useRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const revealRef = useRef(null);
  const labelRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Scroll reveal ----
      // Nothing plays until the section is actually scrolled into view: a
      // curtain panel wipes off the image while it un-zooms, and the copy
      // rises in staggered behind it, so the section feels "revealed"
      // rather than just auto-playing on mount.
      gsap.set(imageRef.current, { scale: 1.15 });
      gsap.set(revealRef.current, { scaleX: 1, transformOrigin: "right center" });
      gsap.set(labelRef.current, { opacity: 0, x: 12 });
      gsap.set(
        [eyebrowRef.current, headingRef.current, paraRef.current, buttonRef.current],
        { opacity: 0, y: 30 }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(revealRef.current, { scaleX: 0, duration: 1.1, ease: "power4.inOut" })
        .to(imageRef.current, { scale: 1, duration: 1.4, ease: "power3.out" }, "<")
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.9")
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.45")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .to(labelRef.current, { opacity: 1, x: 0, duration: 0.6 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-heading"
      className="relative min-h-screen overflow-hidden bg-[#0b0d10] text-white"
    >
      <div className="relative grid min-h-screen lg:grid-cols-[1fr_1.05fr]">

        {/* ================= LEFT — SEO-OPTIMIZED CONTENT ================= */}
        <div className="relative z-10 order-2 flex flex-col justify-center px-6 pb-14 pt-32 sm:px-10 lg:order-1 lg:px-14 lg:pt-40 xl:px-20">

          <span
            ref={eyebrowRef}
            className="font-montserrat text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff3b30]"
          >
            About Roolza
          </span>

          <h1
            id="about-hero-heading"
            ref={headingRef}
            className="font-grotesk mt-5 text-[12vw] font-bold leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-[52px] xl:text-[60px]"
          >
            The Story Behind
            <br />
            Roolza Sushi
          </h1>

          <p
            ref={paraRef}
            className="mt-8 max-w-md text-sm leading-7 text-white/50 sm:text-base"
          >
            <span className="font-semibold text-white">Roolza Sushi</span> was built on one
            idea: fresh, handcrafted Japanese sushi deserves the same care as fine dining.
            Every roll is prepared to order with premium, sustainably-sourced fish, seasonal
            ingredients, and a kitchen team trained in traditional Japanese technique — served
            in a dining room designed for people who notice the details.
          </p>

          <div ref={buttonRef} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/menu")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff3b30] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5147]"
            >
              See Our Menu
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-300 hover:text-white"
            >
              Visit Us
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>

        {/* ================= RIGHT — FULL-BLEED IMAGE, COVERS ENTIRE RIGHT SECTION ================= */}
        <div
          ref={imageWrapRef}
          className="relative order-1 h-[55vh] w-full overflow-hidden sm:h-[65vh] lg:order-2 lg:h-full"
        >
          <img
            ref={imageRef}
            src="/aboutheroimg.png"
            width="1600"
            height="1400"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            alt="Chef at Roolza Sushi hand-rolling fresh nigiri with premium Japanese ingredients"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-60 will-change-transform"
          />

          {/* Dark scrim lowers the opacity further and fades in toward the left, where the image meets the text column */}
          <div className="pointer-events-none absolute inset-0 bg-[#0b0d10]/25" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0d10]/70 via-[#0b0d10]/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b0d10] to-transparent lg:hidden" />

          {/* Grain texture, matching Hero.jsx */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Signature label, kept from Hero for brand continuity, mirrored to the right edge */}
          <div
            ref={labelRef}
            className="pointer-events-none absolute bottom-8 right-4 z-10 hidden origin-bottom-right rotate-90 font-montserrat text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60 lg:block"
          >
            Since 2024
          </div>

          {/* Curtain-wipe reveal panel — covers the image until the section scrolls into view, then wipes off to the left */}
          <div
            ref={revealRef}
            className="pointer-events-none absolute inset-0 z-20 bg-[#0b0d10]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
