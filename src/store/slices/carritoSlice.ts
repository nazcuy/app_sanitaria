import { carritoService } from '@/src/services/firebase/database';
import { ItemCarritoRedux, Medicamento } from '@/src/types/farmacia';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sincronizarCarrito = createAsyncThunk(
    'carrito/sincronizar',
    async (userId: string, { getState }) => {
        const state = getState() as { carrito: EstadoCarrito };
        const itemsFirebase = state.carrito.items.map(item => ({
            medicamentoId: item.medicamento.id,
            cantidad: item.cantidad,
            precioUnitario: item.medicamento.precio
        }));

        await carritoService.guardarCarrito(userId, itemsFirebase);
    }
);

export const cargarCarritoDesdeFirebase = createAsyncThunk(
    'carrito/cargar',
    async (args: { userId: string, medicamentos: Medicamento[] }) => {
        const { userId, medicamentos } = args;
        const carritoGuardado = await carritoService.obtenerCarrito(userId);
        if (carritoGuardado && carritoGuardado.items.length > 0) {
            const itemsCompletos = carritoGuardado.items.map(itemFirebase => {
                const medicamentoCompleto = medicamentos.find(m => m.id === itemFirebase.medicamentoId);

                if (!medicamentoCompleto) {
                    return null;
                }

                return {
                    medicamento: medicamentoCompleto,
                    cantidad: itemFirebase.cantidad
                } as ItemCarritoRedux;
            }).filter(item => item !== null) as ItemCarritoRedux[]; // Filtrar nulos

            return itemsCompletos;
        }
        return [];
    }
)

interface EstadoCarrito {
    items: ItemCarritoRedux[];
    total: number;
    cargando: boolean;
    error: string | null;
}

const estadoInicial: EstadoCarrito = {
    items: [],
    total: 0,
    cargando: false,
    error: null
};

const carritoSlice = createSlice({
    name: 'carrito',
    initialState: estadoInicial,
    reducers: {

        agregarAlCarrito: (state, action: PayloadAction<Medicamento>) => {
            const medicamento = action.payload;
            const itemExistente = state.items.find(item =>
                item.medicamento.id === medicamento.id
            );

            if (itemExistente) {
                itemExistente.cantidad += 1;
            } else {
                state.items.push({
                    medicamento,
                    cantidad: 1
                });
            }

            state.total = state.items.reduce((sum, item) => {
                return sum + (item.medicamento.precio * item.cantidad);
            }, 0);
        },

        quitarDelCarrito: (state, action: PayloadAction<string>) => {
            const idMedicamento = action.payload;
            state.items = state.items.filter(item =>
                item.medicamento.id !== idMedicamento
            );

            state.total = state.items.reduce((sum, item) => {
                return sum + (item.medicamento.precio * item.cantidad);
            }, 0);
        },

        modificarCantidad: (state, action: PayloadAction<{ id: string; cantidad: number }>) => {
            const { id, cantidad } = action.payload;
            const item = state.items.find(item => item.medicamento.id === id);

            if (item) {
                if (cantidad <= 0) {
                    state.items = state.items.filter(item => item.medicamento.id !== id);
                } else {
                    item.cantidad = cantidad;
                }
            }
            state.total = state.items.reduce((sum, item) => {
                return sum + (item.medicamento.precio * item.cantidad);
            }, 0);
        },

        limpiarCarrito: (state) => {
            state.items = [];
            state.total = 0;
        },

        cargarCarritoCompleto: (state, action: PayloadAction<ItemCarritoRedux[]>) => {
            state.items = action.payload;
            state.total = state.items.reduce((sum, item) => {
                return sum + (item.medicamento.precio * item.cantidad);
            }, 0);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(cargarCarritoDesdeFirebase.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(cargarCarritoDesdeFirebase.fulfilled, (state, action) => {
                state.cargando = false;
                state.items = action.payload;
                state.total = state.items.reduce((sum, item) => {
                    return sum + (item.medicamento.precio * item.cantidad);
                }, 0);
            })
            .addCase(cargarCarritoDesdeFirebase.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.error.message || 'Error cargando carrito';
            })
            .addCase(sincronizarCarrito.pending, (state) => {
            })
            .addCase(sincronizarCarrito.rejected, (state, action) => {
                console.error('Error sincronizando carrito:', action.error);
            });
    }
});

export const {
    agregarAlCarrito,
    quitarDelCarrito,
    modificarCantidad,
    limpiarCarrito,
    cargarCarritoCompleto,
} = carritoSlice.actions;

export default carritoSlice.reducer;