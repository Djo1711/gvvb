/**
 * Données de référence du club, issues du dossier d'inscription officiel.
 *
 * Toutes les pages lisent ce module : pour préparer une nouvelle saison, il
 * suffit de mettre à jour ce fichier (et de déposer le nouveau PDF dans
 * `public/docs/`). Voir DOCUMENTATION.md § « Changer de saison ».
 */

/** Saison en cours côté club : inscriptions, tarifs, dossier. */
export const SAISON_CLUB = "2026-2027";

/**
 * Saison utilisée pour la FFVB (scraping des résultats et liens externes).
 * Volontairement distincte de SAISON_CLUB : les poules d'une nouvelle saison
 * ne sont publiées par la FFVB qu'une fois le championnat lancé, et leurs
 * codes changent chaque année. À basculer sur "2026/2027" avec les nouveaux
 * codes de POULES quand la FFVB les publie.
 */
export const SAISON_FFVB = "2025/2026";

/** Dossier d'inscription téléchargeable. */
export const DOSSIER = {
  href: `/docs/dossier-inscription-${SAISON_CLUB}.pdf`,
  taille: "285 Ko",
} as const;

/** Date limite de remise du dossier complet. */
export const DATE_LIMITE = "fin septembre 2026";

/** Mois à partir duquel les créneaux sont définitivement confirmés. */
export const NOTE_CRENEAUX =
  "Tous les entraînements sont à confirmer à la mi-septembre, en fonction du nombre d'inscrits par catégorie.";

// ---------------------------------------------------------------------------
// Catégories d'âge
// ---------------------------------------------------------------------------

export const CATEGORIES_AGE = [
  { cat: "SENIORS", detail: "Né(e) en 2005 et avant" },
  { cat: "M21", detail: "Né(e) en 2006 / 2007 / 2008" },
  { cat: "M18", detail: "Né(e) en 2009 / 2010 / 2011" },
  { cat: "M15", detail: "Né(e) en 2012 / 2013" },
  { cat: "M13", detail: "Né(e) en 2014 / 2015" },
  { cat: "M11", detail: "Né(e) en 2016 / 2017" },
] as const;

// ---------------------------------------------------------------------------
// Créneaux d'entraînement
// ---------------------------------------------------------------------------

export interface Creneau {
  jour: string;
  horaire: string;
  ville: string;
  gymnase: string;
  /** Catégorie (jeunes) ou type de pratique (seniors). */
  groupe: string;
}

/**
 * Plusieurs groupes partagent le même gymnase au même horaire (deux terrains) :
 * c'est volontaire et conforme au dossier.
 */
export const CRENEAUX_JEUNES: Creneau[] = [
  { jour: "Mardi", horaire: "17h – 18h30", ville: "Garches", gymnase: "Le Rallec", groupe: "M11" },
  { jour: "Mardi", horaire: "18h30 – 20h15", ville: "Garches", gymnase: "Le Rallec", groupe: "M13 / M15 Garçons" },
  { jour: "Mardi", horaire: "18h30 – 20h15", ville: "Garches", gymnase: "Le Rallec", groupe: "M18 Filles compétition" },
  { jour: "Mercredi", horaire: "18h30 – 20h30", ville: "Garches", gymnase: "Le Rallec", groupe: "M13 / M15 Filles" },
  { jour: "Vendredi", horaire: "18h30 – 20h30", ville: "Garches", gymnase: "Yves Bodin", groupe: "M18 / M21 Mixte" },
  { jour: "Vendredi", horaire: "18h30 – 20h30", ville: "Garches", gymnase: "Yves Bodin", groupe: "M18 Filles compétition" },
];

export const CRENEAUX_LOISIR: Creneau[] = [
  { jour: "Mardi", horaire: "20h15 – 22h30", ville: "Garches", gymnase: "Le Rallec", groupe: "Loisirs" },
  { jour: "Mercredi", horaire: "20h30 – 22h30", ville: "Garches", gymnase: "Le Rallec", groupe: "Loisirs" },
  { jour: "Mercredi", horaire: "20h30 – 22h30", ville: "Garches", gymnase: "Le Rallec", groupe: "4×4 Féminine" },
  { jour: "Jeudi", horaire: "20h – 22h30", ville: "Vaucresson", gymnase: "Yves du Manoir", groupe: "Loisirs Compétition" },
  { jour: "Vendredi", horaire: "20h30 – 22h30", ville: "Garches", gymnase: "Yves Bodin", groupe: "Loisirs" },
  { jour: "Dimanche", horaire: "10h30 – 13h", ville: "Garches", gymnase: "Yves Bodin", groupe: "Jeu libre" },
];

export const CRENEAUX_COMPETITION: Creneau[] = [
  { jour: "Lundi", horaire: "20h – 22h30", ville: "Vaucresson", gymnase: "Yves du Manoir", groupe: "Masculin" },
  { jour: "Mercredi", horaire: "20h – 22h30", ville: "Garches", gymnase: "Yves Bodin", groupe: "Féminine" },
  { jour: "Mercredi", horaire: "20h – 22h30", ville: "Garches", gymnase: "Yves Bodin", groupe: "Masculin" },
  { jour: "Vendredi", horaire: "20h – 22h30", ville: "Garches", gymnase: "Yves Bodin", groupe: "Féminine" },
  { jour: "Dimanche", horaire: "13h – 18h", ville: "Garches", gymnase: "Yves Bodin", groupe: "Match Féminine" },
  { jour: "Dimanche", horaire: "13h – 18h", ville: "Garches", gymnase: "Yves Bodin", groupe: "Match Masculin" },
];

// ---------------------------------------------------------------------------
// Tarifs
// ---------------------------------------------------------------------------

export const TARIFS = [
  { categorie: "M11 / M13 / M15 / M18 / M21", garches: "165 €", autres: "175 €" },
  { categorie: "Seniors Loisir dimanche matin", garches: "135 €", autres: "145 €" },
  { categorie: "Seniors Loisir et Loisir Compétition", garches: "165 €", autres: "175 €" },
  { categorie: "Seniors Départementale", garches: "185 €", autres: "195 €" },
] as const;

export const TARIFS_ANNEXES = [
  { label: "Participation aux frais de mutation", montant: "90 €", note: null },
  {
    label: "Tenue club",
    montant: "30 €",
    note: "Obligatoire pour les joueurs et joueuses engagés dans une équipe en compétition.",
  },
] as const;

export const MODALITES_PAIEMENT = [
  "Chèque à l'ordre de Garches Vaucresson Volley-Ball.",
  "Règlement possible en plusieurs fois : remettez tous vos chèques le jour de l'inscription en précisant les dates d'encaissement.",
  "Une remise de 15 € est appliquée sur la cotisation des membres d'une même famille à partir du 2ᵉ inscrit.",
] as const;

// ---------------------------------------------------------------------------
// Pièces à fournir
// ---------------------------------------------------------------------------

export const PIECES_DOSSIER = [
  { texte: "La demande d'adhésion remplie, datée et signée", condition: null },
  { texte: "Une photo d'identité", condition: null },
  { texte: "Le règlement de la cotisation", condition: "chèque à l'ordre de Garches Vaucresson Volley-Ball" },
  { texte: "Le formulaire officiel de demande de licence", condition: null },
  { texte: "Un certificat médical", condition: "en précisant si besoin le surclassement pour les mineurs" },
  { texte: "Une autorisation du représentant légal", condition: "mineurs uniquement — à remplir au verso de la demande d'adhésion" },
  { texte: "Une photocopie d'une pièce d'identité", condition: "nouveaux adhérents uniquement" },
] as const;

// ---------------------------------------------------------------------------
// Bureau
// ---------------------------------------------------------------------------

export const BUREAU = [
  { nom: "Stéphane Feldman", role: "Président", tel: "07 62 92 04 94", email: "feldmans@hotmail.fr" },
  { nom: "Christelle Mazzuchelli", role: "Vice-présidente", tel: "06 07 47 35 28", email: "cmazzuchelli@gmail.com" },
  { nom: "Benoît Rousseau", role: "Trésorier", tel: "06 80 85 02 37", email: "benrousseau@orange.fr" },
  { nom: "Nicolas Rebière", role: "Secrétaire", tel: "06 71 62 62 10", email: "nrebiere@gmail.com" },
] as const;

// ---------------------------------------------------------------------------
// FFVB
// ---------------------------------------------------------------------------

/** Comité départemental des Hauts-de-Seine. */
export const CODE_ENTITE_FFVB = "PTIDF92";

export function ffvbUrl(poule: string): string {
  return `https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php?saison=${SAISON_FFVB}&codent=${CODE_ENTITE_FFVB}&poule=${poule}`;
}

/** Poules suivies sur la page Calendrier. Les codes changent chaque saison. */
export const POULES = [
  { code: "AMA", label: "Départementale M - Poule principale" },
  { code: "AMF", label: "Départementale M - Poule intermédiaire 2" },
  { code: "AFC", label: "Départementale F - Poule principale" },
  { code: "AFF", label: "Départementale F - Poule basse" },
  { code: "ORA", label: "Loisir OR" },
  { code: "MFB", label: "M15 Féminines" },
] as const;

// ---------------------------------------------------------------------------
// Équipes
// ---------------------------------------------------------------------------

export interface Equipe {
  /** Sert d'ancre : ne pas renommer sans mettre à jour les liens existants. */
  id: string;
  nom: string;
  niveau: string;
  genre: string;
  coach: string | null;
  description: string;
  photo: string | null;
  /** Créneaux affichés sur la fiche de l'équipe. */
  creneaux: string[];
  liens: { label: string; poule: string }[];
}

export const EQUIPES_COMPETITION: Equipe[] = [
  {
    id: "dep-masculine",
    nom: "Départementale Masculine",
    niveau: "Compétition",
    genre: "Masculin",
    coach: "Christelle Mazzuchelli",
    description:
      "L'équipe masculine évolue en championnat départemental dans les Hauts-de-Seine. Après une phase principale en poule A, l'équipe a disputé la poule intermédiaire 2.",
    photo: "/equipes/dep-masculine.jpg",
    creneaux: [
      "Lundi 20h – 22h30 · Yves du Manoir (Vaucresson)",
      "Mercredi 20h – 22h30 · Yves Bodin (Garches)",
      "Dimanche 13h – 18h · Yves Bodin (Garches) — matchs",
    ],
    liens: [
      { label: "Poule principale (AMA)", poule: "AMA" },
      { label: "Poule intermédiaire 2 (AMF)", poule: "AMF" },
    ],
  },
  {
    id: "dep-feminine",
    nom: "Départementale Féminine",
    niveau: "Compétition",
    genre: "Féminin",
    coach: "Florian Champagne",
    description:
      "L'équipe féminine évolue en championnat départemental. Après la phase principale, l'équipe a disputé la poule basse.",
    photo: "/equipes/dep-feminine.jpg",
    creneaux: [
      "Mercredi 20h – 22h30 · Yves Bodin (Garches)",
      "Vendredi 20h – 22h30 · Yves Bodin (Garches)",
      "Dimanche 13h – 18h · Yves Bodin (Garches) — matchs",
    ],
    liens: [
      { label: "Poule principale (AFC)", poule: "AFC" },
      { label: "Poule basse (AFF)", poule: "AFF" },
    ],
  },
];

export const EQUIPES_JEUNES: Equipe[] = [
  {
    id: "m11",
    nom: "M11",
    niveau: "École de volley",
    genre: "Mixte",
    coach: "Lily Fayet",
    description:
      "Premiers pas sur le terrain : motricité, jeu en petits effectifs et découverte du volley dans la bonne humeur.",
    photo: null,
    creneaux: ["Mardi 17h – 18h30 · Le Rallec (Garches)"],
    liens: [],
  },
  {
    id: "m13-m15-garcons",
    nom: "M13 / M15 Garçons",
    niveau: "Formation",
    genre: "Masculin",
    coach: "Lily Fayet",
    description:
      "Apprentissage des fondamentaux techniques et du jeu à 6, avec une progression vers la compétition départementale.",
    photo: null,
    creneaux: ["Mardi 18h30 – 20h15 · Le Rallec (Garches)"],
    liens: [],
  },
  {
    // Ancre historique "m15-feminine" conservée : des liens externes pointent dessus.
    id: "m15-feminine",
    nom: "M13 / M15 Filles",
    niveau: "Compétition Jeunes",
    genre: "Féminin",
    coach: "Lily Fayet",
    description:
      "Nos jeunes filles disputent le championnat départemental M15. Formation et compétition au programme pour nos futures championnes.",
    photo: "/equipes/m15-feminine.jpg",
    creneaux: ["Mercredi 18h30 – 20h30 · Le Rallec (Garches)"],
    liens: [{ label: "Championnat M15 F (MFB)", poule: "MFB" }],
  },
  {
    id: "m18-filles",
    nom: "M18 Filles",
    niveau: "Compétition Jeunes",
    genre: "Féminin",
    coach: "Florian Champagne",
    description:
      "Groupe compétition pour les filles nées entre 2009 et 2011, avec deux entraînements hebdomadaires.",
    photo: null,
    creneaux: [
      "Mardi 18h30 – 20h15 · Le Rallec (Garches)",
      "Vendredi 18h30 – 20h30 · Yves Bodin (Garches)",
    ],
    liens: [],
  },
  {
    id: "m18-m21-mixte",
    nom: "M18 / M21 Mixte",
    niveau: "Formation",
    genre: "Mixte",
    coach: "Florian Champagne",
    description:
      "Créneau mixte pour les grands jeunes : perfectionnement technique et transition vers les équipes seniors.",
    photo: null,
    creneaux: ["Vendredi 18h30 – 20h30 · Yves Bodin (Garches)"],
    liens: [],
  },
];

export const EQUIPES_LOISIR: Equipe[] = [
  {
    id: "loisir-or",
    nom: "Loisir OR",
    niveau: "Loisir Compétition",
    genre: "Mixte",
    coach: null,
    description:
      "L'équipe Loisir OR évolue dans la poule OR du championnat loisir. Une équipe mixte pour ceux qui veulent conjuguer compétition et plaisir du jeu.",
    photo: "/equipes/loisir-or.jpg",
    creneaux: ["Jeudi 20h – 22h30 · Yves du Manoir (Vaucresson)"],
    liens: [{ label: "Poule OR", poule: "ORA" }],
  },
  {
    id: "loisir-4x4-feminine",
    nom: "4×4 Féminine",
    niveau: "Loisir",
    genre: "Féminin",
    coach: null,
    description:
      "Un créneau féminin dédié au jeu à 4 contre 4 : plus de touches de balle, plus de rythme, dans une ambiance conviviale.",
    photo: null,
    creneaux: ["Mercredi 20h30 – 22h30 · Le Rallec (Garches)"],
    liens: [],
  },
  {
    id: "loisir-mixte",
    nom: "Loisir Mixte",
    niveau: "Loisir",
    genre: "Mixte",
    coach: null,
    description:
      "Trois créneaux hebdomadaires sans compétition, plus le jeu libre du dimanche matin. Le format idéal pour reprendre le volley ou débuter.",
    photo: null,
    creneaux: [
      "Mardi 20h15 – 22h30 · Le Rallec (Garches)",
      "Mercredi 20h30 – 22h30 · Le Rallec (Garches)",
      "Vendredi 20h30 – 22h30 · Yves Bodin (Garches)",
      "Dimanche 10h30 – 13h · Yves Bodin (Garches) — jeu libre",
    ],
    liens: [],
  },
  {
    id: "vsop",
    nom: "VSOP",
    niveau: "Ligue Loisir",
    genre: "Mixte",
    coach: null,
    description:
      "Le VSOP est une ligue loisir créée dans le sud-ouest parisien, réunissant des clubs de la région pour des rencontres conviviales à haut niveau de jeu.",
    photo: null,
    creneaux: [],
    liens: [],
  },
];

/** Toutes les équipes, dans l'ordre d'affichage de la page Équipes. */
export const TOUTES_EQUIPES: Equipe[] = [
  ...EQUIPES_COMPETITION,
  ...EQUIPES_JEUNES,
  ...EQUIPES_LOISIR,
];
