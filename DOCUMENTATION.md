# Documentation — Site GVVB

**Garches Vaucresson Volley-Ball** — site officiel du club  
Domaine cible : `gvvb.fr` · Déployé sur Vercel  
Saison en cours : **2026-2027**

---

## ⚠️ À lire en premier : `src/lib/saison.ts`

Toutes les données de référence du club vivent dans **un seul fichier** :
`src/lib/saison.ts`. Les pages ne font que de la mise en forme.

| Constante | Contenu |
|---|---|
| `SAISON_CLUB` | `"2026-2027"` — inscriptions, tarifs, dossier |
| `SAISON_FFVB` | `"2025/2026"` — scraping et liens FFVB (volontairement distinct) |
| `DOSSIER` | chemin + taille du PDF d'inscription |
| `DATE_LIMITE` | date limite de remise du dossier |
| `CATEGORIES_AGE` | 6 catégories avec années de naissance |
| `CRENEAUX_JEUNES` / `_LOISIR` / `_COMPETITION` | créneaux d'entraînement (`debut`/`fin` en `"HH:MM"`, plus un `type`) |
| `JOURS_SEMAINE` / `LIBELLES_TYPE` | axes et libellés de l'emploi du temps |
| `TARIFS` / `TARIFS_ANNEXES` / `MODALITES_PAIEMENT` | cotisations |
| `PIECES_DOSSIER` | les 7 pièces à fournir |
| `BUREAU` | 4 membres, tél + email |
| `POULES` / `ffvbUrl()` / `CODE_ENTITE_FFVB` | intégration FFVB |
| `EQUIPES_COMPETITION` / `_JEUNES` / `_LOISIR` | les 11 équipes |

### Changer de saison

1. **Contenu club** (dès réception du nouveau dossier d'inscription) :
   - déposer le PDF dans `public/docs/dossier-inscription-<saison>.pdf`
   - mettre à jour `SAISON_CLUB`, `DOSSIER.taille`, `DATE_LIMITE`
   - décaler `CATEGORIES_AGE` d'un an, réécrire les `CRENEAUX_*` et `TARIFS`
2. **Compétition** (quand la FFVB publie les poules, généralement fin septembre) :
   - passer `SAISON_FFVB` à la nouvelle saison
   - mettre à jour les codes de `POULES` — **ils changent chaque saison**
   - vérifier `/calendrier` : en cas d'échec du scraping, la page affiche
     automatiquement des liens directs vers ffvbbeach.org

> Les deux saisons sont séparées volontairement : les inscriptions ouvrent en
> août alors que les poules FFVB n'existent pas encore. Basculer `SAISON_FFVB`
> trop tôt vide la page Calendrier.

⚠️ **Piège JSX** : n'écrivez pas `{UNE_CONSTANTE} mot` en fin de ligne dans du
JSX — la transformation avale l'espace et affiche `2026-2027mot`. Gardez
l'expression et le mot suivant sur la même ligne, ou utilisez `{" "}`.

---

## Stack technique

| Élément | Choix |
|---|---|
| Framework | Next.js (App Router, Server + Client Components) |
| Styles | Tailwind CSS v4 |
| Polices | Oswald (titres, `font-heading`) + Geist Sans (corps) via Google Fonts |
| Images | `next/image` (optimisation automatique, lazy loading) |
| Déploiement | Vercel (CD automatique depuis la branche `main`) |
| Scraping résultats | HTML scraping de `ffvbbeach.org` (pas d'API officielle) |

### Couleurs personnalisées (définie dans `globals.css`)

```css
--color-gvvb-red:        #C8102E
--color-gvvb-red-dark:   #a00e24
--color-gvvb-navy:       #1B2A4A
--color-gvvb-navy-dark:  #0f1a2e
```

---

## Structure du projet

```
site_gvvb/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← layout global (Navbar + Footer)
│   │   ├── globals.css             ← thème Tailwind (couleurs, polices)
│   │   ├── page.tsx                ← page d'accueil
│   │   ├── le-club/page.tsx
│   │   ├── equipes/page.tsx
│   │   ├── entrainements/page.tsx
│   │   ├── calendrier/page.tsx     ← Server Component, fetch FFVB
│   │   ├── inscription/page.tsx    ← tarifs, pièces, dossier PDF
│   │   ├── contact/page.tsx
│   │   └── mentions-legales/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx              ← Client Component (menu burger mobile)
│   │   ├── Footer.tsx
│   │   ├── PageHeader.tsx          ← composant réutilisable pour les en-têtes
│   │   └── CalendrierClient.tsx    ← Client Component (accordion + tableau)
│   └── lib/
│       ├── saison.ts               ← ⚠️ toutes les données du club (voir ci-dessus)
│       └── ffvb.ts                 ← scraping + parsing des données FFVB
└── public/
    ├── logo-gvvb.png               ← logo renard rouge (navbar)
    ├── logo-gvvb-rouge.png         ← logo renard rouge fond transparent
    ├── logo-gvvb-blanc.png         ← logo renard blanc (sections sombres)
    ├── photos/                     ← photos David Adet + ambiance
    ├── equipes/                    ← photos des équipes
    ├── news/                       ← images actualités (maillots)
    ├── sponsors/                   ← logo Librairie L'Écriture
    └── docs/                       ← dossier inscription PDF
```

---

## Pages

### Accueil (`/`)

- **Hero** : photo de fond (`hero-bg.jpg`), gradient rouge/navy, titre GVVB en grand, logo blanc aligné à droite du titre, deux boutons CTA
- **Accès rapide** : 2 tuiles navy — formulaire de contact et `/inscription`
- **Équipes** : aperçu des 5 premières équipes (`TOUTES_EQUIPES.slice(0, 5)`), liens vers `/equipes#ancre`
- **Actualités** : articles dont l'ouverture des inscriptions (août 2026, en avant) et les maillots Décathlon Pro (janvier 2026) avec photos
- **Galerie photos** : grille 3 colonnes (photos `celebration-m.jpg`, `action-smash.jpg`, `portrait-f.jpg`)
- **Partenaires** : section dédiée à la Librairie L'Écriture (logo, liens site + Instagram)
- **Dossier d'inscription** : téléchargement du PDF de la saison en cours
- **CTA rejoindre** : section navy avec photo de fond, boutons « S'inscrire » et « Nous contacter »

### Le Club (`/le-club`)

Bureau (lu depuis `BUREAU`), coachs et les 3 gymnases.  
Header : `supporters.jpg`

### Équipes (`/equipes`)

**11 équipes** en 3 blocs, toutes définies dans `saison.ts` :

| Bloc | Équipes | Format |
|---|---|---|
| Compétition Seniors | Départementale M, Départementale F | grand format photo/texte alterné |
| Jeunes | M11, M13/M15 Garçons, M13/M15 Filles, M18 Filles, M18/M21 Mixte | grille de cartes |
| Loisir | Loisir OR, 4×4 Féminine, Loisir Mixte, VSOP | grille de cartes |

Chaque fiche affiche niveau, genre, description, **créneaux**, coach et liens FFVB.
Les équipes sans photo utilisent le placeholder « Photo à venir ».

> ⚠️ Les `id` servent d'**ancres** (`/equipes#dep-masculine`). L'équipe
> « M13 / M15 Filles » garde volontairement l'id historique `m15-feminine` :
> des liens externes pointent dessus.

Header : `volleyballs.jpg`

### Entraînements (`/entrainements`)

Deux **emplois du temps hebdomadaires** (voir `EmploiDuTemps` ci-dessous) :
jeunes puis adultes. Chaque case affiche la catégorie, l'horaire et le gymnase,
avec un code couleur par `type` de créneau.

Le **dimanche** est sorti des grilles et présenté en bandeau sous celle des
adultes : ses créneaux courent de 10h30 à 18h alors que la semaine tient entre
20h et 22h30, l'inclure étirerait la grille pour six colonnes vides.

Suivent les catégories d'âge et un bloc `<details>` « Voir la liste détaillée »
avec les 3 tableaux jour / horaire / ville / gymnase / catégorie / type — c'est
le repli accessible et imprimable de l'information.

Bandeau navy rappelant que les créneaux sont confirmés à la mi-septembre.

Header : `dep-feminine.jpg`

### Inscription (`/inscription`)

Page créée à partir du dossier officiel. Sections :
1. **Téléchargement du dossier** PDF (bandeau rouge)
2. **Tarifs** : tableau Garches/Vaucresson vs autres communes, frais annexes
   (mutation 90 €, tenue 30 €), modalités de paiement
3. **Pièces à fournir** : checklist numérotée des 7 pièces
4. **Date limite** : encadré navy
5. **Catégories d'âge** : rappel par année de naissance
6. **Contacts du bureau** : les 4 membres avec tél + email

Header : `entree-jeu.jpg` · objectPosition : `center 35%`

### Calendrier & Résultats (`/calendrier`)

**Server Component** qui fetch les poules de `POULES` au build (revalidé toutes
les heures). Les codes de poules et la saison FFVB vivent dans `saison.ts`.

Chaque poule est un **accordion dépliable** qui affiche :
1. **Classement** : tableau avec la ligne GVVB surlignée en rouge
2. **Matchs** : date, domicile/extérieur, adversaire, score (vert/rouge), détail des sets
3. **Forme** : badges V/D sur les 5 derniers matchs joués
4. **Fallback** : si le scraping échoue, liens directs vers ffvbbeach.org

Header : `filet-m.jpg` · objectPosition : `20% 30%`

### Contact (`/contact`)

- Adresse postale + email du club
- **Le bureau** : les 4 membres (lus depuis `BUREAU`), tél + email
- Réseaux sociaux : Instagram, Facebook
- Bloc « Rejoindre le club » : téléchargement du dossier + renvoi vers `/inscription`
- Les 3 gymnases avec liens Google Maps

Header : `banc-gvvb.jpg` · objectPosition : `center 30%`

> **Pas de page `/galerie`** : elle était documentée ici mais n'a jamais été
> créée dans `src/app/`. Les photos de David Adet
> ([@davidadet_photo_video](https://www.instagram.com/davidadet_photo_video/))
> sont présentes dans `public/photos/` et utilisées comme en-têtes de pages et
> dans la grille de l'accueil. À créer si la galerie est souhaitée.

### Mentions légales (`/mentions-legales`)

Page légale obligatoire (loi française) avec :
- Éditeur (à compléter : adresse et email association)
- Hébergeur : Vercel Inc.
- Responsable de publication (à compléter)
- RGPD / données personnelles
- Propriété intellectuelle

---

## Composants

### `PageHeader`

En-tête réutilisé sur toutes les pages intérieures.

```tsx
<PageHeader
  label="Compétition"           // petit texte rouge au-dessus
  title="Calendrier & Résultats"
  description="Saison 2025/2026"
  bgImage="/photos/filet-m.jpg" // optionnel
  objectPosition="20% 30%"      // optionnel (défaut : "center")
>
  {/* children optionnels, affichés sous la description */}
</PageHeader>
```

- Fond rouge GVVB avec photo en overlay (opacity 50%) + surcouche rouge/65
- Logo blanc GVVB en filigrane à droite (desktop uniquement, 180px)
- Hauteur : `py-20 md:py-28`

### `Navbar`

- Logo GVVB rouge (48px) + texte "GVVB / Garches Vaucresson VB"
- 7 liens : Accueil · Le Club · Équipes · Entraînements · Calendrier · Inscription · Contact
- Liens actifs soulignés en rouge
- Bascule menu burger ↔ menu horizontal au breakpoint **`lg`** (et non `md` :
  les 7 liens plus le CTA ne tiennent pas en 768px)
- Bouton "Nous rejoindre" en rouge à droite → `/inscription`
- `sticky top-0 z-50` — reste visible au scroll

### `Footer`

- 3 colonnes : identité club + réseaux · navigation · contact & gymnases
- Gymnases : Yves Bodin (Garches) · Le Rallec (Garches) · Yves du Manoir (Vaucresson)
- Logo blanc GVVB (56px)
- Logo partenaire L'Écriture (filtre CSS `brightness(0) invert(1)` pour le rendre blanc)
- Liens : Instagram `volley_gvvb`, Facebook `gvvb.fr`
- Mentions légales en bas à droite

### `EmploiDuTemps`

Grille hebdomadaire en CSS Grid (Server Component, aucune interactivité).

```tsx
<EmploiDuTemps
  creneaux={CRENEAUX_ADULTES}
  legende={["competition", "loisir"]}
  fond="bg-gray-50"            // fond de la section hôte (défaut "bg-white")
/>
```

- **Lignes** = tranches de 15 minutes (`ROW_H` px chacune), plage calée
  automatiquement sur les demi-heures encadrant les créneaux fournis
- **Colonnes** = un jour par bloc, mais **chaque jour occupe autant de colonnes
  de grille qu'il a de créneaux simultanés** (`placerSemaine`). Le mercredi
  adultes en compte 4 : tous les blocs de la semaine gardent donc la même
  largeur au lieu de s'écraser dans une colonne unique.
- `placerJour` répartit les créneaux qui se chevauchent en sous-colonnes
  (partitionnement glouton d'intervalles)
- Les créneaux du week-end sont **ignorés** : la page les affiche à part
- Colonne des heures **`sticky left-0`** — reste lisible pendant le scroll
  horizontal sur mobile ; d'où le paramètre `fond`, qui lui donne un fond opaque
- Chaque bloc porte du texte `sr-only` (jour, ville, type) pour rester
  compréhensible au lecteur d'écran, une grille CSS n'étant pas un tableau

Code couleur (`--color-gvvb-*` dans `globals.css`) :

| Type | Couleur | Usage |
|---|---|---|
| `competition` | rouge GVVB | Départementales, matchs, M13/M15 Filles, M18 Filles |
| `formation` | marine GVVB | M11, M13/M15 Garçons, M18/M21 Mixte |
| `loisir` | teal | Loisirs, 4×4 Féminine, Loisir Compétition, jeu libre |

> Le loisir est en teal et non en orange : rouge et orange sont un couple de
> confusion classique pour les daltonismes rouge-vert.

### `CalendrierClient`

Client Component (interactif) composé de :
- `AccordionSection` : un accordion par poule
- `StandingsTable` : classement compact, ligne GVVB en rouge
- `MatchRow` : une ligne par match
- `FormBadges` : badges V/D des 5 derniers résultats

---

## Intégration FFVB (`src/lib/ffvb.ts`)

Les données (pas d'API officielle) sont récupérées par scraping HTML de `ffvbbeach.org`.

### Fonctionnement

L'URL est construite par `ffvbUrl(poule)` depuis `saison.ts` — plus aucune URL
FFVB n'est codée en dur ailleurs dans le projet :

```
https://www.ffvbbeach.org/ffvbapp/resu/vbspo_calendrier.php
  ?saison={SAISON_FFVB}&codent={CODE_ENTITE_FFVB}&poule={CODE}
```

Le HTML est encodé en **ISO-8859-1** — décodé avec `TextDecoder("iso-8859-1")`.

La fonction `parseCells(html)` extrait le contenu textuel de toutes les `<td>`.  
Ensuite deux parsers travaillent sur ce tableau de cellules :

**`parseMatches()`** : détecte les lignes de matchs par pattern  
`CODE_MATCH → DATE(DD/MM/YY) → [HEURE] → DOMICILE → EXTÉRIEUR → [SCORE]`  
Ne conserve que les matchs où "GARCHES" apparaît.

**`parseStandings()`** : détecte les lignes de classement par pattern  
`RANG(1.) → ÉQUIPE → PTS → J → V → D`

**`fetchPoule(code)`** retourne `{ matches: Match[], standings: Standing[] }`  
avec `revalidate: 3600` (cache 1 heure).

### Interfaces TypeScript

```typescript
interface Match {
  code: string;
  date: string;       // "DD/MM/YY"
  time: string | null;
  home: string;
  away: string;
  scoreHome: string | null;
  scoreAway: string | null;
  sets: string | null;
}

interface Standing {
  rank: number;
  team: string;
  pts: number;
  played: number;
  wins: number;
  losses: number;
  isGvvb: boolean;
}
```

---

## Assets médias

### Logos

| Fichier | Usage |
|---|---|
| `logo-gvvb.png` | Navbar (fond blanc) |
| `logo-gvvb-rouge.png` | Réserve (logo rouge fond transparent) |
| `logo-gvvb-blanc.png` | Hero, footers, PageHeader watermark (sections sombres) |

### Photos (© David Adet — @davidadet_photo_video)

| Fichier | Usage principal |
|---|---|
| `photos/hero-bg.jpg` | Hero page d'accueil |
| `photos/celebration-m.jpg` | Galerie header + galerie section "Émotions" |
| `photos/celebration-f.jpg` | CTA "Rejoindre" page d'accueil |
| `photos/action-smash.jpg` | Grille accueil + galerie |
| `photos/portrait-f.jpg` | Grille accueil + galerie |
| `photos/filet-m.jpg` | Header Calendrier |
| `photos/filet-f.jpg` | Galerie |
| `photos/banc-gvvb.jpg` | Header Contact |
| `photos/supporters.jpg` | Header Le Club + galerie |
| `photos/volleyballs.jpg` | Header Équipes + galerie |
| `photos/entree-jeu.jpg` | Galerie |
| `photos/action-f2.jpg` | Galerie |
| `photos/apres-match.jpg` | Galerie |
| `photos/joueur-ballon.jpg` | Galerie |
| `photos/ballon-tattoo.jpg` | Galerie |

### Photos équipes

| Fichier | Équipe |
|---|---|
| `equipes/dep-masculine.jpg` | Départementale Masculine |
| `equipes/dep-feminine.jpg` | Départementale Féminine + header Entraînements |
| `equipes/m15-feminine.jpg` | M13 / M15 Filles |
| `equipes/loisir-or.jpg` | Loisir OR |

Équipes **sans photo** (placeholder « Photo à venir ») : M11, M13/M15 Garçons,
M18 Filles, M18/M21 Mixte, 4×4 Féminine, Loisir Mixte, VSOP.

### Autres

| Fichier | Description |
|---|---|
| `news/maillot-rouge.png` | Nouveau maillot rouge (actualité janvier 2026) |
| `news/maillot-bleu.png` | Nouveau maillot bleu libéro |
| `sponsors/logo-lecriture.jpg` | Logo Librairie L'Écriture |
| `docs/dossier-inscription-2026-2027.pdf` | Dossier d'inscription en cours (référencé par `DOSSIER`) |
| `docs/dossier-inscription-2025-2026.pdf` | Dossier de la saison passée, conservé pour ne pas casser d'anciens liens |

---

## Déploiement

Le site est déployé automatiquement sur **Vercel** à chaque `git push` sur `main`.

### Variables d'environnement

Aucune variable d'environnement requise pour le moment (le scraping FFVB est public).

### Mise à jour du contenu

Pour les tarifs, horaires, équipes, catégories, bureau ou dossier
d'inscription : **modifier `src/lib/saison.ts`**, rien d'autre.
Les actualités restent dans le tableau `news` de `src/app/page.tsx`.

1. Modifier `src/lib/saison.ts` (ou `page.tsx` pour une actualité)
2. `npm run build` pour vérifier
3. `git add . && git commit -m "..." && git push`
4. Vercel redéploie automatiquement en ~1 minute

Les données FFVB (résultats, classements) se mettent à jour **automatiquement toutes les heures** sans intervention.

### Nettoyer le cache images en local

Si une image remplacée ne se met pas à jour en développement :
```bash
rm -rf .next/cache/images/
# ou entièrement :
rm -rf .next/
```

---

## Ce qui reste à faire

| Priorité | Tâche |
|---|---|
| Haute | Compléter les mentions légales (adresse association, email, responsable publication) |
| Haute | DNS : pointer `gvvb.fr` vers Vercel |
| Haute | Google Search Console : soumettre le sitemap |
| Haute | **Passer `SAISON_FFVB` à `2026/2027`** + nouveaux codes de `POULES` dès publication FFVB |
| Moyenne | Confirmer le nom du gymnase du 20 rue de Suresnes : le dossier écrit « les Meuries », le site « Yves Bodin » |
| Moyenne | Photos des équipes jeunes et loisir sans visuel (voir § Photos équipes) |
| Moyenne | Vérifier les poules jeunes engagées en championnat (M18 Filles n'a pas encore de lien FFVB) |
| Basse | Page `/galerie` (documentée historiquement mais jamais créée) |
| Basse | Formulaire de contact fonctionnel (actuellement HTML statique) |

---

## Partenaire

**Librairie L'Écriture** — Vaucresson  
Site : [librairie-ecriture.com](https://www.librairie-ecriture.com)  
Instagram : [@librairie_lecriture_vaucresson](https://www.instagram.com/librairie_lecriture_vaucresson/)

Présence sur le site : section dédiée page d'accueil + logo dans le footer.
