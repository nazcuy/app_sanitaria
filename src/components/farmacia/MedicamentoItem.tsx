import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useAppDispatch } from '@/store/hooks';
import { agregarAlCarrito } from '@/store/slices/carritoSlice';
import { Medicamento } from '@/types/farmacia';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface MedicamentoItemProps {
  medicamento: Medicamento;
  alAlternar: (id: string) => void;
  alEliminar: (id: string) => void;
  alEditar: (medicamento: Medicamento) => void;
}

export default function MedicamentoItem({ 
  medicamento, 
  alAlternar, 
  alEliminar, 
  alEditar 
}: MedicamentoItemProps) {
  const dispatch = useAppDispatch();
  const manejarAgregarAlCarrito = () => {
    dispatch(agregarAlCarrito(medicamento));
  };
  
  return (
    <ThemedView style={[
      styles.item, 
      medicamento.completado && styles.itemCompletado
    ]}>
      <TouchableOpacity 
        onPress={() => alAlternar(medicamento.id)} 
        style={styles.contenido}
      >
        <ThemedText type="defaultSemiBold" style={styles.nombre}>
          {medicamento.nombre}
        </ThemedText>
        <ThemedText style={styles.detalles}>
          {medicamento.categoria} • ${medicamento.precio}
        </ThemedText>
        <ThemedText style={styles.stock}>
          Stock: {medicamento.stock} unidades
        </ThemedText>
        {medicamento.descripcion && (
          <ThemedText style={styles.descripcion}>
            {medicamento.descripcion}
          </ThemedText>
        )}
      </TouchableOpacity>

      <ThemedView style={styles.botonesContainer}>
        <TouchableOpacity 
          onPress={manejarAgregarAlCarrito}
          style={styles.botonCarrito}
        >
          <ThemedText style={styles.textoBoton}>🛒</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => alEditar(medicamento)}
          style={styles.botonEditar}
        >
          <ThemedText style={styles.textoBoton}>Editar</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => alEliminar(medicamento.id)}
          style={styles.botonEliminar}
        >
          <ThemedText style={styles.textoBoton}>Eliminar</ThemedText>
        </TouchableOpacity>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemCompletado: {
    backgroundColor: '#f0f8f0',
    opacity: 0.7,
  },
  contenido: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  detalles: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  stock: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  botonCarrito: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  botonEditar: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  botonEliminar: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
  },
  textoBoton: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});