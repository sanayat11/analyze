import { useState, useCallback } from 'react';

export function useFilters<T extends Record<string, any>>(initialFilters: T) {
    const [filters, setFilters] = useState<T>(initialFilters);

    const setFilter = useCallback((key: keyof T, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1, // Reset page on filter change usually
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    return {
        filters,
        setFilters,
        setFilter,
        resetFilters,
    };
}
