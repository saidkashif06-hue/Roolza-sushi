import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "15K+", label: "Happy Customers" },
  { value: "4.9", label: "Rating", withStar: true },
  { value: "2", label: "Branches" },
];

const FEATURES = [
  {
    title: "Made Fresh Daily",
    desc: "Never pre-made, never reheated — ever",
  },
  {
    title: "Premium Ingredients",
    desc: "Finest fish and produce sourced daily",
  },
  {
    title: "Halal Certified",
    desc: "100% ingredients halal verified",
  },
];

const OurStory = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageCurtainRef = useRef(null);
  const imageInnerRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Image reveal ----
      // Transform-based curtain instead of clip-path: stays on the
      // compositor thread instead of forcing a repaint every frame.
      gsap.set(imageCurtainRef.current, { scaleX: 1, transformOrigin: "left" });
      gsap.set(imageInnerRef.current, { scale: 1.08 });
      gsap.set(badgeRef.current, { opacity: 0, scale: 0.85, y: -8 });

      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
        .to(imageCurtainRef.current, {
          scaleX: 0,
          duration: 1.2,
          ease: "power4.inOut",
        })
        .to(
          imageInnerRef.current,
          { scale: 1, duration: 1.2, ease: "power4.inOut" },
          "<"
        )
        .to(
          badgeRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.5"
        );

      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 90%" },
        }
      );

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 95%" },
        }
      );

      // ---- Scroll parallax on the image ----
      const setParallax = gsap.quickTo(imageInnerRef.current, "yPercent", {
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => setParallax(self.progress * 8),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0b0d10]  px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-10 "
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_.9fr] lg:gap-20">

        {/* ================= LEFT — IMAGE + STATS ================= */}
        <div>
          <div
            ref={imageWrapRef}
            className="relative aspect-[4/5] overflow-hidden bg-[#12151a] sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <div
              ref={imageInnerRef}
              className="absolute inset-0"
              style={{ willChange: "transform" }}
            >
              <img
                src="/ourStory.png"
                alt="The story behind Roolza Sushi"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Reveal curtain */}
            <div
              ref={imageCurtainRef}
              className="pointer-events-none absolute inset-0 z-20 bg-[#0b0d10]"
              style={{ willChange: "transform" }}
            />

            {/* Legibility gradient */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Established badge — same rounded-pill/red language as your buttons */}
            <div
              ref={badgeRef}
              className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full bg-[#ff3b30] px-4 py-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-black/30"
            >
              Est. 2024
            </div>
          </div>

          {/* Stats bar */}
          <div
            ref={statsRef}
            className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-1.5 font-grotesk text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
                  {stat.value}
                  {stat.withStar && (
                    <Star size={16} className="mb-1 fill-[#ff3b30] text-[#ff3b30]" />
                  )}
                </div>
                <span className="mt-1 block font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT — STORY ================= */}
        <div ref={contentRef} className="lg:pl-4 xl:pl-8">

          <span className="font-montserrat text-[10px] font-bold uppercase tracking-[.32em] text-[#ff3b30]">
            Our Story
          </span>

          <h2 className="font-grotesk mt-5 text-[14vw] font-bold leading-[.84] tracking-[-.06em] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px]">
            This Is
            <br />
            How We
            <br />
            <span className="text-[#ff3b30]">Roll.</span>
          </h2>

          <div className="mt-9 max-w-xl space-y-5 font-montserrat text-sm leading-7 text-white/50 sm:text-[15px]">
            <p>
              Roolza started with a simple idea — sushi should feel
              exciting, honest, and unforgettable.
            </p>

            <p>
              We bring together traditional Japanese techniques,
              premium ingredients, and our own modern perspective to
              create plates that respect where sushi comes from while
              making every experience distinctly Roolza.
            </p>
          </div>

          <div className="mt-8 h-px w-full bg-white/10" />

          <ul className="mt-8 space-y-6">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3.5">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff3b30]" />
                <div>
                  <h3 className="font-montserrat text-sm font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 font-montserrat text-[13px] text-white/40">
                    {feature.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff3b30] px-7 py-4 font-montserrat text-xs font-bold uppercase tracking-[.1em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5147]"
            >
              Discover Our Story
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={13} />
              </span>
            </Link>

            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 font-montserrat text-xs font-semibold uppercase tracking-[.15em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              <ShoppingBag size={14} />
              Shop Best Sellers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
