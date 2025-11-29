import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';

import { store } from '@/store';
import { Provider } from 'react-redux';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [appLista, setAppLista] = useState(false);

  const animacionSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animacionSpin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animacionSpin]);

  useEffect(() => {
    async function prepararApp() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Asset.loadAsync(require('../assets/images/logo.jpg'));

      } catch (e) {
        console.warn('Error preparando la app:', e);

      } finally {
        setAppLista(true);
        await SplashScreen.hideAsync();
      }
    }

    prepararApp();
  }, []);

  if (!appLista) {
    const rotate = animacionSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={estilos.splashContainer}>
        <Image
          source={require('../assets/images/logo.jpg')}
          style={estilos.logo}
          resizeMode="contain"
        />
        <Animated.View style={[estilos.spinner, { transform: [{ rotate: rotate }] }]} />
      </View>
    );
  }

  return (
    <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
    </Provider>
  );
}

const estilos = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#E6F4FE',
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
    borderLeftColor: 'transparent',
  },
});
