// ============================================================
// SCHRITT 2 – Routing-Konfiguration & Übersetzungsdateien
// ============================================================
//
// i18/routing.ts definiert:
//   - Welche Sprachen werden unterstützt?
//   - Was ist die Standard-Sprache?
//
// Diese Datei gehört nach: i18n/routing.ts
// ============================================================

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Alle unterstützten Sprachen
  locales: ["de", "en"],

  // Standard-Sprache (wird genutzt wenn keine Sprache in der URL)
  defaultLocale: "de",
});

// ============================================================
// messages/de.json – Deutsche Texte
// ============================================================
// {
//   "navigation": {
//     "home": "Startseite",
//     "about": "Über uns",
//     "characters": "Charaktere"
//   },
//   "about": {
//     "title": "Über dieses Projekt",
//     "description": "Eine App über das Rick & Morty Universum.",
//     "teamLabel": "Team",
//     "members": "{count, plural, one {# Mitglied} other {# Mitglieder}}"
//   }
// }

// ============================================================
// messages/en.json – Englische Texte
// ============================================================
// {
//   "navigation": {
//     "home": "Home",
//     "about": "About",
//     "characters": "Characters"
//   },
//   "about": {
//     "title": "About this project",
//     "description": "An app about the Rick & Morty universe.",
//     "teamLabel": "Team",
//     "members": "{count, plural, one {# member} other {# members}}"
//   }
// }

// ============================================================
// Tipp: Schlüssel-Hierarchie
// ============================================================
//
// Verschachtelte Objekte erlauben Namespace-Grouping:
//   t("about.title")   → "Über dieses Projekt"
//   t("navigation.home") → "Startseite"
//
// Pluralformen mit ICU Message Format:
//   t("about.members", { count: 3 }) → "3 Mitglieder"
//   t("about.members", { count: 1 }) → "1 Mitglied"
