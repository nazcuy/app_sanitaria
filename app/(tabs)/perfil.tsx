import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { logout } from '@/src/store/slices/authSlice';
import { cargarPerfil, guardarPerfil } from '@/src/store/slices/usuarioSlice';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function PerfilScreen() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { perfil, cargando, error } = useAppSelector((state) => state.usuario);

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [editando, setEditando] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(cargarPerfil(user.uid));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (perfil) {
            setNombre(perfil.nombre || '');
            setTelefono(perfil.telefono || '');
            setDireccion(perfil.direccion || '');
        } else if (user) {
            setNombre(user.displayName || user.email?.split('@')[0] || '');
        }
    }, [perfil, user]);

    const handleGuardarPerfil = async () => {
        if (!user) return;

        if (!nombre.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }

        setGuardando(true);
        try {
            await dispatch(guardarPerfil({
                userId: user.uid,
                perfil: {
                    nombre: nombre.trim(),
                    email: user.email || '',
                    telefono: telefono.trim(),
                    direccion: direccion.trim(),
                    fechaRegistro: perfil?.fechaRegistro || new Date().toISOString()
                }
            })).unwrap();

            setEditando(false);
            Alert.alert('Éxito', 'Perfil guardado correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar el perfil');
        } finally {
            setGuardando(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        router.replace('/login');
    };

    if (!user) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText type="title">👤 Mi Perfil</ThemedText>
                <ThemedText style={styles.mensaje}>
                    Inicia sesión para ver y editar tu perfil
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contenido}>
            <ThemedText type="title">👤 Mi Perfil</ThemedText>

            {error && (
                <ThemedText style={styles.errorText}>❌ {error}</ThemedText>
            )}

            {cargando ? (
                <ActivityIndicator size="large" color="#2196F3" style={styles.cargando} />
            ) : (
                <>
                    <View style={styles.seccion}>
                        <ThemedText type="subtitle">Información de cuenta</ThemedText>
                        <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>Email:</ThemedText>
                            <ThemedText style={styles.valor}>{user.email}</ThemedText>
                        </View>
                        <View style={styles.infoRow}>
                            <ThemedText style={styles.label}>ID de usuario:</ThemedText>
                            <ThemedText style={styles.valorPequeno}>{user.uid.substring(0, 10)}...</ThemedText>
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <ThemedText type="subtitle">Información personal</ThemedText>

                        <ThemedText style={styles.label}>Nombre completo</ThemedText>
                        {editando ? (
                            <TextInput
                                style={styles.input}
                                value={nombre}
                                onChangeText={setNombre}
                                placeholder="Tu nombre completo"
                                editable={!guardando}
                            />
                        ) : (
                            <ThemedText style={styles.valor}>{nombre || 'No especificado'}</ThemedText>
                        )}

                        <ThemedText style={styles.label}>Teléfono</ThemedText>
                        {editando ? (
                            <TextInput
                                style={styles.input}
                                value={telefono}
                                onChangeText={setTelefono}
                                placeholder="Tu teléfono"
                                keyboardType="phone-pad"
                                editable={!guardando}
                            />
                        ) : (
                            <ThemedText style={styles.valor}>{telefono || 'No especificado'}</ThemedText>
                        )}

                        <ThemedText style={styles.label}>Dirección</ThemedText>
                        {editando ? (
                            <TextInput
                                style={styles.input}
                                value={direccion}
                                onChangeText={setDireccion}
                                placeholder="Tu dirección"
                                editable={!guardando}
                                multiline
                            />
                        ) : (
                            <ThemedText style={styles.valor}>{direccion || 'No especificado'}</ThemedText>
                        )}
                    </View>

                    <View style={styles.botonesContainer}>
                        {editando ? (
                            <>
                                <TouchableOpacity
                                    style={[styles.boton, styles.botonGuardar, guardando && styles.botonDeshabilitado]}
                                    onPress={handleGuardarPerfil}
                                    disabled={guardando}
                                >
                                    {guardando ? (
                                        <ActivityIndicator color="white" size="small" />
                                    ) : (
                                        <ThemedText style={styles.botonTexto}>💾 Guardar</ThemedText>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.boton, styles.botonCancelar]}
                                    onPress={() => {
                                        setEditando(false);
                                        // Restaurar valores originales
                                        if (perfil) {
                                            setNombre(perfil.nombre || '');
                                            setTelefono(perfil.telefono || '');
                                            setDireccion(perfil.direccion || '');
                                        }
                                    }}
                                    disabled={guardando}
                                >
                                    <ThemedText style={styles.botonTexto}>✗ Cancelar</ThemedText>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                style={[styles.boton, styles.botonEditar]}
                                onPress={() => setEditando(true)}
                            >
                                <ThemedText style={styles.botonTexto}>✏️ Editar perfil</ThemedText>
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <ThemedText style={styles.logoutText}>🚪 Cerrar sesión</ThemedText>
                    </TouchableOpacity>

                    <ThemedText style={styles.nota}>
                        ✅ Este perfil se guarda en Firebase Realtime Database, no solo en Authentication
                    </ThemedText>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contenido: {
        padding: 16,
    },
    mensaje: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        opacity: 0.6,
    },
    cargando: {
        marginTop: 40,
    },
    errorText: {
        color: '#ff3b30',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        textAlign: 'center',
    },
    seccion: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginTop: 12,
        marginBottom: 4,
    },
    valor: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        marginBottom: 8,
    },
    valorPequeno: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'monospace',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginVertical: 8,
        backgroundColor: 'white',
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        gap: 10,
    },
    boton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    botonEditar: {
        backgroundColor: '#2196F3',
    },
    botonGuardar: {
        backgroundColor: '#4CAF50',
    },
    botonCancelar: {
        backgroundColor: '#ff9800',
    },
    botonDeshabilitado: {
        backgroundColor: '#ccc',
        opacity: 0.7,
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ff3b30',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    nota: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderRadius: 8,
    },
});