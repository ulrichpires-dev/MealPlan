import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { supabase } from '@/lib/supabase';

type AuthMode = 'signIn' | 'signUp';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  const isSigningUp = mode === 'signUp';

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setPassword('');
    setPasswordConfirmation('');
    setErrorMessage('');
    setNotice('');
  }

  async function submit() {
    setErrorMessage('');
    setNotice('');

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setErrorMessage('Enter your email address and password to continue.');
      return;
    }

    if (isSigningUp && password !== passwordConfirmation) {
      setErrorMessage('The passwords do not match. Please check them and try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSigningUp) {
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        if (!data.session) {
          setNotice('Account created. Check your email to confirm your address, then sign in.');
          setMode('signIn');
          setPassword('');
          setPasswordConfirmation('');
        }
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) setErrorMessage(error.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Image
              source={require('../../assets/images/MealPlan_ Frische Küche zuhause.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="MealPlan logo"
            />

            <Text style={styles.title}>{isSigningUp ? 'Create your account' : 'Welcome back'}</Text>
            <Text style={styles.subtitle}>
              {isSigningUp
                ? 'Create a private account to keep your meals with you.'
                : 'Sign in to see your personal MealPlan space.'}
            </Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                accessibilityLabel="Email address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#9A8A7A"
                returnKeyType="next"
                style={styles.input}
                textContentType="emailAddress"
                value={email}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                autoComplete={isSigningUp ? 'new-password' : 'current-password'}
                onChangeText={setPassword}
                onSubmitEditing={() => {
                  if (!isSigningUp) void submit();
                }}
                placeholder={isSigningUp ? 'Create a password' : 'Enter your password'}
                placeholderTextColor="#9A8A7A"
                returnKeyType={isSigningUp ? 'next' : 'go'}
                secureTextEntry
                style={styles.input}
                textContentType={isSigningUp ? 'newPassword' : 'password'}
                value={password}
              />

              {isSigningUp && (
                <>
                  <Text style={styles.label}>Confirm password</Text>
                  <TextInput
                    accessibilityLabel="Confirm password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    onChangeText={setPasswordConfirmation}
                    onSubmitEditing={() => void submit()}
                    placeholder="Enter the password again"
                    placeholderTextColor="#9A8A7A"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    textContentType="newPassword"
                    value={passwordConfirmation}
                  />
                </>
              )}

              {!!errorMessage && (
                <Text accessibilityRole="alert" style={styles.errorMessage}>
                  {errorMessage}
                </Text>
              )}
              {!!notice && <Text style={styles.notice}>{notice}</Text>}

              <Pressable
                accessibilityRole="button"
                disabled={isSubmitting}
                onPress={() => void submit()}
                style={({ pressed }) => [
                  styles.submitButton,
                  pressed && !isSubmitting && styles.buttonPressed,
                  isSubmitting && styles.buttonDisabled,
                ]}>
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {isSigningUp ? 'Create account' : 'Sign in'}
                  </Text>
                )}
              </Pressable>
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={isSubmitting}
              onPress={() => switchMode(isSigningUp ? 'signIn' : 'signUp')}
              style={styles.modeButton}>
              <Text style={styles.modeText}>
                {isSigningUp ? 'Already have an account? ' : 'New to MealPlan? '}
                <Text style={styles.modeAction}>{isSigningUp ? 'Sign in' : 'Create an account'}</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  logo: {
    width: 170,
    height: 125,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#14532D',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6D4C41',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
  },
  form: {
    gap: 10,
  },
  label: {
    color: '#14532D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#D9C9B8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#332A22',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  submitButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#2E7D32',
    marginTop: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.86,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorMessage: {
    color: '#A12B22',
    lineHeight: 20,
    marginTop: 4,
  },
  notice: {
    color: '#14532D',
    lineHeight: 20,
    marginTop: 4,
  },
  modeButton: {
    alignItems: 'center',
    paddingVertical: 22,
  },
  modeText: {
    color: '#6D4C41',
    fontSize: 15,
    textAlign: 'center',
  },
  modeAction: {
    color: '#14532D',
    fontWeight: '700',
  },
});
