export type ClientCategory = 'large' | 'medium' | 'small';

export interface Client {
    id: string;
    name: string;
    externalId: string;
    inn: string;
    funnel: 'warm' | 'cold';
    category: ClientCategory;
    callsCount: number;
    avgScore: number | null;
    createdAt: string;
    avatarLetter: string;
}
