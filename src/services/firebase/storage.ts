import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

export const storageService = {
    async subirImagen(file: Blob, path: string): Promise<string> {
        try {
            const storageRef = ref(storage, path);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error('Error subiendo imagen:', error);
            throw error;
        }
    },

    async eliminarImagen(url: string): Promise<void> {
        try {
            const storageRef = ref(storage, url);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Error eliminando imagen:', error);
            throw error;
        }
    },

    async subirImagenMedicamento(medicamentoId: string, file: Blob): Promise<string> {
        const path = `medicamentos/${medicamentoId}/${Date.now()}`;
        return await this.subirImagen(file, path);
    }
};