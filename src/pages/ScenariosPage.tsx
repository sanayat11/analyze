import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { scenarioApi } from '@/entities/scenario/api/scenarioApi';
import ScenariosGrid from '@/widgets/scenarios/ui/ScenariosGrid';
import ConfirmModal from '@/features/confirm-action/ui/ConfirmModal';
import { useDeleteEntity } from '@/features/delete-entity/model/useDeleteEntity';
import Pagination from '@/features/paginate-entities/ui/Pagination';
import { usePagination } from '@/shared/lib/hooks/usePagination';

export const ScenariosPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [onlyActive, setOnlyActive] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['scenarios', page],
    queryFn: () => scenarioApi.getAll({ page, limit })
  });

  const { totalPages } = usePagination(data?.total || 0, limit, page);

  const {
    isModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    isDeleting
  } = useDeleteEntity(
    scenarioApi.delete.bind(scenarioApi),
    () => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
    }
  );

  if (isLoading) return <div className="p-8 text-[var(--text-muted)]">Загрузка...</div>;
  if (error) return <div className="p-8 text-red-500">Ошибка загрузки</div>;

  const scenarios = data?.data || [];
  const filteredScenarios = onlyActive
    ? scenarios.filter(s => s.status === 'active')
    : scenarios;

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Сценарии</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium">Всего: {scenarios.length}, Активных: {scenarios.filter(s => s.status === 'active').length}</p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Только активные</span>
            <button
              onClick={() => setOnlyActive(!onlyActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${onlyActive ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-800'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${onlyActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <button
            onClick={() => navigate('/create-scenario')}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
          >
            <PlusIcon className="w-5 h-5" />
            Создать сценарий
          </button>
        </div>
      </div>

      <ScenariosGrid
        scenarios={filteredScenarios}
        onDelete={openDeleteModal}
        onEdit={(id) => navigate(`/scenarios/${id}`)}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={data?.total || 0}
        limit={limit}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Удаление сценария"
        message="Вы уверены, что хотите удалить этот сценарий? Это действие нельзя будет отменить."
        confirmText={isDeleting ? "Удаление..." : "Удалить"}
        isDangerous={true}
      />
    </main>
  );
};