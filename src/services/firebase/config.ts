import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAFOfQlhmCcgl1fzcVu93q89sFzvmmcKqM",
    authDomain: "appirmacarrica.firebaseapp.com",
    projectId: "appirmacarrica",
    storageBucket: "appirmacarrica.firebasestorage.app",
    messagingSenderId: "1095657495754",
    appId: "1:1095657495754:web:f704f1ab8b528b63f5a833"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;