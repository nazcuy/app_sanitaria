export interface Medicamento {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen?: string;
}

export interface CarritoItem {
  medicamento: Medicamento;
  cantidad: number;
}

export const medicamentosEjemplo: Medicamento[] = [
  {
    id: '1',
    nombre: 'Paracetamol 500mg',
    categoria: 'Analgésicos',
    precio: 5.50,
    stock: 100,
    descripcion: 'Alivio del dolor y fiebre'
  },
  {
    id: '2',
    nombre: 'Ibuprofeno 400mg',
    categoria: 'Antiinflamatorios',
    precio: 7.80,
    stock: 50,
    descripcion: 'Antiinflamatorio y analgésico'
  },
  {
    id: '3',
    nombre: 'Amoxicilina 500mg',
    categoria: 'Antibióticos',
    precio: 12.00,
    stock: 30,
    descripcion: 'Antibiótico de amplio espectro'
  }
];