import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Select from '@/shared/ui/Select/Select';
import { userApi } from '@/entities/user/api/userApi';
import { AppUser } from '@/entities/user/model/types';

export const EditUserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isNew = !id || id === 'new';

    const [formData, setFormData] = useState<Omit<AppUser, 'id'>>({
        username: '',
        role: 'Пользователь',
        active: true
    });

    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => userApi.getById(id!),
        enabled: !isNew
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                role: user.role,
                active: user.active
            });
        }
    }, [user]);

    const createMutation = useMutation({
        mutationFn: (data: Omit<AppUser, 'id'>) => userApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate('/admin');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: Partial<AppUser>) => userApi.update(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', id] });
            navigate('/admin');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNew) {
            createMutation.mutate(formData);
        } else {
            updateMutation.mutate(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    if (isUserLoading) {
        return <div className="p-8 text-[var(--text-muted)]">Загрузка...</div>;
    }

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 hover:bg-[var(--surface-2)] rounded-xl transition-colors text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-bold text-[var(--text)]">
                        {isNew ? 'Создание пользователя' : 'Редактирование пользователя'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                            Имя пользователя
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                            placeholder="Введите имя пользователя"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                            Роль
                        </label>
                        <Select
                            value={formData.role}
                            onChange={(val) => setFormData(prev => ({ ...prev, role: val }))}
                            options={[
                                { value: 'Пользователь', label: 'Пользователь' },
                                { value: 'Админ', label: 'Админ' },
                            ]}
                            placeholder="Выберите роль"
                        />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-[var(--surface-2)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                            <span className="ml-3 text-sm font-bold text-[var(--text)]">Активен</span>
                        </label>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin')}
                            className="px-6 py-2.5 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-xl transition-all"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {createMutation.isPending || updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

