import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scenarioApi } from '@/entities/scenario/api/scenarioApi';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ScenarioForm from '@/widgets/scenarios/ui/ScenarioForm';

export const ScenarioEditorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditing = !!id;

    const { data: initialData, isLoading: isFetching } = useQuery({
        queryKey: ['scenario', id],
        queryFn: () => scenarioApi.getById(id!),
        enabled: isEditing
    });

    const createMutation = useMutation({
        mutationFn: scenarioApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scenarios'] });
            navigate('/scenarios');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => scenarioApi.update(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['scenarios'] });
            queryClient.invalidateQueries({ queryKey: ['scenario', id] });
            navigate('/scenarios');
        }
    });

    const handleSubmit = (data: any) => {
        if (isEditing) {
            updateMutation.mutate(data);
        } else {
            createMutation.mutate(data);
        }
    };

    if (isFetching) {
        return <div className="p-8 text-[var(--text-muted)]">Загрузка...</div>;
    }

    return (
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
            <div className="space-y-6">
                <button
                    onClick={() => navigate('/scenarios')}
                    className="flex items-center gap-2 text-sm font-bold text-[var(--primary)] hover:translate-x-[-4px] transition-all"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Назад к списку
                </button>

                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">
                        {isEditing ? 'Редактирование сценария' : 'Создание нового сценария'}
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] font-medium">
                        {isEditing ? 'Измените параметры сценария' : 'Настройте промт и критерии для анализа звонков'}
                    </p>
                </div>
            </div>

            <ScenarioForm
                initialData={initialData}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/scenarios')}
                isSubmitting={createMutation.isPending || updateMutation.isPending}
            />
        </main>
    );
};
