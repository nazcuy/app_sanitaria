// app/(tabs)/farmacia/carrito.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function CarritoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">🛒 Carrito de Compras</ThemedText>
      <ThemedText>Aquí irán los medicamentos en el carrito</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});