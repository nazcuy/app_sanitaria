import { usuarioService } from '@/src/services/firebase/database';
import { UsuarioPerfil } from '@/src/types/farmacia';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const cargarPerfil = createAsyncThunk(
    'usuario/cargarPerfil',
    async (userId: string, { rejectWithValue }) => {
        try {
            const perfil = await usuarioService.obtenerPerfil(userId);
            if (!perfil) {
                return rejectWithValue('Perfil no encontrado');
            }
            return perfil;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error cargando perfil');
        }
    }
);

export const guardarPerfil = createAsyncThunk(
    'usuario/guardarPerfil',
    async (args: { userId: string; perfil: Omit<UsuarioPerfil, 'id'> }, { rejectWithValue }) => {
        try {
            await usuarioService.guardarPerfil(args.userId, args.perfil);
            return { id: args.userId, ...args.perfil };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error guardando perfil');
        }
    }
);

interface EstadoUsuario {
    perfil: UsuarioPerfil | null;
    cargando: boolean;
    error: string | null;
}

const estadoInicial: EstadoUsuario = {
    perfil: null,
    cargando: false,
    error: null,
};

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: estadoInicial,
    reducers: {
        limpiarPerfil: (state) => {
            state.perfil = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(cargarPerfil.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(cargarPerfil.fulfilled, (state, action) => {
                state.cargando = false;
                state.perfil = action.payload;
                state.error = null;
            })
            .addCase(cargarPerfil.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.payload as string;
            })
            .addCase(guardarPerfil.pending, (state) => {
                state.cargando = true;
                state.error = null;
            })
            .addCase(guardarPerfil.fulfilled, (state, action) => {
                state.cargando = false;
                state.perfil = action.payload;
                state.error = null;
            })
            .addCase(guardarPerfil.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.payload as string;
            });
    }
});

export const { limpiarPerfil, clearError } = usuarioSlice.actions;
export default usuarioSlice.reducer;