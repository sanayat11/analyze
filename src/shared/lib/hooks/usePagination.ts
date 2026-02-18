import { useMemo } from 'react';

export const usePagination = (
    totalItems: number,
    limit: number = 10,
    currentPage: number = 1
) => {
    const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

    // Generate page numbers logic could go here if needed complex

    return {
        totalPages,
        isFirstPage: currentPage === 1,
        isLastPage: currentPage === totalPages,
        hasPages: totalPages > 1
    };
};
