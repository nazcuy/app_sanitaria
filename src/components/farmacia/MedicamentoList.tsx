import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  actualizarMedicamentoAsync,
  agregarMedicamentoAsync,
  alternarCompletado,
  eliminarMedicamentoAsync,
  obtenerMedicamentos
} from '@/src/store/slices/farmaciaSlice';
import { Medicamento } from '@/src/types/farmacia';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import MedicamentoForm from './MedicamentoForm';
import ItemMedicamento from './MedicamentoItem';

export default function ListaMedicamentos() {
  const medicamentos = useAppSelector(state => state.farmacia.medicamentos);
  const cargando = useAppSelector(state => state.farmacia.cargando);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [medicamentoEditando, setMedicamentoEditando] = useState<Medicamento | null>(null);


  useEffect(() => {
    dispatch(obtenerMedicamentos());
  }, [dispatch]);

  const manejarAlternarMedicamento = (id: string) => {
    dispatch(alternarCompletado(id));
  };

  const confirmarEliminarMedicamento = (id: string) => {
    Alert.alert(
      'Eliminar Medicamento',
      '¿Estás seguro de que quieres eliminar este medicamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            dispatch(eliminarMedicamentoAsync(id));
          }
        },
      ]
    );
  };

  const manejarAgregarMedicamento = () => {
    setMedicamentoEditando(null);
    setModalVisible(true);
  };

  const manejarEditar = (medicamento: Medicamento) => {
    setMedicamentoEditando(medicamento);
    setModalVisible(true);
  };

  const manejarGuardarMedicamento = (medicamento: Medicamento) => {
    if (medicamentoEditando) {
      dispatch(actualizarMedicamentoAsync({ 
        id: medicamento.id, 
        medicamento 
      }));
    } else {
      const { id, ...medicamentoSinId } = medicamento;
      dispatch(agregarMedicamentoAsync(medicamentoSinId));
    }
    setModalVisible(false);
    setMedicamentoEditando(null);
  };

  const manejarCancelar = () => {
    setModalVisible(false);
    setMedicamentoEditando(null);
  };

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title" style={estilos.titulo}>
        💊 Farmacia Comunitaria
      </ThemedText>
      
      <ThemedText style={estilos.subtitulo}>
        Gestiona tu inventario de medicamentos
      </ThemedText>

      {cargando && (
        <ThemedText style={estilos.cargando}>
          Cargando medicamentos...
        </ThemedText>
      )}

      <FlatList
        data={medicamentos}
        renderItem={({ item }) => (
          <ItemMedicamento 
            medicamento={item} 
            alAlternar={manejarAlternarMedicamento}
            alEliminar={confirmarEliminarMedicamento}
            alEditar={manejarEditar}
          />
        )}
        keyExtractor={item => item.id}
        style={estilos.lista}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={estilos.botonAgregar} 
        onPress={manejarAgregarMedicamento}
      >
        <ThemedText style={estilos.textoAgregar}>
          + Agregar Medicamento
        </ThemedText>
      </TouchableOpacity>

      {/* Modal para editar/agregar */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <MedicamentoForm
          medicamento={medicamentoEditando || undefined}
          onGuardar={manejarGuardarMedicamento}
          onCancelar={manejarCancelar}
        />
      </Modal>

    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
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
  cargando: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
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