
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Filters from './components/Filters';
import CallsTable from './components/CallsTable';
import ManagersPage from './components/ManagersPage';
import ClientsPage from './components/ClientsPage';
import ScenariosPage from './components/ScenariosPage';
import CreateScenarioPage from './components/CreateScenarioPage';
import AnalyticsPage from './components/AnalyticsPage';
import AdminPage from './components/AdminPage';
import { CallRecord, Manager, Client, Scenario } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calls');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebarCollapsed') === 'true';
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const callData: CallRecord[] = [
    { id: '1', duration: '0:56', client: 'Дыбов Илья Борисович', manager: 'Залкар Уланбек уулу (псевдоним Ильдар)', scenario: 'Холодный звонок', status: 'completed', score: 6.0, date: '16.02.2026 14:51' },
    { id: '2', duration: '2:39', client: 'Кекин Станислав Сергеевич', manager: 'Шкедов Максим', scenario: 'Теплый звонок', status: 'pending', score: 0.0, date: '16.02.2026 14:46' },
    { id: '3', duration: '0:47', client: 'Батин Александр Витальевич', manager: 'Анастасия Маслова', scenario: 'Теплый звонок', status: 'pending', score: 0.0, date: '16.02.2026 14:27' },
    { id: '4', duration: '5:39', client: 'Островский Станислав Олегович', manager: 'Даирбек кызы Тансулуy (псевдоним Татьяна)', scenario: 'Теплый звонок', status: 'completed', score: 9.4, date: '16.02.2026 13:13' },
    { id: '5', duration: '0:42', client: 'Мамедов Вусал Акрам Оглы', manager: 'Сартбаева Тамара', scenario: 'Постоянный звонок', status: 'pending', score: 0.0, date: '16.02.2026 12:50' },
    { id: '6', duration: '0:50', client: 'Радионова Татьяна Андреевна', manager: 'Шкедов Максим', scenario: 'Постоянный звонок', status: 'pending', score: 0.0, date: '16.02.2026 12:36' },
  ];

  const managerData: Manager[] = [
    { id: '1', name: 'Даирбек кызы Тансулуу (псевдоним Татьяна)', role: 'МОП', callsCount: 58, avgScore: 8.2, avatarLetter: 'Т' },
    { id: '2', name: 'Жумалиев Адилет Алмасович (псевдоним Руслан)', role: 'МОП', callsCount: 64, avgScore: 7.2, avatarLetter: 'А' },
  ];

  const clientData: Client[] = [
    { id: '172970', name: 'АКМАНОВ Денис Андреевич', externalId: '172970', inn: '344101135580', funnel: 'warm', callsCount: 0, avgScore: null, createdAt: '22.01.2026', avatarLetter: 'А' },
  ];

  const scenarioData: Scenario[] = [
    {
      id: '1',
      name: 'Постоянный звонок',
      internalName: 'our_client_call',
      status: 'active',
      description: 'Постоянный звонок - звонок с клиентом который работает с компанией',
      usages: 10,
      avgScore: 8.1,
      categories: ['Приветствие', 'Цель звонка'],
      prompt: 'PROMPT: ОЦЕНКА ЗВОНКА...',
      updatedAt: '13.02.2026'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calls':
        return (
          <main className="flex-1 p-8 space-y-8 overflow-y-auto w-full">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Звонки</h1>
              <p className="text-sm text-[var(--text-muted)] font-medium">438 записей, страница 1 из 18</p>
            </div>
            <Filters />
            <CallsTable records={callData} />
          </main>
        );
      case 'managers':
        return <ManagersPage managers={managerData} />;
      case 'clients':
        return <ClientsPage clients={clientData} />;
      case 'scenarios':
        return <ScenariosPage scenarios={scenarioData} onOpenCreate={() => setActiveTab('create-scenario')} />;
      case 'create-scenario':
        return <CreateScenarioPage onBack={() => setActiveTab('scenarios')} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return (
          <main className="flex-1 p-8 flex items-center justify-center w-full">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[var(--text)]">Раздел в разработке</h2>
              <p className="text-[var(--text-muted)]">Этот функционал будет доступен в ближайшее время.</p>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-transparent transition-colors duration-300 relative overflow-hidden">
      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        activeTab={activeTab === 'create-scenario' ? 'scenarios' : activeTab} 
        setActiveTab={(id) => {
          setActiveTab(id);
          setIsMobileMenuOpen(false);
        }} 
        isCollapsed={isSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 sidebar-transition">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={toggleMobileMenu}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
