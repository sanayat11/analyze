import React from 'react';
import { 
  PlusIcon,
  PhoneIcon,
  UsersIcon,
  UserGroupIcon,
  IdentificationIcon,
  PencilSquareIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { AppUser, RecentCallAdmin } from '../types';

const AdminPage: React.FC = () => {
  const users: AppUser[] = [
    { id: '1', username: 'admin', role: 'Админ', active: false },
    { id: '2', username: 'NursOKK', role: 'Пользователь', active: false },
    { id: '3', username: 'Meerkan', role: 'Пользователь', active: false },
    { id: '4', username: 'Maxim', role: 'Пользователь', active: false },
    { id: '5', username: 'Yuriy', role: 'Админ', active: false },
  ];

  const recentCalls: RecentCallAdmin[] = [
    { id: '1562', client: '1169', status: 'analyzing', date: '16.02.2026 11:06' },
    { id: '1561', client: '1169', status: 'transcription_pending', date: '16.02.2026 11:00' },
    { id: '1560', client: '569', status: 'not_evaluatable', date: '16.02.2026 10:53' },
    { id: '1559', client: '1168', status: 'not_evaluatable', date: '16.02.2026 10:53' },
    { id: '1558', client: '522', status: 'not_evaluatable', date: '16.02.2026 10:49' },
    { id: '1557', client: '220', status: 'analyzing_done', date: '16.02.2026 10:43' },
    { id: '1556', client: '521', status: 'analyzing_done', date: '16.02.2026 10:30' },
    { id: '1555', client: '1167', status: 'not_evaluatable', date: '16.02.2026 10:17' },
    { id: '1554', client: '1166', status: 'analyzing_done', date: '16.02.2026 08:51' },
    { id: '1553', client: '1080', status: 'not_evaluatable', date: '16.02.2026 08:46' },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'analyzing_done': return 'chip-green';
      case 'analyzing': return 'chip-blue';
      case 'transcription_pending': return 'chip-amber';
      case 'not_evaluatable': return 'chip-red';
      default: return 'chip-blue';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'analyzing_done': return 'Анализ завершен';
      case 'analyzing': return 'Анализируется';
      case 'transcription_pending': return 'Ожидает транскрипции';
      case 'not_evaluatable': return 'Не оценивается';
      default: return status;
    }
  };

  const tableHeaderStyle = "px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] border-b border-[var(--border)]";

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Админ-панель</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Всего звонков', value: '115', icon: <PhoneIcon className="w-5 h-5" />, color: 'blue' },
          { label: 'Клиенты', value: '1151', icon: <UsersIcon className="w-5 h-5" />, color: 'emerald' },
          { label: 'МОПы', value: '9', icon: <UserGroupIcon className="w-5 h-5" />, color: 'purple' },
          { label: 'Пользователи', value: '5', icon: <IdentificationIcon className="w-5 h-5" />, color: 'amber' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">{kpi.label}</span>
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                {kpi.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-[var(--text)] tabular-nums">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Users Section */}
      <section className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--text)]">Пользователи</h2>
          <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]">
            <PlusIcon className="w-5 h-5" />
            Создать пользователя
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--surface-2)]">
                <th className={tableHeaderStyle}>ID</th>
                <th className={tableHeaderStyle}>Username</th>
                <th className={tableHeaderStyle}>Роль</th>
                <th className={tableHeaderStyle}>Активен</th>
                <th className={tableHeaderStyle + " text-right"}>Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--row-hover)] transition-colors group">
                  <td className="px-8 py-5 text-sm font-medium text-[var(--text-muted)] tabular-nums">{user.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-[var(--text)]">{user.username}</td>
                  <td className="px-8 py-5">
                    <span className={`chip ${user.role === 'Админ' ? 'chip-violet' : 'chip-blue'} h-[24px] px-3 font-bold`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`chip chip-red h-[24px] px-3 font-bold`}>
                      Нет
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1.5 ml-auto opacity-70 hover:opacity-100 transition-opacity">
                      <PencilSquareIcon className="w-4 h-4" />
                      Редактировать
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Calls Section */}
      <section className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--surface-2)]">
          <h2 className="text-lg font-bold text-[var(--text)]">Последние звонки</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--surface-2)]">
                <th className={tableHeaderStyle}>ID</th>
                <th className={tableHeaderStyle}>Клиент</th>
                <th className={tableHeaderStyle}>Статус</th>
                <th className={tableHeaderStyle + " text-right"}>Дата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {recentCalls.map((call) => (
                <tr key={call.id} className="hover:bg-[var(--row-hover)] transition-colors group">
                  <td className="px-8 py-5 text-sm font-medium text-[var(--text-muted)] tabular-nums">{call.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-[var(--text)] tabular-nums">{call.client}</td>
                  <td className="px-8 py-5">
                    <span className={`chip ${getStatusBadgeClass(call.status)} h-[24px] px-3 font-bold uppercase tracking-wider`}>
                      {getStatusLabel(call.status)}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-[var(--text)] tabular-nums">{call.date.split(' ')[0]}</span>
                      <span className="text-[10px] text-[var(--text-muted)] font-medium tabular-nums">{call.date.split(' ')[1]}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;