import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowDownTrayIcon, 
  ArrowPathIcon,
  ChevronDownIcon,
  FunnelIcon,
  HashtagIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Chart } from 'chart.js/auto';

const TokenUsageChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing instance to prevent memory leaks and duplication
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Use actual color variables from CSS
    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = '#7c3aed'; // Brand purple
    const promptColor = '#6366F1'; // Prompt indigo
    const completionColor = '#22C55E'; // Completion emerald
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)';
    const textColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.6)';

    // Gradient fill for completion (usually more relevant as total)
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
    gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

    // Mock data points reflecting the 24h cycle
    const labels = ['06:00', '10:00', '14:00', '18:00', '22:00', '02:00', '06:00'];
    const promptData = [21000, 18000, 35000, 51987, 25000, 12000, 20000];
    const completionData = [6000, 4500, 11000, 14849, 8000, 3500, 5000];

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Prompt',
            data: promptData,
            borderColor: promptColor,
            borderWidth: 2,
            tension: 0.35,
            cubicInterpolationMode: 'monotone',
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: promptColor,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            fill: false,
          },
          {
            label: 'Completion',
            data: completionData,
            borderColor: completionColor,
            borderWidth: 2,
            tension: 0.35,
            cubicInterpolationMode: 'monotone',
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: completionColor,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            fill: false,
          },
          {
            label: 'Всего',
            data: promptData.map((v, i) => v + completionData[i]),
            borderColor: primaryColor,
            borderWidth: 3,
            tension: 0.35,
            cubicInterpolationMode: 'monotone',
            backgroundColor: gradient,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: primaryColor,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false // We use our own legend in UI
          },
          tooltip: {
            backgroundColor: isDark ? '#1e293b' : '#fff',
            titleColor: isDark ? '#fff' : '#0f172a',
            bodyColor: isDark ? '#94a3b8' : '#64748b',
            borderColor: gridColor,
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12,
            boxPadding: 6,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('ru-RU').format(context.parsed.y);
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                weight: '600',
                family: 'Inter'
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor,
              drawBorder: false,
            },
            ticks: {
              color: textColor,
              font: {
                size: 10,
                weight: '600',
                family: 'Inter'
              },
              callback: function(value) {
                return (Number(value) / 1000) + 'k';
              }
            }
          }
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} className="w-full h-full" />;
};

const AnalyticsPage: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const labelStyle = "text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.1em] mb-2 block";
  const inputStyle = "w-full pl-4 pr-10 py-2.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all placeholder:text-[var(--input-placeholder)] cursor-pointer appearance-none";

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Аналитика токенов и расходов</h1>
        <p className="text-sm text-[var(--text-muted)] font-medium">Мониторинг использования LLM API и расходов на токены</p>
      </div>

      {/* Filters Card */}
      <section className="bg-[var(--surface)] p-8 rounded-[20px] shadow-sm border border-[var(--border)] transition-all duration-300">
        <h3 className="text-sm font-bold text-[var(--text)] mb-6 flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-[var(--primary)]" />
          Фильтры
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label className={labelStyle}>Период</label>
            <div className="relative">
              <select className={inputStyle}>
                <option>Последние 24 часа</option>
                <option>Последние 7 дней</option>
                <option>Последний месяц</option>
              </select>
              <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Группировка по времени</label>
            <div className="relative">
              <select className={inputStyle}>
                <option>По дням</option>
                <option>По часам</option>
              </select>
              <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Провайдер</label>
            <div className="relative">
              <select className={inputStyle}>
                <option>Все провайдеры</option>
                <option>timeweb</option>
              </select>
              <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className={labelStyle}>Модель</label>
            <div className="relative">
              <select className={inputStyle}>
                <option>Все модели</option>
                <option>gpt-5-mini</option>
              </select>
              <ChevronDownIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button className="px-8 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
            Применить фильтры
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-500/10 active:scale-[0.98]">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Экспорт
            </button>
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/10 active:scale-[0.98]">
              <ArrowPathIcon className="w-4 h-4" />
              Автообновление: ВКЛ
            </button>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 p-7 rounded-[20px] border border-blue-100 dark:border-blue-900/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-blue-600">
              <HashtagIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Всего токенов</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">66 836</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">51 987 prompt + 14 849 completion</div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-500/5 dark:to-green-500/5 p-7 rounded-[20px] border border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
              <ArrowsRightLeftIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Всего запросов</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mb-2">17</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">3 932 токенов в среднем</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-500/5 dark:to-violet-500/5 p-7 rounded-[20px] border border-purple-100 dark:border-purple-900/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm text-purple-600">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Период</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mb-2">Последние 24 часа</div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">15.02.2026, 17:03 — 16.02.2026, 17:03</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Usage Chart */}
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
            <TokenUsageChart />
          </div>
        </div>

        {/* Provider Distribution Donut Chart */}
        <div className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm">
          <h3 className="font-bold text-[var(--text)] mb-8">Распределение по провайдерам</h3>
          <div className="flex items-center gap-12">
            <div className="relative w-48 h-48 shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--surface-2)" strokeWidth="12" />
                <circle 
                  cx="50" cy="50" r="40" 
                  fill="none" 
                  stroke="var(--primary)" 
                  strokeWidth="12" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={animate ? "0" : "251.2"} 
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase">Всего</span>
                <span className="text-lg font-bold text-[var(--text)]">66 836</span>
                <span className="text-[10px] font-extrabold text-[var(--primary)] mt-0.5">100.0%</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[var(--primary)] group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm font-semibold text-[var(--text)]">timeweb</span>
                </div>
                <span className="text-xs font-bold text-[var(--text-muted)]">100.0%</span>
              </div>
              <div className="h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[var(--primary)] transition-all duration-1000" 
                  style={{ width: animate ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small Tables Section */}
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
              <tr className="hover:bg-[var(--row-hover)] transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-[var(--text)]">gpt-5-mini</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wider">timeweb</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-[var(--text)]">66 836</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">51 987п + 14 849с</div>
                </td>
                <td className="px-6 py-4 font-bold text-[var(--text)]">17</td>
                <td className="px-6 py-4 font-bold text-[var(--text)] text-right tabular-nums">3 932</td>
              </tr>
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
              <tr className="hover:bg-[var(--row-hover)] transition-colors">
                <td className="px-6 py-4">
                  <span className="chip chip-violet h-[22px] px-3 font-bold">analysis</span>
                </td>
                <td className="px-6 py-4 font-bold text-[var(--text)] tabular-nums">36 984</td>
                <td className="px-6 py-4 font-bold text-[var(--text)] tabular-nums">4</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-16 h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--primary)]" style={{ width: '55.3%' }}></div>
                    </div>
                    <span className="font-bold text-[var(--text)]">55.3%</span>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-[var(--row-hover)] transition-colors">
                <td className="px-6 py-4">
                  <span className="chip chip-blue h-[22px] px-3 font-bold">gate</span>
                </td>
                <td className="px-6 py-4 font-bold text-[var(--text)] tabular-nums">29 852</td>
                <td className="px-6 py-4 font-bold text-[var(--text)] tabular-nums">13</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-16 h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400" style={{ width: '44.7%' }}></div>
                    </div>
                    <span className="font-bold text-[var(--text)]">44.7%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Request Table Section */}
      <div className="bg-[var(--surface)] rounded-[20px] shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300">
        <div className="px-8 py-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-2)]">
          <h3 className="font-bold text-[var(--text)]">Детализация запросов</h3>
          <div className="flex items-center gap-4">
            <select className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-xs font-bold outline-none">
              <option>20</option>
              <option>50</option>
            </select>
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
              {[
                { date: '16.02.2026, 16:55:00', model: 'gpt-5-mini', endpoint: 'gate', tokens: '1 839', p: '1 762', c: '77' },
                { date: '16.02.2026, 16:54:01', model: 'gpt-5-mini', endpoint: 'gate', tokens: '2 131', p: '2 089', c: '42' },
                { date: '16.02.2026, 16:50:57', model: 'gpt-5-mini', endpoint: 'gate', tokens: '2 353', p: '2 300', c: '53' },
                { date: '16.02.2026, 16:45:45', model: 'gpt-5-mini', endpoint: 'analysis', tokens: '11 022', p: '6 345', c: '4 677' },
                { date: '16.02.2026, 16:44:49', model: 'gpt-5-mini', endpoint: 'gate', tokens: '2 789', p: '2 760', c: '29' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--row-hover)] transition-all duration-150 group">
                  <td className="px-8 py-5 text-xs font-medium text-[var(--text)] tabular-nums">{row.date}</td>
                  <td className="px-6 py-5">
                    <span className="chip chip-blue h-[24px] px-3 font-bold opacity-80">timeweb</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[var(--text)]">{row.model}</td>
                  <td className="px-6 py-5">
                    <span className={`chip ${row.endpoint === 'gate' ? 'chip-blue' : 'chip-violet'} h-[24px] px-3 font-bold opacity-80`}>
                      {row.endpoint}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-[var(--text)] tabular-nums">{row.tokens}</div>
                    <div className="text-[10px] text-[var(--text-muted)] tabular-nums">{row.p}п + {row.c}с</div>
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

export default AnalyticsPage;