import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

// Nur öffentliche Werte: URL und anon-Key. Schutz der Daten kommt über RLS in der Datenbank.
// Der service_role-Key gehört NIE in die App (siehe CLAUDE.md).
// process.env.EXPO_PUBLIC_* muss wörtlich so dastehen, damit Expo die Werte beim Bauen einsetzt.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const istSupabaseEingerichtet = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

/**
 * Gibt den Supabase-Client zurück und legt ihn beim ersten Aufruf an.
 * Alle Datenzugriffe der App laufen über Funktionen in src/api/, nie direkt aus Screens.
 */
export function getSupabase(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase ist nicht eingerichtet. Trag EXPO_PUBLIC_SUPABASE_URL und ' +
        'EXPO_PUBLIC_SUPABASE_ANON_KEY in apps/mobile/.env.local ein (Vorlage: apps/mobile/.env.example).',
    );
  }

  if (!client) {
    const neuerClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Im Web nutzt Supabase automatisch localStorage.
        storage: Platform.OS === 'web' ? undefined : AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
      },
    });

    // Auf dem Handy die Anmeldung nur im Vordergrund erneuern.
    if (Platform.OS !== 'web') {
      AppState.addEventListener('change', (status) => {
        if (status === 'active') {
          neuerClient.auth.startAutoRefresh();
        } else {
          neuerClient.auth.stopAutoRefresh();
        }
      });
    }

    client = neuerClient;
  }

  return client;
}
