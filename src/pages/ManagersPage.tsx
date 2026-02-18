import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Select from '@/shared/ui/Select/Select';
import { mopApi } from '@/entities/mop/api/mopApi';

import Pagination from '@/features/paginate-entities/ui/Pagination';
import ConfirmModal from '@/features/confirm-action/ui/ConfirmModal';
import ManagersGrid from '@/widgets/managers/ui/ManagersGrid';

import { useFilters } from '@/shared/lib/hooks/useFilters';
import { usePagination } from '@/shared/lib/hooks/usePagination';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { useDeleteEntity } from '@/features/delete-entity/model/useDeleteEntity';

export const ManagersPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { filters, setFilter, resetFilters } = useFilters({
    page: 1,
    limit: 10,
    search: '',
    status: ''
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['mops', { ...filters, search: debouncedSearch }],
    queryFn: () => mopApi.getAll({
      page: filters.page,
      limit: filters.limit,
      filters: {
        search: debouncedSearch,
        status: filters.status
      }
    }),
    placeholderData: (previousData) => previousData
  });

  const { totalPages } = usePagination(data?.total || 0, filters.limit, filters.page);

  const {
    isModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isDeleting
  } = useDeleteEntity(
    mopApi.delete.bind(mopApi),
    () => {
      queryClient.invalidateQueries({ queryKey: ['mops'] });
    }
  );

  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer";

  if (isLoading && !data) return <div className="p-8 text-[var(--text-muted)]">Загрузка...</div>;
  if (error) return <div className="p-8 text-red-500">Ошибка загрузки</div>;

  const managers = data?.data || [];
  const total = data?.total || 0;

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">МОПы</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium">Всего: {total}, Активных: {managers.length}</p>
        </div>
        <button
          onClick={() => refetch()}
          className="p-2.5 text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--primary)] rounded-xl border border-[var(--border)] transition-all hover:shadow-sm active:scale-95"
        >
          <ArrowPathIcon className="w-5 h-5" />
        </button>
      </div>

      <section className="bg-[var(--surface)] p-8 rounded-2xl shadow-sm border border-[var(--border)] transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col md:col-span-1.5">
            <label className={labelStyle}>Поиск</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="ФИО, email, должность..."
                className={inputStyle.replace('pl-4', 'pl-10')}
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Статус</label>
            <div className="relative">
              <Select
                value={filters.status}
                onChange={(val) => setFilter('status', val)}
                options={[
                  { value: '', label: 'Все' },
                  { value: 'active', label: 'Активен' },
                  { value: 'inactive', label: 'Неактивен' },
                ]}
                placeholder="Выберите статус"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>На странице</label>
            <div className="relative">
              <Select
                value={filters.limit}
                onChange={(val) => setFilter('limit', Number(val))}
                options={[
                  { value: 10, label: '10' },
                  { value: 25, label: '25' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
                placeholder="10"
              />
            </div>
          </div>
          <div className="flex items-end gap-3 md:justify-end">
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Сбросить
            </button>
            <button className="px-8 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
              Применить
            </button>
          </div>
        </div>
      </section>

      <ManagersGrid managers={managers} onDelete={openDeleteModal} />

      <Pagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={(p) => setFilter('page', p)}
        totalItems={total}
        limit={filters.limit}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Удаление менеджера"
        message="Вы уверены, что хотите удалить этого менеджера? Это действие нельзя будет отменить."
        confirmText={isDeleting ? "Удаление..." : "Удалить"}
        isDangerous={true}
      />
    </main>
  );
};