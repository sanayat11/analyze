import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scenarioApi } from '@/entities/scenario/api/scenarioApi';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ScenarioForm from '@/widgets/scenarios/ui/ScenarioForm';

interface CreateScenarioPageProps {
  onBack: () => void;
}

export const CreateScenarioPage: React.FC<CreateScenarioPageProps> = ({ onBack }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: scenarioApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
      onBack();
    }
  });

  const handleSubmit = (data: any) => {
    createMutation.mutate(data);
  };

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:translate-x-[-4px] transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Назад к списку
        </button>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Создание нового сценария</h1>
          <p className="text-sm text-[var(--text-muted)] font-medium">Настройте промт и критерии для анализа звонков</p>
        </div>
      </div>

      <ScenarioForm
        onSubmit={handleSubmit}
        onCancel={onBack}
      />
    </main>
  );
};
