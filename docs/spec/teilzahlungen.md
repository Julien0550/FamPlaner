# Feature: Teilzahlungen

## Ziel
Wer jemandem Geld schuldet, kann die Schuld in mehreren Raten zurückzahlen.

## Akzeptanzkriterien
- [ ] Im Schulden-Bereich hat jede Person mit offenem Betrag einen Button "Teilzahlung".
- [ ] Beim Eintragen zeigt die App live: "Danach noch offen: X €".
- [ ] Beträge mit Komma ("100,50") werden korrekt verstanden.
- [ ] Ein Betrag größer als die offene Schuld wird abgelehnt, mit Hinweis auf den offenen Betrag.
- [ ] Entspricht der Betrag genau der offenen Schuld, ist die Schuld komplett beglichen.
- [ ] Der Stand zeigt den Restbetrag und darunter "X € schon bezahlt".
- [ ] Zahlungen erscheinen in der Liste der offenen Posten mit Datum und optionaler Notiz.
- [ ] Funktioniert in beide Richtungen (ich zahle / mir wird gezahlt).
- [ ] Nur die beiden beteiligten Personen und die Familie sehen den Posten, niemand außerhalb der Familie.

## Nicht Teil davon
- Zinsen, Ratenpläne, Erinnerungen an Zahlungen.
