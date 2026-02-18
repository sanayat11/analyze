import React from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

interface AudioPlayerProps {
    duration: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ duration }) => {
    return (
        <section className="bg-[var(--surface)] p-6 rounded-[20px] border border-[var(--border)] shadow-sm flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">
                <PlayIcon className="w-6 h-6 ml-1" />
            </button>
            <div className="flex-1 space-y-2">
                <div className="h-1.5 bg-[var(--surface-2)] rounded-full overflow-hidden cursor-pointer group">
                    <div className="h-full bg-[var(--primary)] w-1/3 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform scale-0 group-hover:scale-100"></div>
                    </div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)]">
                    <span>01:15</span>
                    <span>{duration}</span>
                </div>
            </div>
            <SpeakerWaveIcon className="w-5 h-5 text-[var(--text-muted)]" />
        </section>
    );
};

export default AudioPlayer;
