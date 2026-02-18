import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowPathIcon,
  FunnelIcon,
  HashtagIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import Select from '@/shared/ui/Select/Select';
import { analyticsApi } from '@/entities/analytics/api/analyticsApi';
import ExportAnalytics from '@/features/export-analytics/ui/ExportAnalytics';

import TokenUsageChart from '@/widgets/charts/TokenUsageChart';
import ProviderDistributionChart from '@/widgets/charts/ProviderDistributionChart';

export const AnalyticsPage: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => analyticsApi.getAnalytics()
  });

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer appearance-none";

  if (isLoading || !analyticsData) return <div className="p-8 text-[var(--text-muted)]">Загрузка аналитики...</div>;

  const { kpis, requests, usageByModel, usageByEndpoint } = analyticsData;

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Аналитика токенов и расходов</h1>
        <p className="text-sm text-[var(--text-muted)] font-medium">Мониторинг использования LLM API и расходов на токены</p>
      </div>
      <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
        <h3 className="text-sm font-bold text-[var(--text)] mb-6 flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-[var(--primary)]" />
          Фильтры
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label className={labelStyle}>Период</label>
            <div className="relative">
              <Select
                value="Последние 24 часа"
                onChange={() => { }}
                options={[
                  { value: 'Последние 24 часа', label: 'Последние 24 часа' },
                  { value: 'Последние 7 дней', label: 'Последние 7 дней' },
                  { value: 'Последний месяц', label: 'Последний месяц' },
                ]}
                placeholder="Выберите период"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Группировка по времени</label>
            <div className="relative">
              <Select
                value="По дням"
                onChange={() => { }}
                options={[
                  { value: 'По дням', label: 'По дням' },
                  { value: 'По часам', label: 'По часам' },
                ]}
                placeholder="Выберите группировку"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Провайдер</label>
            <div className="relative">
              <Select
                value="Все провайдеры"
                onChange={() => { }}
                options={[
                  { value: 'Все провайдеры', label: 'Все провайдеры' },
                  { value: 'timeweb', label: 'timeweb' },
                ]}
                placeholder="Выберите провайдера"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Модель</label>
            <div className="relative">
              <Select
                value="Все модели"
                onChange={() => { }}
                options={[
                  { value: 'Все модели', label: 'Все модели' },
                  { value: 'gpt-5-mini', label: 'gpt-5-mini' },
                ]}
                placeholder="Выберите модель"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button className="px-8 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
            Применить фильтры
          </button>
          <div className="flex gap-3">
            <ExportAnalytics />
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/10 active:scale-[0.98]">
              <ArrowPathIcon className="w-4 h-4" />
              Автообновление: ВКЛ
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 p-7 rounded-[20px] border border-blue-100 dark:border-blue-900/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-blue-600">
              <HashtagIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{kpis[0]?.title}</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">{(kpis[0]?.value as number).toLocaleString()}</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{kpis[0]?.description}</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-500/5 dark:to-green-500/5 p-7 rounded-[20px] border border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{kpis[1]?.title}</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">{kpis[1]?.value}</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{kpis[1]?.description}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-500/5 dark:to-violet-500/5 p-7 rounded-[20px] border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-purple-600">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">{kpis[2]?.title}</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">Последние {kpis[2]?.value}</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">{kpis[2]?.description}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-[var(--text)]">Использование токенов</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6366F1]"></div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Prompt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]"></div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Всего</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full relative">
            <TokenUsageChart data={analyticsData.chartData.tokenUsage} />
          </div>
        </div>

        <div className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm">
          <h3 className="font-bold text-[var(--text)] mb-8">Распределение по провайдерам</h3>
          <ProviderDistributionChart data={analyticsData.chartData.providerDistribution} animate={animate} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--border)] bg-[var(--surface-2)]">
            <h3 className="text-sm font-bold text-[var(--text)]">Использование по моделям</h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[var(--text-muted)] font-extrabold uppercase tracking-widest border-b border-[var(--border)]">
                <th className="px-6 py-4">Модель</th>
                <th className="px-6 py-4">Токены</th>
                <th className="px-6 py-4">Запросы</th>
                <th className="px-6 py-4 text-right">Среднее</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {usageByModel?.map((item, i) => (
                <tr key={i} className="hover:bg-[var(--row-hover)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[var(--text)]">{item.model}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wider">{item.provider}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[var(--text)]">{item.tokens.toLocaleString()}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{item.promptTokens.toLocaleString()}п + {item.completionTokens.toLocaleString()}с</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[var(--text)]">{item.requests}</td>
                  <td className="px-6 py-4 font-bold text-[var(--text)] text-right tabular-nums">{item.averageTokens.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[var(--border)] bg-[var(--surface-2)]">
            <h3 className="text-sm font-bold text-[var(--text)]">Использование по эндпоинтам</h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[var(--text-muted)] font-extrabold uppercase tracking-widest border-b border-[var(--border)]">
                <th className="px-6 py-4">Эндпоинт</th>
                <th className="px-6 py-4">Токены</th>
                <th className="px-6 py-4">Запросы</th>
                <th className="px-6 py-4 text-right">% От общего</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {usageByEndpoint?.map((item, i) => (
                <tr key={i} className="hover:bg-[var(--row-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <span className={`chip ${item.endpoint === 'gate' ? 'chip-blue' : 'chip-violet'} h-[22px] px-3 font-bold`}>{item.endpoint}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-[var(--text)] tabular-nums">{item.tokens.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-[var(--text)] tabular-nums">{item.requests}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="w-16 h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                        <div className={`h-full ${item.endpoint === 'gate' ? 'bg-blue-400' : 'bg-[var(--primary)]'}`} style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <span className="font-bold text-[var(--text)]">{item.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[var(--surface)] rounded-[20px] shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300">
        <div className="px-8 py-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-2)]">
          <h3 className="font-bold text-[var(--text)]">Детализация запросов</h3>
          <div className="flex items-center gap-4">
            <div className="min-w-[80px]">
              <Select
                value={20}
                onChange={() => { }}
                options={[
                  { value: 20, label: '20' },
                  { value: 50, label: '50' },
                ]}
                placeholder="20"
              />
            </div>
            <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] border-b border-[var(--border)]">
                <th className="px-8 py-4">Дата</th>
                <th className="px-6 py-4">Провайдер</th>
                <th className="px-6 py-4">Модель</th>
                <th className="px-6 py-4">Эндпоинт</th>
                <th className="px-6 py-4">Токены</th>
                <th className="px-6 py-4">Стоимость</th>
                <th className="px-8 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {requests?.map((row, i) => (
                <tr key={i} className="hover:bg-[var(--row-hover)] transition-all duration-150 group">
                  <td className="px-8 py-5 text-xs font-medium text-[var(--text)] tabular-nums">{row.date}</td>
                  <td className="px-6 py-5">
                    <span className="chip chip-blue h-[24px] px-3 font-bold opacity-80">{row.provider}</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[var(--text)]">{row.model}</td>
                  <td className="px-6 py-5">
                    <span className={`chip ${row.endpoint === 'gate' ? 'chip-blue' : 'chip-violet'} h-[24px] px-3 font-bold opacity-80`}>
                      {row.endpoint}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[var(--text)] tabular-nums">{row.tokens.toLocaleString()}</div>
                    <div className="text-[10px] text-[var(--text-muted)] tabular-nums">{row.promptTokens.toLocaleString()}п + {row.completionTokens.toLocaleString()}с</div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-[var(--text-muted)]">—</td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-all active:scale-90">
                      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

