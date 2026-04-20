// ============================================================
// SCHRITT 3 – useTranslations Hook in Server & Client Components
// ============================================================
//
// next-intl bietet zwei Wege Texte zu lesen:
//
//   Server Components:  useTranslations() – direkt, kein Overhead
//   Client Components:  useTranslations() – gleiche API, funktioniert auch
//
// Der Hook erwartet einen Namespace (z.B. "about") und gibt
// eine t()-Funktion zurück, die den Schlüssel übersetzt.
//
// Diese Datei gehört nach: app/[locale]/about/page.tsx
// ============================================================

import { useTranslations } from "next-intl";

// ── Server Component ──────────────────────────────────────────
// Kein "use client" → Server Component
// useTranslations() funktioniert hier ohne Provider!
export default function AboutPage() {
  // Namespace "about" → liest nur Schlüssel aus dem "about"-Block
  const t = useTranslations("about");

  return (
    <main className="p-8 max-w-2xl mx-auto">
      {/* t("title") → "Über dieses Projekt" (de) oder "About this project" (en) */}
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p className="text-gray-600">{t("description")}</p>

      {/* Pluralformen: count wird interpoliert */}
      <p className="mt-4 font-medium">
        {t("teamLabel")}: {t("members", { count: 3 })}
      </p>
    </main>
  );
}

// ============================================================
// SCHRITT 3b – Sprachenwechsler (Client Component)
// ============================================================
//
// "use client";
//
// import { useRouter, usePathname } from "next-intl/client";
// import { useLocale } from "next-intl";
//
// export default function SprachenWechsler() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();
//
//   function wechseln(neueSprache: string) {
//     // router.replace() mit neuer Sprache wechselt die URL
//     // /de/about → /en/about  (ohne Neuladen der Seite)
//     router.replace(pathname, { locale: neueSprache });
//   }
//
//   return (
//     <div className="flex gap-2">
//       <button
//         onClick={() => wechseln("de")}
//         className={locale === "de" ? "font-bold underline" : ""}
//       >
//         DE
//       </button>
//       <button
//         onClick={() => wechseln("en")}
//         className={locale === "en" ? "font-bold underline" : ""}
//       >
//         EN
//       </button>
//     </div>
//   );
// }
