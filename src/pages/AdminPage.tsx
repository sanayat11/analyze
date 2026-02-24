import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  PlusIcon,
  PhoneIcon,
  UsersIcon,
  UserGroupIcon,
  IdentificationIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import ProfileCard from '@/widgets/profile/ui/ProfileCard';
import SettingsGrid from '@/widgets/profile/ui/SettingsGrid';
import ConfirmModal from '@/features/confirm-action/ui/ConfirmModal';
import { userApi } from '@/entities/user/api/userApi';
import { clientApi } from '@/entities/client/api/clientApi';
import { mopApi } from '@/entities/mop/api/mopApi';
import { callApi } from '@/entities/call/api/callApi';

import Pagination from '@/features/paginate-entities/ui/Pagination';
import { usePagination } from '@/shared/lib/hooks/usePagination';
import { formatName } from '@/shared/lib/utils/formatName';

import UsersTable from '@/widgets/users/ui/UsersTable';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const limit = 10;

  const { data: currentUser } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => userApi.getMe()
  });

  const { data: usersData } = useQuery({
    queryKey: ['users', page],
    queryFn: () => userApi.getAll({ page, limit })
  });

  const { totalPages } = usePagination(usersData?.total || 0, limit, page);

  const { data: clientsData } = useQuery({
    queryKey: ['clients-count'],
    queryFn: () => clientApi.getAll({ limit: 1 })
  });

  const { data: mopsData } = useQuery({
    queryKey: ['mops-count'],
    queryFn: () => mopApi.getAll({ limit: 1 })
  });

  const { data: callsData } = useQuery({
    queryKey: ['calls-recent'],
    queryFn: () => callApi.getAll({ limit: 10 })
  });

  const users = usersData?.data || [];
  const recentCalls = callsData?.data || [];

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/404');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed': return 'chip-green';
      case 'analyzing': return 'chip-blue';
      case 'transcription_pending': return 'chip-amber';
      case 'pending': return 'chip-red';
      default: return 'chip-blue';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Анализ завершен';
      case 'analyzing': return 'Анализируется';
      case 'transcription_pending': return 'Ожидает транскрипции';
      case 'pending': return 'Не оценивается';
      default: status;
    }
    return status;
  };

  const tableHeaderStyle = "px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] border-b border-[var(--border)]";

  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Админ-панель</h1>
        <p className="text-sm text-[var(--text-muted)]">Привет, {currentUser?.username || 'Guest'} ({currentUser?.role || 'User'})</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Всего звонков', value: callsData?.total || 0, icon: <PhoneIcon className="w-5 h-5" />, color: 'blue' },
          { label: 'Клиенты', value: clientsData?.total || 0, icon: <UsersIcon className="w-5 h-5" />, color: 'emerald' },
          { label: 'МОПы', value: mopsData?.total || 0, icon: <UserGroupIcon className="w-5 h-5" />, color: 'purple' },
          { label: 'Пользователи', value: usersData?.total || 0, icon: <IdentificationIcon className="w-5 h-5" />, color: 'amber' },
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

      <div className="space-y-4">
        <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between rounded-t-[20px] rounded-b-none bg-[var(--surface)] border-x border-t">
          <h2 className="text-lg font-bold text-[var(--text)]">Пользователи</h2>
          <button
            onClick={() => navigate('/admin/users/new')}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
          >
            <PlusIcon className="w-5 h-5" />
            Создать пользователя
          </button>
        </div>
        <UsersTable users={users} onEdit={(id) => navigate(`/admin/users/${id}`)} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={usersData?.total || 0}
          limit={limit}
        />
      </div>

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
                  <td className="px-8 py-5 text-sm font-bold text-[var(--text)] tabular-nums">{formatName(call.client)}</td>
                  <td className="px-8 py-5">
                    <span className={`chip ${getStatusBadgeClass(call.status)}`}>
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

      <div className="pt-8 border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-6">Профиль пользователя</h2>
        <div className="space-y-8">
          <ProfileCard user={currentUser} />

          <SettingsGrid
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
          />

          <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[20px] border border-red-100 dark:border-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-1">Выход из аккаунта</h3>
                <p className="text-sm text-red-600/70 dark:text-red-400/70">Завершить сессию на этом устройстве</p>
              </div>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="px-6 py-2.5 bg-white dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-100 dark:border-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all flex items-center gap-2 shadow-sm"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </section>
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Выход из аккаунта"
        message="Вы уверены, что хотите выйти? Вам придется войти снова, чтобы получить доступ к данным."
        confirmText="Да, выйти"
        isDangerous={true}
      />
    </main>
  );
};
