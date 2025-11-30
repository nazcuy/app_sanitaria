import { configureStore } from '@reduxjs/toolkit';
import carritoReducer from './slices/carritoSlice';
import farmaciaReducer from './slices/farmaciaSlice';

export const store = configureStore({
    reducer: {
        farmacia: farmaciaReducer,
        carrito: carritoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;