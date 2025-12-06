import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import AuthInitializer from '../src/components/AuthInitializer';
import { store } from '../src/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}