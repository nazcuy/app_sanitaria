import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { clearError, registro } from '@/src/store/slices/authSlice';
import { guardarPerfil } from '@/src/store/slices/usuarioSlice';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default function RegisterScreen() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useAppDispatch();
    const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);


    const crearPerfilYRedirigir = useCallback(async () => {
        if (isAuthenticated && user) {
            console.log('Register: Creando perfil para:', user.email);
            try {
                await dispatch(guardarPerfil({
                    userId: user.uid,
                    perfil: {
                        nombre,
                        email: user.email || '',
                        telefono: '',
                        direccion: '',
                        fechaRegistro: new Date().toISOString()
                }
                })).unwrap();
                
                console.log('Register: Perfil creado, redirigiendo...');
                router.replace('/(tabs)');
        } catch (error) {
            console.error('Error creando perfil después del registro:', error);
            Alert.alert('Error', 'No se pudo crear el perfil de usuario.');
        }
    }
    }, [dispatch, isAuthenticated, user, nombre]);
    
    useEffect(() => {
        crearPerfilYRedirigir();
    }, [crearPerfilYRedirigir]);

    const handleRegister = async () => {
        if (!nombre.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            Alert.alert('Error', 'Email inválido');
            return;
        }

        if (!password || password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
        console.log('Register: Intentando registro...');
        dispatch(registro({ email, password, nombre }));
    };
    
    const handleClearError = () => {
        dispatch(clearError());
    };
    useEffect(() => {
        if (isAuthenticated && !loading) {
            console.log('Register: Usuario ya autenticado, redirigiendo...');
            router.replace('/(tabs)');
        }
    }, [isAuthenticated, loading]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ThemedView style={styles.formContainer}>

                    <ThemedText type="title" style={styles.title}>
                        🏥 Farmacia Comunitaria
                    </ThemedText>

                    <ThemedText type="subtitle" style={styles.subtitle}>
                        Crear Cuenta
                    </ThemedText>

                    <ThemedText style={styles.label}>Nombre completo</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="Tu nombre"
                        placeholderTextColor="#999"
                        value={nombre}
                        onChangeText={setNombre}
                        onFocus={handleClearError}
                        autoCapitalize="words"
                    />

                    <ThemedText style={styles.label}>Email</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="tu@email.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={handleClearError}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                    />

                    <ThemedText style={styles.label}>Contraseña</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        onFocus={handleClearError}
                        secureTextEntry
                    />

                    <ThemedText style={styles.label}>Confirmar contraseña</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onFocus={handleClearError}
                        secureTextEntry
                    />

                    {error && (
                        <ThemedText style={styles.errorText}>
                            ❌ {error}
                        </ThemedText>
                    )}

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <ThemedText style={styles.buttonText}>
                                Crear Cuenta
                            </ThemedText>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => router.push('/login')}
                    >
                        <ThemedText style={styles.loginText}>
                            ¿Ya tienes cuenta? <ThemedText style={styles.loginHighlight}>Inicia sesión</ThemedText>
                        </ThemedText>
                    </TouchableOpacity>

                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.8,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    errorText: {
        color: '#ff3b30',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
    },
    loginHighlight: {
        color: '#2196F3',
        fontWeight: 'bold',
    },
});