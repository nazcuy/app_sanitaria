import { auth } from '@/src/services/firebase/config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    User as FirebaseUsuario,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

interface AuthState {
    user: FirebaseUsuario | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }
);

export const registro = createAsyncThunk(
    'auth/registro',
    async ({ email, password, nombre }: { email: string; password: string; nombre: string }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
        user: userCredential.user,
        nombre
        };
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await signOut(auth);
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<FirebaseUsuario | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error en inicio de sesión';
            })
            .addCase(registro.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registro.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(registro.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error en el registro';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;