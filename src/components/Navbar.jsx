import React, { useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ShoppingBag, Menu, X, Plus, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ANNOUNCEMENTS = [
  "CASH ON DELIVERY",
  "DELIVERING IN KARACHI & ISLAMABAD",
  "FAST DELIVERY",
  "CATERING AVAILABLE",
  "100% HALAL CERTIFIED",
  "FRESH SUSHI DAILY",
];

const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [mobileMenuAccordionOpen, setMobileMenuAccordionOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const logoWrapRef = useRef(null);
  const underlineRef = useRef(null);
  const navRef = useRef(null);
  const ctaRef = useRef(null);
  const menuDropdownRef = useRef(null);

  const menuCategories = [
    { name: "Soups", path: "/soups" },
    { name: "Sushi", path: "/sushi" },
    { name: "Beverages", path: "/beverages" },
    { name: "Desserts", path: "/desserts" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", isDropdown: true, children: menuCategories },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isMenuActive = () =>
    location.pathname.startsWith("/menu") ||
    menuCategories.some((c) => location.pathname.startsWith(c.path));

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileMenuAccordionOpen(false);
  };

  // Called on any Link click so dropdowns/mobile menu close after navigating
  const handleNavClick = () => {
    closeMobileMenu();
    setMenuDropdownOpen(false);
  };

  // Close the desktop Menu dropdown on outside click
  useLayoutEffect(() => {
    const handleClickOutside = (e) => {
      if (menuDropdownRef.current && !menuDropdownRef.current.contains(e.target)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Entrance ----
      gsap.set(logoWrapRef.current, { opacity: 0, y: -14, scale: 0.9 });
      gsap.set(navRef.current?.children || [], { opacity: 0, y: -10 });
      gsap.set(ctaRef.current?.children || [], { opacity: 0, y: -10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(logoWrapRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.6)",
      })
        .to(
          navRef.current?.children || [],
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
          "-=0.5"
        )
        .to(
          ctaRef.current?.children || [],
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        );

      gsap.set(underlineRef.current, { scaleX: 0 });

      const setLogoScale = gsap.quickTo(logoRef.current, "scale", {
        duration: 0.2,
        ease: "none",
      });
      const setUnderline = gsap.quickTo(underlineRef.current, "scaleX", {
        duration: 0.2,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=180",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;

          if (headerRef.current) {
            headerRef.current.style.backgroundColor = `rgba(9, 26, 46, ${0.92 * p})`;
            headerRef.current.style.backdropFilter = `blur(${16 * p}px)`;
            headerRef.current.style.boxShadow =
              p > 0.05 ? "0 10px 30px -12px rgba(0,0,0,0.45)" : "none";
          }

          setLogoScale(1 - p * 0.14);
          setUnderline(p);
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const MarqueeContent = () => (
    <>
      {ANNOUNCEMENTS.map((text, i) => (
        <span key={i} className="flex shrink-0 items-center gap-8 px-4 py-3">
          <span className="font-montserrat text-[12px] font-semibold uppercase tracking-[0.15em] text-white/50">
            {text}
          </span>
          <Plus size={12} className="shrink-0 text-[#ff3b30]" strokeWidth={3} />
        </span>
      ))}
    </>
  );

  return (
    <header ref={headerRef} className="fixed left-0 top-0 z-50 w-full">

      {/* ================= ANNOUNCEMENT MARQUEE — pure CSS animation ================= */}
      <div className="w-full overflow-hidden border-b  border-white/[0.06] bg-[#050b14] py-2">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
     <div
    className=" w-full bg-gray-950 py-[5px] backdrop-blur-md"
>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="flex h-[76px] items-center justify-between font-montserrat lg:h-[84px]">

            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="relative z-[60] flex shrink-0 items-center gap-2.5"
            >
              <div ref={logoWrapRef} className="relative flex items-center gap-1">
                <img
                  ref={logoRef}
                  src="/Logo1.png"
                  alt=""
                  className="h-8 w-auto origin-left object-contain [filter:brightness(0)_invert(1)] sm:h-9"
                />
                <span className="font-montserrat mt-0.5 text-xl font-bold tracking-tight text-[#ff3b30] sm:text-xl">
                  Roolza
                </span>
                <span
                  ref={underlineRef}
                  className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full bg-[#ff3b30]"
                />
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav ref={navRef} className="hidden  items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                if (link.isDropdown) {
                  const active = isMenuActive();
                  return (
                    <div
                      key={link.name}
                      ref={menuDropdownRef}
                      className="relative"
                      onMouseEnter={() => setMenuDropdownOpen(true)}
                      onMouseLeave={() => setMenuDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setMenuDropdownOpen((prev) => !prev)}
                        aria-haspopup="true"
                        aria-expanded={menuDropdownOpen}
                        className={`relative flex cursor-pointer items-center gap-1 py-2 text-[13px] font-medium transition-all duration-300 ${
                          active ? "text-white" : "text-white/55 hover:text-white"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          size={13}
                          className={`transition-transform duration-300 ${
                            menuDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                        <span
                          className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#ff3b30] transition-all duration-300 ${
                            active ? "w-full opacity-100" : "w-0 opacity-0"
                          }`}
                        />
                      </button>

                      {/* Invisible bridge so the dropdown doesn't close when moving the cursor from the button down to the panel */}
                      <div className="absolute left-1/2 top-full h-3 w-52 -translate-x-1/2" />

                      <div
                        className={`absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#091a2e]/[0.98] shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-250 ${
                          menuDropdownOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="p-2">
                          {link.children.map((child) => {
                            const childActive = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={handleNavClick}
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[13px] transition-all duration-200 ${
                                  childActive
                                    ? "bg-[#ff3b30]/10 font-semibold text-[#ff5a50]"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                              >
                                {child.name}
                                <ArrowRight
                                  size={13}
                                  className={childActive ? "text-[#ff3b30]" : "text-white/30"}
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[13px] font-medium transition-all duration-300 ${
                      active ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#ff3b30] transition-all duration-300 ${
                        active ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              <div ref={ctaRef} className="hidden items-center gap-2.5 sm:flex">
                <Link
                  to="/contact"
                  onClick={handleNavClick}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                >
                  Book a Table
                  <ArrowRight size={13} className="opacity-70" />
                </Link>

                <Link
                  to="/order-now"
                  onClick={handleNavClick}
                  className="group flex items-center gap-2 rounded-full bg-[#ff3b30] px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff5147] hover:shadow-red-900/40"
                >
                  <ShoppingBag size={14} className="transition-transform duration-300 group-hover:scale-110" />
                  Order Now
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={mobileOpen}
                className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:h-11 sm:w-11 lg:hidden"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute left-4 right-4 top-[112px] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#091a2e]/[0.98] shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 sm:left-6 sm:right-6 lg:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav className="p-3">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              const active = isMenuActive();
              return (
                <div key={link.name}>
                  <button
                    type="button"
                    onClick={() => setMobileMenuAccordionOpen((prev) => !prev)}
                    aria-expanded={mobileMenuAccordionOpen}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-all duration-200 ${
                      active
                        ? "bg-[#ff3b30]/10 font-semibold text-[#ff5a50]"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${
                        mobileMenuAccordionOpen ? "rotate-180" : ""
                      } ${active ? "text-[#ff3b30]" : "text-white/30"}`}
                    />
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      mobileMenuAccordionOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden pl-3">
                      {link.children.map((child) => {
                        const childActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={handleNavClick}
                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 ${
                              childActive
                                ? "font-semibold text-[#ff5a50]"
                                : "text-white/50 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {child.name}
                            <ArrowRight
                              size={14}
                              className={childActive ? "text-[#ff3b30]" : "text-white/30"}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-all duration-200 ${
                  active
                    ? "bg-[#ff3b30]/10 font-semibold text-[#ff5a50]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight
                  size={15}
                  className={active ? "text-[#ff3b30]" : "text-white/30"}
                />
              </Link>
            );
          })}

          <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              to="/order-now"
              onClick={handleNavClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff3b30] px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#ff5147]"
            >
              <ShoppingBag size={15} />
              Order Now
            </Link>

            <Link
              to="/contact"
              onClick={handleNavClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
            >
              Book a Table
              <ArrowRight size={15} className="opacity-70" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
