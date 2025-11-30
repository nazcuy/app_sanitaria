import { Medicamento } from '@/types/farmacia';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ItemCarrito {
    medicamento: Medicamento;
    cantidad: number;
}

interface EstadoCarrito {
    items: ItemCarrito[];
    total: number;
}

const estadoInicial: EstadoCarrito = {
    items: [],
    total: 0,
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
    },
    });

    export const {
    agregarAlCarrito,
    quitarDelCarrito,
    modificarCantidad,
    limpiarCarrito,
} = carritoSlice.actions;

export default carritoSlice.reducer;