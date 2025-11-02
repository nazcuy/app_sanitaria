import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          🏥 App de Relevamiento
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Salud Comunitaria
        </ThemedText>
      </View>

      {/* BOTONES PRINCIPALES */}
      <View style={styles.buttonsContainer}>
        
        {/* BOTÓN FARMACIA */}
        <Link href="/farmacia" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonIcon}>💊</ThemedText>
            <ThemedText type="subtitle" style={styles.buttonText}>
              Farmacia Comunitaria
            </ThemedText>
          </TouchableOpacity>
        </Link>

        {/* BOTÓN SALUD */}
        <Link href="/salud" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonIcon}>📋</ThemedText>
            <ThemedText type="subtitle" style={styles.buttonText}>
              Historia Clínica
            </ThemedText>
          </TouchableOpacity>
        </Link>

      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});