import { formatBetrag, parseBetrag } from '../betrag';

describe('parseBetrag', () => {
  it.each([
    ['1,29', 1.29],
    ['12', 12],
    ['100 €', 100],
    ['  7,5 ', 7.5],
    ['1.234,50', 1234.5],
    ['1.234', 1234],
    ['2.5', 2.5],
    ['0,005', 0.01],
    ['0', 0],
  ])('liest "%s" als %p', (eingabe, erwartet) => {
    expect(parseBetrag(eingabe)).toBe(erwartet);
  });

  it.each(['', '   ', 'abc', '-5', '1,2,3', '12,-', '€'])('lehnt "%s" ab', (eingabe) => {
    expect(parseBetrag(eingabe)).toBeNull();
  });
});

describe('formatBetrag', () => {
  it('zeigt Beträge im deutschen Format', () => {
    // Intl setzt ein geschütztes Leerzeichen vor das Euro-Zeichen
    expect(formatBetrag(12.5)).toBe('12,50 €');
    expect(formatBetrag(1234.5)).toBe('1.234,50 €');
  });
});
