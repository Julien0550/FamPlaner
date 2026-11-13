# Lokal einrichten

## Voraussetzungen
- Node.js 22 (siehe `.nvmrc`)
- Docker Desktop, für die lokale Supabase-Datenbank
- Auf dem Handy: die App **Expo Go**, zum Ausprobieren ohne eigenen Build

## Einmalig

```bash
npm install          # Supabase-CLI im Hauptordner
npm run setup        # Pakete der App
cp apps/mobile/.env.example apps/mobile/.env.local
```

## Starten

```bash
npm run db:start     # lokale Supabase starten (zeigt API-URL und anon-Key)
```

Die beiden Werte aus der Ausgabe (`API URL`, `anon key`) in `apps/mobile/.env.local` eintragen. Die Datei wird nie committet.

```bash
npm start            # App starten, QR-Code mit Expo Go scannen
npm run web          # oder im Browser
```

## Prüfen (wie die CI)

```bash
npm run check        # Lint, Typecheck, Tests
npm run db:reset     # Datenbank neu aus allen Migrationen aufbauen
npm run db:test      # SQL-Tests in supabase/tests/
```

## Pakete hinzufügen

In `apps/mobile` immer `npx expo install <paket>` statt `npm install` nutzen: So passt die Version zur Expo-SDK.
