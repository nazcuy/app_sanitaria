// components/farmacia/MedicamentoItem.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Medicamento } from '@/types/farmacia';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface MedicamentoItemProps {
  medicamento: Medicamento;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MedicamentoItem({ medicamento, onToggle, onDelete }: MedicamentoItemProps) {
  return (
    <ThemedView style={[styles.item, medicamento.completado && styles.itemCompletado]}>
      <TouchableOpacity onPress={() => onToggle(medicamento.id)} style={styles.contenido}>
        <ThemedText type="defaultSemiBold" style={styles.nombre}>
          {medicamento.nombre}
        </ThemedText>
        <ThemedText style={styles.detalles}>
          {medicamento.categoria} - ${medicamento.precio} - Stock: {medicamento.stock}
        </ThemedText>
        <ThemedText style={styles.descripcion}>
          {medicamento.descripcion}
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(medicamento.id)} style={styles.botonEliminar}>
        <ThemedText style={styles.textoEliminar}>Eliminar</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemCompletado: {
    backgroundColor: '#e0e0e0',
    opacity: 0.7,
  },
  contenido: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    marginBottom: 4,
  },
  detalles: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.6,
  },
  descripcion: {
    fontSize: 12,
    opacity: 0.6,
  },
  botonEliminar: {
    padding: 8,
    backgroundColor: '#ff3b30',
    borderRadius: 4,
    marginLeft: 10,
  },
  textoEliminar: {
    color: 'white',
    fontSize: 12,
  },
});