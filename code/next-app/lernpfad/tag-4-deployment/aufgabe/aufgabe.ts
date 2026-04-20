// ============================================================
// TAG 4 – TRANSFER AUFGABE: Build analysieren & optimieren
// ============================================================
//
// Ziel: Die next-app buildbereit machen und auf Vercel deployen.
//
// ── AUFGABE 1: .env.local anlegen ────────────────────────────
//
//   Kopiert .env.local.example zu .env.local:
//     cp .env.local.example .env.local
//
//   Passt NEXT_PUBLIC_BASE_URL an (bleibt localhost für lokal).
//
// ── AUFGABE 2: env variable in sitemap.ts nutzen ─────────────
//
//   app/sitemap.ts nutzt bereits:
//     process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
//
//   Setzt die Variable in .env.local und prüft:
//     → http://localhost:3000/sitemap.xml
//     → Zeigt die korrekten URLs mit eurem Base-URL?
//
// ── AUFGABE 3: Build lokal ausführen ─────────────────────────
//
//   npm run build
//
//   Analysiert den Output:
//   - Welche Routen sind "Static" (○)?
//   - Welche sind "Dynamic" (λ)?
//   - Wie groß ist der "First Load JS" für /characters?
//
//   Tipp: /characters ist dynamic weil es ein async fetch macht.
//
// ── AUFGABE 4: Production-Server testen ──────────────────────
//
//   npm start
//
//   Vergleicht Dev vs. Production:
//   - Wie schnell lädt /characters im Production-Build?
//   - Schaut ins Netzwerk-Tab: sind die JS-Bundles kleiner?
//   - Öffnet /sitemap.xml – funktioniert es?
//
// ── AUFGABE 5 (Bonus): Auf Vercel deployen ───────────────────
//
//   1. Code auf GitHub pushen (neues Repo anlegen)
//   2. vercel.com → "New Project" → Repo importieren
//   3. NEXT_PUBLIC_BASE_URL auf eure Vercel-URL setzen
//   4. Deployen und Live-URL testen
//
// ── Checkliste vor dem Deployment ───────────────────────────
//
//   □ npm run build läuft ohne Fehler
//   □ npm run lint läuft ohne Fehler
//   □ Alle environment variables dokumentiert (.env.local.example)
//   □ .env.local ist in .gitignore
//   □ TypeScript-Fehler behoben (TypeScript strict: true)
//
// ============================================================

export {};
