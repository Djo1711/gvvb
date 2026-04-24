import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gvvb-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image src="/logo-gvvb.png" alt="Logo GVVB" width={36} height={36} className="h-9 w-auto" />
            <span className="font-heading text-gvvb-red font-bold text-lg">GVVB</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Garches Vaucresson Volley-Ball<br />
            Club affilié à la Fédération Française de Volley-Ball
          </p>
          <div className="flex gap-3 mt-1">
            <a
              href="https://instagram.com/volley_gvvb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
              aria-label="Instagram GVVB"
            >
              Instagram
            </a>
            <span className="text-gray-600">·</span>
            <a
              href="https://facebook.com/gvvb.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
              aria-label="Facebook GVVB"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/le-club", label: "Le Club" },
              { href: "/equipes", label: "Équipes" },
              { href: "/entrainements", label: "Entraînements & Horaires" },
              { href: "/calendrier", label: "Calendrier & Résultats" },
              { href: "/galerie", label: "Galerie photos" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-gray-400 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xs uppercase tracking-widest text-gray-400 mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Formulaire de contact
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Inscription au club
              </Link>
            </li>
            <li className="pt-2">
              <span className="block font-heading text-xs uppercase tracking-widest text-gray-500 mb-1">
                Gymnases
              </span>
              <span>Yves du Manoir — Garches</span><br />
              <span>Yves Bodin — Vaucresson</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>© {year} Garches Vaucresson Volley-Ball</span>
          <div className="flex items-center gap-3">
            <span className="uppercase tracking-widest">Partenaire</span>
            <a
              href="https://www.librairie-lecriture.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-90 transition-opacity"
              aria-label="Librairie L'Écriture"
            >
              <Image
                src="/sponsors/logo-lecriture.jpg"
                alt="Librairie L'Écriture"
                width={48}
                height={48}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </a>
          </div>
          <Link href="/mentions-legales" className="hover:text-gray-300 transition-colors">
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
