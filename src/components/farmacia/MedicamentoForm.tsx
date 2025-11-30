import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Medicamento } from "@/types/farmacia";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

interface MedicamentoFormProps {
    medicamento?: Medicamento;
    onGuardar: (medicamento: Medicamento) => void;
    onCancelar: () => void;
}

export default function MedicamentoForm({
    medicamento,
    onGuardar,
    onCancelar,
}: MedicamentoFormProps) {
    const [nombre, setNombre] = useState(medicamento?.nombre || "");
    const [categoria, setCategoria] = useState(medicamento?.categoria || "");
    const [precio, setPrecio] = useState(medicamento?.precio.toString() || "");
    const [stock, setStock] = useState(medicamento?.stock.toString() || "");
    const [descripcion, setDescripcion] = useState(
        medicamento?.descripcion || ""
    );

    const manejarGuardar = () => {
        if (!nombre.trim() || !categoria.trim() || !precio || !stock) {
            Alert.alert("Error", "Por favor completa todos los campos obligatorios");
            return;
        }

        const medicamentoActualizado: Medicamento = {
            id: medicamento?.id || Date.now().toString(),
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            precio: parseFloat(precio),
            stock: parseInt(stock),
            descripcion: descripcion.trim(),
            completado: medicamento?.completado || false,
        };

        onGuardar(medicamentoActualizado);
    };

    return (
        <ThemedView style={styles.contenedor}>
            <ThemedText type="title" style={styles.titulo}>
                {medicamento ? "Editar Medicamento" : "Nuevo Medicamento"}
            </ThemedText>

            <ScrollView style={styles.formulario}>
                <ThemedText style={styles.etiqueta}>Nombre *</ThemedText>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Ej: Paracetamol 500mg"
                />

                <ThemedText style={styles.etiqueta}>Categoría *</ThemedText>
                <TextInput
                    style={styles.input}
                    value={categoria}
                    onChangeText={setCategoria}
                    placeholder="Ej: Analgésicos"
                />

                <ThemedText style={styles.etiqueta}>Precio *</ThemedText>
                <TextInput
                    style={styles.input}
                    value={precio}
                    onChangeText={setPrecio}
                    placeholder="Ej: 5000.50"
                    keyboardType="numeric"
                />

                <ThemedText style={styles.etiqueta}>Stock *</ThemedText>
                <TextInput
                    style={styles.input}
                    value={stock}
                    onChangeText={setStock}
                    placeholder="Ej: 100"
                    keyboardType="numeric"
                />

                <ThemedText style={styles.etiqueta}>Descripción</ThemedText>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    placeholder="Descripción del medicamento"
                    multiline
                    numberOfLines={3}
                />
            </ScrollView>

            <ThemedView style={styles.botonesContainer}>
                <TouchableOpacity
                    style={[styles.boton, styles.botonCancelar]}
                    onPress={onCancelar}
                >
                    <ThemedText style={styles.textoBoton}>Cancelar</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.boton, styles.botonGuardar]}
                    onPress={manejarGuardar}
                >
                    <ThemedText style={styles.textoBoton}>
                        {medicamento ? "Actualizar" : "Guardar"}
                    </ThemedText>
                </TouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    titulo: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 20,
    },
    formulario: {
        flex: 1,
    },
    etiqueta: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        fontSize: 16,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: "top",
    },
    botonesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 20,
    },
    boton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    botonCancelar: {
        backgroundColor: "#6c757d",
    },
    botonGuardar: {
        backgroundColor: "#007bff",
    },
    textoBoton: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
