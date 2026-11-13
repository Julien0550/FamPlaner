# Architektur

FamPlaner ist "Backend as a Service": kein eigener Server. Die App spricht direkt mit Supabase,
die Sicherheit liegt in den Row-Level-Security-Regeln der Datenbank.

```
 App (Expo / React Native, TypeScript)        ein Code → iPhone · Android · Web
  ├─ src/app/        Screens (Expo Router, Datei = Route)
  ├─ src/components/ wiederverwendbare Bausteine
  ├─ src/api/        einziger Weg zu Supabase
  ├─ src/lib/        reine Logik (z. B. Beträge), gut testbar
  └─ src/theme/      Design-Tokens (kommt mit dem ersten UI-Feature)
        │  supabase-js mit anon-Key + Login
        ▼
 Supabase
  ├─ Auth            E-Mail-Code, Familien-Einladungscode
  ├─ Postgres + RLS  wer darf was sehen
  ├─ Realtime        Listen live bei allen
  └─ Edge Functions  + Cron: Geburtstags-Erinnerungen, Push
        │
        ▼
 Expo Push Service → APNs (iPhone) / FCM (Android)
```

## Entscheidungen

| Entscheidung | Warum |
|---|---|
| Expo statt Flutter | TypeScript statt neuer Sprache, Web-Version gratis dazu, EAS baut iOS ohne Mac |
| Supabase statt Firebase | Postgres und SQL, RLS als prüfbare Regeln, Migrationen als Dateien im Repo |
| Datenzugriff nur über `src/api/` | Screens bleiben testbar, Datenmodell an einer Stelle |
| "Unterwegs" per Geofencing auf dem Gerät | Standort verlässt das Handy nicht, der Server erfährt nur "was wird bei Laden X gebraucht" |
| Geburtstags-Erinnerung vom Server | funktioniert auch, wenn die App lange nicht geöffnet wurde |

## Datenmodell (geplant, entsteht Feature für Feature)

- `families`, `members` (Name, Geburtstag, Avatarfarbe, verknüpft mit Login)
- `items` (was, für wen, Laden/Marke, privat, erledigt von, Preis)
- `debts` (von, an, Betrag, Art: Schuld / Teilzahlung / geteilt, beglichen)
- `gifts` (für wen, Idee, kauft wer). RLS blendet sie für das Geburtstagskind aus.
- `birthday_checks` (wer hat für wen in welchem Jahr ein Geschenk)
- `stores` (Läden der Familie mit GPS-Punkt), `push_tokens`

## Umgebungen

| | App | Datenbank |
|---|---|---|
| Lokal | `npm start` / `npm run web` | `npm run db:start` (Docker) |
| CI | Lint, Typecheck, Jest, Web-Build | Postgres im Container, Migrationen, pgTAP |
| Produktion | EAS Build → TestFlight / APK, Web statisch (z. B. Netlify) | Supabase-Projekt (Free-Plan) |
