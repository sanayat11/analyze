export interface KpiData {
    id?: string;
    title: string;
    value: number | string;
    change: number;
    period: string;
    description?: string;
}

export interface AnalyticsRequest {
    id: string;
    date: string;
    provider: string;
    model: string;
    endpoint: string;
    tokens: number;
    promptTokens: number;
    completionTokens: number;
    cost: number;
}

export interface ModelUsage {
    model: string;
    provider: string;
    tokens: number;
    promptTokens: number;
    completionTokens: number;
    requests: number;
    averageTokens: number;
}

export interface EndpointUsage {
    endpoint: string;
    tokens: number;
    requests: number;
    percentage: number;
}

export interface AnalyticsData {
    kpis: KpiData[];
    chartData: {
        tokenUsage: any[]; // refined type would be better but keeping simple for now
        providerDistribution: any[];
        labels?: string[]; // Legacy support if needed
        datasets?: any[]; // Legacy support if needed
    };
    requests?: AnalyticsRequest[];
    usageByModel?: ModelUsage[];
    usageByEndpoint?: EndpointUsage[];
}
