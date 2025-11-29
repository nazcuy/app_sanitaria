import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Medicamento, medicamentosEjemplo } from '@/types/farmacia';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import MedicamentoItem from './MedicamentoItem';

export default function MedicamentoList() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(medicamentosEjemplo);

  // Función para marcar como completado
  const toggleMedicamento = (id: string) => {
    setMedicamentos(medicamentos.map(med => 
      med.id === id ? { ...med, completado: !med.completado } : med
    ));
  };

  // Función para eliminar con confirmación
  const deleteMedicamento = (id: string) => {
    Alert.alert(
      'Eliminar Medicamento',
      '¿Estás seguro de que quieres eliminar este medicamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            setMedicamentos(medicamentos.filter(med => med.id !== id));
          }
        },
      ]
    );
  };

  // Función para agregar nuevo medicamento
  const addMedicamento = () => {
    const nuevoMedicamento: Medicamento = {
      id: Date.now().toString(),
      nombre: 'Nuevo Medicamento',
      categoria: 'General',
      precio: 0,
      stock: 0,
      descripcion: 'Descripción del medicamento',
      completado: false,
    };
    setMedicamentos([...medicamentos, nuevoMedicamento]);
  };

  // Función para editar (por ahora solo alerta)
  const handleEdit = (medicamento: Medicamento) => {
    Alert.alert(
      'Editar Medicamento',
      `Vas a editar: ${medicamento.nombre}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titulo}>
        💊 Farmacia Comunitaria
      </ThemedText>
      
      <ThemedText style={styles.subtitulo}>
        Gestiona tu inventario de medicamentos
      </ThemedText>

      {/* Lista optimizada con FlatList */}
      <FlatList
        data={medicamentos}
        renderItem={({ item }) => (
          <MedicamentoItem 
            medicamento={item} 
            onToggle={toggleMedicamento}
            onDelete={deleteMedicamento}
            onEdit={handleEdit}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.lista}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Botón para agregar */}
      <TouchableOpacity 
        style={styles.botonAgregar} 
        onPress={addMedicamento}
      >
        <ThemedText style={styles.textoAgregar}>
          + Agregar Medicamento
        </ThemedText>
      </TouchableOpacity>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    opacity: 0.8,
  },
  lista: {
    flex: 1,
  },
  botonAgregar: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoAgregar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});