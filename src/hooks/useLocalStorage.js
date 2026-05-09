import { useState, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            setState(prev => {
                const next = value instanceof Function ? value(prev) : value;
                localStorage.setItem(key, JSON.stringify(next));
                return next;
            });
        } catch (e) {
            console.error('useLocalStorage write error:', e);
        }
    }, [key]);

    return [state, setValue];
}