import { Tabs } from 'expo-router';

// Grundgerüst: die vier Bereiche als Tabs.
// Icons, Farben und Schrift kommen mit dem Token-Plan des ui-designers (docs/design/tokens.md).
export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Liste' }} />
      <Tabs.Screen name="unterwegs" options={{ title: 'Unterwegs' }} />
      <Tabs.Screen name="geld" options={{ title: 'Geld' }} />
      <Tabs.Screen name="geburtstage" options={{ title: 'Geburtstage' }} />
    </Tabs>
  );
}
