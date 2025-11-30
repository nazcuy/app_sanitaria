import { medicamentosService } from '@/src/services/firebase/database';
import { Medicamento } from '@/src/types/farmacia';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


export const obtenerMedicamentos = createAsyncThunk(
  'farmacia/obtenerMedicamentos',
  async () => {
    return await medicamentosService.obtenerMedicamentos();
  }
);

export const agregarMedicamentoAsync = createAsyncThunk(
  'farmacia/agregarMedicamentoAsync',
  async (medicamento: Omit<Medicamento, 'id'>) => {
    const id = await medicamentosService.agregarMedicamento(medicamento);
    return { id, ...medicamento };
  }
);

export const actualizarMedicamentoAsync = createAsyncThunk(
  'farmacia/actualizarMedicamentoAsync',
  async ({ id, medicamento }: { id: string, medicamento: Partial<Medicamento> }) => {
    await medicamentosService.actualizarMedicamento(id, medicamento);
    return { id, ...medicamento };
  }
);

export const eliminarMedicamentoAsync = createAsyncThunk(
  'farmacia/eliminarMedicamentoAsync',
  async (id: string) => {
    await medicamentosService.eliminarMedicamento(id);
    return id;
  }
);

interface EstadoFarmacia {
    medicamentos: Medicamento[];
    cargando: boolean;
    error: string | null;
}

const estadoInicial: EstadoFarmacia = {
    medicamentos: [],
    cargando: false,
    error: null,
};

const farmaciaSlice = createSlice({
    name: 'farmacia',
    initialState: estadoInicial,
    reducers: {
        alternarCompletado: (state, action: PayloadAction<string>) => {
            const medicamento = state.medicamentos.find(
                med => med.id === action.payload
            );
            if (medicamento) {
                medicamento.completado = !medicamento.completado;
            }
        },
    },
    extraReducers: (constructor) => {
        constructor
            .addCase(obtenerMedicamentos.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(obtenerMedicamentos.fulfilled, (state, action) => {
                state.cargando = false;
                state.medicamentos = action.payload;
            })
            .addCase(obtenerMedicamentos.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.error.message || 'Error cargando medicamentos';
            })
            .addCase(agregarMedicamentoAsync.fulfilled, (state, action) => {
                state.medicamentos.push(action.payload);
            })
            .addCase(actualizarMedicamentoAsync.fulfilled, (state, action) => {
                const indice = state.medicamentos.findIndex(med => med.id === action.payload.id);
                if (indice !== -1) {
                    state.medicamentos[indice] = { ...state.medicamentos[indice], ...action.payload };
                }
            })
            .addCase(eliminarMedicamentoAsync.fulfilled, (state, action) => {
                state.medicamentos = state.medicamentos.filter(med => med.id !== action.payload);
            });
    }
});

export const {
    alternarCompletado,
} = farmaciaSlice.actions;

export default farmaciaSlice.reducer;