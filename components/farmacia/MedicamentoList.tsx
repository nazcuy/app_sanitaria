// components/farmacia/MedicamentoList.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Medicamento, medicamentosEjemplo } from '@/types/farmacia';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MedicamentoItem from './MedicamentoItem';

export default function MedicamentoList() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>(medicamentosEjemplo);

  const toggleMedicamento = (id: string) => {
    setMedicamentos(medicamentos.map(med => 
      med.id === id ? { ...med, completado: !med.completado } : med
    ));
  };

  const deleteMedicamento = (id: string) => {
    setMedicamentos(medicamentos.filter(med => med.id !== id));
  };

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titulo}>Catálogo de Medicamentos</ThemedText>
      
      <FlatList
        data={medicamentos}
        renderItem={({ item }) => (
          <MedicamentoItem 
            medicamento={item} 
            onToggle={toggleMedicamento}
            onDelete={deleteMedicamento}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.lista}
      />
      
      <TouchableOpacity style={styles.botonAgregar} onPress={addMedicamento}>
        <ThemedText style={styles.textoAgregar}>+ Agregar Medicamento</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 40,
  },
  lista: {
    flex: 1,
  },
  botonAgregar: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textoAgregar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});