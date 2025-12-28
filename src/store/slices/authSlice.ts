import { auth } from '@/src/services/firebase/config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    User as FirebaseUsuario,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

type SerializableUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    emailVerified: boolean;
};

interface AuthState {
    user: SerializableUser | null;
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

const mapUser = (u: FirebaseUsuario): SerializableUser => ({
    uid: u.uid,
    email: u.email ?? null,
    displayName: u.displayName ?? null,
    phoneNumber: u.phoneNumber ?? null,
    photoURL: u.photoURL ?? null,
    emailVerified: !!u.emailVerified,
});

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { user: mapUser(userCredential.user) };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error en inicio de sesión');
        }
    }
);

export const registro = createAsyncThunk(
    'auth/registro',
    async ({ email, password, nombre }: { email: string; password: string; nombre: string }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            user: mapUser(userCredential.user),
            nombre
        };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error en el registro');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return null;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Error al cerrar sesión');
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
        reducers: {
        setUser: (state, action: PayloadAction<SerializableUser | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
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
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registro.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registro.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registro.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setUser, clearError, clearUser } = authSlice.actions;
export default authSlice.reducer;