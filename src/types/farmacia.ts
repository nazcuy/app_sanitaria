// TIPOS BASE - Estos servirán tanto para Firebase como para SQLite

export interface Medicamento {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria?: string;
  completado?: boolean;
}

export interface UsuarioPerfil {
  id: string; 
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: string;
}

export interface ItemCarrito {
  medicamentoId: string;
  cantidad: number;
}

export interface CarritoUsuario {
  usuarioId: string;
  items: ItemCarrito[];
  actualizado: string;
  total: number;
}

export interface ItemCarritoRedux {
  medicamento: Medicamento;
  cantidad: number;
}
export interface ItemCarritoFirebase {
  medicamentoId: string;
  cantidad: number;
  precioUnitario: number;
}