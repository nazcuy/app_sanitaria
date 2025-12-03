import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  cargarCarritoCompleto,
  modificarCantidad,
  quitarDelCarrito
} from '@/src/store/slices/carritoSlice';
import { obtenerMedicamentos } from '@/src/store/slices/farmaciaSlice';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CarritoScreen() {
  const carrito = useAppSelector((state) => state.carrito);
  const { user } = useAppSelector((state) => state.auth);
  const { medicamentos } = useAppSelector((state) => state.farmacia);
  const dispatch = useAppDispatch();

  const [sincronizando, setSincronizando] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (medicamentos.length === 0) {
      dispatch(obtenerMedicamentos());
    }
  }, []);

  useEffect(() => {
    const cargarCarritoUsuario = async () => {
      if (user && medicamentos.length > 0) {
        setCargando(true);
        try {
          const carritoGuardado = await carritoPersistenteService.obtenerCarrito(user.uid);
          
          if (carritoGuardado && carritoGuardado.items.length > 0) {
            const itemsCompletos = carritoGuardado.items.map(itemFirebase => {
              const medicamentoCompleto = medicamentos.find(m => m.id === itemFirebase.medicamentoId);
              
              if (!medicamentoCompleto) {
                console.warn(`Medicamento con ID ${itemFirebase.medicamentoId} no encontrado`);
                return null;
              }
              
              return {
                medicamento: medicamentoCompleto,
                cantidad: itemFirebase.cantidad
              };
            }).filter(item => item !== null);
            
            dispatch(cargarCarritoCompleto(itemsCompletos));
          }
        } catch (error) {
          console.log('Error cargando carrito desde Firebase:', error);
        }
        setCargando(false);
      }
    };

    cargarCarritoUsuario();
  }, [user, medicamentos]);

  useEffect(() => {
    const guardarCarrito = async () => {
      if (user && carrito.items.length > 0) {
        setSincronizando(true);
        try {
          const itemsFirebase = carrito.items.map(item => ({
            medicamentoId: item.medicamento.id,
            cantidad: item.cantidad,
            precioUnitario: item.medicamento.precio
          }));
          
          await carritoPersistenteService.guardarCarrito(user.uid, itemsFirebase);
        } catch (error) {
          console.log('Error guardando carrito en Firebase:', error);
        }
        setSincronizando(false);
      }
    };

    const timeoutId = setTimeout(guardarCarrito, 1000);
    return () => clearTimeout(timeoutId);
  }, [carrito.items, user]);

  const manejarQuitarItem = (id: string) => {
    dispatch(quitarDelCarrito(id));
  }

  const manejarModificarCantidad = (id: string, nuevaCantidad: number) => {
    dispatch(modificarCantidad({ id, cantidad: nuevaCantidad }));
  };

  if (!user) {
    return (
      <ThemedView style={estilos.contenedor}>
        <ThemedText type="title">🛒 Carrito de Compras</ThemedText>
        <ThemedText style={estilos.mensaje}>
          Inicia sesión para guardar tu carrito y verlo en cualquier dispositivo.
        </ThemedText>
        <ThemedText style={estilos.nota}>
          Puedes agregar items al carrito, pero se perderán al cerrar la app.
        </ThemedText>
      </ThemedView>
    );
  }

  if (cargando) {
    return (
      <ThemedView style={estilos.contenedor}>
        <ActivityIndicator size="large" color="#2196F3" />
        <ThemedText style={estilos.mensaje}>
          Cargando tu carrito guardado...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title">🛒 Carrito de Compras</ThemedText>
      
      {sincronizando && (
        <View style={estilos.sincronizandoContainer}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <ThemedText style={estilos.sincronizandoText}>
            Guardando en la nube...
          </ThemedText>
        </View>
      )}
      
      {carrito.items.length === 0 ? (
        <ThemedText style={estilos.mensaje}>
          El carrito está vacío.
        </ThemedText>
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
            <ThemedText style={estilos.nota}>
              ✅ Carrito guardado para {user.email}
            </ThemedText>
            <ThemedText style={estilos.notaPequeña}>
              Se guarda automáticamente en Firebase
            </ThemedText>
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
  mensaje: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    opacity: 0.6,
  },
  sincronizandoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  sincronizandoText: {
    color: '#4CAF50',
    marginLeft: 10,
    fontSize: 14,
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
  nota: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  notaPequeña: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
});