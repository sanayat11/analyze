import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CallRecord } from '@/entities/call/model/types';

interface CallAnalysisProps {
    call: CallRecord;
}

const CallAnalysis: React.FC<CallAnalysisProps> = ({ call }) => {
    const getScoreColorClass = (score: number | null) => {
        if (score === null) return 'text-[var(--text-muted)]';
        if (score >= 8.0) return 'text-green-500';
        if (score >= 6.0) return 'text-amber-500';
        return 'text-red-500';
    };

    return (
        <div className="col-span-1 space-y-6">
            {/* Overall Score */}
            <div className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 opacity-50"></div>
                <div className="text-[11px] font-extrabold text-[var(--text-muted)] uppercase tracking-widest mb-2">Общая оценка</div>
                <div className={`text-6xl font-black mb-2 tracking-tighter ${getScoreColorClass(call.score)}`}>
                    {call.score?.toFixed(1) ?? '—'}
                </div>
                <div className="text-sm font-medium text-[var(--text-muted)]">из 10 баллов</div>
            </div>

            {/* Summary */}
            {call.analysisData && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 p-6 rounded-[20px] border border-indigo-100 dark:border-indigo-900/20">
                    <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
                        <InformationCircleIcon className="w-4 h-4" />
                        Резюме ИИ
                    </h4>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200/80 leading-relaxed font-medium">
                        {call.analysisData.summary}
                    </p>
                </div>
            )}

            {/* Criteria List */}
            {call.analysisData && (
                <div className="space-y-4">
                    {call.analysisData.criteria.map((criterion, idx) => (
                        <div key={idx} className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h5 className="text-sm font-bold text-[var(--text)]">{criterion.name}</h5>
                                <span className={`text-sm font-bold ${getScoreColorClass(criterion.score)}`}>
                                    {criterion.score}/10
                                </span>
                            </div>
                            <div className="w-full bg-[var(--surface-2)] h-1.5 rounded-full overflow-hidden mb-3">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${criterion.score * 10}%`,
                                        backgroundColor: criterion.score >= 8 ? '#22C55E' : criterion.score >= 6 ? '#F59E0B' : '#EF4444'
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                {criterion.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {!call.analysisData && call.status !== 'completed' && (
                <div className="bg-[var(--surface)] p-8 rounded-[20px] border border-[var(--border)] border-dashed text-center">
                    <p className="text-[var(--text-muted)] text-sm font-medium">Анализ еще не проведен или данные отсутствуют.</p>
                </div>
            )}
        </div>
    );
};

export default CallAnalysis;
