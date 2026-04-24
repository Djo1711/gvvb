import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegales() {
  return (
    <>
      <PageHeader label="Légal" title="Mentions légales" />
      <section className="max-w-3xl mx-auto px-4 py-16 prose prose-sm">
        <h2>Éditeur du site</h2>
        <p>
          <strong>Association Garches Vaucresson Volley-Ball (GVVB)</strong><br />
          Adresse : à compléter<br />
          Email : à compléter
        </p>

        <h2>Hébergement</h2>
        <p>
          Site hébergé par <strong>Vercel Inc.</strong><br />
          440 N Barranca Ave #4133, Covina, CA 91723, USA
        </p>

        <h2>Responsable de la publication</h2>
        <p>À compléter (nom du président ou responsable communication du club).</p>

        <h2>Données personnelles (RGPD)</h2>
        <p>
          Les données collectées via le formulaire de contact sont utilisées uniquement
          pour répondre à vos demandes et ne sont pas transmises à des tiers.
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
          et de suppression de vos données. Pour exercer ce droit, contactez-nous
          par email.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Le contenu de ce site (textes, images, logo) est la propriété du GVVB.
          Toute reproduction sans autorisation est interdite.
        </p>
      </section>
    </>
  );
}
