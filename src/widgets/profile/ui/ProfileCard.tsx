import React from 'react';
import { AppUser } from '@/entities/user/model/types';

interface ProfileCardProps {
    user?: AppUser;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    const sectionClass = "bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm mb-8";
    const labelClass = "text-sm font-bold text-[var(--text-muted)] mb-2 block";
    const inputClass = "w-full max-w-md px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-sm text-[var(--text)] focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[var(--primary)] transition-all";

    if (!user) return null;

    return (
        <section className={sectionClass}>
            <div className="flex items-start gap-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-4xl text-white font-bold shadow-lg shadow-purple-500/30">
                    {user.username[0].toUpperCase()}
                </div>
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Имя пользователя</label>
                            <input type="text" value={user.username} disabled className={inputClass + " opacity-75 cursor-not-allowed"} />
                        </div>
                        <div>
                            <label className={labelClass}>Роль</label>
                            <input type="text" value={user.role} disabled className={inputClass + " opacity-75 cursor-not-allowed"} />
                        </div>
                        <div>
                            <label className={labelClass}>Email</label>
                            <input type="email" defaultValue="user@example.com" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}>Телефон</label>
                            <input type="tel" placeholder="+7 (999) 000-00-00" className={inputClass} />
                        </div>
                    </div>
                    <button className="px-6 py-2.5 bg-[var(--primary)] text-white text-sm font-bold rounded-xl hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                        Сохранить изменения
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProfileCard;
