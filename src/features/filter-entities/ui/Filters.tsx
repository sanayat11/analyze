import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Select from '@/shared/ui/Select/Select';

interface FiltersProps {
  filters: any;
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onReset }) => {
  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer";

  return (
    <section className="bg-[var(--surface)] p-8 rounded-2xl shadow-sm border border-[var(--border)] transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
        <div className="flex flex-col">
          <label className={labelStyle}>Поиск</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Клиент, МОП, сценарий..."
              className={inputStyle.replace('pl-4', 'pl-10')}
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Статус</label>
          <div className="relative">
            <Select
              value={filters.status}
              onChange={(val) => onFilterChange('status', val)}
              options={[
                { value: '', label: 'Все' },
                { value: 'completed', label: 'Анализ завершён' },
                { value: 'pending', label: 'Не подлежит оценке' },
                { value: 'transcription_error', label: 'Ошибка транскрипции' },
              ]}
              placeholder="Выберите статус"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>МОП</label>
          <div className="relative">
            <Select
              value={filters.manager}
              onChange={(val) => onFilterChange('manager', val)}
              options={[
                { value: '', label: 'Все МОПы' },
                { value: 'Ильдар', label: 'Ильдар' },
                { value: 'Максим', label: 'Максим' },
                { value: 'Анастасия', label: 'Анастасия' },
              ]}
              placeholder="Выберите МОПа"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Сценарий</label>
          <div className="relative">
            <Select
              value={filters.scenario}
              onChange={(val) => onFilterChange('scenario', val)}
              options={[
                { value: '', label: 'Все сценарии' },
                { value: 'Холодный звонок', label: 'Холодный звонок' },
                { value: 'Теплый звонок', label: 'Теплый звонок' },
                { value: 'Постоянный звонок', label: 'Постоянный звонок' },
              ]}
              placeholder="Выберите сценарий"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Дата от</label>
          <input
            type="date"
            className={inputStyle + " [color-scheme:light] dark:[color-scheme:dark]"}
            value={filters.dateFrom || ''}
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Дата до</label>
          <input
            type="date"
            className={inputStyle + " [color-scheme:light] dark:[color-scheme:dark]"}
            value={filters.dateTo || ''}
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>На странице</label>
          <div className="relative">
            <Select
              value={filters.limit || 10}
              onChange={(val) => onFilterChange('limit', Number(val))}
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

        <div className="flex items-end gap-3">
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Сбросить
          </button>
          <button className="flex-2 px-8 py-2.5 text-sm font-bold text-[var(--primary-text)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
            Применить
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filters;