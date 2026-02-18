
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, totalItems, limit }) => {
    return (
        <div className="p-6 bg-[var(--surface-2)] border-t border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--surface)] bg-[var(--bg)] overflow-hidden shadow-sm">
                            <img src={`https://picsum.photos/seed/${i + 50}/60/60`} alt="" />
                        </div>
                    ))}
                </div>
                <span className="text-xs text-[var(--text-muted)] font-bold">
                    {limit} записей на странице
                </span>
            </div>
            <div className="flex gap-4">
                <button
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-6 py-2 text-xs font-extrabold bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text-muted)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--surface-2)] transition-all"
                >
                    Назад
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text)]">
                        {page} / {totalPages}
                    </span>
                </div>
                <button
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-6 py-2 text-xs font-extrabold bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Далее
                </button>
            </div>
        </div>
    );
};

export default Pagination;
