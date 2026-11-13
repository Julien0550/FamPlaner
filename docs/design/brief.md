# Design-Briefing PlanFam

Dieses Briefing ist für den `ui-designer` die verbindliche Vorgabe ("the brief" im Sinne der
frontend-design-Skill). Was hier festgelegt ist, gilt. Was hier offen ist, darf der Designer entscheiden.

## Worum es geht
- **Produkt:** Familien-App für geteilte Einkaufslisten, "Unterwegs"-Hinweise am Laden, Schulden mit Teilzahlungen
  und Geburtstage mit geheimen Geschenkideen.
- **Publikum:** eine Familie, 18 bis über 63 Jahre, iPhone und Android. Nicht alle sind technikaffin.
- **Hauptaufgabe der App:** in 5 Sekunden sehen, wer was braucht, und es abhaken.
- **Gefühl:** Küchentisch, Kühlschrankzettel, "ich bring dir was mit". Warm und hilfsbereit, nicht nach Banking-App.

## Festgelegt
- **Hauptfarbe:** Blau mit Babyblau als Flächenfarbe. Konkrete Werte legt der Designer im Token-Plan fest.
- **Hell- und Dunkelmodus**, in den Einstellungen umschaltbar (Automatisch / Hell / Dunkel).
- **Schriftgröße umschaltbar** (Normal / Groß). Alles muss bei "Groß" noch funktionieren.
- **Touch-Ziele mindestens 44 pt**, Kontrast nach WCAG AA.
- **Sprache:** Deutsch, Du-Form, kurze Sätze. Beträge im deutschen Format (`12,50 €`).
- **Navigation:** Tab-Leiste unten mit Liste, Unterwegs, Geld, Geburtstage.

## Offen (Designer entscheidet und begründet im Token-Plan)
- Schriftart(en), passend zu Expo (`expo-font` / `@expo-google-fonts`)
- Form der Listeneinträge, Abhak-Animation, Icons
- Wie das "Unterwegs"-Erlebnis aussieht ("Edeka in der Nähe? Mama braucht noch Milch!")

## Nicht gewollt
- Banking- oder Dashboard-Look mit großen Zahlenkacheln
- Emojis als Icons
- Alles in identischen Karten mit gleichem Schatten
