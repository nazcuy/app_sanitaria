import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      
      {/* SECCIÓN 1: HEADER */}
      <View style={styles.logoSection}>
        <Image 
          source={require('@/assets/images/logo.jpg')}
          style={styles.logo}
          contentFit="cover"
        />
      </View>

      <View style={styles.titleSection}>
        <ThemedText type="title" style={styles.title}>
          🏥 App de Relevamiento
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Salud Comunitaria
        </ThemedText>
      </View>

      {/* SECCIÓN 2: BOTONES */}
      <View style={styles.buttonsContainer}>
        <Link href="/farmacia" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonIcon}>💊</ThemedText>
            <ThemedText type="subtitle" style={styles.buttonText}>
              Farmacia Comunitaria
            </ThemedText>
          </TouchableOpacity>
        </Link>

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
    padding: 10,
  },
  logoSection: {
    flex: 1,                   // ocupa 1 parte
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  logo: {
    width: '90%',              // usa porcentaje para responder al ancho
    height: undefined,
    aspectRatio: 20 / 9,       // mantiene proporción; ajustá según tu imagen
    marginBottom: 0,
  },
  titleSection: {
    flex: 0.6,                
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1.4,               
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});