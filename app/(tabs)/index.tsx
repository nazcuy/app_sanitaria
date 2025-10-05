import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { colors } from '../../global/colors'; // Importamos nuestros colores

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      
      {/* TÍTULO PRINCIPAL */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          🏥 App de Relevamiento de Salud
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Herramienta comunitaria para la salud barrial
        </ThemedText>
      </ThemedView>

      {/* OPCIONES PRINCIPALES */}
      <ThemedView style={styles.optionsContainer}>
        
        {/* OPCIÓN 1: FARMACIA */}
        <Link href="/(tabs)/farmacia/index" asChild>
          <TouchableOpacity style={[styles.optionCard, { backgroundColor: colors.farmacia.primary }]}>
            <ThemedText style={styles.optionIcon}>💊</ThemedText>
            <ThemedText type="subtitle" style={styles.optionTitle}>
              Farmacia Comunitaria
            </ThemedText>
            <ThemedText style={styles.optionDescription}>
              Gestión de medicamentos y stock
            </ThemedText>
          </TouchableOpacity>
        </Link>

        {/* OPCIÓN 2: HISTORIA CLÍNICA */}
          <Link href="/(tabs)/salud/index" asChild>
            <TouchableOpacity style={[styles.optionCard, { backgroundColor: colors.salud.primary }]}>
              <ThemedText style={styles.optionIcon}>📋</ThemedText>
              <ThemedText type="subtitle" style={styles.optionTitle}>
                Historia Clínica
              </ThemedText>
              <ThemedText style={styles.optionDescription}>
                Registro de relevamientos de salud
              </ThemedText>
            </TouchableOpacity>
          </Link>

          <ThemedText style={styles.optionIcon}>📋</ThemedText>
          <ThemedText type="subtitle" style={styles.optionTitle}>
            Historia Clínica
          </ThemedText>
          <ThemedText style={styles.optionDescription}>
            Registro de relevamientos de salud
          </ThemedText>

      </ThemedView>

      {/* INFORMACIÓN ADICIONAL */}
      <ThemedView style={styles.infoSection}>
        <ThemedText style={styles.infoText}>
          Selecciona una opción para comenzar
        </ThemedText>
      </ThemedView>

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
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  optionsContainer: {
    gap: 20,
    marginBottom: 40,
  },
  optionCard: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  optionTitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 18,
  },
  optionDescription: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  infoSection: {
    alignItems: 'center',
  },
  infoText: {
    opacity: 0.6,
    fontStyle: 'italic',
  },
});