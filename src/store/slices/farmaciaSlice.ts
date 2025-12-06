import { medicamentosService } from '@/src/services/firebase/database';
import { Medicamento } from '@/src/types/farmacia';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const obtenerMedicamentos = createAsyncThunk(
  'farmacia/obtenerMedicamentos',
  async (_, { rejectWithValue }) => {
    try {
      return await medicamentosService.obtenerMedicamentos();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error cargando medicamentos');
    }
  }
);

export const agregarMedicamentoAsync = createAsyncThunk(
  'farmacia/agregarMedicamentoAsync',
  async (medicamento: Omit<Medicamento, 'id'>, { rejectWithValue }) => {
    try {
      const id = await medicamentosService.agregarMedicamento(medicamento);
      return { id, ...medicamento };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error agregando medicamento');
    }
  }
);

export const actualizarMedicamentoAsync = createAsyncThunk(
  'farmacia/actualizarMedicamentoAsync',
  async ({ id, medicamento }: { id: string, medicamento: Partial<Medicamento> }, { rejectWithValue }) => {
    try {
      await medicamentosService.actualizarMedicamento(id, medicamento);
      return { id, ...medicamento };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error actualizando medicamento');
    }
  }
);

export const eliminarMedicamentoAsync = createAsyncThunk(
  'farmacia/eliminarMedicamentoAsync',
  async (id: string, { rejectWithValue }) => {
    try {
      await medicamentosService.eliminarMedicamento(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error eliminando medicamento');
    }
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
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(obtenerMedicamentos.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(obtenerMedicamentos.fulfilled, (state, action) => {
                state.cargando = false;
                state.medicamentos = action.payload;
                state.error = null;
            })
            .addCase(obtenerMedicamentos.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.payload as string;
            })
            .addCase(agregarMedicamentoAsync.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(agregarMedicamentoAsync.fulfilled, (state, action) => {
                state.cargando = false;
                state.medicamentos.push(action.payload);
                state.error = null;
            })
            .addCase(agregarMedicamentoAsync.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.payload as string;
            })
            .addCase(actualizarMedicamentoAsync.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(actualizarMedicamentoAsync.fulfilled, (state, action) => {
                state.cargando = false;
                const indice = state.medicamentos.findIndex(med => med.id === action.payload.id);
                if (indice !== -1) {
                    state.medicamentos[indice] = { ...state.medicamentos[indice], ...action.payload };
                }
                state.error = null;
            })
            .addCase(actualizarMedicamentoAsync.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.payload as string;
            })
            .addCase(eliminarMedicamentoAsync.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(eliminarMedicamentoAsync.fulfilled, (state, action) => {
                state.cargando = false;
                state.medicamentos = state.medicamentos.filter(med => med.id !== action.payload);
                state.error = null;
            })
            .addCase(eliminarMedicamentoAsync.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    alternarCompletado,
    clearError
} = farmaciaSlice.actions;

export default farmaciaSlice.reducer;