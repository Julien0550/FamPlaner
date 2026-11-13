import { render, screen } from '@testing-library/react-native';

import { Platzhalter } from '../platzhalter';

describe('Platzhalter', () => {
  it('zeigt Titel und Beschreibung', async () => {
    await render(<Platzhalter titel="Geburtstage" beschreibung="Kommt bald." />);

    expect(screen.getByText('Geburtstage')).toBeTruthy();
    expect(screen.getByText('Kommt bald.')).toBeTruthy();
  });
});
