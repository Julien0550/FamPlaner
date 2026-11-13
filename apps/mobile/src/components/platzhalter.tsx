import { StyleSheet, Text, View } from 'react-native';

type Props = {
  titel: string;
  beschreibung: string;
};

/**
 * Vorläufiger Inhalt für Bereiche, die noch nicht gebaut sind.
 * Wird ersetzt, sobald das jeweilige Feature aus docs/spec/ umgesetzt ist.
 */
export function Platzhalter({ titel, beschreibung }: Props) {
  return (
    <View style={styles.container} accessibilityRole="summary">
      <Text style={styles.titel} accessibilityRole="header">
        {titel}
      </Text>
      <Text style={styles.beschreibung}>{beschreibung}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  titel: {
    fontSize: 24,
    fontWeight: '700',
  },
  beschreibung: {
    fontSize: 16,
    lineHeight: 22,
  },
});
