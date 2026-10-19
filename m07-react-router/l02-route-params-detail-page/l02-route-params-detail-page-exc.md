# Lab 7.2 – Übung: Detailseite mit URL-Parametern

**Dauer:** ca. 25 Minuten
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m07-l02-router-gallery.tsx`

## Vorbereitung

- Der Dev-Server läuft; der Playground ist unter `http://localhost:5173/playground` erreichbar.
- Kopiere `src/starters/m07-l02-router-gallery.tsx` nach `src/playground/App.tsx`. Der Starter enthält die Galerie mit `useQuery` und Paging (Lab 6.1) und eine Route `/characters`; `/playground` leitet dorthin weiter.
- Öffne die DevTools (Network-Tab, Filter **Fetch/XHR**).

## Aufgaben

1. Importiere `Link` und `useParams` aus `react-router` sowie `Character` aus `../shared/character`.
2. Mache in `CharactersPage` aus jeder Karte einen `Link` auf `/characters/<id>`. Das `key` wandert an den `Link`.
3. Lege eine Funktion `fetchCharacter(id)` an, die über die axios-Instanz `/character/<id>` lädt und die Daten als `Character` zurückgibt.
4. Lege die Komponente `CharacterDetailPage` an. Lies die ID mit `useParams` und lade den Charakter mit `useQuery`. Wähle den `queryKey` so, dass jede ID einen eigenen Cache-Eintrag bekommt.
5. Zeige in `CharacterDetailPage` Bild, Name, Status und Spezies sowie „Lade …“ und eine Fehlermeldung. Ergänze einen `Link` zurück zur Galerie.
6. Ergänze in `Routes` die Route mit dem Pfad `/characters/:id`.
7. Klicke eine Karte an, lies die URL ab und gehe über den `Link` und über den Zurück-Button des Browsers zurück.
8. Lade die Detailseite mit `F5` neu und beobachte Anzeige und Network-Tab.
9. Öffne `http://localhost:5173/playground/characters/99999` und beobachte die Anzeige.
10. Blättere in der Galerie auf Seite 3, öffne eine Detailseite und kehre über den `Link` zurück. Notiere, auf welcher Seite die Galerie landet.

## Checkpoint

- Ein Klick auf eine Karte öffnet `/playground/characters/<id>` mit Bild, Name, Status und Spezies.
- Der `Link` führt zur Galerie zurück; nach `F5` zeigt die Detailseite denselben Charakter.
- Für die ID `99999` erscheint eine Fehlermeldung (404).
- Der Network-Tab zeigt beim Öffnen einer Detailseite eine Anfrage `character/<id>`.
- Nach Aufgabe 10 steht die Galerie wieder auf Seite 1.

## Abschlusskriterien

- Die Detailseite liest die ID ausschließlich über `useParams`.
- Der `queryKey` der Detail-Query enthält die ID.
- Alle Importe stammen aus `react-router`; kein `useEffect` im Code.

## Erweiterung (optional)

Lege die aktuelle Seite der Galerie in die URL (`/characters?page=3`) statt in den State. Nutze `useSearchParams`, lasse jede Karte die Seite als `?page=` an die Detailadresse hängen und baue den `Link` zurück so, dass die Galerie auf derselben Seite landet. Prüfe zusätzlich, dass der Zurück-Button des Browsers auf der richtigen Seite landet.

## Fallback

`public/characters-page-1.json` enthält nur Seite 1 ohne Detaildaten. Ist die API nicht erreichbar, lässt sich die Galerie damit anzeigen (`queryFn` auf `fetch("/characters-page-1.json")` umstellen), die Detailseite zeigt dann aber den Fehlerfall.
