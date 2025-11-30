import { Medicamento } from '@/types/farmacia';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FarmaciaState {
    medicamentos: Medicamento[];
    cargando: boolean;
    error: string | null;
}

const initialState: FarmaciaState = {
    medicamentos: [],
    cargando: false,
    error: null,
};

const farmaciaSlice = createSlice({
    name: 'farmacia',
    initialState,
    reducers: {

        cargarMedicamentos: (state, action: PayloadAction<Medicamento[]>) => {
            state.medicamentos = action.payload;
            state.cargando = false;
            state.error = null;
        },

        agregarMedicamento: (state, action: PayloadAction<Medicamento>) => {
            state.medicamentos.push(action.payload);
        },

        actualizarMedicamento: (state, action: PayloadAction<Medicamento>) => {
            const index = state.medicamentos.findIndex(
            med => med.id === action.payload.id
        );
            if (index !== -1) {
            state.medicamentos[index] = action.payload;
        }
},

        eliminarMedicamento: (state, action: PayloadAction<string>) => {
            state.medicamentos = state.medicamentos.filter(
                med => med.id !== action.payload
        );
    },
    
        toggleCompletado: (state, action: PayloadAction<string>) => {
            const medicamento = state.medicamentos.find(
            med => med.id === action.payload
            );
            if (medicamento) {
        medicamento.completado = !medicamento.completado;
        }
    },
    
    setCargando: (state) => {
        state.cargando = true;
    },
    

    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.cargando = false;
    },
},
});

export const {
    cargarMedicamentos,
    agregarMedicamento,
    actualizarMedicamento,
    eliminarMedicamento,
    toggleCompletado,
    setCargando,
    setError,
} = farmaciaSlice.actions;

export default farmaciaSlice.reducer;