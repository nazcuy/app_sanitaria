import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User
} from 'firebase/auth';
import { auth } from './config';

export const authService = {
    async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error: any) {
            console.error('Error en login:', error);
            if (error.code === 'auth/user-not-found') {
                throw new Error('Usuario no encontrado');
            } else if (error.code === 'auth/wrong-password') {
                throw new Error('Contraseña incorrecta');
            } else {
                throw new Error('Error al iniciar sesión');
            }
        }
    },

    async register(email: string, password: string, displayName: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName });
            return userCredential.user;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    },

    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error en logout:', error);
            throw error;
        }
    },

    onAuthStateChange(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback);
    },

    getCurrentUser(): User | null {
        return auth.currentUser;
    }
};