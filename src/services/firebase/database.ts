import { CarritoUsuario, ItemCarrito, Medicamento, UsuarioPerfil } from "@/src/types/farmacia";
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
const USUARIOS_PATH = "usuarios";
const CARRITOS_PATH = "carritos";

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

export const usuarioService = {
    async guardarPerfil(userId: string, perfil: Omit<UsuarioPerfil, 'id'>): Promise<void> {
        try {
            await set(ref(database, `${USUARIOS_PATH}/${userId}`), {
                ...perfil,
                id: userId
            });
        } catch (error) {
            console.error("Error guardando perfil:", error);
            throw error;
        }
    },

    async obtenerPerfil(userId: string): Promise<UsuarioPerfil | null> {
        try {
            const snapshot = await get(ref(database, `${USUARIOS_PATH}/${userId}`));
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return null;
        } catch (error) {
            console.error("Error obteniendo perfil:", error);
            throw error;
        }
    },

    async actualizarPerfil(userId: string, cambios: Partial<UsuarioPerfil>): Promise<void> {
        try {
            await update(ref(database, `${USUARIOS_PATH}/${userId}`), cambios);
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            throw error;
        }
    }
};

export const carritoService = {
    async guardarCarrito(userId: string, items: ItemCarrito[]): Promise<void> {
        try {
            const carritoData: CarritoUsuario = {
                usuarioId: userId,
                items: items,
                actualizado: new Date().toISOString(),
            };
            await set(ref(database, `${CARRITOS_PATH}/${userId}`), carritoData);
        } catch (error) {
            console.error("Error guardando carrito:", error);
            throw error;
        }
    },

    async obtenerCarrito(userId: string): Promise<CarritoUsuario | null> {
        try {
            const snapshot = await get(ref(database, `${CARRITOS_PATH}/${userId}`));
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return null;
        } catch (error) {
            console.error("Error obteniendo carrito:", error);
            throw error;
        }
    },

    async limpiarCarrito(userId: string): Promise<void> {
        try {
            await remove(ref(database, `${CARRITOS_PATH}/${userId}`));
        } catch (error) {
            console.error("Error limpiando carrito:", error);
            throw error;
        }
    }
};