# Modul 9 – Transferübung: Rick and Morty Explorer

**Variante:** 3-Tage-Kurs, Paararbeit
**Dauer:** ca. 120 Minuten
**Arbeitsdatei:** `src/playground/App.tsx` und weitere Dateien in `src/playground/`
**Starter:** `src/starters/m09-transfer-explorer.tsx`

Die Übung verbindet Router, TanStack Query, Context, eigene Hooks, Tailwind und Tests zu einer App: Galerie mit Pagination und Statusfilter, Detailseite, Favoriten.

## Vorbereitung

- `npm run dev` läuft im Ordner `project/`; Rick and Morty API und `src/shared/character.ts` (Typen `Character`, `CharacterPage`, `API_BASE_URL`) sind verfügbar.
- Kopiere `src/starters/m09-transfer-explorer.tsx` nach `src/playground/App.tsx` und öffne `http://localhost:5173/playground`. Die Seite zeigt eine Kopfzeile und den Platzhalter „Galerie folgt.“
- Zeitplan: Die Checkpoints liegen bei ca. 35, 70, 95 und 120 Minuten. Wechsel der Rollen (Tastatur, Navigation) nach jedem Checkpoint.

| Etappe | Aufgaben | Ziel | Checkpoint nach |
| --- | --- | --- | --- |
| 1 | 1–6 | Galerie mit Pagination | ca. 35 min |
| 2 | 7–10 | Statusfilter und Detailseite | ca. 70 min |
| 3 | 11–15 | Favoriten über Context | ca. 95 min |
| 4 | 16–18 | Layout und Test | ca. 120 min |

## Aufgaben

**Etappe 1: Galerie mit Pagination**

1. Prüfe, dass der Starter läuft: Kopfzeile sichtbar, Link „Rick and Morty Explorer“ führt zur Startseite.
2. Lege `src/playground/api.ts` an: eine axios-Instanz mit `baseURL: API_BASE_URL` und eine typisierte Funktion `fetchCharacters(page)`, die eine `CharacterPage` liefert.
3. Lege `src/playground/GalleryPage.tsx` an, entferne den Platzhalter aus `App.tsx` und binde die neue Seite in die Route `/` ein.
4. Lade die Daten mit `useQuery` (`queryKey: ["characters", page]`). Zeige „Lade …“ und eine Fehlermeldung an.
5. Lege `src/playground/CharacterCard.tsx` an (Bild, Name, Status und Spezies) und zeige die Charaktere in einem Grid (zwei Spalten, ab Breite `md` vier).
6. Lege `page` als State an. Ergänze „Zurück“ (auf Seite 1 deaktiviert), „Weiter“ (auf der letzten Seite deaktiviert, Seitenzahl aus `info.pages`) und die Anzeige „Seite X von Y“.

**Etappe 2: Statusfilter und Detailseite**

7. Ergänze eine Auswahl „Status“ (Alle, Alive, Dead, Unknown). Reiche den Status als Query-Parameter `status` an die API weiter und nimm ihn in den `queryKey` auf. Ein Filterwechsel springt auf Seite 1.
8. Verlege Seite und Status in die URL (`useSearchParams`, z. B. `?page=2&status=alive`), sodass Neuladen und der Zurück-Button den Stand erhalten.
9. Ergänze `fetchCharacter(id)` in `api.ts` und lege `src/playground/DetailPage.tsx` an: `useParams` liefert die ID, `useQuery` lädt den Charakter (`queryKey: ["character", id]`), die Seite zeigt Bild, Name, Status, Spezies und einen Link „Zurück zur Galerie“.
10. Verlinke jede Karte auf `/characters/:id`. Gib die aktuellen Query-Parameter (Seite, Status) in Karte und Zurück-Link mit, sodass die Galerie auf derselben Seite und mit demselben Filter wieder erscheint.

**Etappe 3: Favoriten über Context**

11. Lege `src/playground/favorites-context.ts` an: Typ des Context-Werts (`favoriteIds`, `isFavorite`, `toggleFavorite`), `FavoritesContext` (Startwert `null`) und den Hook `useFavorites()`, der ohne Provider einen Fehler wirft.
12. Lege `src/playground/FavoritesProvider.tsx` an: Der State hält die Favoriten-IDs, der Provider stellt sie per `<FavoritesContext value={…}>` bereit. Umschließe in `App.tsx` den Router damit.
13. Lege `src/playground/FavoriteButton.tsx` an: Der Button schaltet per `toggleFavorite` um, zeigt „☆ Merken“ bzw. „★ Favorit“ und setzt `aria-pressed`. Binde ihn in Karte und Detailseite ein.
14. Lege `src/playground/Layout.tsx` an: Kopfzeile mit Link zur Startseite und „Favoriten: n“ (aus `useFavorites()`), darunter `<Outlet />`. Nutze sie in `App.tsx` als Layout-Route um beide Seiten.
15. Prüfe: Favoriten bleiben beim Wechsel zwischen Galerie, Seiten und Detailseite erhalten.

**Etappe 4: Layout und Test**

16. Gestalte die App mit Tailwind: Kopfzeile mit Hintergrundfarbe, Karten mit Rahmen und Schatten, zentrierter Inhalt mit Maximalbreite, Buttons mit Hover-Effekt.
17. Schreibe `src/playground/CharacterCard.test.tsx` mit mindestens einem Komponententest: Die Karte wird in `MemoryRouter` und `FavoritesProvider` gerendert; der Test prüft Name und Link und prüft, dass ein Klick auf „☆ Merken“ den Button auf „★ Favorit“ umschaltet.
18. Führe `npx vitest run src/playground` aus.

## Checkpoint

- Nach Etappe 1: Die Galerie zeigt 20 Charaktere; „Weiter“ lädt Seite 2, „Zurück“ ist auf Seite 1 deaktiviert.
- Nach Etappe 2: Der Filter „Dead“ zeigt nur Charaktere mit Status Dead; ein Klick auf eine Karte öffnet `/characters/<id>`; „Zurück zur Galerie“ führt auf dieselbe Seite mit demselben Filter; Neuladen der Detailseite zeigt den Charakter weiter an.
- Nach Etappe 3: Ein Favorit lässt sich in Karte und Detailseite umschalten; der Zähler in der Kopfzeile ändert sich entsprechend und bleibt beim Seitenwechsel erhalten.
- Nach Etappe 4: `npx vitest run src/playground` meldet mindestens einen bestandenen Test; das Layout ist mit Tailwind gestaltet.

## Abschlusskriterien

- Galerie mit Pagination und Statusfilter, Detailseite und Favoriten funktionieren zusammen.
- Daten kommen über `useQuery`; Favoriten über Context und `useFavorites()`.
- Router-Import ausschließlich aus `react-router`; `<BrowserRouter basename={routerBasename()}>` bleibt aus dem Starter erhalten.
- Alle Komponenten und Funktionen sind typisiert, kein `any`.
- Mindestens ein Komponententest ist grün.

## Fallback

Ist die API gesperrt, liefert `public/characters-page-1.json` die erste Seite mit derselben Struktur. Ersetze in `fetchCharacters` die Anfrage durch `api.get<CharacterPage>("/characters-page-1.json")`. Pagination, Statusfilter und Detailseite funktionieren damit nicht (nur Seite 1, keine Einzelabfrage); Aufgaben 1–5, 11–17 bleiben vollständig bearbeitbar.
