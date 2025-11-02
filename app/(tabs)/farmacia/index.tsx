import MedicamentoList from '@/components/farmacia/MedicamentoList';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

export default function FarmaciaScreen() {
  return (
    <ThemedView style={styles.container}>
      <MedicamentoList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});