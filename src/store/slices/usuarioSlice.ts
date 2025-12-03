import { usuarioService } from '@/src/services/firebase/database'; // Nombre correcto
import { UsuarioPerfil } from '@/src/types/farmacia';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const cargarPerfil = createAsyncThunk(
    'usuario/cargarPerfil',
    async (userId: string) => {
        const perfil = await usuarioService.obtenerPerfil(userId);
        return perfil;
    }
);

export const guardarPerfil = createAsyncThunk(
    'usuario/guardarPerfil',
    async (args: { userId: string; perfil: Omit<UsuarioPerfil, 'id'> }) => {
        await usuarioService.guardarPerfil(args.userId, args.perfil);
        return { id: args.userId, ...args.perfil };
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
            })
            .addCase(cargarPerfil.rejected, (state, action) => {
                state.cargando = false;
                state.error = action.error.message || 'Error cargando perfil';
            })
            .addCase(guardarPerfil.fulfilled, (state, action) => {
                state.perfil = action.payload;
            });
    }
});

export const { limpiarPerfil } = usuarioSlice.actions;
export default usuarioSlice.reducer;