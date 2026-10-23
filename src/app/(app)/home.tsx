import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '@/providers/auth-provider';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const { session } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setErrorMessage('');
    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
      setIsSigningOut(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>MEALPLAN</Text>
        <Text style={styles.title}>You’re signed in</Text>
        <Text style={styles.email}>{session?.user.email}</Text>
        <Text style={styles.description}>
          Your account is ready. Your personal meal library will be built here next.
        </Text>
      </View>

      {!!errorMessage && <Text accessibilityRole="alert" style={styles.errorMessage}>{errorMessage}</Text>}

      <Pressable
        accessibilityRole="button"
        disabled={isSigningOut}
        onPress={() => void signOut()}
        style={({ pressed }) => [styles.signOutButton, pressed && styles.buttonPressed]}>
        <Text style={styles.signOutText}>{isSigningOut ? 'Signing out…' : 'Sign out'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFF4E6',
  },
  card: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  eyebrow: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: '#14532D',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
  },
  email: {
    color: '#6D4C41',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    color: '#6D4C41',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 18,
  },
  errorMessage: {
    color: '#A12B22',
    textAlign: 'center',
    marginTop: 16,
  },
  signOutButton: {
    alignSelf: 'center',
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  signOutText: {
    color: '#14532D',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
