import { APP_CONFIG } from '@/src/constants/index';

export const appConfig = {
    ...APP_CONFIG,
    features: {
        enableFirebase: true,
        enableOffline: false,
        enableNotifications: false,
    },
    routes: {
        farmacia: '/farmacia',
        carrito: '/carrito',
        historias: '/historiasClinicas'
    }
};