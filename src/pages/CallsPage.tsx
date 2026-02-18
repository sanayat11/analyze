import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Filters from '@/features/filter-entities/ui/Filters';
import Pagination from '@/features/paginate-entities/ui/Pagination';
import CallsTable from '@/widgets/tables/ui/CallsTable';
import CallDetailsModal from '@/widgets/calls/ui/CallDetailsModal';
import { callApi } from '@/entities/call/api/callApi';
import { useFilters } from '@/shared/lib/hooks/useFilters';
import { usePagination } from '@/shared/lib/hooks/usePagination';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

export const CallingPage: React.FC = () => {
    const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
    const { filters, setFilter, resetFilters } = useFilters({
        page: 1,
        limit: 10,
        search: '',
        status: '',
        manager: '',
        scenario: '',
        dateFrom: '',
        dateTo: ''
    });

    const debouncedSearch = useDebounce(filters.search, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ['calls', { ...filters, search: debouncedSearch }],
        queryFn: () => callApi.getAll({
            page: filters.page,
            limit: filters.limit,
            filters: {
                search: debouncedSearch,
                status: filters.status,
                manager: filters.manager,
                scenario: filters.scenario,
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo
            }
        })
    });

    const { totalPages } = usePagination(data?.total || 0, filters.limit, filters.page);

    if (isLoading) {
        return (
            <main className="flex-1 p-8 flex items-center justify-center w-full">
                <div className="text-[var(--text-muted)]">Загрузка...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex-1 p-8 flex items-center justify-center w-full">
                <div className="text-red-500">Ошибка загрузки данных</div>
            </main>
        );
    }

    const records = data?.data || [];
    const total = data?.total || 0;

    return (
        <main className="flex-1 p-8 space-y-8 overflow-y-auto w-full">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Звонки</h1>
                <p className="text-sm text-[var(--text-muted)] font-medium">
                    {total} записей, страница {filters.page} из {totalPages}
                </p>
            </div>
            <Filters
                filters={filters}
                onFilterChange={(key, value) => setFilter(key as any, value)}
                onReset={resetFilters}
            />
            <CallsTable
                records={records}
                onRowClick={setSelectedCallId}
            />
            <Pagination
                page={filters.page}
                totalPages={totalPages}
                onPageChange={(p) => setFilter('page', p)}
                totalItems={total}
                limit={filters.limit}
            />

            <CallDetailsModal
                callId={selectedCallId}
                onClose={() => setSelectedCallId(null)}
            />
        </main>
    );
};


