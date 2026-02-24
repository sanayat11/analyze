
import type { FC } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ManagersPage } from '../../pages/ManagersPage';
import { ClientsPage } from '../../pages/ClientsPage';
import { ClientDetailsPage } from '../../pages/ClientDetailsPage';
import { ScenariosPage } from '../../pages/ScenariosPage';
import { ScenarioEditorPage } from '../../pages/ScenarioEditorPage';
import { AnalyticsPage } from '../../pages/AnalyticsPage';
import { AdminPage } from '../../pages/AdminPage';
import { EditUserPage } from '../../pages/EditUserPage';
import { CallingPage } from '../../pages/CallsPage';
import { NotificationsPage } from '../../pages/NotificationsPage';
import { ManagerDetailsPage } from '../../pages/ManagerDetailsPage';
import { CallDetailsPage } from '../../pages/CallDetailsPage';

const AppRouter: FC = () => {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/calls" replace />} />
            <Route path="/calls" element={<CallingPage />} />
            <Route path="/calls/:id" element={<CallDetailsPage />} />
            <Route path="/managers" element={<ManagersPage />} />
            <Route path="/managers/:id" element={<ManagerDetailsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientDetailsPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/scenarios/new" element={<ScenarioEditorPage />} />
            <Route path="/scenarios/:id" element={<ScenarioEditorPage />} />
            <Route path="/create-scenario" element={<ScenarioEditorPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users/new" element={<EditUserPage />} />
            <Route path="/admin/users/:id" element={<EditUserPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="*" element={
                <main className="flex-1 p-8 flex items-center justify-center w-full">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold text-[var(--text)]">Раздел не найден</h2>
                        <p className="text-[var(--text-muted)]">Запрашиваемая страница не существует.</p>
                    </div>
                </main>
            } />
        </Routes>
    );
};

export default AppRouter;
