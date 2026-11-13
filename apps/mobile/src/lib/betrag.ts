/**
 * Geldbeträge in FamPlaner: Eingabe im deutschen Format lesen und anzeigen.
 * Beträge werden intern als Zahl in Euro mit höchstens zwei Nachkommastellen geführt.
 */

const euroFormat = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

/**
 * Liest eine Betragseingabe wie "1,29", "12", "1.234,50", "100 €" oder "2.5".
 * Gibt den Betrag gerundet auf Cent zurück, oder null, wenn die Eingabe kein gültiger Betrag ist.
 * Negative Beträge sind ungültig.
 */
export function parseBetrag(eingabe: string): number | null {
  let text = eingabe.replace(/[\s €]/g, '');
  if (text === '') return null;

  const hatKomma = text.includes(',');
  const hatPunkt = text.includes('.');

  if (hatKomma && hatPunkt) {
    // "1.234,50": Punkt trennt Tausender, Komma ist das Dezimalzeichen
    text = text.replace(/\./g, '').replace(',', '.');
  } else if (hatKomma) {
    text = text.replace(',', '.');
  } else if (hatPunkt && /^\d{1,3}(\.\d{3})+$/.test(text)) {
    // "1.234": Punkt als Tausendertrennzeichen
    text = text.replace(/\./g, '');
  }

  if (!/^\d+(\.\d+)?$/.test(text)) return null;

  const wert = Number(text);
  if (!Number.isFinite(wert)) return null;
  return Math.round(wert * 100) / 100;
}

/** Zeigt einen Betrag im deutschen Format, z. B. "12,50 €". */
export function formatBetrag(betrag: number): string {
  return euroFormat.format(betrag);
}
