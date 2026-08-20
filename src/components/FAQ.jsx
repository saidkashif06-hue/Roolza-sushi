import React, { useLayoutEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "Do you deliver outside Karachi & Islamabad?",
    answer:
      "Right now we deliver across Karachi and Islamabad only. We're working on expanding to more cities soon — follow our socials for updates.",
  },
  {
    question: "Is everything on the menu Halal certified?",
    answer:
      "Yes, 100% of our ingredients are Halal certified. Quality and trust are at the core of everything we prepare.",
  },
  {
    question: "How long does delivery usually take?",
    answer:
      "Most orders arrive within 30–45 minutes depending on your location and order volume. You'll get real-time updates once your order is confirmed.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, cash on delivery is available on every order, along with online payment options at checkout.",
  },
  {
    question: "Can I customize my sushi order?",
    answer:
      "Absolutely. You can adjust spice levels, swap ingredients, or request modifications in the special instructions field when placing your order.",
  },
  {
    question: "Do you cater for events or bulk orders?",
    answer:
      "Yes, we offer catering for parties, offices, and events. Reach out through our contact page and our team will help put together a package for you.",
  },
];

const FaqItem = ({ item, isOpen, onClick }) => (
  <div className="border-b border-white/10">
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-[#ff3b30] sm:py-7"
    >
      <span className="font-grotesk text-lg font-semibold tracking-[-0.01em] text-white sm:text-xl">
        {item.question}
      </span>

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 ${
          isOpen ? "rotate-45 border-[#ff3b30] bg-[#ff3b30]" : ""
        }`}
      >
        <Plus size={16} />
      </span>
    </button>

    {/*
      CSS-only accordion via grid-template-rows (0fr -> 1fr). This animates
      smoothly on a property the browser can interpolate without JS driving
      it every frame, and without measuring scrollHeight on open/close.
    */}
    <div
      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <p className="max-w-2xl pb-7 font-montserrat text-sm leading-7 text-white/45 sm:pb-8 sm:text-[15px]">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
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
      className="overflow-hidden bg-[#0b0d10] px-6 py-24 text-white sm:px-10 lg:px-14 lg:py-36 xl:px-20"
    >
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center">
          <span className="font-montserrat text-[10px] font-bold uppercase tracking-[.32em] text-[#ff3b30]">
            Got Questions?
          </span>

          <h2 className="font-grotesk mt-5 text-[11vw] font-bold leading-[.9] tracking-[-.05em] sm:text-5xl md:text-6xl lg:text-[58px]">
            Frequently Asked
            <br />
            <span className="text-[#ff3b30]">Questions.</span>
          </h2>

          <p className="mt-6 max-w-lg font-montserrat text-sm leading-7 text-white/45 sm:text-base">
            Everything you need to know before your first order. Can't
            find what you're looking for? Reach out and we'll help.
          </p>
        </div>

        {/* Accordion */}
        <div ref={listRef} className="mt-14 border-t border-white/10 lg:mt-16">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
