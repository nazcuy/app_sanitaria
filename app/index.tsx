import { useAppSelector } from '@/src/store/hooks';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function IndexScreen() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                router.replace('/(tabs)'); 
            } else {
                router.replace('/login');
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    return null;
}