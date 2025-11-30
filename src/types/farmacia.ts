export interface Medicamento {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen?: string;
  completado?: boolean;
}
export interface CategoriaMedicamento {
  id: string;
  nombre: string;
  descripcion: string;
}
export interface CarritoItem {
  medicamento: Medicamento;
  cantidad: number;
};