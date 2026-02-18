import React from 'react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

interface TranscriptionProps {
    text?: string;
}

const Transcription: React.FC<TranscriptionProps> = ({ text }) => {
    return (
        <section className="bg-[var(--surface)] rounded-[20px] border border-[var(--border)] shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-2)] flex items-center gap-3">
                <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-[var(--text-muted)]" />
                <h3 className="text-sm font-bold text-[var(--text)]">Транскрипция звонка</h3>
            </div>
            <div className="p-6 overflow-y-auto flex-1 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {text || <span className="text-[var(--text-muted)] italic">Транскрипция отсутствует...</span>}
            </div>
        </section>
    );
};

export default Transcription;
