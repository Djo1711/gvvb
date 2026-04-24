import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Inscription",
  description: "Contactez le GVVB ou inscrivez-vous au club.",
};

export default function Contact() {
  return (
    <>
      <PageHeader
        label="Rejoignez-nous"
        title="Contact & Inscription"
        description="Une question ? Envie de nous rejoindre ? Écrivez-nous."
      />
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 italic">Formulaire de contact à venir.</p>
      </section>
    </>
  );
}
