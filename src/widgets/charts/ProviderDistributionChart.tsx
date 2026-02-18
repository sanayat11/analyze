
import React from 'react';

interface ProviderDistributionChartProps {
    data: any;
    animate: boolean;
}

const ProviderDistributionChart: React.FC<ProviderDistributionChartProps> = ({ data, animate }) => {
    return (
        <div className="flex items-center gap-12">
            <div className="relative w-48 h-48 shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--surface-2)" strokeWidth="12" />
                    <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="12"
                        strokeDasharray="251.2"
                        strokeDashoffset={animate ? "0" : "251.2"}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-[var(--text-muted)] uppercase">Всего</span>
                    <span className="text-lg font-bold text-[var(--text)]">66 836</span>
                    <span className="text-[10px] font-extrabold text-[var(--primary)] mt-0.5">100.0%</span>
                </div>
            </div>
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[var(--primary)] group-hover:scale-125 transition-transform"></div>
                        <span className="text-sm font-semibold text-[var(--text)]">timeweb</span>
                    </div>
                    <span className="text-xs font-bold text-[var(--text-muted)]">100.0%</span>
                </div>
                <div className="h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--primary)] transition-all duration-1000"
                        style={{ width: animate ? '100%' : '0%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDistributionChart;
