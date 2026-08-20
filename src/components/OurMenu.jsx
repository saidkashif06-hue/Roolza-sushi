import React, { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const foodItems = [
  { name: "Sashimi & Nigiri Selection", category: "SASHIMI · NIGIRI", image: "/menu/Shashmi and Nigiri.png" },
  { name: "Signature Sushi Platter", category: "SIGNATURE", image: "/menu/shushi platter.png" },
  { name: "Special Maki Rolls", category: "MAKI · ROLLS", image: "/menu/specialMakiRoll.png" },
  { name: "Japanese Beef Rice", category: "BEEF · RICE", image: "/menu/BeefRice.png" },
  { name: "Fish & Prawn Selection", category: "SEAFOOD", image: "/menu/FishandPrawn.png" },
  { name: "Classic Maki Rolls", category: "MAKI · ROLLS", image: "/menu/makiRool.png" },
];

const beverages = [
  { name: "Fresh Orange", category: "FRESH JUICE", image: "/Bevrages/orange.png" },
  { name: "Raspberry Fizz", category: "SIGNATURE DRINK", image: "/Bevrages/Rasberryy.png" },
  { name: "Banana Milkshake", category: "MILKSHAKE", image: "/Bevrages/bananaMilkshake.png" },
  { name: "Mango Fizz", category: "FRESH COOLER", image: "/Bevrages/lemonMint.png" },
  { name: "Classic Milkshake", category: "MILKSHAKE", image: "/Bevrages/Milkshake.png" },
  { name: "Mint Margarita", category: "SIGNATURE DRINK", image: "/Bevrages/Mintmargerita.png" },
];

const MenuCard = ({ item, index }) => (
  <div className="menu-card group relative block h-[420px] w-[350px] shrink-0 snap-start overflow-hidden bg-[#12151a] sm:h-[400px] sm:w-[340px]">
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
    />

    {/*
      Stronger, taller gradient so the text always sits on a genuinely dark
      area regardless of what's in the photo behind it (a light-colored
      plate, steam, garnish, etc. could otherwise wash the old lighter
      gradient out and make the name hard to read).
    */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

    {/*
      Extra solid-dark panel directly behind the text block only. This is
      what actually guarantees legibility — the gradient alone still lets
      busy/bright food photography show through right where the name sits.
    */}
    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 to-transparent" />

    <span className="absolute left-5 top-5 font-montserrat text-[10px] font-semibold tracking-[0.25em] text-white/60">
      0{index + 1}
    </span>

    <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-sm transition-all group-hover:border-[#ff3b30] group-hover:bg-[#ff3b30]">
      <ArrowRight size={15} className="-rotate-45 transition-transform group-hover:rotate-0" />
    </span>

    <div className="absolute bottom-5 left-5 right-5">
      <span
        className="font-montserrat text-[9px] font-bold uppercase tracking-[0.25em] text-[#ff3b30]"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
      >
        {item.category}
      </span>
      <h3
        className="font-grotesk mt-2 text-2xl font-bold leading-none tracking-[-0.03em] text-white sm:text-3xl"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
      >
        {item.name}
      </h3>
    </div>
  </div>
);

const CtaCard = ({ label = "Explore Full Menu" }) => (
  <div
    
    className="group relative flex h-[450px] w-[300px] shrink-0 snap-start flex-col items-start justify-between overflow-hidden bg-[#ff3b30] px-7 py-7 transition-colors duration-500 hover:bg-[#ff5147] sm:h-[400px] sm:w-[340px]"
  >
    <UtensilsCrossed size={28} className="text-white/80" />

    <div>
      <h3 className="font-grotesk text-3xl font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-4xl">
        {label}
      </h3>
      <span className="mt-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight size={18} />
      </span>
    </div>
  </div>
);

/**
 * A horizontally-scrolling rail. On desktop (lg+) the section pins and the
 * rail is driven by vertical scroll via ScrollTrigger. On smaller screens
 * it falls back to a native swipeable/snap horizontal scroller.
 */
const HorizontalRail = ({ pinRef, trackRef, children }) => (
  <div ref={pinRef} className="relative">
    <div
      ref={trackRef}
      className="flex gap-5 overflow-x-auto lg:overflow-visible px-6 pb-4 lg:px-0 lg:pb-0 snap-x snap-mandatory lg:snap-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  </div>
);

const Menu = () => {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const beverageTitleRef = useRef(null);
const navigate = useNavigate()
  const foodPinRef = useRef(null);
  const foodTrackRef = useRef(null);
  const bevPinRef = useRef(null);
  const bevTrackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (target, trigger, stagger = 0.1) => {
        gsap.fromTo(
          target.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: "power3.out",
            scrollTrigger: { trigger: trigger.current, start: "top 80%" },
          }
        );
      };

      reveal(introRef, introRef, 0.12);
      reveal(beverageTitleRef, beverageTitleRef, 0.12);

      // ---- Desktop-only horizontal scroll-pin rails ----
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const setupRail = (pinEl, trackEl) => {
          if (!pinEl || !trackEl) return;

          // Measure ONCE up front instead of on every scroll tick.
          // Reading scrollWidth/offsetWidth forces the browser to do a
          // synchronous layout recalculation ("forced reflow") — doing that
          // on every single onUpdate call (which fires constantly while
          // scrubbing) was the main cause of scroll lag, especially with
          // two of these rails on the page.
          let scrollDistance = trackEl.scrollWidth - pinEl.offsetWidth;

          // Use GSAP's quickSetter instead of gsap.set() in onUpdate.
          // quickSetter skips tween-creation overhead (no easing, no object
          // allocation) and just writes the value directly — the fastest
          // way to apply a value every frame.
          const setX = gsap.quickSetter(trackEl, "x", "px");

          const st = ScrollTrigger.create({
            trigger: pinEl,
            start: "top 24%",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Re-measure only when things actually change size
              // (on load and on resize), not on every scroll frame.
              scrollDistance = trackEl.scrollWidth - pinEl.offsetWidth;
            },
            onUpdate: (self) => {
              setX(-self.progress * scrollDistance);
            },
          });

          return st;
        };

        const foodST = setupRail(foodPinRef.current, foodTrackRef.current);
        const bevST = setupRail(bevPinRef.current, bevTrackRef.current);

        return () => {
          foodST?.kill();
          bevST?.kill();
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0b0d10] py-5 text-white lg:py-32"
    >
      {/* ============ FOOD ============ */}
      <div
        ref={introRef}
        className="mx-auto mb-16 flex max-w-8xl flex-col px-6 sm:px-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:px-14 xl:px-20"
      >
        <div>
          <span className="font-montserrat text-[9px] font-bold uppercase tracking-[0.32em] text-gray-300">
            The Roolza Menu
          </span>
          <h2 className="font-grotesk mt-5 text-[13vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[80px]">
            Crafted for
            <br />
            <span className="text-[#ff3b30]">Every Craving.</span>
          </h2>
        </div>

        <p className="mt-8 max-w-sm font-montserrat text-sm leading-7 text-white/45 lg:mb-1 lg:mt-0">
          From delicate sashimi and signature rolls to comforting Japanese
          favorites, every plate is prepared with fresh ingredients and a
          refined touch. Scroll to browse.
        </p>
      </div>

      <HorizontalRail pinRef={foodPinRef} trackRef={foodTrackRef}>
        {foodItems.map((item, i) => (
          <MenuCard key={item.name} item={item} index={i} />
        ))}
       <div className="hover:cursor-pointer" onClick={()=>navigate('/menu/sushi')}>
         <CtaCard  label="Explore Full Menu" />
       </div>
      </HorizontalRail>

      {/* ============ BEVERAGES ============ */}
      <div
        ref={beverageTitleRef}
        className="mx-auto mb-14 mt-32 flex max-w-7xl flex-col px-6 sm:px-10 md:flex-row md:items-end md:justify-between lg:px-14 xl:px-20"
      >
        <div>
          <span className="font-montserrat text-[10px] font-bold uppercase tracking-[.32em] text-gray-300 ">
            Freshly Poured
          </span>
          <h2 className="font-grotesk mt-5 text-[13vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl lg:text-[78px]">
            Drinks &
            <br />
            <span className="text-[#ff3b30]">Refreshments.</span>
          </h2>
        </div>

        <Link
          to="/menu"
          className="group mt-8 inline-flex items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-[.15em] text-white/60 hover:text-white md:mb-2 md:mt-0"
        >
          View Full Menu
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-[#ff3b30] group-hover:bg-[#ff3b30]">
            <ArrowRight size={14} />
          </span>
        </Link>
      </div>

      <HorizontalRail pinRef={bevPinRef} trackRef={bevTrackRef}>
        {beverages.map((item, i) => (
          <MenuCard key={item.name} item={item} index={i} />
        ))}
        <div className="hover:cursor-pointer" onClick={()=>navigate('/menu/beverages')}>
          <CtaCard label="View Full Menu" />
        </div>
      </HorizontalRail>
    </section>
  );
};

export default Menu;
