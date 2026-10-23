import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#2E7D32" size="large" />
      <Text style={styles.label}>Checking your account…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: '#FFF4E6',
  },
  label: {
    color: '#6D4C41',
    fontSize: 15,
  },
});
