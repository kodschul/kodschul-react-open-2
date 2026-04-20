// ============================================================
// SCHRITT 2 – Vercel Deployment: Schritt für Schritt
// ============================================================
//
// Vercel ist die von Next.js-Machern erstellte Hosting-Plattform.
// Tief integriert: SSR, Edge Functions, ISR → alles out of the box.
//
// ── Vorbereitung ──────────────────────────────────────────────
//
// 1. Sicherstellen: next build läuft lokal ohne Fehler
//    npm run build
//
// 2. Code in GitHub pushen:
//    git init (falls noch nicht)
//    git add .
//    git commit -m "Initial commit"
//    git push
//
// ── Deployment auf Vercel ─────────────────────────────────────
//
// 1. vercel.com → "New Project" → GitHub-Repo importieren
//
// 2. Vercel erkennt Next.js automatisch:
//    - Build Command: next build  (automatisch)
//    - Output Directory: .next    (automatisch)
//
// 3. Environment Variables setzen:
//    Settings → Environment Variables
//    NEXT_PUBLIC_BASE_URL = https://meine-app.vercel.app
//    DATABASE_URL = ...
//
// 4. Deploy klicken → fertig!
//
// ── Preview Deployments ───────────────────────────────────────
//
// Jeder Push auf einen Branch (nicht main):
//   → automatisch eine Preview-URL
//   → https://meine-app-feature-xyz.vercel.app
//   → Ideal zum Review vor dem Merge
//
// ── Deployment-Logs lesen ─────────────────────────────────────
//
// Bei Fehler:
//   Vercel Dashboard → Deployment → "Build Logs"
//
// Häufige Probleme:
//
//   ERROR: Missing environment variable X
//   → Variable in Vercel Settings nachtragen
//
//   ERROR: Cannot find module 'paket-name'
//   → npm install paket-name vergessen (oder nur in devDependencies)
//
//   ERROR: Type error
//   → TypeScript-Fehler → lokal beheben, neu pushen
//
// ── Vercel CLI (optional) ─────────────────────────────────────
//
//   npm i -g vercel
//   vercel login
//   vercel          → manuelles Deployment
//   vercel --prod   → direkt in Produktion
//
// ============================================================
// SCHRITT 3 – GitHub Actions: Tests in CI laufen lassen
// ============================================================
//
// Datei: .github/workflows/test.yml
//
// name: CI
//
// on:
//   push:
//     branches: [main, develop]
//   pull_request:
//     branches: [main]
//
// jobs:
//   test:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//
//       - uses: actions/setup-node@v4
//         with:
//           node-version: 20
//           cache: "npm"
//
//       - name: Install dependencies
//         run: npm ci
//
//       - name: Run Unit Tests
//         run: npm run test -- --run
//
//       - name: Run Build
//         run: npm run build
//
// → Tests müssen grün sein bevor Code zu main gemergt wird!

export {};
