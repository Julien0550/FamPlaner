# FamPlaner

Familien-App: geteilte Einkaufslisten (mit Laden/Marke), "Unterwegs"-Hinweise per GPS,
Schulden inkl. Teilzahlungen und Rechnung teilen, Geburtstage mit Erinnerungen und
Geschenkideen, die das Geburtstagskind nicht sieht.
Nutzer: Familie, iPhone und Android, Alter 18 bis 63+. Sprache der App: Deutsch.

## Stack
- App: Expo (React Native) + TypeScript, Expo Router
- Backend: Supabase (Postgres, Row Level Security, Edge Functions, Auth)
- Tests: Jest + React Native Testing Library (App), pgTAP oder SQL-Tests (Datenbank)
- CI: GitHub Actions

## Ordner
- `apps/mobile/`      Expo-App. Vor Arbeit dort zuerst `apps/mobile/AGENTS.md` lesen (Expo ändert sich mit jeder SDK-Version).
  - `src/app/`        nur Screens und Layouts (Expo Router: Datei = Route)
  - `src/components/` Bausteine · `src/api/` einziger Weg zu Supabase · `src/lib/` reine Logik · `src/theme/` Design-Tokens
- `supabase/migrations/` Datenbank-Änderungen, eine Datei pro Änderung, nie alte Migrationen ändern
- `supabase/functions/`  Edge Functions (Push, Geburtstags-Erinnerungen)
- `supabase/tests/`      SQL-Tests (pgTAP), vor allem für RLS-Regeln
- `docs/spec/`        Eine Datei pro Feature mit Akzeptanzkriterien (die Wahrheit)
- `docs/design/`      Design-Briefing (`brief.md`) und Token-Plan (`tokens.md`)
- `.claude/agents/`   Die Agenten · `.claude/skills/` Skills, die sie laden (siehe README dort)
- `docs/`             Architektur, Setup, Changelog

## Befehle
Alle aus dem Hauptordner:
- `npm run check` (= `npm run lint` + `npm run typecheck` + `npm test`), vor jedem Commit
- `npm run db:start` (lokale Supabase, braucht Docker) · `npm run db:reset` (Migrationen neu einspielen) · `npm run db:test` (SQL-Tests)
- `npx supabase migration new <name>` (neue Migration anlegen)
- `cd apps/mobile && npx expo start --web --port 8081` (Web-Version, z. B. für Screenshots)
- Pakete in der App: `cd apps/mobile && npx expo install <paket>`, nie `npm install <paket>`
- Einmalig für Screenshots: `pip install playwright && playwright install chromium`

## Regeln für alle
- Lies vor jeder Aufgabe die passende Datei in `docs/spec/`. Weicht etwas davon ab: nachfragen, nicht raten.
- Specs mit "Status: Entwurf" nicht umsetzen, bevor Ju sie freigegeben hat.
- TypeScript strict, keine `any`.
- Datenschutz: Private Listen und Geschenkideen für das Geburtstagskind werden per RLS geschützt, nicht nur im UI versteckt.
- Kleine Commits mit klarer Nachricht auf Deutsch, z. B. `feat(schulden): Teilzahlungen`.

## Secrets und Passwörter (ohne Ausnahme)
- Niemals API-Keys, Passwörter, Tokens oder Zugangsdaten in Code, Tests, Doku, Commits oder Commit-Nachrichten schreiben.
- Alle Schlüssel stehen in `apps/mobile/.env.local`. `.env`-Dateien sind in `.gitignore` und werden nie committet.
- Welche Variablen es gibt, steht in `apps/mobile/.env.example`, nur mit Platzhaltern.
- Der Supabase `service_role`-Key gehört nur in Edge Functions bzw. GitHub Secrets, NIE in die App.
  In die App darf nur der öffentliche `anon`-Key (Schutz kommt über RLS).
- Vor jedem Commit `git diff --staged` prüfen. Taucht ein Key auf: Commit abbrechen und Ju Bescheid geben.
- Wurde ein Key doch committet: nicht still löschen, sondern Ju sofort melden. Der Key muss bei Supabase neu erzeugt werden,
  weil er in der Git-Historie bleibt.
- Für Tests nur erfundene Werte verwenden.

## Ablauf für ein Feature (für den Haupt-Agenten)
Du koordinierst und schreibst selbst keinen Feature-Code.
1. Spec lesen (`docs/spec/<feature>.md`) und einen kurzen Plan machen. Plan mir zeigen.
2. `backend`-Agent: Datenmodell, Migration, RLS, ggf. Edge Function.
3. `ui-designer`-Agent: Screens und Komponenten.
4. `tester`-Agent: Tests schreiben und ausführen.
   Rot? Fehlerbericht an `backend` bzw. `ui-designer` zurück, dann erneut testen.
5. `reviewer`-Agent: Diff prüfen. Funde mit Schweregrad "hoch" werden behoben, dann erneut reviewen.
6. `docs`-Agent: Doku und Changelog aktualisieren.
7. `npm run check` muss grün sein. Dann Branch pushen und Pull Request öffnen (Vorlage füllen). Gemergt wird nur von Ju.
   `main` ist geschützt: Direkte Pushes auf `main` gehen nicht und sollen auch nicht versucht werden.
