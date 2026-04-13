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
import { useTranslations } from "next-intl";
import logo from "./app/logo1.png";
import Image from "next/image";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: t("links.aboutUs"), href: "/about" },
      { label: t("links.careers"), href: "/careers" },
      { label: t("links.press"), href: "/press" },
      { label: t("links.blog"), href: "/blog" },
    ],
    support: [
      { label: t("links.helpCenter"), href: "/help" },
      { label: t("links.contactUs"), href: "/contact" },
      { label: t("links.faqs"), href: "/faq" },
      { label: t("links.cancellation"), href: "/cancellation" },
    ],
    legal: [
      { label: t("links.terms"), href: "/terms" },
      { label: t("links.privacy"), href: "/privacy" },
      { label: t("links.cookies"), href: "/cookies" },
      { label: t("links.refund"), href: "/refund" },
    ],
    services: [
      { label: t("links.flights"), href: "/flights" },
      { label: t("links.hotels"), href: "/hotels" },
      { label: t("links.holidays"), href: "/holidays" },
      { label: t("links.visa"), href: "/visa" },
    ],
  };

  return (
    <footer className="bg-brand-primary text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-12 w-auto items-center justify-center">
                <Image src={logo} alt="Avia Travel Club Logo" className="h-10 w-auto object-contain" />
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/80">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-accent" />
                <span className="text-white/80">{t("contact.phone")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-accent" />
                <span className="text-white/80">{t("contact.email")}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-accent mt-0.5" />
                <span className="text-white/80">{t("contact.address")}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("sections.company")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
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
              {t("sections.support")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
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
              {t("sections.services")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white">{t("followUs")}</span>
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
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-brand-primary hover:text-white"
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
                placeholder={t("emailPlaceholder")}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
              />
              <button className="rounded-lg bg-brand-accent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-primary">
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-white/60">
              © {currentYear} Avia Travel Club. {t("allRightsReserved")}
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 transition-colors hover:text-white"
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
