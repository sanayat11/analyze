export interface Client {
    id: string;
    name: string;
    externalId: string;
    inn: string;
    funnel: 'warm' | 'cold';
    callsCount: number;
    avgScore: number | null;
    createdAt: string;
    avatarLetter: string;
}
