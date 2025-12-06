import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carritoReducer from './slices/carritoSlice';
import farmaciaReducer from './slices/farmaciaSlice';
import usuarioReducer from './slices/usuarioSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        farmacia: farmaciaReducer,
        carrito: carritoReducer,
        usuario: usuarioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;