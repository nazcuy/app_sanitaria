import { Medicamento } from "@/src/types/farmacia";
import {
    get,
    push,
    ref,
    remove,
    set,
    update
} from "firebase/database";
import { database } from "./config";

const MEDICAMENTOS_PATH = "medicamentos";
const CARRO_PATH = "carrito";

export const medicamentosService = {
    async obtenerMedicamentos(): Promise<Medicamento[]> {
        try {
            const snapshot = await get(ref(database, MEDICAMENTOS_PATH));
            if (snapshot.exists()) {
                const data = snapshot.val();
                return Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
            }
            return [];
        } catch (error) {
            console.error("Error obteniendo medicamentos:", error);
            throw error;
        }
    },

    async agregarMedicamento(
        medicamento: Omit<Medicamento, "id">
    ): Promise<string> {
        try {
            const nuevoRef = push(ref(database, MEDICAMENTOS_PATH));
            await set(nuevoRef, medicamento);
            return nuevoRef.key!;
        } catch (error) {
            console.error("Error agregando medicamento:", error);
            throw error;
        }
    },

    async actualizarMedicamento(
        id: string,
        medicamento: Partial<Medicamento>
    ): Promise<void> {
        try {
            await update(ref(database, `${MEDICAMENTOS_PATH}/${id}`), medicamento);
        } catch (error) {
            console.error("Error actualizando medicamento:", error);
            throw error;
        }
    },

    async eliminarMedicamento(id: string): Promise<void> {
        try {
            await remove(ref(database, `${MEDICAMENTOS_PATH}/${id}`));
        } catch (error) {
            console.error("Error eliminando medicamento:", error);
            throw error;
        }
    },

    async obtenerMedicamentoPorId(id: string): Promise<Medicamento | null> {
        try {
            const snapshot = await get(ref(database, `${MEDICAMENTOS_PATH}/${id}`));
            if (snapshot.exists()) {
                return { id, ...snapshot.val() };
            }
            return null;
        } catch (error) {
            console.error("Error obteniendo medicamento:", error);
            throw error;
        }
    },
};

export const carritoService = {
    async agregarAlCarrito(userId: string, item: any): Promise<void> {
        try {
            const nuevoRef = push(ref(database, `${CARRO_PATH}/${userId}`));
            await set(nuevoRef, {
                ...item,
                agregadoEn: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error agregando al carrito:", error);
            throw error;
        }
    },

    async obtenerCarrito(userId: string): Promise<any[]> {
        try {
            const snapshot = await get(ref(database, `${CARRO_PATH}/${userId}`));
            if (snapshot.exists()) {
                const data = snapshot.val();
                return Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
            }
            return [];
        } catch (error) {
            console.error("Error obteniendo carrito:", error);
            throw error;
        }
    },

    async eliminarDelCarrito(userId: string, itemId: string): Promise<void> {
        try {
            await remove(ref(database, `${CARRO_PATH}/${userId}/${itemId}`));
        } catch (error) {
            console.error("Error eliminando del carrito:", error);
            throw error;
        }
    },
};
