import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Cancellation Policy", href: "/cancellation" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
  services: [
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
    { label: "Holiday Packages", href: "/holidays" },
    { label: "Visa Services", href: "/visa" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600">
                <span className="text-xl font-bold text-white">SE</span>
              </div>
              <span className="text-xl font-bold text-white">
                Suvidha Escapes
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed">
              Your trusted travel partner for unforgettable journeys. We offer
              the best deals on flights, hotels, and holiday packages across
              India and around the world.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>support@suvidhaescapes.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span>
                  123 Travel Street, Mumbai, Maharashtra 400001, India
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-primary-600 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex w-full max-w-md gap-2 md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <button className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-gray-400">
              © {currentYear} Suvidha Escapes. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 transition-colors hover:text-primary-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
