import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const counterRef = useRef(null);
  const topTextRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      // Initial state
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 25,
        scale: 0.92,
      });

      gsap.set(topTextRef.current, {
        opacity: 0,
        y: -15,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(counterRef.current, {
        opacity: 0,
      });

      // Small top text
      tl.to(topTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })

        // Logo reveal
        .to(
          logoRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.2"
        )

        // Counter appears
        .to(
          counterRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          "-=0.5"
        )

        // Loading line
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut",

            onUpdate: function () {
              counter.value = Math.round(this.progress() * 100);

              if (counterRef.current) {
                counterRef.current.textContent = `${counter.value
                  .toString()
                  .padStart(2, "0")}%`;
              }
            },
          },
          "-=0.2"
        )

        // Small pause
        .to({}, { duration: 0.25 })

        // Move logo slightly up
        .to(logoRef.current, {
          y: -10,
          scale: 0.96,
          duration: 0.4,
          ease: "power2.inOut",
        })

        // Reveal website
        .to(
          loaderRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050b14] text-white"
    >
      {/* Top label */}
      <div
        ref={topTextRef}
        className="absolute top-10 font-montserrat text-[9px] font-semibold uppercase tracking-[0.35em] text-white/40"
      >
        Japanese Dining Experience
      </div>

      {/* Center */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-2">
          <img
            src="/Logo1.png"
            alt="Roolza"
            className="h-10 w-auto object-contain [filter:brightness(0)_invert(1)] sm:h-12"
          />

          <span className="font-montserrat text-3xl font-bold tracking-tight text-[#ff3b30] sm:text-4xl">
            Roolza
          </span>
        </div>

        {/* Loading line */}
        <div className="mt-8 w-[180px] sm:w-[220px]">
          <div className="h-[1px] w-full bg-white/10">
            <div
              ref={lineRef}
              className="h-full w-full bg-[#ff3b30]"
            />
          </div>

          {/* Counter */}
          <div className="mt-3 flex justify-end">
            <span
              ref={counterRef}
              className="font-montserrat text-[9px] font-semibold tracking-[0.2em] text-white/40"
            >
              00%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-10 font-montserrat text-[8px] font-medium uppercase tracking-[0.3em] text-white/25">
        Fresh · Refined · Japanese
      </div>

      {/* Red accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ff3b30]" />
    </div>
  );
};

export default Preloader;