import { auth } from '@/src/services/firebase/config';
import { store } from '@/src/store';
import { useAppDispatch } from '@/src/store/hooks';
import { setUser } from '@/src/store/slices/authSlice';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';

function AppContent() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 AppContent: Iniciando escucha de Firebase Auth...');
    
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        console.log('✅ AppContent: Firebase respondió - Usuario:', firebaseUser?.email || 'null');
        dispatch(setUser(firebaseUser));
        setIsLoading(false);
      },
      (error) => {
        console.error('❌ AppContent: Error en Firebase Auth:', error);
        setIsLoading(false); 
      }
    );

    const timeoutId = setTimeout(() => {
      console.log('⚠️ AppContent: Timeout de Firebase - Continuando sin autenticación');
      setIsLoading(false);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}