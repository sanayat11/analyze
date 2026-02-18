
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface TokenUsageChartProps {
    data: any; // Define proper type if possible, or use any for now
}

const TokenUsageChart: React.FC<TokenUsageChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const isDark = document.documentElement.classList.contains('dark');
        const primaryColor = '#7c3aed';
        const promptColor = '#6366F1';
        const completionColor = '#22C55E';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)';
        const textColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.6)';

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.12)');
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

        const labels = ['06:00', '10:00', '14:00', '18:00', '22:00', '02:00', '06:00'];
        const promptData = [21000, 18000, 35000, 51987, 25000, 12000, 20000];
        const completionData = [6000, 4500, 11000, 14849, 8000, 3500, 5000];

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Prompt',
                        data: promptData,
                        borderColor: promptColor,
                        borderWidth: 2,
                        tension: 0.35,
                        cubicInterpolationMode: 'monotone',
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: promptColor,
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        fill: false,
                    },
                    {
                        label: 'Completion',
                        data: completionData,
                        borderColor: completionColor,
                        borderWidth: 2,
                        tension: 0.35,
                        cubicInterpolationMode: 'monotone',
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointHoverBackgroundColor: completionColor,
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        fill: false,
                    },
                    {
                        label: 'Всего',
                        data: promptData.map((v, i) => v + completionData[i]),
                        borderColor: primaryColor,
                        borderWidth: 3,
                        tension: 0.35,
                        cubicInterpolationMode: 'monotone',
                        backgroundColor: gradient,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBackgroundColor: primaryColor,
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 3,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: isDark ? '#1e293b' : '#fff',
                        titleColor: isDark ? '#fff' : '#0f172a',
                        bodyColor: isDark ? '#94a3b8' : '#64748b',
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('ru-RU').format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: {
                            color: textColor,
                            font: { size: 11, weight: 600, family: 'Inter' }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        border: { display: false },
                        ticks: {
                            color: textColor,
                            font: { size: 10, weight: 600, family: 'Inter' },
                            callback: function (value) { return (Number(value) / 1000) + 'k'; }
                        }
                    }
                },
                animations: { tension: { duration: 1000, easing: 'linear' } }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef} className="w-full h-full" />;
};

export default TokenUsageChart;
