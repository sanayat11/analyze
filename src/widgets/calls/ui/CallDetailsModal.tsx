import React from 'react';
import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { callApi } from '@/entities/call/api/callApi';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CallInfoCard from '@/widgets/calls/ui/CallInfoCard';
import AudioPlayer from '@/widgets/calls/ui/AudioPlayer';
import Transcription from '@/widgets/calls/ui/Transcription';
import CallAnalysis from '@/widgets/calls/ui/CallAnalysis';

interface CallDetailsModalProps {
    callId: string | null;
    onClose: () => void;
}

const CallDetailsModal: React.FC<CallDetailsModalProps> = ({ callId, onClose }) => {
    const isOpen = !!callId;

    const { data: call, isLoading } = useQuery({
        queryKey: ['call', callId],
        queryFn: () => callId ? callApi.getById(callId) : Promise.reject('No ID'),
        enabled: isOpen
    });

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-[var(--bg-color)] text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 sm:my-8 w-full max-w-7xl border border-[var(--border)]">

                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border)] bg-[var(--surface-2)]">
                            <div className="flex items-center gap-4">
                                <DialogTitle as="h3" className="text-xl font-bold leading-6 text-[var(--text)]">
                                    Анализ звонка #{callId?.padStart(5, '0')}
                                </DialogTitle>
                                {call?.status === 'completed' && (
                                    <span className="chip chip-green px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                        Анализ завершен
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                className="rounded-md bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-8 py-8 bg-[var(--bg-color)] max-h-[85vh] overflow-y-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-[var(--text-muted)] font-medium">Загрузка данных звонка...</p>
                                    </div>
                                </div>
                            ) : call ? (
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                    {/* Left Column: Info & Player & Transcript */}
                                    <div className="col-span-1 xl:col-span-2 space-y-8">
                                        <CallInfoCard call={call} />
                                        <AudioPlayer duration={call.duration} />
                                        <Transcription text={call.transcription} />
                                    </div>

                                    {/* Right Column: Analysis */}
                                    <CallAnalysis call={call} />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64 text-red-500">
                                    Ошибка загрузки данных или звонок не найден
                                </div>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default CallDetailsModal;
