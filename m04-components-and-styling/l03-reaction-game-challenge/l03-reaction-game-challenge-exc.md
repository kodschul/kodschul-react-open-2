# Lab 4.3 – Übung: Mini-Challenge – Reaktionsspiel

**Dauer:** ca. 20 Minuten (Erweiterung, in Paaren)
**Arbeitsdatei:** `src/playground/App.tsx`
**Starter:** `src/starters/m04-l03-reaction-game.tsx`

## Vorbereitung

- `npm run dev` läuft in `output/project/`.
- Kopiere `src/starters/m04-l03-reaction-game.tsx` nach `src/playground/App.tsx`. Der Starter enthält Layout, den Typ `Status` und die Farbzuordnung `areaColor`, aber keine Logik.

## Aufgaben

1. Öffne `/playground` und lies den Starter: Welche Zustände hat `Status`, welche Farbe gehört zu welchem Zustand?
2. Lege `status` als State an (Startwert `"idle"`) und `reactionTime` als State (Zahl oder `null`). Leite den Text in der Fläche aus beiden Werten ab, ohne weiteren State.
3. Der Button „Start“ setzt `status` auf `"waiting"`. Danach wechselt `status` nach einer zufälligen Wartezeit zwischen 1 und 3 Sekunden auf `"ready"`. Speichere die ID des Timeouts in einem Ref.
4. Speichere im Moment des Wechsels auf `"ready"` die aktuelle Zeit (`performance.now()`) in einem zweiten Ref.
5. Ein Klick auf die Fläche in `"ready"` berechnet die Reaktionszeit in ganzen Millisekunden und setzt `status` auf `"result"`. Ein Klick in `"waiting"` setzt `status` auf `"tooSoon"` und bricht den Timeout ab.
6. Der Button startet in jedem Zustand eine neue Runde und bricht dabei einen eventuell noch laufenden Timeout ab. Beschrifte ihn nach der ersten Runde mit „Neue Runde“.
7. Ergänze einen Effekt, dessen Cleanup beim Verlassen der Komponente einen laufenden Timeout abbricht.
8. Spiele mehrere Runden, auch mit zu frühem Klick und schnellem Neustart, und prüfe `npm run lint`.

## Checkpoint

- Nach „Start“ ist die Fläche rot, nach 1–3 Sekunden grün.
- Ein Klick auf die grüne Fläche zeigt die Reaktionszeit in Millisekunden.
- Ein Klick auf die rote Fläche zeigt „Zu früh!“, die Fläche wird nicht mehr grün.
- Ein schneller Neustart führt nie zu zwei Grünsignalen in einer Runde.
- `npm run lint` meldet für die Datei keine Fehler.

## Abschlusskriterien

- Das Spiel ist in mehreren Runden spielbar.
- `status` und `reactionTime` sind State, Timeout-ID und Startzeit sind Refs.
- Im Komponentenkörper wird kein `ref.current` gelesen oder geschrieben.
- Es gibt keine Modulvariablen für Spielwerte und keinen `NodeJS`-Typ.
