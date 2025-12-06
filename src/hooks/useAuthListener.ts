import { useEffect } from 'react';
import { authService } from '../services/firebase/auth';
import { useAppDispatch } from '../store/hooks';
import { clearUser, setUser } from '../store/slices/authSlice';

export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('🔊 Configurando listener de autenticación...');

    const unsubscribe = authService.onAuthStateChange((user) => {
      console.log('🔄 Estado de auth cambió:', user?.email || 'Sin usuario');
      
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    });

    return () => {
      console.log('🧹 Limpiando listener de auth');
      unsubscribe();
    };
  }, [dispatch]);
}