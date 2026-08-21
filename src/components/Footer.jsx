import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa6";

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Contact", path: "/contact" },
];

const MENU_LINKS = [
  { name: "Sushi & Food", path: "/sushi" },
  { name: "Soups", path: "/soups" },
  { name: "Beverages", path: "/beverages" },
  { name: "Desserts", path: "/desserts" },
  { name: "Full Menu", path: "/menu" },
];

const SOCIALS = [
  { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebookF, url: "https://facebook.com", label: "Facebook" },
  { icon: FaTiktok, url: "https://tiktok.com", label: "TikTok" },
  { icon: FaWhatsapp, url: "https://wa.me/920000000000", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-[#050709] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 sm:px-10 lg:px-14 lg:pt-28 xl:px-20">

        <div className="grid gap-14 lg:grid-cols-[1.3fr_.8fr_.8fr_1fr] lg:gap-10">
          {/* ================= BRAND ================= */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/Logo1.png"
                alt=""
                className="h-8 w-auto object-contain [filter:brightness(0)_invert(1)]"
              />
              <span className="font-montserrat text-xl font-bold tracking-tight text-[#ff3b30]">
                Roolza
              </span>
            </Link>

            <p className="mt-6 max-w-xs font-montserrat text-sm leading-7 text-white/40">
              Handcrafted Japanese cuisine, premium ingredients, and a
              dining experience made for those who seek something
              memorable.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-[#ff3b30] hover:bg-[#ff3b30] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="font-montserrat text-[10px] font-bold uppercase tracking-[.25em] text-white/40">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-montserrat text-sm text-white/60 transition-colors duration-300 hover:text-[#ff3b30]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= MENU ================= */}
          <div>
            <h3 className="font-montserrat text-[10px] font-bold uppercase tracking-[.25em] text-white/40">
              Menu
            </h3>
            <ul className="mt-6 space-y-3.5">
              {MENU_LINKS.map((link, i) => (
                <li key={`${link.name}-${i}`}>
                  <Link
                    to={link.path}
                    className="font-montserrat text-sm text-white/60 transition-colors duration-300 hover:text-[#ff3b30]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="font-montserrat text-[10px] font-bold uppercase tracking-[.25em] text-white/40">
              Get In Touch
            </h3>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#ff3b30]" />
                <span className="font-montserrat text-sm leading-6 text-white/60">
                  Karachi &amp; Islamabad, Pakistan
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#ff3b30]" />
                <a
                  href="tel:+920000000000"
                  className="font-montserrat text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  +92 000 0000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#ff3b30]" />
                <a
                  href="mailto:hello@roolza.com"
                  className="font-montserrat text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  hello@roolza.com
                </a>
              </li>
            </ul>

            <Link
              to="/order-now"
              className="group mt-7 inline-flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[.15em] text-white transition-colors duration-300 hover:text-[#ff3b30]"
            >
              Order Now
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row lg:mt-20">
          <p className="font-montserrat text-[11px] text-white/30">
            © {new Date().getFullYear()} Roolza Sushi. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="font-montserrat text-[11px] text-white/30 transition-colors duration-300 hover:text-white/60"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-montserrat text-[11px] text-white/30 transition-colors duration-300 hover:text-white/60"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;