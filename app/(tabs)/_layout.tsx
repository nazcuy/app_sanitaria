import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useAppSelector } from '@/src/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

function TabBarButton({ onPress, icon, label, color }: any) {
  return (
    <TouchableOpacity style={styles.tabBarButton} onPress={onPress}>
      <Ionicons name={icon} size={24} color={color} />
      <ThemedText style={[styles.tabBarLabel, { color }]}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.centerContent}>
          <ThemedText type="title" style={styles.title}>
            🏥 Aplicación de Salud Irma Carrica 🏥
          </ThemedText>
          
          <ThemedText style={styles.subtitle}>
            Para acceder a todas las funciones, necesitas iniciar sesión
          </ThemedText>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => router.push('/login')}
          >
            <Ionicons name="log-in" size={24} color="white" />
            <ThemedText style={styles.loginButtonText}>
              Iniciar Sesión
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => router.push('/register')}
          >
            <ThemedText style={styles.registerButtonText}>
              ¿No tienes cuenta? Regístrate aquí
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="farmacia" 
        options={{
          title: 'Farmacia',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="carrito" 
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="historiasClinicas" 
        options={{
          title: 'Historias',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{
          title: 'Mi Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 30,
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    paddingVertical: 10,
  },
  registerButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
  tabBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});