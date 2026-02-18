
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Select from '@/shared/ui/Select/Select';
import { analyticsApi } from '../../../entities/analytics/api/analyticsApi';

const ExportAnalytics: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [format, setFormat] = useState<'csv' | 'pdf' | 'xlsx'>('csv');
    const [dateRange, setDateRange] = useState('7days');
    const [dataType, setDataType] = useState('all');

    const handleExport = async () => {
        // In a real app, we would pass these parameters to the API
        await analyticsApi.export(format);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-500/10 active:scale-[0.98]"
            >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Экспорт
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[var(--surface)] p-6 text-left align-middle shadow-xl transition-all border border-[var(--border)]">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-bold leading-6 text-[var(--text)]"
                                        >
                                            Экспорт аналитики
                                        </Dialog.Title>
                                        <button onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Формат</label>
                                            <Select
                                                value={format}
                                                onChange={(val) => setFormat(val as any)}
                                                options={[
                                                    { value: 'csv', label: 'CSV' },
                                                    { value: 'pdf', label: 'PDF' },
                                                    { value: 'xlsx', label: 'Excel (XLSX)' },
                                                ]}
                                                placeholder="Выберите формат"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Период</label>
                                            <Select
                                                value={dateRange}
                                                onChange={(val) => setDateRange(val as string)}
                                                options={[
                                                    { value: '24h', label: 'Последние 24 часа' },
                                                    { value: '7days', label: 'Последние 7 дней' },
                                                    { value: '30days', label: 'Последний месяц' },
                                                    { value: 'custom', label: 'Пользовательский диапазон' },
                                                ]}
                                                placeholder="Выберите период"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">Тип данных</label>
                                            <Select
                                                value={dataType}
                                                onChange={(val) => setDataType(val as string)}
                                                options={[
                                                    { value: 'all', label: 'Все данные' },
                                                    { value: 'tokens', label: 'Только токены' },
                                                    { value: 'requests', label: 'Только запросы' },
                                                    { value: 'costs', label: 'Только расходы' },
                                                ]}
                                                placeholder="Выберите тип данных"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            onClick={handleExport}
                                            className="px-4 py-2 text-sm font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg shadow-lg shadow-purple-500/20"
                                        >
                                            Скачать
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ExportAnalytics;
