import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { AppUser } from '@/entities/user/model/types';

interface UsersTableProps {
    users: AppUser[];
    onEdit?: (id: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit }) => {
    const tableHeaderStyle = "px-8 py-4 text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] border-b border-[var(--border)]";

    return (
        <section className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden">
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
                                    <span className={`chip ${user.active ? 'chip-green' : 'chip-red'} h-[24px] px-3 font-bold`}>
                                        {user.active ? 'Да' : 'Нет'}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button
                                        onClick={() => onEdit?.(user.id)}
                                        className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1.5 ml-auto opacity-70 hover:opacity-100 transition-opacity"
                                    >
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
    );
};

export default UsersTable;
