import { get, ref, set } from 'firebase/database';
import { database } from './firebase/config';

export const testFirebaseConnection = async () => {
  try {
    // Intentar escribir y leer un dato de prueba
    const testRef = ref(database, 'testConnection');
    await set(testRef, { timestamp: new Date().toISOString() });
    
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
      console.log('✅ Conexión a Firebase exitosa');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Error conectando a Firebase:', error);
    return false;
  }
};