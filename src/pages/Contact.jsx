import React, { useLayoutEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Custom line-art icons — a small set of sushi motifs drawn as
   single-stroke SVGs so they sit visually alongside lucide-react
   icons without looking like a mismatched icon pack. These are
   the page's signature element: quiet, repeated, never louder
   than the content.
   ============================================================ */

const NigiriIcon = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M6 30c0-7 8-11 18-11s18 4 18 11-8 9-18 9-18-2-18-9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9 22c2-7 8-13 15-13s13 6 15 13"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M13 21c1.5-5 5.5-9 11-9s9.5 4 11 9"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.55"
    />
  </svg>
);

const ChopsticksIcon = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <path
      d="M10 8 38 40"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M18 8 46 40"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SoySplashIcon = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className}>
    <ellipse
      cx="24"
      cy="30"
      rx="16"
      ry="8"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M24 6c3 6 5 10 5 13.5a5 5 0 1 1-10 0C19 16 21 12 24 6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

/* ============================================================ */

const contactDetails = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 300 1234567",
    href: "tel:+923001234567",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@roolza.com",
    href: "mailto:hello@roolza.com",
  },
  {
    icon: MapPin,
    label: "Find Us",
    value: "Karachi & Islamabad",
    href: null,
  },
  {
    icon: Clock,
    label: "Open Daily",
    value: "12:00 PM – 12:00 AM",
    href: null,
  },
];

const reasons = ["General Inquiry", "Reservation", "Catering", "Feedback"];

const Contact = () => {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    reason: reasons[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 82%" },
        }
      );

      gsap.fromTo(
        infoRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your actual submit endpoint / email service.
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0b0d10] px-6 py-24 text-white sm:px-10 lg:px-14 xl:px-20"
    >
      {/* ambient background line-art, very low opacity, purely atmospheric */}
      <NigiriIcon className="pointer-events-none absolute -right-10 top-10 h-64 w-64 text-white/[0.03] sm:h-80 sm:w-80" />
      <ChopsticksIcon className="pointer-events-none absolute -left-6 bottom-10 h-48 w-48 text-white/[0.03]" />

      <div ref={introRef} className="relative mx-auto mb-16 max-w-3xl text-center">
        <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.32em] text-gray-300">
          Get In Touch
        </span>
        <h2 className="font-grotesk mt-5 text-[13vw] font-bold leading-[.88] tracking-[-.055em] sm:text-6xl md:text-7xl">
          Let's Talk
          <br />
          <span className="text-[#ff3b30]">Over Sushi.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md font-montserrat text-sm leading-7 text-white/45">
          Questions, reservations, or catering for your next event —
          drop us a line and we'll get back to you within the day.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ============ CONTACT INFO ============ */}
        <div ref={infoRef} className="flex flex-col gap-4">
          {contactDetails.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-[#ff3b30]/40 hover:bg-white/[0.04]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/70 transition-all duration-300 group-hover:border-[#ff3b30] group-hover:text-[#ff3b30]">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {label}
                  </p>
                  <p className="font-grotesk mt-0.5 text-base font-semibold text-white">
                    {value}
                  </p>
                </div>
              </div>
            );

            return href ? (
              <a key={label} href={href}>
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}

          {/* signature accent card */}
          <div className="relative mt-2 flex flex-1 flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#12151a] p-6">
            <SoySplashIcon className="absolute right-4 top-4 h-10 w-10 text-[#ff3b30]/70" />
            <p className="font-grotesk max-w-[220px] text-xl font-bold leading-tight tracking-[-0.02em] text-white">
              Freshly rolled, quickly delivered.
            </p>
            <p className="font-montserrat mt-2 text-xs leading-relaxed text-white/40">
              Cash on delivery available across Karachi & Islamabad.
            </p>
          </div>
        </div>

        {/* ============ FORM ============ */}
        <div
          ref={formRef}
          className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
        >
          <ChopsticksIcon className="pointer-events-none absolute -right-3 -top-3 h-14 w-14 rotate-12 text-[#ff3b30]/50" />

          {submitted ? (
            <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
              <CheckCircle2 size={44} className="text-[#ff3b30]" />
              <h3 className="font-grotesk mt-5 text-2xl font-bold text-white">
                Message Sent
              </h3>
              <p className="font-montserrat mt-2 max-w-xs text-sm leading-relaxed text-white/45">
                Thanks for reaching out — our team will get back to you
                shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormState({
                    name: "",
                    email: "",
                    phone: "",
                    reason: reasons[0],
                    message: "",
                  });
                }}
                className="font-montserrat mt-8 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Ali Khan"
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                />
              </div>

              <Field
                label="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

              <div>
                <label className="font-montserrat mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Reason
                </label>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, reason: r }))
                      }
                      className={`font-montserrat rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                        formState.reason === r
                          ? "border-[#ff3b30] bg-[#ff3b30]/10 text-[#ff5a50]"
                          : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-montserrat mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="font-montserrat w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#ff3b30]/60 focus:bg-black/30"
                />
              </div>

              <button
                type="submit"
                className="group mt-2 flex items-center justify-center gap-2 rounded-full bg-[#ff3b30] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff5147] hover:shadow-red-900/40"
              >
                Send Message
                <Send
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", value, onChange, placeholder, required }) => (
  <div>
    <label className="font-montserrat mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="font-montserrat w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#ff3b30]/60 focus:bg-black/30"
    />
  </div>
);

export default Contact;
