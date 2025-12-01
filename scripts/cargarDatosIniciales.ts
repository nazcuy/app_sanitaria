import { medicamentosService } from '@/src/services/firebase/database';

const medicamentosIniciales = [
    {
        nombre: 'Paracetamol 500mg',
        categoria: 'Analgésicos',
        precio: 5.50,
        stock: 100,
        descripcion: 'Alivio del dolor y fiebre',
        completado: false,
    },
    {
        nombre: 'Ibuprofeno 400mg',
        categoria: 'Antiinflamatorios',
        precio: 7.80,
        stock: 50,
        descripcion: 'Antiinflamatorio y analgésico',
        completado: false,
    },
    {
        nombre: 'Amoxicilina 500mg',
        categoria: 'Antibióticos',
        precio: 12.00,
        stock: 30,
        descripcion: 'Antibiótico de amplio espectro',
        completado: false,
    },
    {
        nombre: 'Omeprazol 20mg',
        categoria: 'Gastroprotector',
        precio: 22.30,
        stock: 18,
        descripcion: 'Inhibidor de reflujo gástrico',
        completado: false,
    },
    {
        nombre: 'Loratadina 10mg',
        categoria: 'Antialérgicos',
        precio: 8.50,
        stock: 75,
        descripcion: 'Antihistamínico para alergias',
        completado: false,
    }
];

export const cargarDatosIniciales = async () => {
    console.log('🚀 INICIANDO CARGA DE DATOS...');

    try {
        // 1. Intentar obtener medicamentos existentes
        console.log('📡 Conectando a Firebase...');
        const existentes = await medicamentosService.obtenerMedicamentos();
        console.log(`📊 Medicamentos existentes: ${existentes.length}`);

        if (existentes.length === 0) {
            console.log('➕ No hay medicamentos. Cargando los 5 iniciales...');

            // Cargar cada medicamento
            for (const med of medicamentosIniciales) {
                const id = await medicamentosService.agregarMedicamento(med);
                console.log(`✅ ${med.nombre} → ID: ${id}`);
            }

            console.log('🎉 ¡TODOS LOS MEDICAMENTOS CARGADOS!');
            return true;
        } else {
            console.log('ℹ️  Ya hay medicamentos en Firebase. No se cargan nuevos.');
            console.log('📝 Medicamentos encontrados:');
            existentes.forEach(med => {
                console.log(`   • ${med.nombre} (${med.categoria})`);
            });
            return false;
        }

    } catch (error: any) {
        console.error('❌ ERROR CRÍTICO:', error.message || error);
        console.error('🔍 Detalles:', error);
        return false;
    }
};

// Ejecutar automáticamente si se llama desde terminal
if (require.main === module) {
    cargarDatosIniciales()
        .then(exito => {
            if (exito) {
                console.log('✨ Carga completada exitosamente');
                process.exit(0);
            } else {
                console.log('ℹ️  No se cargaron nuevos datos');
                process.exit(0);
            }
        })
        .catch(error => {
            console.error('💥 Error fatal:', error);
            process.exit(1);
        });
}