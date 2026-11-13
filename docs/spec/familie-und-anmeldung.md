# Feature: Familie und Anmeldung

> Status: Entwurf. Ju prüft die Kriterien, bevor die Agenten loslegen.
> Erstes Feature: Alle anderen (Listen, Schulden, Geburtstage) bauen darauf auf.

## Ziel
Jedes Familienmitglied meldet sich mit seiner E-Mail an, legt sein Profil an und ist danach
in genau einer Familie. Wer neu ist, gründet eine Familie oder tritt mit einem Einladungscode bei.

## Akzeptanzkriterien

### Anmelden
- [ ] Man gibt seine E-Mail-Adresse ein und bekommt einen 6-stelligen Code per E-Mail (kein Passwort, kein Link).
- [ ] Nach Eingabe des richtigen Codes ist man angemeldet und bleibt es auch nach App-Neustart.
- [ ] Falscher oder abgelaufener Code: klare Meldung, was zu tun ist ("Code stimmt nicht. Prüf die E-Mail oder fordere einen neuen an.").
- [ ] Man kann einen neuen Code anfordern.
- [ ] Abmelden geht über die Einstellungen.

### Profil
- [ ] Beim ersten Anmelden gibt man seinen Namen ein (Pflicht) und optional seinen Geburtstag.
- [ ] Name und Geburtstag lassen sich später in den Einstellungen ändern.
- [ ] Jedes Mitglied bekommt automatisch eine Farbe für seinen Avatar (Anfangsbuchstabe auf Farbe).

### Familie
- [ ] Ohne Familie sieht man zwei Wege: "Familie gründen" (mit Familienname) oder "Mit Code beitreten".
- [ ] Wer gründet, ist Mitglied und sieht den Einladungscode (6 Zeichen, gut vorlesbar, ohne 0/O und 1/I).
- [ ] Mit gültigem Code tritt man der Familie bei. Ungültiger Code: klare Meldung.
- [ ] Ein Mitglied ist in genau einer Familie.
- [ ] In den Einstellungen sieht man alle Mitglieder der eigenen Familie mit Name und Geburtstag.
- [ ] Der Einladungscode ist in den Einstellungen sichtbar und kann neu erzeugt werden (der alte gilt dann nicht mehr).

### Darstellung
- [ ] In den Einstellungen: Darstellung Automatisch / Hell / Dunkel und Schrift Normal / Groß. Bleibt auf dem Gerät gespeichert.

### Sicherheit (RLS, mit SQL-Tests)
- [ ] Mitglieder sehen nur ihre eigene Familie und deren Mitglieder. Andere Familien existieren für sie nicht.
- [ ] Jeder kann nur sein eigenes Profil ändern.
- [ ] Nicht angemeldete Nutzer sehen gar nichts.
- [ ] Den Einladungscode einer fremden Familie kann man nicht auslesen. Beitreten geht nur über eine Funktion,
      die den Code prüft (z. B. `join_family(code)`), nicht durch direktes Lesen der Tabelle.

## Technische Hinweise
- Supabase Auth mit E-Mail-OTP (`signInWithOtp`, dann `verifyOtp` mit `type: 'email'`).
  Die E-Mail-Vorlage muss `{{ .Token }}` enthalten, lokal in `supabase/config.toml`, online im Supabase-Dashboard.
- Lokal landen E-Mails im Inbucket/Mailpit von `supabase start` (URL steht in der Ausgabe), nicht in echten Postfächern.
- Die Hilfsfunktion "Familie des angemeldeten Nutzers" wird von allen späteren RLS-Regeln gebraucht. Sauber und getestet bauen.

## Nicht Teil davon
- Mehrere Familien pro Person, Rollen (Admin), Mitglieder entfernen
- Login mit Apple oder Google
- Push-Benachrichtigungen
