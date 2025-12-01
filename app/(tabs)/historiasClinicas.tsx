// app/(tabs)/salud/index.tsx
import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { StyleSheet } from 'react-native';

export default function SaludScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">📋 Historias Clínicas</ThemedText>
      <ThemedText>Aquí irá el listado de historias clínicas</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});