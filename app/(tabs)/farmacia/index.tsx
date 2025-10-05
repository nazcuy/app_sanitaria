// app/(tabs)/farmacia/index.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function FarmaciaScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">💊 Farmacia Comunitaria</ThemedText>
      <ThemedText>Aquí irá el catálogo de medicamentos</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});