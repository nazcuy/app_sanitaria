import { configureStore } from '@reduxjs/toolkit';
import farmaciaReducer from './slices/farmaciaSlice';

export const store = configureStore({
    reducer: {
        farmacia: farmaciaReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;