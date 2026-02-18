import React from 'react';
import { CallRecord } from '../../shared/types';

interface CallsTableProps {
  records: CallRecord[];
}

const CallsTable: React.FC<CallsTableProps> = ({ records }) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Анализ завершён';
      case 'pending': return 'Не подлежит оценке';
      default: return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'chip-green';
      case 'pending':
        return 'chip-amber';
      default:
        return 'chip-red';
    }
  };

  const getScenarioBadgeClass = (scenario: string) => {
    switch (scenario) {
      case 'Холодный звонок': return 'chip-blue';
      case 'Теплый звонок':
      case 'Тёплый звонок':
        return 'chip-amber';
      case 'Постоянный звонок': return 'chip-violet';
      default: return 'chip-blue';
    }
  };

  const getScoreChipStyle = (score: number | null) => {
    if (score === null) return 'bg-slate-200 text-slate-500';
    if (score === 0.0) return 'score-bad';
    if (score >= 8.0) return 'score-good';
    return 'score-neutral';
  };

  return (
    <div className="bg-[var(--surface)] rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Длительность</th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] min-w-[280px]">Клиент</th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] min-w-[240px]">МОП</th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Сценарий</th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em]">Статус</th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] text-center">Оценка</th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] text-right">Дата ↓</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {records.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-[var(--row-hover)] transition-all duration-150 group"
              >
                <td className="px-6 py-5 text-sm font-bold text-[var(--text)] tabular-nums">
                  {record.duration}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-bold text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors cursor-pointer">
                      {record.client}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-wider font-bold">
                      #{record.id.padStart(5, '0')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="cell-center">
                    <span className="text-sm font-medium text-[var(--text)]">
                      {record.manager}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="cell-center">
                    <span className={`chip ${getScenarioBadgeClass(record.scenario)}`}>
                      {record.scenario}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="cell-center">
                    <span className={`chip uppercase tracking-wider ${getStatusBadgeClass(record.status)}`}>
                      {getStatusLabel(record.status)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    {record.score !== null ? (
                      <span className={`score ${getScoreChipStyle(record.score)}`}>
                        {record.score.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-[var(--text-muted)] font-bold">—</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex flex-col items-end justify-center">
                    <span className="text-[12px] font-bold text-[var(--text)] tabular-nums">
                      {record.date.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold tabular-nums">
                      {record.date.split(' ')[1]}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-[var(--surface-2)] border-t border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--surface)] bg-[var(--bg)] overflow-hidden shadow-sm">
                <img src={`https://picsum.photos/seed/${i + 50}/60/60`} alt="" />
              </div>
            ))}
          </div>
          <span className="text-xs text-[var(--text-muted)] font-bold">
            25 записей на странице
          </span>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 text-xs font-extrabold bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text-muted)] cursor-not-allowed transition-all opacity-50">
            Назад
          </button>
          <button className="px-6 py-2 text-xs font-extrabold bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm active:scale-95">
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallsTable;