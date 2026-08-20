import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageCurtainRef = useRef(null); // NEW: replaces clip-path reveal
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Entrance ----
      // Transform-based reveal instead of clip-path: cheap, compositor-only.
      // A "curtain" div slides away (scaleX from 1 -> 0, transform-origin: right)
      // to reveal the image underneath instead of animating clip-path on the wrapper.
      gsap.set(imageCurtainRef.current, { scaleX: 1, transformOrigin: "right" });
      gsap.set(labelRef.current, { opacity: 0, x: 12 });
      gsap.set(
        [eyebrowRef.current, headingRef.current, paraRef.current, buttonsRef.current],
        { opacity: 0, y: 26 }
      );

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(imageCurtainRef.current, {
        scaleX: 0,
        duration: 1.3,
        ease: "power4.inOut",
        onComplete: () => {
          // Drop will-change once the animation settles so the browser
          // doesn't keep an unnecessary layer alive.
          gsap.set(imageCurtainRef.current, { willChange: "auto" });
        },
      })
        .to(labelRef.current, { opacity: 1, x: 0, duration: 0.6 }, "-=0.5")
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.9")
        .to(headingRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.45")
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45");

      // ---- Scroll parallax on the image only ----
      // Skip parallax on small/touch screens: barely visible there,
      // and scrub-driven paints are the most expensive frames on mobile.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen  overflow-hidden bg-[#0b0d10] text-white"
    >
      <div className="relative grid min-h-screen lg:grid-cols-[1fr_1.05fr]">

        {/* ================= LEFT — CONTENT ================= */}
        <div className="relative z-10 order-1 flex flex-col justify-center px-6 pb-14 pt-32 sm:px-10 lg:px-14 lg:pt-40 xl:px-20">

          <span
            ref={eyebrowRef}
            className="font-montserrat text-[11px] font-bold uppercase tracking-[0.3em] text-[#ff3b30]"
          >
            Premium Japanese Sushi
          </span>

          <h1
            ref={headingRef}
            className="font-grotesk mt-5 text-[15vw] font-bold leading-[0.9] tracking-[-0.045em] sm:text-6xl lg:text-[64px] xl:text-[74px]"
          >
            Fresh Sushi.
            <br />
            Made
            <span className="relative mx-3 inline-block">
              Different
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 7 C 50 2, 150 2, 198 7"
                  stroke="#ff3b30"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p
            ref={paraRef}
            className="mt-12 max-w-md text-sm leading-7 text-white/50 sm:text-base"
          >
            Welcome to <span className="font-semibold text-white">Roolza Sushi</span>.
            Handcrafted Japanese cuisine, premium ingredients, and a dining room crafted for those who seek
            refined flavors, fresh ingredients, and memorable experiences.
          </p>

          <div ref={buttonsRef} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-[#ff3b30] px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5147]"
            >
              Explore Our Menu
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors duration-300 hover:text-white"
            >
              Discover Roolza
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ================= RIGHT — FULL-BLEED IMAGE ================= */}
        <div
          ref={imageWrapRef}
          className="relative order-2 h-[55vh] overflow-hidden sm:h-[65vh] lg:h-auto"
        >
          <div
            ref={imageRef}
            className="absolute inset-0 -top-10 lg:-top-16"
            style={{ willChange: "transform" }}
          >
            {/*
              Priority-loaded image (this is the LCP element).
              - fetchpriority="high" + loading="eager" tell the browser to
                fetch this immediately, ahead of other assets.
              - width/height reserve the aspect ratio so there's no layout shift
                — adjust these two numbers to your actual image's real dimensions.
              - NOTE: no srcSet here on purpose. If you later generate resized
                .webp variants (e.g. HeroImg-800.webp, HeroImg-1600.webp,
                HeroImg-2400.webp) and add srcSet back, the browser will ONLY
                use those srcSet files and will NOT fall back to src if any
                are missing/404 — so only add srcSet once those files actually
                exist on your server.
            */}
            <img
              src="/HeroImg.png"
              width="1600"
              height="1200"
              fetchpriority="high"
              loading="eager"
              decoding="async"
              alt="Roolza Sushi — handcrafted platter"
              className="h-full w-full object-cover"
            />
          </div>

          {/*
            Curtain reveal (replaces the old clip-path animation on imageWrapRef).
            Sits above the image, slides out via scaleX — stays on the
            compositor thread instead of forcing repaints every frame.
          */}
          <div
            ref={imageCurtainRef}
            className="pointer-events-none absolute inset-0 z-20 bg-[#0b0d10]"
            style={{ willChange: "transform" }}
          />

          {/*
            Grain texture — much cheaper than before:
            - mix-blend-mode removed (blend modes force extra compositing passes
              on full-screen elements every paint, not just during animation).
            - Lower opacity flat noise achieves a near-identical editorial look
              without the live feTurbulence recompute cost.
            - Best option long-term: replace this SVG data-URI with a small
              pre-rendered static noise PNG/WebP tile (e.g. /noise-tile.webp)
              set to repeat — same look, effectively free at runtime.
          */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Blend into background where the image meets the text column */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-l from-transparent to-[#0b0d10] lg:w-40" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#0b0d10] to-transparent lg:hidden" />

          {/* Signature: rotated vertical label along the image edge */}
          <div
            ref={labelRef}
            className="pointer-events-none absolute bottom-8 right-4 z-10 hidden origin-bottom-right rotate-90 font-montserrat text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60 lg:block"
          >
            Handcrafted &nbsp;—&nbsp; Since 2024
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
