# FamPlaner

Familien-App für den Alltag: Wer braucht was, wer schuldet wem was, wer hat bald Geburtstag.

- **Einkaufslisten** für die ganze Familie, mit Laden oder Marke ("Milch vom Edeka"), dazu private Listen
- **Unterwegs:** Bist du in der Nähe eines Ladens, zeigt die App, was die anderen dort noch brauchen
- **Schulden** eintragen, Rechnungen teilen, in Teilbeträgen zurückzahlen. Wer etwas für jemanden mitbringt und den Preis einträgt, erzeugt automatisch eine Schuld
- **Geburtstage** mit Erinnerung ab 14 Tagen vorher, bis man das Geschenk abhakt. Geschenkideen sehen alle außer dem Geburtstagskind

> Status: Projekt-Setup. Die App selbst wird gerade aufgebaut.

## Technik

| Teil | Technik |
|---|---|
| App | Expo (React Native) + TypeScript, ein Code für iPhone, Android und Web |
| Backend | Supabase: Postgres mit Row Level Security, Auth, Realtime, Edge Functions |
| Benachrichtigungen | Geofencing auf dem Gerät, Push über Expo Push Service |
| CI | GitHub Actions: Lint, Typecheck, Tests |

## Wie hier entwickelt wird

FamPlaner wird mit einem Team aus [Claude-Code](https://code.claude.com)-Subagenten gebaut.
Jeder Agent hat eine Rolle, eigene Werkzeuge und ein passendes Modell:

| Agent | Aufgabe | Modell |
|---|---|---|
| `backend` | Datenmodell, Migrationen, RLS, Edge Functions | Fable |
| `ui-designer` | Screens und Design, nutzt die Skills `frontend-design` und `webapp-testing` | Sonnet |
| `tester` | Tests schreiben und ausführen, ändert keinen App-Code | Sonnet |
| `reviewer` | Prüft jede Änderung, darf nichts schreiben | Opus |
| `docs` | Doku und Changelog | Haiku |

Ablauf pro Feature: Spec in `docs/spec/` → backend → ui-designer → tester → reviewer → docs → Pull Request.
Gemergt wird nur von einem Menschen.

- Projektregeln für alle Agenten: [`CLAUDE.md`](CLAUDE.md)
- Agenten: [`.claude/agents/`](.claude/agents)
- Skills: [`.claude/skills/`](.claude/skills)
- Feature-Specs: [`docs/spec/`](docs/spec) · Design-Briefing: [`docs/design/brief.md`](docs/design/brief.md)

## Lokal starten

Folgt, sobald die Expo-App angelegt ist. Schlüssel kommen in `.env.local` (Vorlage: [`.env.example`](.env.example)), niemals ins Repo.
