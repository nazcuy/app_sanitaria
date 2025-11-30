import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { modificarCantidad, quitarDelCarrito } from '@/store/slices/carritoSlice';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CarritoScreen() {
  const carrito = useAppSelector((state) => state.carrito);
  const dispatch = useAppDispatch();

  const manejarQuitarItem = (id: string) => {
    dispatch(quitarDelCarrito(id));
  }

  const manejarModificarCantidad = (id: string, nuevaCantidad: number) => {
    dispatch(modificarCantidad({ id, cantidad: nuevaCantidad }));
  };

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">🛒 Carrito de Compras</ThemedText>
      {carrito.items.length === 0 ? (
        <ThemedText>El carrito está vacío.</ThemedText>
      ) : (
        <>
        <FlatList
          data={carrito.items}
          renderItem={({ item }) => (
            <View style={estilos.item}>
                <View style={estilos.infoItem}>
                  <ThemedText type="defaultSemiBold">{item.medicamento.nombre}</ThemedText>
                  <ThemedText>${item.medicamento.precio} c/u</ThemedText>
                </View>
                
                <View style={estilos.controlesCantidad}>
                  <TouchableOpacity 
                    style={estilos.botonCantidad}
                    onPress={() => manejarModificarCantidad(item.medicamento.id, item.cantidad - 1)}
                  >
                    <ThemedText style={estilos.textoBoton}>-</ThemedText>
                  </TouchableOpacity>
                  
                  <ThemedText style={estilos.cantidad}>{item.cantidad}</ThemedText>
                  
                  <TouchableOpacity 
                    style={estilos.botonCantidad}
                    onPress={() => manejarModificarCantidad(item.medicamento.id, item.cantidad + 1)}
                  >
                    <ThemedText style={estilos.textoBoton}>+</ThemedText>
                  </TouchableOpacity>
                </View>
                
                <ThemedText type="defaultSemiBold" style={estilos.subtotal}>
                  ${(item.medicamento.precio * item.cantidad).toFixed(2)}
                </ThemedText>
                
                <TouchableOpacity 
                  style={estilos.botonEliminar}
                  onPress={() => manejarQuitarItem(item.medicamento.id)}
                >
                  <ThemedText style={estilos.textoBoton}>🗑️</ThemedText>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.medicamento.id}
          />
          
          <View style={estilos.totalContainer}>
            <ThemedText type="title">Total: ${carrito.total.toFixed(2)}</ThemedText>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  carritoVacio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    opacity: 0.6,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  infoItem: {
    flex: 1,
  },
  controlesCantidad: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  botonCantidad: {
    backgroundColor: '#2196F3',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cantidad: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  subtotal: {
    marginHorizontal: 10,
    minWidth: 60,
  },
  botonEliminar: {
    padding: 5,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
});