export interface CallAnalysis {
    summary: string;
    criteria: { name: string; score: number; comment: string }[];
}

export interface CallRecord {
    id: string;
    duration: string;
    client: string;
    manager: string;
    scenario: string;
    status: 'transcription_error' | 'completed' | 'pending';
    score: number | null;
    date: string;
    transcription?: string;
    analysisData?: CallAnalysis;
}

export interface RecentCallAdmin {
    id: string;
    client: string;
    status: string;
    date: string;
}
