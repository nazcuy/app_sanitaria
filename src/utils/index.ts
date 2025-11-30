export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
};

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export const firebaseUtils = {
    generateId: (): string => {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    },

    sanitizeData: (data: any): any => {
        return JSON.parse(JSON.stringify(data));
    }
};