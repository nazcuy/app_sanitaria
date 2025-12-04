import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { clearError, login } from '../src/store/slices/authSlice';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {
        if (!email || !password) {
            return;
        }

        dispatch(login({ email, password }));
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

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
                        Iniciar Sesión
                    </ThemedText>

                    <ThemedText style={styles.label}>Email</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="prueba@email.com"
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

                    {error && (
                        <ThemedText style={styles.errorText}>
                            ❌ {error}
                        </ThemedText>
                    )}

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <ThemedText style={styles.buttonText}>
                                Iniciar Sesión
                            </ThemedText>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerLink}
                        onPress={() => router.push('/register')}
                    >
                        <ThemedText style={styles.registerText}>
                            ¿No tenés cuenta? <ThemedText style={styles.registerHighlight}>Registrate</ThemedText>
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
        backgroundColor: '#2196F3',
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
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
    },
    registerHighlight: {
        color: '#2196F3',
        fontWeight: 'bold',
    },
});