import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, CpuChipIcon, SquaresPlusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Scenario } from '@/entities/scenario/model/types';

interface ScenarioFormProps {
    initialData?: Partial<Scenario>;
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
    isSubmitting?: boolean;
}

const ScenarioForm: React.FC<ScenarioFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
    const sectionLabelStyle = "text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 mb-6";
    const labelStyle = "text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block";
    const inputStyle = "w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)]";
    const textareaStyle = "w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] min-h-[120px] resize-y";
    const checkboxContainerStyle = "flex items-center gap-3 cursor-pointer group";
    const checkboxStyle = "w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0 transition-all cursor-pointer bg-[var(--input-bg)]";

    // State for controlled inputs to handle updates
    const [formData, setFormData] = useState({
        internalName: '',
        name: '',
        description: '',
        prompt: '',
        status: 'active',
        // other fields can be added here
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                internalName: initialData.internalName || '',
                name: initialData.name || '',
                description: initialData.description || '',
                prompt: initialData.prompt || '',
                status: initialData.status || 'active',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked ? 'active' : 'inactive' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
            {/* Section: Basic Information */}
            <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
                <div className={sectionLabelStyle}>
                    <InformationCircleIcon className="w-5 h-5" />
                    Основная информация
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className={labelStyle}>Код сценария *</label>
                        <input
                            type="text"
                            name="internalName"
                            value={formData.internalName}
                            onChange={handleChange}
                            placeholder="Например: sales_call"
                            className={inputStyle}
                            required
                        />
                        <p className="text-[10px] text-[var(--text-muted)] mt-2 font-medium">Уникальный идентификатор для API</p>
                    </div>
                    <div className="flex flex-col">
                        <label className={labelStyle}>Название *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Например: Продажи по телефону"
                            className={inputStyle}
                            required
                        />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className={labelStyle}>Описание</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Краткое описание сценария"
                            className={textareaStyle}
                        ></textarea>
                    </div>
                </div>
            </section>

            {/* Section: AI Logic */}
            <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
                <div className={sectionLabelStyle}>
                    <CpuChipIcon className="w-5 h-5" />
                    Логика ИИ
                </div>
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <label className={labelStyle}>Промт для ИИ *</label>
                        <textarea
                            name="prompt"
                            value={formData.prompt}
                            onChange={handleChange}
                            placeholder="Введите промт для анализа звонка..."
                            className={textareaStyle + " min-h-[200px] font-mono text-[13px]"}
                            required
                        ></textarea>
                        <p className="text-[10px] text-[var(--text-muted)] mt-2 font-medium">Используйте переменные: {'{'}transcription{'}'} - текст транскрипции, {'{'}client_info{'}'} - информация о клиенте</p>
                    </div>
                    <div className="flex flex-col">
                        <label className={labelStyle}>GATE-промт (определение, подлежит ли звонок оценке)</label>
                        <textarea
                            placeholder="Верни true или false. Оценивается ли звонок по условиям сценария."
                            className={textareaStyle + " min-h-[100px] font-mono text-[13px]"}
                        ></textarea>
                        <p className="text-[10px] text-[var(--text-muted)] mt-2 font-medium">Если пусто — звонок всегда считается подлежащим оценке</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="flex flex-col">
                            <label className={labelStyle}>Порядок сортировки</label>
                            <input type="number" defaultValue="0" className={inputStyle} />
                        </div>
                        <div className="flex items-end pb-3">
                            <label className={checkboxContainerStyle}>
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={formData.status === 'active'}
                                    onChange={handleCheckboxChange}
                                    className={checkboxStyle}
                                />
                                <span className="text-sm font-bold text-[var(--text)]">Активен</span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Evaluation Criteria */}
            <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div className={sectionLabelStyle.replace('mb-6', 'mb-0')}>
                        <SquaresPlusIcon className="w-5 h-5" />
                        Критерии оценки (категории)
                    </div>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[var(--primary)] bg-purple-50 dark:bg-purple-500/10 hover:bg-[var(--primary)] hover:text-white rounded-xl transition-all border border-purple-100 dark:border-purple-900/20 active:scale-95">
                        <PlusIcon className="w-4 h-4" />
                        Добавить критерий
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Criterion Card #1 */}
                    <div className="bg-[var(--surface-2)] p-6 rounded-2xl border border-[var(--border)] relative group hover:shadow-md transition-all duration-300">
                        <button type="button" className="absolute top-6 right-6 p-1.5 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100">
                            <TrashIcon className="w-5 h-5" />
                        </button>

                        <div className="text-xs font-bold text-[var(--text)] mb-6">Критерий #1</div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col md:col-span-2">
                                <label className={labelStyle}>Название *</label>
                                <input type="text" placeholder="Например: Приветствие" className={inputStyle} />
                            </div>
                            <div className="flex flex-col">
                                <label className={labelStyle}>Вес (0-100)</label>
                                <input type="number" defaultValue="10" className={inputStyle} />
                            </div>
                            <div className="flex flex-col md:col-span-3">
                                <label className={labelStyle}>Описание критерия</label>
                                <textarea placeholder="Что именно оценивается в этом критерии" className={textareaStyle.replace('min-h-[120px]', 'min-h-[80px]')}></textarea>
                            </div>
                            <div className="flex flex-col">
                                <label className={labelStyle}>Порядок</label>
                                <input type="number" defaultValue="1" className={inputStyle} />
                            </div>
                            <div className="flex items-end pb-3">
                                <label className={checkboxContainerStyle}>
                                    <input type="checkbox" defaultChecked className={checkboxStyle} />
                                    <span className="text-sm font-bold text-[var(--text)]">Активен</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-3 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-3 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-xl shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {initialData ? 'Сохранить изменения' : 'Создать сценарий'}
                </button>
            </div>
        </form>
    );
};

export default ScenarioForm;
