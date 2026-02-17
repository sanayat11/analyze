import React from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Filters: React.FC = () => {
  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer";

  return (
    <section className="bg-[var(--surface)] p-8 rounded-2xl shadow-sm border border-[var(--border)] transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
        {/* Row 1 */}
        <div className="flex flex-col">
          <label className={labelStyle}>Поиск</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Клиент, МОП, сценарий..." 
              className={inputStyle.replace('pl-4', 'pl-10')}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Статус</label>
          <div className="relative">
            <select className={inputStyle + " appearance-none"}>
              <option>Все</option>
              <option>Новый</option>
              <option>Идёт транскрипция</option>
              <option>Ожидает транскрипции</option>
              <option>Транскрипция завершена</option>
              <option>Ошибка транскрипции</option>
              <option>Идёт анализ</option>
              <option>Анализ завершён</option>
              <option>Ошибка анализа</option>
              <option>Не подлежит оценке</option>
              <option>Транскрипция пуста</option>
            </select>
            <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>МОП</label>
          <div className="relative">
            <select className={inputStyle + " appearance-none"}>
              <option>Все МОПы</option>
              <option>Александр Милосердный</option>
              <option>Анастасия Маслова</option>
              <option>Анастасия Полякова</option>
              <option>Татьяна</option>
              <option>Руслан</option>
              <option>Ильдар</option>
              <option>Сартбаева Тамара</option>
              <option>Шкедов Максим</option>
              <option>Юрий Чернышов</option>
            </select>
            <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Сценарий</label>
          <div className="relative">
            <select className={inputStyle + " appearance-none"}>
              <option>Все сценарии</option>
              <option>Постоянный звонок</option>
              <option>Теплый звонок</option>
              <option>Холодный звонок</option>
            </select>
            <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col">
          <label className={labelStyle}>Дата от</label>
          <input 
            type="date" 
            className={inputStyle + " [color-scheme:light] dark:[color-scheme:dark]"}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>Дата до</label>
          <input 
            type="date" 
            className={inputStyle + " [color-scheme:light] dark:[color-scheme:dark]"}
          />
        </div>

        <div className="flex flex-col">
          <label className={labelStyle}>На странице</label>
          <div className="relative">
            <select className={inputStyle + " appearance-none"}>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>

        <div className="flex items-end gap-3">
          <button className="flex-1 px-4 py-2.5 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
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