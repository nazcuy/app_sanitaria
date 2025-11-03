import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  // Animación del spinner
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spin]);

  useEffect(() => {
    async function prepare() {
      try {
        // Evita que el splash nativo se oculte automáticamente
        await SplashScreen.preventAutoHideAsync();

        // Precarga el logo (ajusta la ruta si hace falta)
        await Asset.loadAsync(require('../assets/images/logo.jpg'));

        // Aquí podrías cargar fonts, datos iniciales, etc.
      } catch (e) {
        console.warn('Error preparando la app:', e);
      } finally {
        setIsReady(true);
        // Oculta el splash nativo cuando ya estamos listos
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    const rotate = spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#E6F4FE', // fondo celeste
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 160,
  },
  spinner: {
    marginTop: 24,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#2196F3',
    borderLeftColor: 'transparent', // hace el efecto de "segmento" giratorio
  },
});
