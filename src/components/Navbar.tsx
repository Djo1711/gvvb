"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/le-club", label: "Le Club" },
  { href: "/equipes", label: "Équipes" },
  { href: "/entrainements", label: "Entraînements" },
  { href: "/calendrier", label: "Calendrier" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gvvb-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo-gvvb.png"
            alt="Logo GVVB"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-heading font-bold text-lg leading-none hidden sm:block">
            <span className="text-gvvb-red">GVVB</span>
            <span className="block text-xs font-normal text-gray-300 tracking-wide">
              Garches Vaucresson VB
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`font-heading text-sm uppercase tracking-wide px-3 py-2 rounded transition-colors ${
                    active
                      ? "text-gvvb-red"
                      : "text-gray-200 hover:text-white hover:bg-gvvb-navy-light"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center bg-gvvb-red text-white font-heading text-sm uppercase tracking-wider px-4 py-2 hover:bg-gvvb-red-dark transition-colors"
        >
          Nous rejoindre
        </Link>

        <button
          className="md:hidden p-2 rounded hover:bg-gvvb-navy-light transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white my-1.5 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-gvvb-navy-dark border-t border-white/10">
          <ul className="flex flex-col px-4 py-3 gap-1">
            {links.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block font-heading text-sm uppercase tracking-wide py-2.5 px-3 rounded transition-colors ${
                      active ? "text-gvvb-red bg-gvvb-navy-light" : "text-gray-200 hover:text-white hover:bg-gvvb-navy-light"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 pt-2 border-t border-white/10">
              <Link
                href="/contact"
                className="block bg-gvvb-red text-white font-heading text-sm uppercase tracking-wider px-4 py-2.5 text-center hover:bg-gvvb-red-dark transition-colors"
                onClick={() => setOpen(false)}
              >
                Nous rejoindre
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
