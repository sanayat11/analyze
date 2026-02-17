import React from 'react';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  TrashIcon, 
  InformationCircleIcon,
  CpuChipIcon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline';

interface CreateScenarioPageProps {
  onBack: () => void;
}

const CreateScenarioPage: React.FC<CreateScenarioPageProps> = ({ onBack }) => {
  const sectionLabelStyle = "text-xs font-extrabold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2 mb-6";
  const labelStyle = "text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block";
  const inputStyle = "w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)]";
  const textareaStyle = "w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] min-h-[120px] resize-y";
  const checkboxContainerStyle = "flex items-center gap-3 cursor-pointer group";
  const checkboxStyle = "w-5 h-5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0 transition-all cursor-pointer bg-[var(--input-bg)]";

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Back Button & Header */}
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

      {/* Form Container */}
      <div className="space-y-8 max-w-5xl">
        
        {/* Section: Basic Information */}
        <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
          <div className={sectionLabelStyle}>
            <InformationCircleIcon className="w-5 h-5" />
            Основная информация
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelStyle}>Код сценария *</label>
              <input type="text" placeholder="Например: sales_call" className={inputStyle} />
              <p className="text-[10px] text-[var(--text-muted)] mt-2 font-medium">Уникальный идентификатор для API</p>
            </div>
            <div className="flex flex-col">
              <label className={labelStyle}>Название *</label>
              <input type="text" placeholder="Например: Продажи по телефону" className={inputStyle} />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className={labelStyle}>Описание</label>
              <textarea placeholder="Краткое описание сценария" className={textareaStyle}></textarea>
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
                placeholder="Введите промт для анализа звонка..." 
                className={textareaStyle + " min-h-[200px] font-mono text-[13px]"}
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
                  <input type="checkbox" defaultChecked className={checkboxStyle} />
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
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[var(--primary)] bg-purple-50 dark:bg-purple-500/10 hover:bg-[var(--primary)] hover:text-white rounded-xl transition-all border border-purple-100 dark:border-purple-900/20 active:scale-95">
              <PlusIcon className="w-4 h-4" />
              Добавить критерий
            </button>
          </div>

          <div className="space-y-4">
            {/* Criterion Card #1 */}
            <div className="bg-[var(--surface-2)] p-6 rounded-2xl border border-[var(--border)] relative group hover:shadow-md transition-all duration-300">
              <button className="absolute top-6 right-6 p-1.5 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100">
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
            onClick={onBack}
            className="px-8 py-3 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            Отмена
          </button>
          <button className="px-10 py-3 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-xl shadow-purple-500/20 active:scale-[0.98]">
            Создать сценарий
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateScenarioPage;