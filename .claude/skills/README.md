# Skills

Skills sind Anleitungen, die Agenten vor der Arbeit in ihren Kontext laden.
Welcher Agent welche Skill lädt, steht im `skills:`-Feld seiner Datei in `.claude/agents/`.

| Skill | Quelle | Genutzt von | Zweck |
|---|---|---|---|
| `frontend-design` | anthropics/skills @ 2c5958e | ui-designer | Design-Vorgehen: Token-Plan, Prüfung gegen das Briefing, Selbstkritik |
| `webapp-testing` | anthropics/skills @ 2c5958e | ui-designer | Screenshots der Web-Version mit Playwright, um das eigene Design anzusehen |

Die Ordner sind unveränderte Kopien aus https://github.com/anthropics/skills (Apache-2.0, siehe LICENSE.txt im jeweiligen Ordner).
Bewusst als Kopie und nicht als Git-Submodul: So ändert sich das Verhalten der Agenten nur, wenn wir es per Pull Request wollen.

## Aktualisieren

```bash
git clone --depth 1 https://github.com/anthropics/skills.git /tmp/anthropic-skills
rm -rf .claude/skills/frontend-design .claude/skills/webapp-testing
cp -r /tmp/anthropic-skills/skills/frontend-design /tmp/anthropic-skills/skills/webapp-testing .claude/skills/
git -C /tmp/anthropic-skills rev-parse --short HEAD   # neuen Stand oben in der Tabelle eintragen
```

Danach den Diff lesen, bevor du committest: Skills sind Anweisungen an die Agenten.

## Nicht übernommen (passt nicht zu PlanFam)
- `brand-guidelines`: Anthropics eigene Markenfarben, PlanFam soll nicht wie Claude aussehen.
- `theme-factory`, `canvas-design`, `web-artifacts-builder`: für Folien, Poster und claude.ai-Artifacts, nicht für eine React-Native-App.
